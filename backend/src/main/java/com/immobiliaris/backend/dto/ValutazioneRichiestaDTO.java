package com.immobiliaris.backend.dto;

import java.math.BigDecimal;

/**
 * DTO per la risposta di valutazione automatica di una richiesta.
 * Contiene il range di valore stimato, il prezzo al mq e le note.
 */
public class ValutazioneRichiestaDTO {

    private BigDecimal valoreStimatoMin;
    private BigDecimal valoreStimatoMax;
    private BigDecimal prezzoMq;
    private String note;
    private String zonaNome;
    private String cap;

    public ValutazioneRichiestaDTO() {
    }

    public ValutazioneRichiestaDTO(BigDecimal valoreStimatoMin, BigDecimal valoreStimatoMax, 
                                   BigDecimal prezzoMq, String note, String zonaNome, String cap) {
        this.valoreStimatoMin = valoreStimatoMin;
        this.valoreStimatoMax = valoreStimatoMax;
        this.prezzoMq = prezzoMq;
        this.note = note;
        this.zonaNome = zonaNome;
        this.cap = cap;
    }

    // Getters e Setters
    public BigDecimal getValoreStimatoMin() {
        return valoreStimatoMin;
    }

    public void setValoreStimatoMin(BigDecimal valoreStimatoMin) {
        this.valoreStimatoMin = valoreStimatoMin;
    }

    public BigDecimal getValoreStimatoMax() {
        return valoreStimatoMax;
    }

    public void setValoreStimatoMax(BigDecimal valoreStimatoMax) {
        this.valoreStimatoMax = valoreStimatoMax;
    }

    public BigDecimal getPrezzoMq() {
        return prezzoMq;
    }

    public void setPrezzoMq(BigDecimal prezzoMq) {
        this.prezzoMq = prezzoMq;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getZonaNome() {
        return zonaNome;
    }

    public void setZonaNome(String zonaNome) {
        this.zonaNome = zonaNome;
    }

    public String getCap() {
        return cap;
    }

    public void setCap(String cap) {
        this.cap = cap;
    }
}
