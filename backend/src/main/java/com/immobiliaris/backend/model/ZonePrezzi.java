package com.immobiliaris.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * Entità per la gestione dei prezzi medi al mq per zona/CAP.
 * Ogni CAP del Piemonte ha un prezzo base al metro quadro.
 */
@Entity
@Table(name = "zone_prezzi")
public class ZonePrezzi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cap", length = 10, nullable = false, unique = true)
    private String cap;

    @Column(name = "citta", length = 100, nullable = false)
    private String citta;

    @Column(name = "zona_nome", length = 255)
    private String zonaNome;

    @Column(name = "prezzo_mq_medio", precision = 10, scale = 2, nullable = false)
    private BigDecimal prezzoMqMedio;

    // Costruttori
    public ZonePrezzi() {}

    public ZonePrezzi(String cap, String citta, String zonaNome, BigDecimal prezzoMqMedio) {
        this.cap = cap;
        this.citta = citta;
        this.zonaNome = zonaNome;
        this.prezzoMqMedio = prezzoMqMedio;
    }

    // Getter e Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCap() {
        return cap;
    }

    public void setCap(String cap) {
        this.cap = cap;
    }

    public String getCitta() {
        return citta;
    }

    public void setCitta(String citta) {
        this.citta = citta;
    }

    public String getZonaNome() {
        return zonaNome;
    }

    public void setZonaNome(String zonaNome) {
        this.zonaNome = zonaNome;
    }

    public BigDecimal getPrezzoMqMedio() {
        return prezzoMqMedio;
    }

    public void setPrezzoMqMedio(BigDecimal prezzoMqMedio) {
        this.prezzoMqMedio = prezzoMqMedio;
    }
}
