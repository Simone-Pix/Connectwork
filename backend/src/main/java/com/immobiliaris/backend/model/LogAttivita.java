package com.immobiliaris.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "log_attivita")
public class LogAttivita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Riferimento all'utente che ha compiuto l'azione
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users utente;

    // Riferimento all'immobile su cui è stata fatta l'azione
    @ManyToOne
    @JoinColumn(name = "immobile_id")
    private Immobili immobile;

    // Descrizione dell'azione svolta
    @Column(length = 255)
    private String azione;

    // Data e ora dell'azione
    @Column(name = "data_azione")
    private LocalDateTime dataAzione = LocalDateTime.now();

    // === COSTRUTTORI ===
    public LogAttivita() {}

    public LogAttivita(Users utente, Immobili immobile, String azione) {
        this.utente = utente;
        this.immobile = immobile;
        this.azione = azione;
        this.dataAzione = LocalDateTime.now();
    }

    // === GETTER E SETTER ===
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Users getUtente() { return utente; }
    public void setUtente(Users utente) { this.utente = utente; }

    public Immobili getImmobile() { return immobile; }
    public void setImmobile(Immobili immobile) { this.immobile = immobile; }

    public String getAzione() { return azione; }
    public void setAzione(String azione) { this.azione = azione; }

    public LocalDateTime getDataAzione() { return dataAzione; }
    public void setDataAzione(LocalDateTime dataAzione) { this.dataAzione = dataAzione; }
}