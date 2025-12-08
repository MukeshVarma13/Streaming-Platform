FROM python:3.12-slim

WORKDIR /worker

RUN apt update && apt install -y ffmpeg && \
    apt clean && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

VOLUME ["/videos"]

CMD ["python", "worker.py"]
