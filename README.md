<!-- To Start, Reload, Stop the nginx server -->
sudo /usr/local/nginx/sbin/nginx
sudo /usr/local/nginx/sbin/nginx -s reload
sudo /usr/local/nginx/sbin/nginx -s stop


<!-- To add configurations into the nginx.config file -->
sudo nano /usr/local/nginx/conf/nginx.conf


<!-- Make sure to make a directory to store the recordings temporarily -->
sudo mkdir /tmp/recordings
sudo chmod 777 /tmp/recordings/
ls -l /tmp/recordings


<!-- To start the live streaming -->
Server: rtmp://localhost:1935/live
Stream-key: <--your-key-->

<!-- To play the live stream -->
http://localhost:8000/hls/<--stream-key-->.m3u8