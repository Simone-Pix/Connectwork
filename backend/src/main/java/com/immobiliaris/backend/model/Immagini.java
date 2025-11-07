package com.immobiliaris.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "immagini")
public class Immagini {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "immobile_id", nullable = false)
    private Immobili immobile;

    @Column(length = 500, nullable = false)
    private String url;

    @Column(length = 50, nullable = false)
    private String tipo = "foto";  // valori ammessi: foto, planimetria, video, 360

    // === COSTRUTTORI ===
    public Immagini() {}

    public Immagini(Immobili immobile, String url, String tipo) {
        this.immobile = immobile;
        this.url = url;
        this.tipo = tipo;
    }

    // === GETTER E SETTER ===
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Immobili getImmobile() { return immobile; }
    public void setImmobile(Immobili immobile) { this.immobile = immobile; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
}