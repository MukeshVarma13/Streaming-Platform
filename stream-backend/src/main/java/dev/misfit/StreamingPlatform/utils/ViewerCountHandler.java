package dev.misfit.StreamingPlatform.utils;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.net.URI;
import java.util.Collections;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class ViewerCountHandler extends TextWebSocketHandler {

    private final Map<String, Integer> viewerCounts = new ConcurrentHashMap<>();
    private final Map<String, Set<WebSocketSession>> streamSessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String streamId = extractStreamId(session);
        viewerCounts.merge(streamId, 1, Integer::sum);  // increment count
        streamSessions.computeIfAbsent(streamId, k -> ConcurrentHashMap.newKeySet()).add(session);  // store session
        broadcastViewerCount(streamId); // broadcast to all sessions of this stream
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String streamId = extractStreamId(session);
        viewerCounts.merge(streamId, -1, Integer::sum); // decrement count
        Set<WebSocketSession> sessions = streamSessions.getOrDefault(streamId, Collections.emptySet()); // remove session
        sessions.remove(session);
        broadcastViewerCount(streamId); // broadcast to all sessions of this stream
    }

    private String extractStreamId(WebSocketSession session) {
        URI uri = session.getUri();
        if (uri != null && uri.getQuery() != null) {
            for (String param : uri.getQuery().split("&")) {
                if (param.startsWith("streamId=")) {
                    return param.split("=")[1];
                }
            }
        }
        return "unknown";
    }

    private void broadcastViewerCount(String streamId) {
        int count = viewerCounts.getOrDefault(streamId, 0);
        Set<WebSocketSession> sessions = streamSessions.getOrDefault(streamId, Collections.emptySet());

        for (WebSocketSession sess : sessions) {
            try {
                sess.sendMessage(new TextMessage(String.valueOf(count)));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
