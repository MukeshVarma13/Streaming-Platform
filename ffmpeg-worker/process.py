# process.py

import os
import time
import subprocess
import threading
import sys
import signal

OUTPUT_VOLUME_PATH = "/worker/output"
ACTIVE_STREAMS = {}


def log_reader(pipe, streamkey):
    print(f"[LOGGER] Monitoring started for: {streamkey}", flush=True)
    if pipe is None:
        print(f"[LOGGER ERROR] Pipe is None for {streamkey}", flush=True)
        return
    
    try:
        for line in iter(pipe.readline, ''):
            if line:
                print(f"[{streamkey}] {line.strip()}", flush=True)
            else:
                break # Pipe closed
    except Exception as e:
        print(f"[LOGGER ERROR] {streamkey}: {e}", flush=True)
    finally:
        pipe.close()
        


def process_flv_to_adaptive_hls(
    streamkey: str,
    user_id: str
) -> bool:

    # Prevent duplicate ffmpeg process
    if streamkey in ACTIVE_STREAMS:
        print(f"[INFO] Stream already running: {streamkey}")
        return True

    output_dir = os.path.join(
        OUTPUT_VOLUME_PATH,
        user_id,
        streamkey
    )

    os.makedirs(output_dir, exist_ok=True)
    master_name = f"{streamkey}.m3u8"
    stream_path = (
        f"rtmp://host.docker.internal:1935/live/{streamkey}"
    )

    ffmpeg_cmd = [
        "ffmpeg",
        "-y",
        "-nostdin",
        "-rw_timeout", "5000000",
        "-i", stream_path,

        "-filter_complex",
        "[0:v]split=3[v1][v2][v3];"
        "[v1]scale=1920:1080[v1out];"
        "[v2]scale=1280:720[v2out];"
        "[v3]scale=640:360[v3out]",

        # 1080p
        "-map", "[v1out]",
        "-map", "0:a?",
        "-c:v:0", "libx264",
        "-preset:v:0", "ultrafast",
        "-tune:v:0", "zerolatency",
        "-b:v:0", "5000k",
        "-g:v:0", "48",
        "-keyint_min:v:0", "48",
        "-sc_threshold:v:0", "0",
        "-c:a:0", "aac",
        "-b:a:0", "128k",

        # 720p
        "-map", "[v2out]",
        "-map", "0:a?",
        "-c:v:1", "libx264",
        "-preset:v:1", "ultrafast",
        "-tune:v:1", "zerolatency",
        "-b:v:1", "2500k",
        "-g:v:1", "48",
        "-keyint_min:v:1", "48",
        "-sc_threshold:v:1", "0",
        "-c:a:1", "aac",
        "-b:a:1", "128k",

        # 360p
        "-map", "[v3out]",
        "-map", "0:a?",
        "-c:v:2", "libx264",
        "-preset:v:2", "ultrafast",
        "-tune:v:2", "zerolatency",
        "-b:v:2", "800k",
        "-g:v:2", "48",
        "-keyint_min:v:2", "48",
        "-sc_threshold:v:2", "0",
        "-c:a:2", "aac",
        "-b:a:2", "96k",

        # HLS
        "-f", "hls",
        "-hls_time", "4",
        "-hls_list_size", "0",
        "-hls_playlist_type", "event",
        "-hls_flags", "independent_segments+append_list",
        "-hls_segment_type", "mpegts",

        "-var_stream_map",
        "v:0,a:0,name:1080p "
        "v:1,a:1,name:720p "
        "v:2,a:2,name:360p",

        "-master_pl_name",
        master_name,

        "-hls_segment_filename",
        f"{output_dir}/{streamkey}_%v_%03d.ts",

        f"{output_dir}/{streamkey}_%v.m3u8"
    ]

    try:
        print(f"\n[FFMPEG STARTING] {streamkey}")
        process = subprocess.Popen(
            ffmpeg_cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            preexec_fn=os.setsid
        )
        t = threading.Thread(
            target=log_reader, 
            args=(process.stdout, streamkey), 
            daemon=True
        )
        
        ACTIVE_STREAMS[streamkey] = process
        
        threading.Thread(
            target=monitor_process,
            args=(process, streamkey),
            daemon=True
        ).start()
        t.start()
        time.sleep(1)
        
        if process.poll() is not None:
            print("\n[FFMPEG ERROR]")
            return False
        
        print(f"[FFMPEG STARTED] PID: {process.pid}")
        return True

    except Exception as e:
        print("\n[FFMPEG EXCEPTION]")
        print(str(e))
        return False


def stop_stream_process(streamkey: str):
    process = ACTIVE_STREAMS.get(streamkey)
    if not process:
        return False
    try:
        print(f"[STOPPING] {streamkey}")
        os.killpg(
            os.getpgid(process.pid),
            signal.SIGINT
        )
        try:
            process.wait(timeout=20)
        except subprocess.TimeoutExpired:
            print(f"[FORCE KILL] {streamkey} didn't stop, forcing...")
            os.killpg(os.getpgid(process.pid), signal.SIGKILL)
            
        ACTIVE_STREAMS.pop(streamkey, None)
        return True
    
    except Exception as e:
        print(f"[STOP ERROR] {str(e)}")
        return False
    
def monitor_process(process, streamkey):
    return_code = process.wait()
    ACTIVE_STREAMS.pop(streamkey, None)
    if return_code in [0, 255]:
        print(f"[PROCESS CLEAN EXIT] {streamkey}")
    else:
        print(f"[PROCESS ERROR EXIT] {streamkey}: {return_code}")