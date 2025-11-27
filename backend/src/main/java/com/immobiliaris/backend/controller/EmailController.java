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
            String response = brevoEmailService.sendEmail(
                    req.to(), req.name(), req.subject(), req.text(), req.templateId(), params
            );
            return ResponseEntity.ok(Map.of("status", "sent", "brevoResponse", response));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}