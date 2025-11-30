package com.immobiliaris.backend.controller;

import com.immobiliaris.backend.model.ZonePrezzi;
import com.immobiliaris.backend.repo.ZonePrezziRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST per la gestione delle zone prezzi.
 * Permette di consultare e gestire i prezzi medi al mq per CAP.
 */
@RestController
@RequestMapping("/api/zone-prezzi")
public class ZonePrezziController {

    @Autowired
    private ZonePrezziRepository zonePrezziRepository;

    /**
     * GET /api/zone-prezzi
     * Recupera tutte le zone prezzi
     */
    @GetMapping
    public ResponseEntity<List<ZonePrezzi>> getAllZonePrezzi() {
        try {
            List<ZonePrezzi> zone = zonePrezziRepository.findAll();
            return ResponseEntity.ok(zone);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /api/zone-prezzi/{id}
     * Recupera una zona prezzo per ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ZonePrezzi> getZonaPrezziById(@PathVariable Long id) {
        try {
            return zonePrezziRepository.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /api/zone-prezzi/cap/{cap}
     * Recupera la zona prezzo per un CAP specifico
     */
    @GetMapping("/cap/{cap}")
    public ResponseEntity<ZonePrezzi> getZonaPrezziByCAP(@PathVariable String cap) {
        try {
            return zonePrezziRepository.findByCap(cap)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * POST /api/zone-prezzi
     * Crea una nuova zona prezzo (solo admin)
     */
    @PostMapping
    public ResponseEntity<ZonePrezzi> createZonaPrezzi(@RequestBody ZonePrezzi zonaPrezzi) {
        try {
            // Verifica che il CAP non esista già
            if (zonePrezziRepository.existsByCap(zonaPrezzi.getCap())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            ZonePrezzi saved = zonePrezziRepository.save(zonaPrezzi);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * PUT /api/zone-prezzi/{id}
     * Aggiorna una zona prezzo esistente (solo admin)
     */
    @PutMapping("/{id}")
    public ResponseEntity<ZonePrezzi> updateZonaPrezzi(@PathVariable Long id, @RequestBody ZonePrezzi zonaPrezzi) {
        try {
            return zonePrezziRepository.findById(id)
                    .map(existing -> {
                        existing.setCap(zonaPrezzi.getCap());
                        existing.setCitta(zonaPrezzi.getCitta());
                        existing.setZonaNome(zonaPrezzi.getZonaNome());
                        existing.setPrezzoMqMedio(zonaPrezzi.getPrezzoMqMedio());
                        ZonePrezzi updated = zonePrezziRepository.save(existing);
                        return ResponseEntity.ok(updated);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * DELETE /api/zone-prezzi/{id}
     * Elimina una zona prezzo (solo admin)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteZonaPrezzi(@PathVariable Long id) {
        try {
            if (!zonePrezziRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            zonePrezziRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
