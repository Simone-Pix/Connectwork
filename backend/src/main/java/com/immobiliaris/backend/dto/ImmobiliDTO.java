package com.immobiliaris.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO per la LETTURA (GET) degli immobili.
 * 
 * Motivo: Questo DTO viene usato per restituire dati al frontend.
 * Include campi come 'id', 'dataInserimento' e 'proprietarioNome' che:
 * - Sono generati automaticamente dal sistema (id, dataInserimento)
 * - Sono calcolati/recuperati dal backend (proprietarioNome)
 * - NON devono essere inviati dall'utente durante la creazione
 * 
 * Separare READ e WRITE garantisce:
 * - Maggiore sicurezza (l'utente non può modificare id o date)
 * - Codice più chiaro e manutenibile
 * - Validazioni specifiche per ogni operazione
 */
public class ImmobiliDTO {
    
    private Long id;
    private Long proprietarioId;
    private String proprietarioNome; // Composto: nome + cognome del proprietario
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
    private LocalDateTime dataInserimento;
    private List<String> features;
    
    // Costruttori
    public ImmobiliDTO() {}
    
    // Getter e Setter
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getProprietarioId() {
        return proprietarioId;
    }
    
    public void setProprietarioId(Long proprietarioId) {
        this.proprietarioId = proprietarioId;
    }
    
    public String getProprietarioNome() {
        return proprietarioNome;
    }
    
    public void setProprietarioNome(String proprietarioNome) {
        this.proprietarioNome = proprietarioNome;
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
    
    public LocalDateTime getDataInserimento() {
        return dataInserimento;
    }
    
    public void setDataInserimento(LocalDateTime dataInserimento) {
        this.dataInserimento = dataInserimento;
    }
    
    public List<String> getFeatures() {
        return features;
    }
    
    public void setFeatures(List<String> features) {
        this.features = features;
    }
}