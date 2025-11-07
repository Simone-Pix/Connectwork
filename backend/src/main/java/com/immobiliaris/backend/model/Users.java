package com.immobiliaris.backend.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

/**
 * Entity che mappa la tabella `users`.
 */
@Entity
@Table(name = "users")
public class Users {

    //private static final long serialVersionUID = 1L;---------------??????

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 100)
    private String cognome;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 20)
    private String telefono;

    @Column(length = 20)
    private String ruolo = "utente";

    @CreationTimestamp
    @Column(name = "data_registrazione", updatable = false)
    private LocalDateTime dataRegistrazione;

    @Column(nullable = false)
    private boolean verificato = false;

    public Users() {
    }

    public Users(Long id, String nome, String cognome, String email, String password, String telefono, String ruolo, LocalDateTime dataRegistrazione, boolean verificato) {
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.password = password;
        this.telefono = telefono;
        this.ruolo = ruolo;
        this.dataRegistrazione = dataRegistrazione;
        this.verificato = verificato;
    }

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getRuolo() {
        return ruolo;
    }

    public void setRuolo(String ruolo) {
        this.ruolo = ruolo;
    }

    public LocalDateTime getDataRegistrazione() {
        return dataRegistrazione;
    }

    public void setDataRegistrazione(LocalDateTime dataRegistrazione) {
        this.dataRegistrazione = dataRegistrazione;
    }

    public boolean isVerificato() {
        return verificato;
    }

    public void setVerificato(boolean verificato) {
        this.verificato = verificato;
    }

}

