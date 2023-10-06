package io.nextazy.auction.config;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class AuctionWebSocketHandler implements WebSocketHandler {

    private static Map<String, WebSocketSession> sessions = new HashMap<>();
    private static double highestBid = 0.0;
    private static String highestBidder = null;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.put(session.getId(), session);
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws IOException {
        if (message instanceof TextMessage) {
            String payload = ((TextMessage) message).getPayload().trim();
            System.out.println("Received payload: '" + payload + "'"); // Debugging

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(payload);

            if (jsonNode.has("type") && jsonNode.get("type").asText().equals("bid")) {
                double newBid = jsonNode.get("bidAmount").asDouble();

                if (newBid > highestBid) {
                    highestBid = newBid;
                    highestBidder = session.getId();

                    for (WebSocketSession s : sessions.values()) {
                        s.sendMessage(new TextMessage("New highest bid: " + highestBid));
                    }
                } else if (newBid == highestBid && session.getId().equals(highestBidder)) {
                    session.sendMessage(new TextMessage("Price already quoted."));
                } else {
                    session.sendMessage(new TextMessage("Your bid is lower than the current highest bid."));
                }
            } else {
                session.sendMessage(new TextMessage("Invalid message format."));
            }
        }
    }
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws IOException {
        sessions.remove(session.getId());

        if (session.getId().equals(highestBidder)) {
            highestBid = 0.0;
            highestBidder = null;

            for (WebSocketSession s : sessions.values()) {
                s.sendMessage(new TextMessage("Highest bid reset."));
            }
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        sessions.remove(session.getId());
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}