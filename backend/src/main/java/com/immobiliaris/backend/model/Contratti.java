package com.immobiliaris.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "contratti")
public class Contratti {
//////
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_contract")
    private Long idContract;

    @ManyToOne
    @JoinColumn(name = "immobile_id", nullable = true)
    private Immobili immobile;

    @ManyToOne
    @JoinColumn(name = "proprietario_id", nullable = false)
    private Users proprietario;

    @Column(length = 20, nullable = false)
    private String tipo = "esclusiva";  // valori ammessi: esclusiva, mandato

    @Column(name = "durata_mesi")
    private Integer durataMesi;

    @Column(precision = 5, scale = 2)
    private BigDecimal commissione;

    @Column(length = 20, nullable = false)
    private String stato = "proposta";  // valori ammessi: proposta, accettato, rifiutato

    @Column(name = "data_proposta")
    private LocalDateTime dataProposta = LocalDateTime.now();

    // === COSTRUTTORI ===
    public Contratti() {}

    public Contratti(Immobili immobile, Users proprietario, String tipo, Integer durataMesi, BigDecimal commissione, String stato) {
        this.immobile = immobile;
        this.proprietario = proprietario;
        this.tipo = tipo;
        this.durataMesi = durataMesi;
        this.commissione = commissione;
        this.stato = stato;
    }

    // === GETTER E SETTER ===
    public Long getIdContract() { return idContract; }
    public void setIdContract(Long idContract) { this.idContract = idContract; }

    public Immobili getImmobile() { return immobile; }
    public void setImmobile(Immobili immobile) { this.immobile = immobile; }

    public Users
     getProprietario() { return proprietario; }
    public void setProprietario(Users proprietario) { this.proprietario = proprietario; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public Integer getDurataMesi() { return durataMesi; }
    public void setDurataMesi(Integer durataMesi) { this.durataMesi = durataMesi; }

    public BigDecimal getCommissione() { return commissione; }
    public void setCommissione(BigDecimal commissione) { this.commissione = commissione; }

    public String getStato() { return stato; }
    public void setStato(String stato) { this.stato = stato; }

    public LocalDateTime getDataProposta() { return dataProposta; }
    public void setDataProposta(LocalDateTime dataProposta) { this.dataProposta = dataProposta; }
}