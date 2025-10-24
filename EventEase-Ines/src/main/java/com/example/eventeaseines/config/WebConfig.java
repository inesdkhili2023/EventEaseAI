package com.example.eventeaseines.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // ✅ Servir les fichiers du dossier "uploads"
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");

        System.out.println("✅ Configuration des ressources statiques: /uploads/** -> file:uploads/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // ✅ Configuration CORS pour permettre l'accès depuis Angular
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);

        System.out.println("✅ Configuration CORS activée pour http://localhost:4200");
    }
}