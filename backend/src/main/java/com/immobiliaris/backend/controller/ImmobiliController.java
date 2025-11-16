package com.immobiliaris.backend.controller;

import com.immobiliaris.backend.dto.ImmobileCreateDTO;
import com.immobiliaris.backend.dto.ImmobiliDTO;
import com.immobiliaris.backend.service.ImmobiliService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST per la gestione degli Immobili.
 * Espone gli endpoint API per le operazioni CRUD.
 */
@RestController
@RequestMapping("/api/immobili")
//@CrossOrigin(origins = "*") // Permette richieste da React (modifica con l'URL specifico in produzione)
public class ImmobiliController {

    @Autowired
    private ImmobiliService immobiliService;

    /**
     * GET /api/immobili
     * Recupera tutti gli immobili.
     * 
     * @return Lista di tutti gli immobili
     */
    @GetMapping
    public ResponseEntity<List<ImmobiliDTO>> getAllImmobili() {
        try {
            List<ImmobiliDTO> immobili = immobiliService.getAllImmobili();
            return ResponseEntity.ok(immobili);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /api/immobili/{id}
     * Recupera un immobile specifico per ID.
     * 
     * @param id ID dell'immobile
     * @return Dettagli dell'immobile
     */
    @GetMapping("/{id}")
    public ResponseEntity<ImmobiliDTO> getImmobileById(@PathVariable Long id) {
        try {
            ImmobiliDTO immobile = immobiliService.getImmobileById(id);
            return ResponseEntity.ok(immobile);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * POST /api/immobili
     * Crea un nuovo immobile.
     * 
     * @param createDTO Dati dell'immobile da creare
     * @return Immobile creato con status 201 (CREATED)
     */
    @PostMapping
    public ResponseEntity<ImmobiliDTO> createImmobile(@RequestBody ImmobileCreateDTO createDTO) {
        try {
            ImmobiliDTO nuovoImmobile = immobiliService.createImmobile(createDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuovoImmobile);
        } catch (RuntimeException e) {
            // Proprietario non trovato o altri errori di validazione
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * PUT /api/immobili/{id}
     * Aggiorna un immobile esistente.
     * 
     * @param id ID dell'immobile da aggiornare
     * @param createDTO Nuovi dati dell'immobile
     * @return Immobile aggiornato
     */
    @PutMapping("/{id}")
    public ResponseEntity<ImmobiliDTO> updateImmobile(@PathVariable Long id, @RequestBody ImmobileCreateDTO createDTO) {
        try {
            ImmobiliDTO immobileAggiornato = immobiliService.updateImmobile(id, createDTO);
            return ResponseEntity.ok(immobileAggiornato);
        } catch (RuntimeException e) {
            // Immobile o proprietario non trovato
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * DELETE /api/immobili/{id}
     * Elimina un immobile.
     * 
     * @param id ID dell'immobile da eliminare
     * @return Status 204 (NO_CONTENT) se eliminato con successo
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImmobile(@PathVariable Long id) {
        try {
            immobiliService.deleteImmobile(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (RuntimeException e) {
            // Immobile non trovato
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // ========== ENDPOINT DI RICERCA/FILTRO ==========

    /**
     * GET /api/immobili/proprietario/{proprietarioId}
     * Recupera tutti gli immobili di un proprietario specifico.
     * 
     * @param proprietarioId ID del proprietario
     * @return Lista degli immobili del proprietario
     */
    @GetMapping("/proprietario/{proprietarioId}")
    public ResponseEntity<List<ImmobiliDTO>> getImmobiliByProprietario(@PathVariable Long proprietarioId) {
        try {
            List<ImmobiliDTO> immobili = immobiliService.getImmobiliByProprietario(proprietarioId);
            return ResponseEntity.ok(immobili);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /api/immobili/citta/{citta}
     * Recupera tutti gli immobili di una città specifica.
     * 
     * @param citta Nome della città
     * @return Lista degli immobili nella città
     */
    @GetMapping("/citta/{citta}")
    public ResponseEntity<List<ImmobiliDTO>> getImmobiliByCitta(@PathVariable String citta) {
        try {
            List<ImmobiliDTO> immobili = immobiliService.getImmobiliByCitta(citta);
            return ResponseEntity.ok(immobili);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /api/immobili/stato/{stato}
     * Recupera tutti gli immobili con uno stato specifico.
     * 
     * @param stato Stato dell'immobile (es. "bozza", "pubblicato")
     * @return Lista degli immobili con quello stato
     */
    @GetMapping("/stato/{stato}")
    public ResponseEntity<List<ImmobiliDTO>> getImmobiliByStato(@PathVariable String stato) {
        try {
            List<ImmobiliDTO> immobili = immobiliService.getImmobiliByStato(stato);
            return ResponseEntity.ok(immobili);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}