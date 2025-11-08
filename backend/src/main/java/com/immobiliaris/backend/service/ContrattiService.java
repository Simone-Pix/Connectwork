package com.immobiliaris.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.immobiliaris.backend.model.Contratti;
import com.immobiliaris.backend.repo.ContrattiRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ContrattiService {

    @Autowired
    private ContrattiRepository contrattiRepository;

    // Recupera tutti i contratti
    public List<Contratti> getAllContratti() {
        return contrattiRepository.findAll();
    }

    // Recupera un contratto per ID
    public Optional<Contratti> getContrattoById(Long id) {
        return contrattiRepository.findById(id);
    }

    // Recupera i contratti per ID immobile
    public List<Contratti> getContrattiByImmobile(Long immobileId) {
        return contrattiRepository.findByImmobileId(immobileId);
    }

    // Recupera i contratti per proprietario
    public List<Contratti> getContrattiByProprietario(Long proprietarioId) {
        return contrattiRepository.findByProprietarioId(proprietarioId);
    }

    // Crea un nuovo contratto
    public Contratti creaContratto(Contratti contratto) {
        // Esempio di logica di controllo: un solo contratto “esclusiva” per immobile
        if ("esclusiva".equalsIgnoreCase(contratto.getTipo())) {
            List<Contratti> contrattiEsistenti = contrattiRepository.findByImmobileId(contratto.getImmobile().getId());
            boolean esisteEsclusiva = contrattiEsistenti.stream()
                    .anyMatch(c -> "esclusiva".equalsIgnoreCase(c.getTipo()) && !"rifiutato".equalsIgnoreCase(c.getStato()));
            if (esisteEsclusiva) {
                throw new IllegalStateException("Esiste già un contratto di tipo esclusiva per questo immobile.");
            }
        }
        return contrattiRepository.save(contratto);
    }

    // Aggiorna un contratto esistente
    public Contratti aggiornaContratto(Long id, Contratti contrattoAggiornato) {
        return contrattiRepository.findById(id).map(contratto -> {
            contratto.setTipo(contrattoAggiornato.getTipo());
            contratto.setDurataMesi(contrattoAggiornato.getDurataMesi());
            contratto.setCommissione(contrattoAggiornato.getCommissione());
            contratto.setStato(contrattoAggiornato.getStato());
            return contrattiRepository.save(contratto);
        }).orElseThrow(() -> new IllegalArgumentException("Contratto non trovato con ID: " + id));
    }

    // Elimina un contratto
    public void eliminaContratto(Long id) {
        contrattiRepository.deleteById(id);
    }
}

