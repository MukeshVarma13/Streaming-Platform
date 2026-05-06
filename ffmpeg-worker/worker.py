# worker.py

from flask import Flask, request, jsonify

from process import (
    process_flv_to_adaptive_hls,
    stop_stream_process
)

app = Flask(__name__)


@app.route("/convert", methods=["POST"])
def convert():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "JSON body required"
        }), 400

    stream_key = data.get("streamKey")
    user_id = data.get("userId")

    if not stream_key or not user_id:
        return jsonify({
            "error": "streamKey and userId are required"
        }), 400

    success = process_flv_to_adaptive_hls(
        streamkey=stream_key,
        user_id=user_id
    )

    if not success:
        return jsonify({
            "status": "FAILED",
            "streamKey": stream_key
        }), 500

    return jsonify({
        "status": "SUCCESS",
        "streamKey": stream_key,
        "userId": user_id
    }), 200


@app.route("/stop/<streamkey>", methods=["POST"])
def stop_stream(streamkey):

    success = stop_stream_process(streamkey)

    if not success:
        return jsonify({
            "error": "Stream not found"
        }), 404

    return jsonify({
        "status": "STOPPED",
        "streamKey": streamkey
    }), 200


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000
    )