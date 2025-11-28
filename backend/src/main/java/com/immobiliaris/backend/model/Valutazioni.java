package com.immobiliaris.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "valutazioni")
public class Valutazioni {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relazione opzionale con immobile (NULL quando la valutazione deriva da una richiesta)
    @ManyToOne
    @JoinColumn(name = "immobile_id", nullable = true)
    private Immobili immobile;

    @Column(name = "valore_stimato_min", precision = 12, scale = 2)
    private BigDecimal valoreStimatoMin;

    @Column(name = "valore_stimato_max", precision = 12, scale = 2)
    private BigDecimal valoreStimatoMax;

    @Column(name = "prezzo_mq", precision = 8, scale = 2)
    private BigDecimal prezzoMq;

    @Lob
    private String note;

    @Column(name = "data_valutazione")
    private LocalDateTime dataValutazione = LocalDateTime.now();

    @Column(name = "richiesta_id")
    private Long richiestaId;

    public Valutazioni() {}

    public Valutazioni(Long richiestaId) {
        this.richiestaId = richiestaId;
    }

    public Valutazioni(Immobili immobile, BigDecimal valoreStimatoMin, BigDecimal valoreStimatoMax,
                       BigDecimal prezzoMq, String note) {
        this.immobile = immobile;
        this.valoreStimatoMin = valoreStimatoMin;
        this.valoreStimatoMax = valoreStimatoMax;
        this.prezzoMq = prezzoMq;
        this.note = note;
        this.dataValutazione = LocalDateTime.now();
    }

    // Getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Immobili getImmobile() { return immobile; }
    public void setImmobile(Immobili immobile) { this.immobile = immobile; }

    public BigDecimal getValoreStimatoMin() { return valoreStimatoMin; }
    public void setValoreStimatoMin(BigDecimal valoreStimatoMin) { this.valoreStimatoMin = valoreStimatoMin; }

    public BigDecimal getValoreStimatoMax() { return valoreStimatoMax; }
    public void setValoreStimatoMax(BigDecimal valoreStimatoMax) { this.valoreStimatoMax = valoreStimatoMax; }

    public BigDecimal getPrezzoMq() { return prezzoMq; }
    public void setPrezzoMq(BigDecimal prezzoMq) { this.prezzoMq = prezzoMq; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public LocalDateTime getDataValutazione() { return dataValutazione; }
    public void setDataValutazione(LocalDateTime dataValutazione) { this.dataValutazione = dataValutazione; }

    public Long getRichiestaId() { return richiestaId; }
    public void setRichiestaId(Long richiestaId) { this.richiestaId = richiestaId; }
}
