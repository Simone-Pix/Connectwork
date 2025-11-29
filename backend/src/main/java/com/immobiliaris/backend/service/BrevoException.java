package com.immobiliaris.backend.service;

public class BrevoException extends RuntimeException {
    private final int status;
    private final String body;

    public BrevoException(int status, String body) {
        super("Brevo API returned " + status + " - " + body);
        this.status = status;
        this.body = body;
    }

    public int getStatus() {
        return status;
    }

    public String getBody() {
        return body;
    }
}
