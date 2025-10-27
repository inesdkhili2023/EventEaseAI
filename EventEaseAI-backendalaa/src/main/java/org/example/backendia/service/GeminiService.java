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
    private String formatEventSummary(Map<String, Object> event) {
        return String.format(
                "🎟️ %s\n💰 %s\n📍 %s\n🗓️ %s → %s",
                event.getOrDefault("title", "N/A"),
                event.getOrDefault("price", "N/A"),
                event.getOrDefault("location", "N/A"),
                event.getOrDefault("start_date", "N/A"),
                event.getOrDefault("end_date", "N/A")
        );
    }

    public ChatResponse chat(ChatRequest request) {
        String message = Optional.ofNullable(request.getMessage()).orElse("").trim();
        String lower = message.toLowerCase();

        try {
            // ✅ 1. Handle Dynamic Slash Commands
            if (lower.startsWith("/")) {
                switch (lower) {
                    case "/help":
                        return new ChatResponse(
                                "📘 Available Commands:\n" +
                                        "/help → Show all commands\n" +
                                        "/latest → Fetch the latest 5 events\n" +
                                        "/popular → Show top-rated events\n" +
                                        "/contact → Get organizer info\n" +
                                        "You can also ask things like:\n" +
                                        "• event 3\n" +
                                        "• tech events in Tunis under 50\n" +
                                        "• summarize feedback for event 12"
                        );

                    case "/latest":
                        List<Map<String, Object>> latest = supabaseService.fetchLatestEvents(5);
                        if (latest.isEmpty()) {
                            return new ChatResponse("No recent events found.");
                        }
                        return new ChatResponse("🆕 Latest Events:\n" + formatMultipleEvents(latest));

                    case "/popular":
                        List<Map<String, Object>> popular = supabaseService.fetchPopularEvents();
                        if (popular.isEmpty()) {
                            return new ChatResponse("No popular events found yet.");
                        }
                        return new ChatResponse("🔥 Top-rated Events:\n" + formatMultipleEvents(popular));

                    case "/contact":
                        String contact = supabaseService.fetchOrganizerInfo();
                        return new ChatResponse(contact != null ? contact : "No organizer info available.");

                    default:
                        return new ChatResponse("❓ Unknown command. Try /help for a list of commands.");
                }
            }
            // 1️⃣ Detect event ID anywhere in message
            Pattern idPattern = Pattern.compile("\\bevent\\b\\s*[#:/]?\\s*(?:id\\s*)?(\\d+)", Pattern.CASE_INSENSITIVE);
            Matcher idMatcher = idPattern.matcher(message);

            if (idMatcher.find()) {
                String id = idMatcher.group(1);
                Map<String, Object> event = supabaseService.fetchEventById(id);

                if (event != null)
                    return new ChatResponse(formatEventDetails(event, id));
                else
                    return new ChatResponse("Sorry, I couldn’t find any event with ID " + id + ".");
            }

            // 2️⃣ Try to detect filters: category, location, price
            String category = null, city = null;
            Double maxPrice = null;

            // Extract category keywords
            if (lower.contains("educatif")) category = "EDUCATIF";
            else if (lower.contains("tech")) category = "TECH";
            else if (lower.contains("music") || lower.contains("concert")) category = "MUSIC";

            // Extract city/location
            if (lower.contains("tunis")) city = "Tunis";
            else if (lower.contains("café nutri")) city = "Café Nutri";

            // Extract price number (e.g. "under 100" or "<100")
            Matcher priceMatcher = Pattern.compile("(under|below|moins de|<|<=)\\s*(\\d+)", Pattern.CASE_INSENSITIVE).matcher(lower);
            if (priceMatcher.find()) {
                maxPrice = Double.parseDouble(priceMatcher.group(2));
            } else {
                // Try standalone number if context implies price
                Matcher numberMatcher = Pattern.compile("\\b(\\d{1,4})\\b").matcher(lower);
                if (numberMatcher.find() && (lower.contains("price") || lower.contains("under") || lower.contains("prix")))
                    maxPrice = Double.parseDouble(numberMatcher.group(1));
            }

            // 3️⃣ If filters detected, call Supabase
            if (category != null || city != null || maxPrice != null) {
                List<Map> results = supabaseService.fetchFilteredEvents(category, city, maxPrice);
                if (results != null && !results.isEmpty()) {
                    StringBuilder sb = new StringBuilder("Here are the top matching events:\n\n");
                    for (Map event : results) {
                        sb.append(formatEventSummary(event)).append("\n\n");
                    }
                    return new ChatResponse(sb.toString());
                } else {
                    return new ChatResponse("Sorry, I couldn’t find events matching your criteria.");
                }
            }

            // 4️⃣ If user just asks about events in general
            if (lower.contains("event") || lower.contains("ticket")) {
                Map<String, Object> event = supabaseService.searchEventByText(message);
                if (event != null) {
                    String id = String.valueOf(event.get("id"));
                    return new ChatResponse("I found an event that matches your query:\n" + formatEventDetails(event, id));
                }
            }

            // 5️⃣ Fallback to Gemini AI
            String aiResponse = callGemini(message);
            return new ChatResponse(aiResponse);

        } catch (Exception e) {
            e.printStackTrace();
            return new ChatResponse("An error occurred: " + e.getMessage());
        }
    }
    private String formatMultipleEvents(List<Map<String, Object>> events) {
        if (events == null || events.isEmpty()) {
            return "No events found.";
        }

        StringBuilder sb = new StringBuilder();
        int index = 1;

        for (Map<String, Object> event : events) {
            sb.append(index++)
                    .append(". ")
                    .append(event.getOrDefault("title", "Untitled Event"))
                    .append(" — 💰 Price: ")
                    .append(event.getOrDefault("price", "N/A"))
                    .append(" € | 📍 Location: ")
                    .append(event.getOrDefault("location", "Unknown"))
                    .append("\n   📅 Date: ")
                    .append(event.getOrDefault("start_date", "N/A"))
                    .append(" → ")
                    .append(event.getOrDefault("end_date", "N/A"))
                    .append("\n")
                    .append("   Category: ")
                    .append(event.getOrDefault("category", "General"))
                    .append("\n\n");
        }

        return sb.toString().trim();
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