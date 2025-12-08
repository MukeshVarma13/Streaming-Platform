FROM alfg/nginx-rtmp

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /videos/hls /videos/dash

VOLUME ["/videos"]

EXPOSE 1935
EXPOSE 80
