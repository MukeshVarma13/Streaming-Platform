import os
from flask import Flask, request, jsonify
from process import process_flv_to_adaptive_hls

INPUT_VOLUME_PATH = "/worker/input"

app = Flask(__name__)


def find_latest_recording(stream_key: str):
    files = [
        f for f in os.listdir(INPUT_VOLUME_PATH)
        if f.startswith(stream_key + "-") and f.endswith(".flv")
    ]

    if not files:
        return None

    # pick latest by timestamp suffix
    files.sort(
        key=lambda x: int(x.split("-")[-1].replace(".flv", "")),
        reverse=True
    )
    return files[0]


@app.route("/convert", methods=["POST"])
def convert():
    data = request.get_json()

    if not data:
        return jsonify({"error": "JSON body required"}), 400

    stream_key = data.get("streamKey")
    user_id = data.get("userId")

    if not stream_key or not user_id:
        return jsonify({
            "error": "streamKey and userId are required"
        }), 400

    input_filename = find_latest_recording(stream_key)

    if not input_filename:
        return jsonify({
            "error": "Recording not found",
            "streamKey": stream_key
        }), 404

    success = process_flv_to_adaptive_hls(
        streamkey=stream_key,
        user_id=user_id,
        input_filename=input_filename
    )

    if not success:
        return jsonify({
            "status": "FAILED",
            "streamKey": stream_key
        }), 500

    return jsonify({
        "status": "SUCCESS",
        "userId": user_id,
        "streamKey": stream_key,
        "outputPath": f"/api/videos/{user_id}/{stream_key}/{stream_key}.m3u8"
    }), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
