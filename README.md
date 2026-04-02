# 📡 Misfits Streaming Platform

A full-stack live streaming platform built using **RTMP (NGINX)**, **Spring Boot**, and **React**, with Docker-based deployment.
This project allows streamers to broadcast live video and viewers to watch recorded or live streams.

---

## 🚀 Features

* 🔴 Live streaming via RTMP
* 🎥 Automatic recording of streams (MP4)
* 📦 Backend API using Spring Boot
* 🌐 Frontend built with React + Tailwind
* 🐳 Dockerized setup (easy to run)
* 📁 Local storage for recorded videos

---

## 🧱 Tech Stack

* **Streaming Server**: NGINX RTMP
* **Backend**: Spring Boot
* **Frontend**: ReactJS + Tailwind CSS
* **Containerization**: Docker & Docker Compose

---

## 📂 Project Structure

```
RTMP-SERVER/
│
├── docker-compose.yml
├── nginx/
│   └── nginx.conf
│
├── recordings/   (or E:\FullStack-Learning\RTMP-SERVER)
│
├── streaming-platform/  (Spring Boot)
│   └── src/main/java/dev/misfit/...
│
├── frontend/ (React app)
│
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have:

* Docker installed → [https://www.docker.com/](https://www.docker.com/)
* Docker Compose (comes with Docker Desktop)
* Node.js (for frontend, optional if dockerized)
* Java 17+ (for backend if running locally)

---

## 🐳 Running the Project (Docker)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd RTMP-SERVER
```

---

### 2. Start All Services

```bash
docker compose up -d
```

---

### 3. Verify Containers

```bash
docker ps
```

You should see:

* RTMP server
* Spring Boot backend
* React frontend (if included)

---

## 📡 RTMP Streaming Details

* **RTMP URL**:

```
rtmp://localhost/live
```

* **Stream Key**:

```
test
```

👉 Example (OBS setup):

* Server: `rtmp://localhost/live`
* Stream Key: `test`

---

## 🎥 Recording Location

Streams are automatically saved as `.mp4` files in:

```
E:\FullStack-Learning\RTMP-SERVER
```

(or your mounted Docker volume)

---

## 🌐 Access Points

| Service     | URL                                            |
| ----------- | ---------------------------------------------- |
| Frontend    | [http://localhost:3000](http://localhost:3000) |
| Backend API | [http://localhost:8080](http://localhost:8080) |
| RTMP Server | rtmp://localhost:1935                          |

---

## 🔧 Useful Commands

### Stop containers

```bash
docker compose down
```

### Restart

```bash
docker compose restart
```

### View logs

```bash
docker compose logs -f
```

---

## 🧪 Running Without Docker (Optional)

### Backend (Spring Boot)

```bash
cd streaming-platform
./mvnw spring-boot:run
```

---

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

## ⚠️ Common Issues

### 1. Port already in use

Change ports in `docker-compose.yml`

---

### 2. RTMP not working

* Ensure port `1935` is open
* Check firewall / antivirus

---

### 3. Recording not saving

* Verify volume mapping in Docker:

```yaml
volumes:
  - E:\FullStack-Learning\RTMP-SERVER:/recordings
```

---

## 📌 Future Improvements

* 🔐 Authentication (JWT)
* 💬 Live chat (WebSockets)
* 📊 Stream analytics
* ☁️ Cloud storage (AWS S3)

---

## 👨‍💻 Author

**Mukesh Varma**
Full Stack Developer (Java + React)

---

If you want, I can next:

* Add **docker-compose.yml (production-ready)**
* Or make this README **GitHub-level polished with badges + screenshots**
