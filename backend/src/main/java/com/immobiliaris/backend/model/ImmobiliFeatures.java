package com.immobiliaris.model;

import jakarta.persistence.*;

@Entity
@Table(name = "immobile_features")
public class ImmobiliFeatures {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "immobile_id", nullable = false)
    private Immobile immobile;

    @Column(name = "feature_tipo", length = 50, nullable = false)
    private String featureTipo;

    // === COSTRUTTORI ===
    public ImmobileFeature() {}

    public ImmobileFeature(Immobile immobile, String featureTipo) {
        this.immobile = immobile;
        this.featureTipo = featureTipo;
    }

    // === GETTER E SETTER ===
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Immobile getImmobile() { return immobile; }
    public void setImmobile(Immobile immobile) { this.immobile = immobile; }

    public String getFeatureTipo() { return featureTipo; }
    public void setFeatureTipo(String featureTipo) { this.featureTipo = featureTipo; }
}