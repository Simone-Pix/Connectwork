package com.immobiliaris.backend.dto;

import java.math.BigDecimal;
import java.util.List;

public class ImmobileCreateDTO {
    
    private Long proprietarioId;
    private String tipoImmobile;
    private String indirizzo;
    private String citta;
    private String provincia;
    private String cap;
    private BigDecimal superficie;
    private Integer numLocali;
    private Integer numBagni;
    private Integer piano;
    private Integer annoCostruzione;
    private String statoConservazione;
    private String classeEnergetica;
    private BigDecimal prezzoRichiesto;
    private String descrizione;
    private Boolean disponibileEsclusiva;
    private String stato;
    private List<String> features;
    
    // Costruttori
    public ImmobileCreateDTO() {}
    
    // Getter e Setter (tutti i campi sopra)
    public Long getProprietarioId() {
        return proprietarioId;
    }
    
    public void setProprietarioId(Long proprietarioId) {
        this.proprietarioId = proprietarioId;
    }
    
    public String getTipoImmobile() {
        return tipoImmobile;
    }
    
    public void setTipoImmobile(String tipoImmobile) {
        this.tipoImmobile = tipoImmobile;
    }
    
    public String getIndirizzo() {
        return indirizzo;
    }
    
    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }
    
    public String getCitta() {
        return citta;
    }
    
    public void setCitta(String citta) {
        this.citta = citta;
    }
    
    public String getProvincia() {
        return provincia;
    }
    
    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }
    
    public String getCap() {
        return cap;
    }
    
    public void setCap(String cap) {
        this.cap = cap;
    }
    
    public BigDecimal getSuperficie() {
        return superficie;
    }
    
    public void setSuperficie(BigDecimal superficie) {
        this.superficie = superficie;
    }
    
    public Integer getNumLocali() {
        return numLocali;
    }
    
    public void setNumLocali(Integer numLocali) {
        this.numLocali = numLocali;
    }
    
    public Integer getNumBagni() {
        return numBagni;
    }
    
    public void setNumBagni(Integer numBagni) {
        this.numBagni = numBagni;
    }
    
    public Integer getPiano() {
        return piano;
    }
    
    public void setPiano(Integer piano) {
        this.piano = piano;
    }
    
    public Integer getAnnoCostruzione() {
        return annoCostruzione;
    }
    
    public void setAnnoCostruzione(Integer annoCostruzione) {
        this.annoCostruzione = annoCostruzione;
    }
    
    public String getStatoConservazione() {
        return statoConservazione;
    }
    
    public void setStatoConservazione(String statoConservazione) {
        this.statoConservazione = statoConservazione;
    }
    
    public String getClasseEnergetica() {
        return classeEnergetica;
    }
    
    public void setClasseEnergetica(String classeEnergetica) {
        this.classeEnergetica = classeEnergetica;
    }
    
    public BigDecimal getPrezzoRichiesto() {
        return prezzoRichiesto;
    }
    
    public void setPrezzoRichiesto(BigDecimal prezzoRichiesto) {
        this.prezzoRichiesto = prezzoRichiesto;
    }
    
    public String getDescrizione() {
        return descrizione;
    }
    
    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }
    
    public Boolean getDisponibileEsclusiva() {
        return disponibileEsclusiva;
    }
    
    public void setDisponibileEsclusiva(Boolean disponibileEsclusiva) {
        this.disponibileEsclusiva = disponibileEsclusiva;
    }
    
    public String getStato() {
        return stato;
    }
    
    public void setStato(String stato) {
        this.stato = stato;
    }
    
    public List<String> getFeatures() {
        return features;
    }
    
    public void setFeatures(List<String> features) {
        this.features = features;
    }
}