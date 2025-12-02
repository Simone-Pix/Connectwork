package com.immobiliaris.backend.controller;

import com.immobiliaris.backend.service.BrevoEmailService;
import com.immobiliaris.backend.service.BrevoException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/brevo")
public class BrevoController {

    private final BrevoEmailService brevoEmailService;

    // Legge l'ID della lista dal file application.properties
    // Se non lo trova, usa '2' come default (assicurati di cambiarlo)
    @Value("${brevo.newsletter.list-id:2}")
    private Integer newsletterListId;

    public BrevoController(BrevoEmailService brevoEmailService) {
        this.brevoEmailService = brevoEmailService;
    }

    @GetMapping("/status")
    public ResponseEntity<?> status() {
        try {
            boolean enabled = brevoEmailService.isEnabled();
            boolean contactsOk = brevoEmailService.pingContacts();
            return ResponseEntity.ok(Map.of("ok", true, "brevoEnabled", enabled, "contactsApiOk", contactsOk));
        } catch (Exception e) {
            if (e instanceof BrevoException be) {
                return ResponseEntity.status(502).body(Map.of("ok", false, "brevoEnabled", false, "brevoStatus", be.getStatus(), "brevoBody", be.getBody()));
            }
            return ResponseEntity.status(500).body(Map.of("ok", false, "error", e.getMessage()));
        }
    }

    // --- NUOVO ENDPOINT PER LA NEWSLETTER ---
    @PostMapping("/newsletter")
    public ResponseEntity<?> subscribeToNewsletter(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");

        if (email == null || email.isBlank() || !email.contains("@")) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Email non valida"));
        }

        try {
            // Chiama il service per aggiungere/aggiornare il contatto su Brevo
            // Non passiamo attributi (nome/cognome) perché nel footer chiediamo solo la mail
            // Passiamo l'ID della lista per iscriverlo
            brevoEmailService.upsertContact(email, Collections.emptyMap(), List.of(newsletterListId));

            return ResponseEntity.ok(Map.of("success", true, "message", "Iscrizione avvenuta con successo"));
        } catch (Exception e) {
            // Gestione errori Brevo
            if (e instanceof BrevoException be) {
                return ResponseEntity.status(502).body(Map.of("success", false, "message", "Errore Brevo", "details", be.getBody()));
            }
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Errore interno del server"));
        }
    }
}