package org.example.backendia.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

@Service
public class CommentModerationService {
    
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ModerationResult moderateComment(String commentText) {
        try {
            System.out.println("Moderating comment: " + commentText);

            String pythonScript = "src/main/resources/simple_comment_moderation.py";
            ProcessBuilder processBuilder = new ProcessBuilder("python", pythonScript, commentText);
            processBuilder.redirectErrorStream(true);
            
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            
            while ((line = reader.readLine()) != null) {
                output.append(line);
            }
            
            int exitCode = process.waitFor();
            
            if (exitCode == 0) {
                System.out.println("Python script output: " + output.toString());

                JsonNode jsonResponse = objectMapper.readTree(output.toString());
                
                boolean isToxic = jsonResponse.get("is_toxic").asBoolean();
                double toxicityScore = jsonResponse.get("toxicity_score").asDouble();
                
                System.out.println("Comment is toxic: " + isToxic + ", score: " + toxicityScore);
                
                Map<String, Integer> categoryScores = new HashMap<>();
                JsonNode categoryScoresNode = jsonResponse.get("category_scores");
                if (categoryScoresNode != null) {
                    categoryScoresNode.fields().forEachRemaining(entry -> {
                        categoryScores.put(entry.getKey(), entry.getValue().asInt());
                    });
                }
                
                String moderationReason = generateModerationReason(categoryScores, toxicityScore);
                
                return new ModerationResult(isToxic, toxicityScore, categoryScores, moderationReason);
                
            } else {
                return new ModerationResult(false, 0.0, new HashMap<>(), "Moderation service unavailable");
            }
            
        } catch (IOException | InterruptedException e) {

            return new ModerationResult(false, 0.0, new HashMap<>(), "Moderation service error: " + e.getMessage());
        }
    }
    

    private String generateModerationReason(Map<String, Integer> categoryScores, double toxicityScore) {
        StringBuilder reason = new StringBuilder();
        
        for (Map.Entry<String, Integer> entry : categoryScores.entrySet()) {
            if (entry.getValue() == 1) {
                if (reason.length() > 0) {
                    reason.append(", ");
                }
                reason.append(entry.getKey().replace("_", " "));
            }
        }
        
        if (reason.length() == 0 && toxicityScore > 0.3) {
            reason.append("General toxicity detected");
        }
        
        return reason.length() > 0 ? reason.toString() : "Content approved";
    }
    

    public static class ModerationResult {
        private final boolean isToxic;
        private final double toxicityScore;
        private final Map<String, Integer> categoryScores;
        private final String moderationReason;
        
        public ModerationResult(boolean isToxic, double toxicityScore, Map<String, Integer> categoryScores, String moderationReason) {
            this.isToxic = isToxic;
            this.toxicityScore = toxicityScore;
            this.categoryScores = categoryScores;
            this.moderationReason = moderationReason;
        }
        
        public boolean isToxic() {
            return isToxic;
        }
        
        public double getToxicityScore() {
            return toxicityScore;
        }
        
        public Map<String, Integer> getCategoryScores() {
            return categoryScores;
        }
        
        public String getModerationReason() {
            return moderationReason;
        }
    }
}
