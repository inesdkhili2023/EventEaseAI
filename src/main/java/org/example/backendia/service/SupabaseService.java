package org.example.backendia.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SupabaseService {

    private final WebClient supabaseClient;
    private final String supabaseUrl;

    public SupabaseService(
            @Value("${supabase.url}") String supabaseUrl,
            @Value("${supabase.anon.key}") String supabaseAnonKey
    ) {
        this.supabaseUrl = supabaseUrl;

        this.supabaseClient = WebClient.builder()
                .baseUrl(supabaseUrl)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + supabaseAnonKey)
                .defaultHeader("apikey", supabaseAnonKey)
                .build();
    }

    /** ✅ Generic fetch method (fixes the “cannot find symbol fetchEvents” error) */
    private List<Map<String, Object>> fetchEvents(String query) {
        return fetchEvents(query, "events");
    }

    /** ✅ Generic helper to fetch from any Supabase table */
    private List<Map<String, Object>> fetchEvents(String query, String table) {
        try {
            String uri = "/" + table + "?" + query;
            List<Map> results = supabaseClient.get()
                    .uri(uri)
                    .retrieve()
                    .bodyToFlux(Map.class)
                    .collectList()
                    .block();
            return (List<Map<String, Object>>) (List<?>) results;
        } catch (Exception e) {
            System.err.println("❌ Error fetching from Supabase (" + table + "): " + e.getMessage());
            return List.of();
        }
    }
    /** Fetch active ticket categories */
    public List<Map> fetchActiveTicketCategories() {
        try {
            return supabaseClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/ticket-categories")
                            .queryParam("active", "eq.true")  // only active
                            .queryParam("select", "category_name") // only need category_name
                            .build())
                    .retrieve()
                    .bodyToFlux(Map.class)
                    .collectList()
                    .block();
        } catch (Exception e) {
            System.err.println("Error fetching ticket categories: " + e.getMessage());
            return List.of();
        }
    }

    /** Fetch event by ID */
    public Map<String, Object> fetchEventById(String id) {
        try {
            List<Map> events = supabaseClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/events")
                            .queryParam("id", "eq." + id)
                            .build())
                    .retrieve()
                    .bodyToFlux(Map.class)
                    .collectList()
                    .block();

            if (events != null && !events.isEmpty()) {
                return events.get(0);
            }
        } catch (Exception e) {
            System.err.println("Error fetching event by ID: " + e.getMessage());
        }
        return null;
    }

    /** Search event by title text */
    public Map<String, Object> searchEventByText(String query) {
        try {
            String ilike = "%" + query + "%";
            List<Map> results = supabaseClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/events")
                            .queryParam("title", "ilike." + ilike)
                            .queryParam("limit", "1")
                            .build())
                    .retrieve()
                    .bodyToFlux(Map.class)
                    .collectList()
                    .block();

            if (results != null && !results.isEmpty()) {
                return results.get(0);
            }
        } catch (Exception e) {
            System.err.println("Error searching event by text: " + e.getMessage());
        }
        return null;
    }

    /** Filter events by category, location, price */
    public List<Map> fetchFilteredEvents(String category, String location, Double maxPrice) {
        try {
            return supabaseClient.get()
                    .uri(uriBuilder -> {
                        var builder = uriBuilder.path("/events");
                        if (category != null && !category.isEmpty())
                            builder.queryParam("category", "ilike." + category);
                        if (location != null && !location.isEmpty())
                            builder.queryParam("location", "ilike." + location);
                        if (maxPrice != null)
                            builder.queryParam("price", "lte." + maxPrice);
                        builder.queryParam("select", "id,title,price,location,start_date,end_date,description");
                        return builder.build();
                    })
                    .retrieve()
                    .bodyToFlux(Map.class)
                    .collectList()
                    .block();
        } catch (Exception e) {
            System.err.println("❌ Error fetching filtered events: " + e.getMessage());
            return List.of();
        }
    }

    /** Fetch available events */
    public List<Map> fetchAvailableEvents() {
        try {
            return supabaseClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/events")
                            .queryParam("select", "id,title,price,capacity,location,start_date,end_date")
                            .queryParam("limit", "5")
                            .build())
                    .retrieve()
                    .bodyToFlux(Map.class)
                    .collectList()
                    .block();
        } catch (Exception e) {
            System.err.println("Error fetching available events: " + e.getMessage());
            return List.of();
        }
    }

    /** Latest events */
    public List<Map<String, Object>> fetchLatestEvents(int limit) {
        return fetchEvents("order=created_at.desc&limit=" + limit);
    }

    /** Popular events */
    public List<Map<String, Object>> fetchPopularEvents() {
        return fetchEvents("order=rating.desc&limit=5");
    }

    /** Organizer info */
    public String fetchOrganizerInfo() {
        return "📞 Organizer: contact@eventease.com | +216 22 333 444";
    }

    /** Feedbacks for an event */
    public List<String> fetchFeedbacksForEvent(String eventId) {
        List<Map<String, Object>> rows = fetchEvents("event_id=eq." + eventId, "feedbacks");
        return rows.stream()
                .map(row -> (String) row.get("content"))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }
}
