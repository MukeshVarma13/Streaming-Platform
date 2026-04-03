import { Client } from "@stomp/stompjs";
import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";

const VideoChat = () => {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);

  const pcRef = useRef(null);
  const stompRef = useRef(null);

  const myId = useRef(Math.random().toString(36).substring(7));
  const SOCKET_URL = "https://englacial-lynell-prohibitively.ngrok-free.dev/ws";

  useEffect(() => {
    const socket = new SockJS(SOCKET_URL);

    // ngrok fix
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function () {
      originalOpen.apply(this, arguments);
      this.setRequestHeader("ngrok-skip-browser-warning", "true");
    };

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: () => {},

      onConnect: () => {
        console.log("✅ Connected");

        stompRef.current = client;

        client.subscribe("/topic/signals", (msg) => {
          const signal = JSON.parse(msg.body);
          handleSignal(signal);
        });

        initWebRTC();
      },
    });

    client.activate();

    return () => client.deactivate();
  }, []);

  const initWebRTC = async () => {
    // 🎥 GET MEDIA
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localVideo.current.srcObject = stream;

    // 🔗 PEER CONNECTION
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
      ],
    });

    pcRef.current = pc;

    // Add tracks
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    // Remote stream
    pc.ontrack = (event) => {
      console.log("📺 Remote stream received");
      remoteVideo.current.srcObject = event.streams[0];
    };

    // ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("🧊 ICE candidate");

        stompRef.current.publish({
          destination: "/app/signal",
          body: JSON.stringify({
            type: "candidate",
            sender: myId.current,
            data: event.candidate,
          }),
        });
      }
    };

    // ICE state debug
    pc.oniceconnectionstatechange = () => {
      console.log("ICE State:", pc.iceConnectionState);
    };

    // 👇 Caller logic
    const isCaller = window.location.hash === "#caller";

    if (isCaller) {
      console.log("📤 Creating offer");

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      stompRef.current.publish({
        destination: "/app/signal",
        body: JSON.stringify({
          type: "offer",
          sender: myId.current,
          data: offer,
        }),
      });
    }
  };

  const handleSignal = async (signal) => {
    const pc = pcRef.current;
    if (!pc) return;

    // ❌ Ignore self
    if (signal.sender === myId.current) return;

    if (signal.type === "offer") {
      console.log("📥 Got offer");

      await pc.setRemoteDescription(signal.data);

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      stompRef.current.publish({
        destination: "/app/signal",
        body: JSON.stringify({
          type: "answer",
          sender: myId.current,
          data: answer,
        }),
      });
    }

    if (signal.type === "answer") {
      console.log("📥 Got answer");
      await pc.setRemoteDescription(signal.data);
    }

    if (signal.type === "candidate") {
      try {
        await pc.addIceCandidate(signal.data);
      } catch (e) {
        console.error("ICE error:", e);
      }
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <video ref={localVideo} autoPlay muted playsInline width="300" />
      <video ref={remoteVideo} autoPlay playsInline width="300" />
    </div>
  );
};

export default VideoChat;