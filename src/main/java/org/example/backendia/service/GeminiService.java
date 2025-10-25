package org.example.backendia.service;

import org.example.backendia.dto.ChatRequest;
import org.example.backendia.dto.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class GeminiService {


    private final WebClient webClient;
    private final String apiKey;
    private final String model;

    @Autowired
    private SupabaseService supabaseService;

    public GeminiService(
            @Value("${gemini.api.key}") String apiKey,
            @Value("${gemini.model:gemini-1.5-flash}") String model
    ) {
        this.apiKey = apiKey;
        this.model = model;

        this.webClient = WebClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com/v1beta/")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public ChatResponse chat(ChatRequest request) {
        String message = Optional.ofNullable(request.getMessage()).orElse("").trim();
        String lower = message.toLowerCase();

        try {
            // ✅ 1) Detect event ID pattern anywhere in message
            Pattern idPattern = Pattern.compile("\\bevent\\b\\s*[#:/]?\\s*(?:id\\s*)?(\\d+)", Pattern.CASE_INSENSITIVE);
            Matcher idMatcher = idPattern.matcher(message);

            if (idMatcher.find()) {
                String id = idMatcher.group(1);
                Map<String, Object> event = supabaseService.fetchEventById(id);

                if (event != null) {
                    return new ChatResponse(formatEventDetails(event, id));
                } else {
                    return new ChatResponse("Sorry, I couldn’t find any event with ID " + id + ".");
                }
            }

            // ✅ 2) If message contains event-related keywords → search by title
            if (lower.contains("event") || lower.contains("ticket") || lower.contains("price")
                    || lower.contains("prix") || lower.contains("place") || lower.contains("billet")) {

                Map<String, Object> event = supabaseService.searchEventByText(message);
                if (event != null) {
                    String id = String.valueOf(event.get("id"));
                    return new ChatResponse("I found an event that matches your query:\n" + formatEventDetails(event, id));
                }
            }

            // ✅ 3) Fallback to Gemini API for general chat
            String aiResponse = callGemini(message);
            return new ChatResponse(aiResponse);

        } catch (Exception e) {
            e.printStackTrace();
            return new ChatResponse("An error occurred: " + e.getMessage());
        }
    }

    // 🔍 Helper to format event details clearly
    private String formatEventDetails(Map<String, Object> event, String id) {
        String title = String.valueOf(event.getOrDefault("title", "N/A"));
        String price = String.valueOf(event.getOrDefault("price", "N/A"));
        String start = String.valueOf(event.getOrDefault("start_date", "N/A"));
        String end = String.valueOf(event.getOrDefault("end_date", "N/A"));
        String location = String.valueOf(event.getOrDefault("location", event.getOrDefault("address", "N/A")));
        String capacity = String.valueOf(event.getOrDefault("capacity", "N/A"));
        String desc = String.valueOf(event.getOrDefault("description", ""));

        return String.format(
                "Here are the details for event %s:\n" +
                        "📍 Title: %s\n" +
                        "💰 Price: %s\n" +
                        "📅 Start: %s\n" +
                        "🏁 End: %s\n" +
                        "📍 Location: %s\n" +
                        "👥 Capacity: %s\n%s",
                id, title, price, start, end, location, capacity,
                (desc == null || desc.isEmpty()) ? "" : ("\n📄 Description: " + desc)
        );
    }

    // 🧠 Gemini API Call for general questions
    private String callGemini(String userMessage) {
        Map<String, Object> textPart = Map.of("text", userMessage);
        Map<String, Object> contentMap = Map.of("parts", List.of(textPart));
        Map<String, Object> body = Map.of("contents", List.of(contentMap));

        String endpoint = "/models/" + model + ":generateContent?key=" + apiKey;

        try {
            Mono<Map> mono = webClient.post()
                    .uri(endpoint)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class);

            Map<String, Object> response = mono.block();
            return extractTextFromGeminiResponse(response);
        } catch (Exception e) {
            e.printStackTrace();
            return "Gemini API Error: " + e.getMessage();
        }
    }

    // 🧩 Parse Gemini API response safely
    private String extractTextFromGeminiResponse(Map<String, Object> response) {
        try {
            if (response == null) return "No response from Gemini.";

            Object candidates = response.get("candidates");
            if (candidates instanceof List<?> candidatesList && !candidatesList.isEmpty()) {
                Object firstCandidate = candidatesList.get(0);
                if (firstCandidate instanceof Map<?, ?> candidateMap) {
                    Object content = candidateMap.get("content");
                    if (content instanceof Map<?, ?> contentMap) {
                        Object parts = contentMap.get("parts");
                        if (parts instanceof List<?> partsList && !partsList.isEmpty()) {
                            Object firstPart = partsList.get(0);
                            if (firstPart instanceof Map<?, ?> partMap) {
                                Object text = partMap.get("text");
                                if (text != null) return text.toString();
                            }
                        }
                    }
                }
            }

            Object error = response.get("error");
            if (error != null) return "API Error: " + error.toString();

        } catch (Exception e) {
            System.err.println("Error parsing Gemini response: " + e.getMessage());
        }
        return "Unable to parse response from Gemini.";
    }


}
