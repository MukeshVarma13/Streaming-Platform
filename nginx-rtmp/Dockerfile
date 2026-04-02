FROM alqutami/rtmp-hls:latest

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir /mnt/hls /mnt/dash
RUN chmod -R 777 /mnt/hls /mnt/dash

VOLUME /tmp/recordings

EXPOSE 1935
EXPOSE 8080