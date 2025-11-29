package com.immobiliaris.backend.controller;

import com.immobiliaris.backend.dto.EmailRequest;
import com.immobiliaris.backend.service.BrevoEmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

//EmailController — endpoint REST /api/email/send che riceve la richiesta e chiama il servizio.

@RestController
@RequestMapping("/api/email")
public class EmailController {

    private final BrevoEmailService brevoEmailService;

    public EmailController(BrevoEmailService brevoEmailService) {
        this.brevoEmailService = brevoEmailService;
    }

    @PostMapping("/send")
    public ResponseEntity<?> send(@RequestBody EmailRequest req) {
        try {
            @SuppressWarnings("unchecked")
            Map<String,Object> params = req.params() == null ? null : (Map<String,Object>) req.params();
            // If listIds provided, upsert the contact first so it exists in the target lists
            if (req.listIds() != null && !req.listIds().isEmpty()) {
                try {
                    Map<String,Object> attrs = Map.of("NAME", req.name() == null ? "" : req.name());
                    String upsertResp = brevoEmailService.upsertContact(req.to(), attrs, req.listIds());
                    // log or ignore the upsertResp if needed
                } catch (Exception e) {
                    // non-fatal: continue but report the upsert problem
                    return ResponseEntity.status(502).body(Map.of("error", "Failed to upsert contact in Brevo", "detail", e.getMessage()));
                }
            }

            String response = brevoEmailService.sendEmail(
                    req.to(), req.name(), req.subject(), req.text(), req.templateId(), params
            );
            return ResponseEntity.ok(Map.of("status", "sent", "brevoResponse", response));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}