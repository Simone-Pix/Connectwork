package com.immobiliaris.backend.controller;

import com.immobiliaris.backend.model.Immobili;
import com.immobiliaris.backend.model.Valutazioni;
import com.immobiliaris.backend.repo.ImmobiliRepository;
import com.immobiliaris.backend.repo.ValutazioniRepository;
import com.immobiliaris.backend.service.ValutazioniServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller REST per le valutazioni. Permette di creare una valutazione
 * per uno specifico immobile e di elencare/recuperare valutazioni.
 */
@RestController
@RequestMapping("/api/valutazioni")
public class ValutazioniMVC {

    private final ValutazioniRepository valutazioniRepository;
    private final ImmobiliRepository immobiliRepository;
    
    @Autowired
    private ValutazioniServiceImpl valutazioniService;

    public ValutazioniMVC(ValutazioniRepository valutazioniRepository, ImmobiliRepository immobiliRepository) {
        this.valutazioniRepository = valutazioniRepository;
        this.immobiliRepository = immobiliRepository;
    }

    /**
     * Restituisce tutte le valutazioni.
     */
    @GetMapping
    public List<Valutazioni> listAll() {
        return valutazioniRepository.findAll();
    }

    /**
     * Recupera una valutazione per id.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Valutazioni> getById(@PathVariable Long id) {
        Optional<Valutazioni> v = valutazioniRepository.findById(id);
        return v.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Elenca le valutazioni di un immobile specifico.
     */
    @GetMapping("/immobile/{immobileId}")
    public ResponseEntity<List<Valutazioni>> listByImmobile(@PathVariable Long immobileId) {
        if (!immobiliRepository.existsById(immobileId)) return ResponseEntity.notFound().build();
        List<Valutazioni> list = valutazioniRepository.findByImmobileId(immobileId);
        return ResponseEntity.ok(list);
    }

    /**
     * Crea una valutazione per l'immobile indicato.
     * Il body deve contenere i campi di Valutazioni (valori stimati, prezzo mq, note).
     */
    @PostMapping("/immobile/{immobileId}")
    public ResponseEntity<?> createForImmobile(@PathVariable Long immobileId, @RequestBody Valutazioni payload) {
        Optional<Immobili> imOpt = immobiliRepository.findById(immobileId);
        if (imOpt.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("immobile not found");
        // Associa l'immobile e salva
        payload.setImmobile(imOpt.get());
        Valutazioni saved = valutazioniRepository.save(payload);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * Aggiorna i campi di una valutazione esistente (min/max/prezzo/note).
     * Non cambia l'associazione con l'immobile per sicurezza.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Valutazioni payload) {
        Optional<Valutazioni> existing = valutazioniRepository.findById(id);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();
        Valutazioni v = existing.get();
        // Aggiorniamo solo i campi ammessi
        if (payload.getValoreStimatoMin() != null) v.setValoreStimatoMin(payload.getValoreStimatoMin());
        if (payload.getValoreStimatoMax() != null) v.setValoreStimatoMax(payload.getValoreStimatoMax());
        if (payload.getPrezzoMq() != null) v.setPrezzoMq(payload.getPrezzoMq());
        if (payload.getNote() != null) v.setNote(payload.getNote());
        Valutazioni saved = valutazioniRepository.save(v);
        return ResponseEntity.ok(saved);
    }

    /**
     * Elimina una valutazione per id. Restituisce 404 se non trovata, 204 se eliminata.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!valutazioniRepository.existsById(id)) return ResponseEntity.notFound().build();
        valutazioniRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * POST /api/valutazioni/genera-automatica/{immobileId}
     * Genera una valutazione automatica per un immobile basandosi sul CAP e sui modificatori.
     * 
     * @param immobileId ID dell'immobile da valutare
     * @return Valutazione generata
     */
    @PostMapping("/genera-automatica/{immobileId}")
    public ResponseEntity<?> generaValutazioneAutomatica(@PathVariable Long immobileId) {
        try {
            Valutazioni valutazione = valutazioniService.generaValutazioneAutomatica(immobileId);
            return ResponseEntity.status(HttpStatus.CREATED).body(valutazione);
        } catch (RuntimeException e) {
            // Immobile non trovato o CAP non mappato
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Errore durante la generazione della valutazione"));
        }
    }

    /**
     * Classe di supporto per le risposte di errore
     */
    private static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }


    /**
     * Restituisce le valutazioni associate a una richiesta specifica.
     */
    @GetMapping("/richiesta/{richiestaId}")
    public ResponseEntity<?> listByRichiesta(@PathVariable Long richiestaId) {

        List<Valutazioni> list = valutazioniRepository.findAllByRichiestaId(richiestaId);

        if (list == null || list.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Nessuna valutazione trovata per la richiesta " + richiestaId);
        }

        return ResponseEntity.ok(list);
    }
}
