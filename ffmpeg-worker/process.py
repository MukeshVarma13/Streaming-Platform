import os
import subprocess

INPUT_VOLUME_PATH = "/worker/input"
OUTPUT_VOLUME_PATH = "/worker/output"


def process_flv_to_adaptive_hls(
    streamkey: str,
    user_id: str,
    input_filename: str
) -> bool:

    input_file = os.path.join(INPUT_VOLUME_PATH, input_filename)
    output_dir = os.path.join(OUTPUT_VOLUME_PATH, user_id, streamkey)

    if not os.path.exists(input_file):
        print(f"[ERROR] Input file not found: {input_file}")
        return False

    os.makedirs(output_dir, exist_ok=True)

    master_name = f"{streamkey}.m3u8"

    ffmpeg_cmd = (
        f"ffmpeg -y -i {input_file} "
        f"-filter_complex "
        f"\"[0:v]split=3[v1][v2][v3];"
        f"[v1]scale=1920:1080[v1out];"
        f"[v2]scale=1280:720[v2out];"
        f"[v3]scale=640:360[v3out]\" "
        f"-map \"[v1out]\" -map 0:a -c:v:0 libx264 -b:v:0 5000k -preset veryfast -g 48 -sc_threshold 0 -c:a:0 aac -b:a:0 128k "
        f"-map \"[v2out]\" -map 0:a -c:v:1 libx264 -b:v:1 2500k -preset veryfast -g 48 -sc_threshold 0 -c:a:1 aac -b:a:1 128k "
        f"-map \"[v3out]\" -map 0:a -c:v:2 libx264 -b:v:2 800k  -preset veryfast -g 48 -sc_threshold 0 -c:a:2 aac -b:a:2 96k "
        f"-f hls "
        f"-hls_time 4 "
        f"-hls_list_size 0 "
        f"-hls_flags independent_segments "
        f"-hls_segment_filename {output_dir}/{streamkey}_%v_%03d.ts "
        f"-master_pl_name {master_name} "
        f"{output_dir}/{streamkey}_%v.m3u8"
    )

    print("[FFMPEG] Command:")
    print(ffmpeg_cmd)

    try:
        subprocess.run(
            ffmpeg_cmd,
            shell=True,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        os.remove(input_file)
        print(f"[CLEANUP Deleted source file: {input_file}]")

        print(f"[SUCCESS] HLS created at {output_dir}")
        return True

    except subprocess.CalledProcessError as e:
        print("[FFMPEG ERROR]")
        print(e.stderr.decode()[:1000])
        return False

    except Exception as e:
        print("[CLEANUP ERROR]")
        print(str(e))
        return False