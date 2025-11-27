package com.immobiliaris.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.util.List;
import java.util.Map;

import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

// BrevoEmailService — costruisce il payload e chiama l'API Brevo (/smtp/email) usando WebClient.
@Service
public class BrevoEmailService {

    private static final Logger log = LoggerFactory.getLogger(BrevoEmailService.class);

    private final WebClient webClient;
    private final String senderEmail;
    private final String senderName;
    private final boolean enabled;

    public BrevoEmailService(@Value("${brevo.api.key:}") String apiKey,
                             @Value("${brevo.sender.email:noreply@example.com}") String senderEmail,
                             @Value("${brevo.sender.name:Immobiliaris}") String senderName,
                             WebClient.Builder webClientBuilder) {
        this.senderEmail = senderEmail;
        this.senderName = senderName;

        // Log mascherato per verificare che la chiave sia caricata (NON stampare la chiave completa)
        if (apiKey == null || apiKey.isBlank()) {
            this.enabled = false;
            log.warn("Brevo API key: MISSING or empty (check BREVO_API_KEY env variable for the running process)");
            // build a client without the api-key header so we don't send an empty header
            HttpClient httpClient = HttpClient.create()
                .responseTimeout(Duration.ofSeconds(10));
            this.webClient = webClientBuilder
                .baseUrl("https://api.brevo.com/v3")
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
        } else {
            this.enabled = true;
            String masked = apiKey.length() > 10 ? apiKey.substring(0, 6) + "..." + apiKey.substring(apiKey.length() - 4) : "MASKED";
            log.info("Brevo API key present: {}", masked);

            HttpClient httpClient = HttpClient.create()
                .responseTimeout(Duration.ofSeconds(10));
            this.webClient = webClientBuilder
                .baseUrl("https://api.brevo.com/v3")
                .defaultHeader("api-key", apiKey)
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
        }
    }

    // invia usando templateId (if presente) o raw textContent
    public String sendEmail(String toEmail, String toName, String subject, String textContent, Integer templateId, Map<String,Object> params) {
        if (!enabled) {
            throw new IllegalStateException("Brevo API key not configured for this application instance");
        }
        Map<String, Object> payload;
        if (templateId != null) {
            payload = Map.of(
                "templateId", templateId,
                "to", List.of(Map.of("email", toEmail, "name", toName == null ? "" : toName)),
                "params", params == null ? Map.of() : params
            );
        } else {
            payload = Map.of(
                "sender", Map.of("email", senderEmail, "name", senderName),
                "to", List.of(Map.of("email", toEmail, "name", toName == null ? "" : toName)),
                "subject", subject,
                "textContent", textContent
            );
        }

        return webClient.post()
                .uri("/smtp/email")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(payload)
                .retrieve()
                .onStatus(status -> status.isError(), resp ->
                    resp.bodyToMono(String.class)
                        .defaultIfEmpty("")
                        .flatMap(body -> Mono.error(new RuntimeException("Brevo API returned " + resp.statusCode() + " - " + body)))
                )
                .bodyToMono(String.class)
                .block();
    }
}