package com.immobiliaris.backend.controller;

import com.immobiliaris.backend.model.Richieste;
import com.immobiliaris.backend.service.RichiesteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller REST per la gestione delle Richieste.
 * Espone operazioni CRUD e endpoint di ricerca.
 */
@RestController
@RequestMapping("/api/richieste")
public class RichiesteController {

    @Autowired
    private RichiesteService richiesteService;

    /**
     * GET /api/richieste
     * Recupera tutte le richieste.
     */
    @GetMapping
    public ResponseEntity<List<Richieste>> getAllRichieste() {
        try {
            List<Richieste> richieste = richiesteService.getAllRichieste();
            return ResponseEntity.ok(richieste);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /api/richieste/{id}
     * Recupera una richiesta per ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Richieste> getRichiestaById(@PathVariable Long id) {
        try {
            Optional<Richieste> richiesta = richiesteService.getRichiestaById(id);
            return richiesta.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * POST /api/richieste
     * Crea una nuova richiesta.
     */
    @PostMapping
    public ResponseEntity<?> createRichiesta(@RequestBody Richieste richiesta) {
        try {
            Richieste nuovaRichiesta = richiesteService.createRichiesta(richiesta);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuovaRichiesta);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * PUT /api/richieste/{id}
     * Aggiorna una richiesta esistente.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRichiesta(@PathVariable Long id, @RequestBody Richieste richiesta) {
        try {
            Richieste richiestaAggiornata = richiesteService.updateRichiesta(id, richiesta);
            return ResponseEntity.ok(richiestaAggiornata);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * DELETE /api/richieste/{id}
     * Elimina una richiesta.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRichiesta(@PathVariable Long id) {
        try {
            richiesteService.deleteRichiesta(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // ========== ENDPOINT DI RICERCA/FILTRO ==========

    /**
     * GET /api/richieste/email/{email}
     * Recupera richieste per email.
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<List<Richieste>> getRichiesteByEmail(@PathVariable String email) {
        try {
            List<Richieste> richieste = richiesteService.getRichiesteByEmail(email);
            return ResponseEntity.ok(richieste);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /api/richieste/tipo/{tipoOperazione}
     * Recupera richieste per tipo di operazione.
     */
    @GetMapping("/tipo/{tipoOperazione}")
    public ResponseEntity<List<Richieste>> getRichiesteByTipo(@PathVariable String tipoOperazione) {
        try {
            List<Richieste> richieste = richiesteService.getRichiesteByTipoOperazione(tipoOperazione);
            return ResponseEntity.ok(richieste);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /api/richieste/tempistica/{tempistica}
     * Recupera richieste per tempistica.
     */
    @GetMapping("/tempistica/{tempistica}")
    public ResponseEntity<List<Richieste>> getRichiesteByTempistica(@PathVariable String tempistica) {
        try {
            List<Richieste> richieste = richiesteService.getRichiesteByTempistica(tempistica);
            return ResponseEntity.ok(richieste);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /api/richieste/stanze/{stanzeMinime}
     * Recupera richieste con almeno un numero di stanze specificato.
     */
    @GetMapping("/stanze/{stanzeMinime}")
    public ResponseEntity<List<Richieste>> getRichiesteByStanze(@PathVariable Integer stanzeMinime) {
        try {
            List<Richieste> richieste = richiesteService.getRichiesteByStanzeMinime(stanzeMinime);
            return ResponseEntity.ok(richieste);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /api/richieste/anagrafica?nome={nome}&cognome={cognome}
     * Recupera richieste per nome e cognome.
     */
    @GetMapping("/anagrafica")
    public ResponseEntity<List<Richieste>> getRichiesteByAnagrafica(
            @RequestParam String nome, 
            @RequestParam String cognome) {
        try {
            List<Richieste> richieste = richiesteService.getRichiesteByNomeAndCognome(nome, cognome);
            return ResponseEntity.ok(richieste);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}