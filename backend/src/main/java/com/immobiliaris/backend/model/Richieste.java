package com.immobiliaris.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Entity che mappa la tabella `richieste`.
 * Rappresenta le richieste di contatto/valutazione immobili da parte degli utenti.
 */
@Entity
@Table(name = "richieste")
public class Richieste {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 100)
    private String cognome;

    @Column(nullable = false, length = 255)
    private String email;

    @Column(nullable = false, length = 50)
    private String telefono;

    @Column(nullable = false, length = 255)
    private String indirizzo;

    @Column(name = "tipo_operazione", nullable = false, length = 100)
    private String tipoOperazione;

    @Column(nullable = false, length = 100)
    private String tempistica;

    @Column(nullable = false)
    private Integer piano;

    @Column(nullable = false)
    private Integer stanze;

    @Column(nullable = false)
    private Integer bagni;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal superficie;

    @Column(name = "optional_info", length = 1000)
    private String optionalInfo;

    @CreationTimestamp
    @Column(name = "data_creazione", updatable = false)
    private LocalDateTime dataCreazione;

    // Costruttori
    public Richieste() {
    }

    public Richieste(String nome, String cognome, String email, String telefono, 
                    String indirizzo, String tipoOperazione, String tempistica,
                    Integer piano, Integer stanze, Integer bagni, BigDecimal superficie,
                    String optionalInfo) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.telefono = telefono;
        this.indirizzo = indirizzo;
        this.tipoOperazione = tipoOperazione;
        this.tempistica = tempistica;
        this.piano = piano;
        this.stanze = stanze;
        this.bagni = bagni;
        this.superficie = superficie;
        this.optionalInfo = optionalInfo;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getIndirizzo() {
        return indirizzo;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    public String getTipoOperazione() {
        return tipoOperazione;
    }

    public void setTipoOperazione(String tipoOperazione) {
        this.tipoOperazione = tipoOperazione;
    }

    public String getTempistica() {
        return tempistica;
    }

    public void setTempistica(String tempistica) {
        this.tempistica = tempistica;
    }

    public Integer getPiano() {
        return piano;
    }

    public void setPiano(Integer piano) {
        this.piano = piano;
    }

    public Integer getStanze() {
        return stanze;
    }

    public void setStanze(Integer stanze) {
        this.stanze = stanze;
    }

    public Integer getBagni() {
        return bagni;
    }

    public void setBagni(Integer bagni) {
        this.bagni = bagni;
    }

    public BigDecimal getSuperficie() {
        return superficie;
    }

    public void setSuperficie(BigDecimal superficie) {
        this.superficie = superficie;
    }

    public String getOptionalInfo() {
        return optionalInfo;
    }

    public void setOptionalInfo(String optionalInfo) {
        this.optionalInfo = optionalInfo;
    }

    public LocalDateTime getDataCreazione() {
        return dataCreazione;
    }

    public void setDataCreazione(LocalDateTime dataCreazione) {
        this.dataCreazione = dataCreazione;
    }

    @Override
    public String toString() {
        return "Richieste{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", cognome='" + cognome + '\'' +
                ", email='" + email + '\'' +
                ", tipoOperazione='" + tipoOperazione + '\'' +
                ", tempistica='" + tempistica + '\'' +
                '}';
    }
}