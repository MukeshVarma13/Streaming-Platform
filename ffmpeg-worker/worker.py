import redis
import subprocess
import os

r = redis.Redis(host="redis", port=6379)
pubsub = r.pubsub()
pubsub.subscribe("ffmpeg_jobs")

print("FFmpeg worker started...")

for msg in pubsub.listen():
    if msg["type"] != "message":
        continue

    input_file = msg["data"].decode()
    output_file = input_file.replace(".flv", ".mp4")

    in_path = f"/videos/{input_file}"
    out_path = f"/videos/{output_file}"

    print("Converting:", in_path)

    subprocess.run(["ffmpeg", "-i", in_path, "-y", out_path])

    # Delete old FLV to save disk space
    if os.path.exists(in_path):
        os.remove(in_path)

    # Notify backend
    os.system(
        f'curl -X POST http://backend:8080/api/conversion/done -d "file={output_file}"'
    )
