package com.immobiliaris.backend.controller;

import com.immobiliaris.backend.service.BrevoEmailService;
import com.immobiliaris.backend.service.BrevoException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/brevo")
public class BrevoController {

    private final BrevoEmailService brevoEmailService;

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
}
