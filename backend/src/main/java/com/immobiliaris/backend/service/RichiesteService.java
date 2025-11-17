package com.immobiliaris.backend.service;

import com.immobiliaris.backend.model.Richieste;
import com.immobiliaris.backend.repo.RichiesteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service per la gestione delle Richieste.
 * Contiene la logica di business per le operazioni CRUD.
 */
@Service
public class RichiesteService {

    @Autowired
    private RichiesteRepository richiesteRepository;

    /**
     * Recupera tutte le richieste.
     */
    public List<Richieste> getAllRichieste() {
        return richiesteRepository.findAll();
    }

    /**
     * Recupera una richiesta per ID.
     */
    public Optional<Richieste> getRichiestaById(Long id) {
        return richiesteRepository.findById(id);
    }

    /**
     * Crea una nuova richiesta.
     */
    @Transactional
    public Richieste createRichiesta(Richieste richiesta) {
        // Validazioni di business se necessarie
        if (richiesta.getEmail() == null || richiesta.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email è obbligatoria");
        }
        if (richiesta.getNome() == null || richiesta.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome è obbligatorio");
        }
        if (richiesta.getCognome() == null || richiesta.getCognome().isBlank()) {
            throw new IllegalArgumentException("Cognome è obbligatorio");
        }
        
        return richiesteRepository.save(richiesta);
    }

    /**
     * Aggiorna una richiesta esistente.
     */
    @Transactional
    public Richieste updateRichiesta(Long id, Richieste richiestaAggiornata) {
        Richieste richiesta = richiesteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Richiesta non trovata con id: " + id));
        
        // Aggiorna i campi
        richiesta.setNome(richiestaAggiornata.getNome());
        richiesta.setCognome(richiestaAggiornata.getCognome());
        richiesta.setEmail(richiestaAggiornata.getEmail());
        richiesta.setTelefono(richiestaAggiornata.getTelefono());
        richiesta.setIndirizzo(richiestaAggiornata.getIndirizzo());
        richiesta.setTipoOperazione(richiestaAggiornata.getTipoOperazione());
        richiesta.setTempistica(richiestaAggiornata.getTempistica());
        richiesta.setPiano(richiestaAggiornata.getPiano());
        richiesta.setStanze(richiestaAggiornata.getStanze());
        richiesta.setBagni(richiestaAggiornata.getBagni());
        richiesta.setSuperficie(richiestaAggiornata.getSuperficie());
        richiesta.setOptionalInfo(richiestaAggiornata.getOptionalInfo());
        
        return richiesteRepository.save(richiesta);
    }

    /**
     * Elimina una richiesta per ID.
     */
    @Transactional
    public void deleteRichiesta(Long id) {
        if (!richiesteRepository.existsById(id)) {
            throw new RuntimeException("Richiesta non trovata con id: " + id);
        }
        richiesteRepository.deleteById(id);
    }

    /**
     * Recupera richieste per email.
     */
    public List<Richieste> getRichiesteByEmail(String email) {
        return richiesteRepository.findByEmail(email);
    }

    /**
     * Recupera richieste per tipo di operazione.
     */
    public List<Richieste> getRichiesteByTipoOperazione(String tipoOperazione) {
        return richiesteRepository.findByTipoOperazione(tipoOperazione);
    }

    /**
     * Recupera richieste per tempistica.
     */
    public List<Richieste> getRichiesteByTempistica(String tempistica) {
        return richiesteRepository.findByTempistica(tempistica);
    }

    /**
     * Recupera richieste con almeno un numero di stanze specificato.
     */
    public List<Richieste> getRichiesteByStanzeMinime(Integer stanzeMinime) {
        return richiesteRepository.findByStanzeGreaterThanEqual(stanzeMinime);
    }

    /**
     * Recupera richieste per nome e cognome.
     */
    public List<Richieste> getRichiesteByNomeAndCognome(String nome, String cognome) {
        return richiesteRepository.findByNomeAndCognome(nome, cognome);
    }
}