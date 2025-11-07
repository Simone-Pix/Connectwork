package com.immobiliaris.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "immobile_features")
public class ImmobiliFeatures {
//////
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "immobile_id", nullable = false)
    private Immobili immobile;

    @Column(name = "feature_tipo", length = 50, nullable = false)
    private String featureTipo;

    

    // === GETTER E SETTER ===
    public Long getId() { return id; }
    public ImmobiliFeatures(Long id, Immobili immobile, String featureTipo) {
        this.id = id;
        this.immobile = immobile;
        this.featureTipo = featureTipo;
    }
    public void setId(Long id) { this.id = id; }

    public Immobili getImmobile() { return immobile; }
    public void setImmobile(Immobili immobile) { this.immobile = immobile; }

    public String getFeatureTipo() { return featureTipo; }
    public void setFeatureTipo(String featureTipo) { this.featureTipo = featureTipo; }
}