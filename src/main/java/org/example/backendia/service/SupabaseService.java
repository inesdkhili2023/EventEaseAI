package org.example.backendia.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

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

    /**
     * Fetch a specific event by its ID.
     */
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
            System.err.println("Error fetching event from Supabase: " + e.getMessage());
        }
        return null;
    }
    /**
     * Search events by a free-text query (title / keywords).
     * Returns the first matching event map or null.
     */
    public Map<String, Object> searchEventByText(String query) {
        try {
            // Use ILIKE for case-insensitive partial match in Supabase REST
            String ilike = "%" + query + "%";
            List<Map> results = supabaseClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/events")
                            .queryParam("title", "ilike." + ilike)   // search title column
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

    /**
     * Fetch a few available events (title, price, capacity, etc.).
     */
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
}
