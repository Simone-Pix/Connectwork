package com.immobiliaris.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "immobili")
public class Immobili{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "proprietario_id", nullable = false)
    ///da cambiare
	private Long proprietarioId;

	@Convert(converter = Converters.TipoImmobileConverter.class)
	@Column(name = "tipo_immobile", length = 50, nullable = false)
	private Enums.TipoImmobile tipoImmobile;

	@Column(name = "indirizzo", length = 255, nullable = false)
	private String indirizzo;

	@Column(name = "citta", length = 100, nullable = false)
	private String citta;

	@Column(name = "provincia", length = 50, nullable = false)
	private String provincia;

	@Column(name = "cap", length = 10, nullable = false)
	private String cap;

	@Column(name = "superficie", precision = 10, scale = 2, nullable = false)
	private BigDecimal superficie;

	@Column(name = "num_locali")
	private Integer numLocali;

	@Column(name = "num_bagni")
	private Integer numBagni;

	@Column(name = "piano")
	private Integer piano;

	@Column(name = "anno_costruzione")
	private Integer annoCostruzione;

	@Convert(converter = Converters.StatoConservazioneConverter.class)
	@Column(name = "stato_conservazione", length = 50)
	private Enums.StatoConservazione statoConservazione;

	@Convert(converter = Converters.ClasseEnergeticaConverter.class)
	@Column(name = "classe_energetica", length = 2)
	private Enums.ClasseEnergetica classeEnergetica;

	@Column(name = "prezzo_richiesto", precision = 12, scale = 2)
	private BigDecimal prezzoRichiesto;

	@Lob
	@Column(name = "descrizione")
	private String descrizione;

	@Column(name = "disponibile_esclusiva")
	private Boolean disponibileEsclusiva = Boolean.FALSE;

	@Convert(converter = Converters.StatoImmobileConverter.class)
	@Column(name = "stato", length = 20)
	private Enums.StatoImmobile stato = Enums.StatoImmobile.BOZZA;

	@Column(name = "data_inserimento")
	private LocalDateTime dataInserimento = LocalDateTime.now();

	// Constructors
	public Immobili() {
	}

	// Getters and setters
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

	public Enums.TipoImmobile getTipoImmobile() {
		return tipoImmobile;
	}

	public void setTipoImmobile(Enums.TipoImmobile tipoImmobile) {
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

	public Enums.StatoConservazione getStatoConservazione() {
		return statoConservazione;
	}

	public void setStatoConservazione(Enums.StatoConservazione statoConservazione) {
		this.statoConservazione = statoConservazione;
	}

	public Enums.ClasseEnergetica getClasseEnergetica() {
		return classeEnergetica;
	}

	public void setClasseEnergetica(Enums.ClasseEnergetica classeEnergetica) {
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

	public Enums.StatoImmobile getStato() {
		return stato;
	}

	public void setStato(Enums.StatoImmobile stato) {
		this.stato = stato;
	}

	public LocalDateTime getDataInserimento() {
		return dataInserimento;
	}

	public void setDataInserimento(LocalDateTime dataInserimento) {
		this.dataInserimento = dataInserimento;
	}

	@Override
	public String toString() {
		return "Immobili{" +
				"id=" + id +
				", proprietarioId=" + proprietarioId +
				", tipoImmobile='" + tipoImmobile + '\'' +
				", indirizzo='" + indirizzo + '\'' +
				", citta='" + citta + '\'' +
				", provincia='" + provincia + '\'' +
				", cap='" + cap + '\'' +
				'}';
	}
}
