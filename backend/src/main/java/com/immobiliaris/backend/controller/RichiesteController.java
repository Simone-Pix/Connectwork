package com.immobiliaris.backend.controller;

import com.immobiliaris.backend.dto.ValutazioneRichiestaDTO;
import com.immobiliaris.backend.model.Immobili;
import com.immobiliaris.backend.model.Richieste;
import com.immobiliaris.backend.model.ZonePrezzi;
import com.immobiliaris.backend.repo.ZonePrezziRepository;
import com.immobiliaris.backend.service.RichiesteConversioneService;
import com.immobiliaris.backend.service.RichiesteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
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

    @Autowired
    private ZonePrezziRepository zonePrezziRepository;

    @Autowired
    private RichiesteConversioneService conversioneService;

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

    // ========== VALUTAZIONE AUTOMATICA ==========

    /**
     * POST /api/richieste/{id}/valuta-automatica
     * Genera una valutazione automatica per la richiesta.
     * Richiede che il CAP sia presente e mappato nel sistema.
     */
    @PostMapping("/{id}/valuta-automatica")
    public ResponseEntity<?> valuaRichiestaAutomatica(@PathVariable Long id) {
        try {
            Richieste richiesta = richiesteService.getRichiestaById(id)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND, 
                            "Richiesta non trovata con id: " + id
                    ));

            // Verifica CAP obbligatorio
            if (richiesta.getCap() == null || richiesta.getCap().isBlank()) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, 
                        "CAP obbligatorio per la valutazione automatica"
                );
            }

            // Lookup zona prezzi
            ZonePrezzi zona = zonePrezziRepository.findByCap(richiesta.getCap())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND, 
                            "CAP non mappato nel sistema di valutazione: " + richiesta.getCap()
                    ));

            // Calcola valutazione
            ValutazioneRichiestaDTO valutazione = calcolaValutazione(richiesta, zona);

            return ResponseEntity.ok(valutazione);

        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Errore durante la valutazione: " + e.getMessage());
        }
    }

    /**
     * Calcola la valutazione di una richiesta basandosi su zona e modificatori.
     */
    private ValutazioneRichiestaDTO calcolaValutazione(Richieste richiesta, ZonePrezzi zona) {
        BigDecimal prezzoBase = zona.getPrezzoMqMedio();
        BigDecimal modificatore = calcolaModificatore(richiesta);
        BigDecimal prezzoFinale = prezzoBase.multiply(modificatore).setScale(2, RoundingMode.HALF_UP);

        BigDecimal valoreTotale = prezzoFinale.multiply(richiesta.getSuperficie())
                .setScale(2, RoundingMode.HALF_UP);

        BigDecimal cinquePercento = new BigDecimal("0.05");
        BigDecimal valoreMin = valoreTotale.multiply(BigDecimal.ONE.subtract(cinquePercento))
                .setScale(2, RoundingMode.HALF_UP);
        BigDecimal valoreMax = valoreTotale.multiply(BigDecimal.ONE.add(cinquePercento))
                .setScale(2, RoundingMode.HALF_UP);

        String note = generaNote(richiesta, zona, modificatore);

        return new ValutazioneRichiestaDTO(valoreMin, valoreMax, prezzoFinale, note, zona.getZonaNome(), zona.getCap());
    }

    /**
     * Calcola il modificatore totale basato sulle caratteristiche della richiesta.
     */
    private BigDecimal calcolaModificatore(Richieste r) {
        BigDecimal mod = BigDecimal.ONE;

        // Stato conservazione
        if (r.getStatoConservazione() != null) {
            mod = mod.multiply(switch (r.getStatoConservazione().toLowerCase()) {
                case "da_ristrutturare" -> new BigDecimal("0.85");
                case "buono" -> BigDecimal.ONE;
                case "ottimo" -> new BigDecimal("1.10");
                case "lusso" -> new BigDecimal("1.25");
                default -> BigDecimal.ONE;
            });
        }

        // Classe energetica
        if (r.getClasseEnergetica() != null) {
            mod = mod.multiply(switch (r.getClasseEnergetica().toUpperCase()) {
                case "A" -> new BigDecimal("1.10");
                case "B" -> new BigDecimal("1.05");
                case "C" -> BigDecimal.ONE;
                case "D" -> new BigDecimal("0.95");
                case "E" -> new BigDecimal("0.90");
                case "F" -> new BigDecimal("0.85");
                case "G" -> new BigDecimal("0.80");
                default -> BigDecimal.ONE;
            });
        }

        // Anno costruzione
        if (r.getAnnoCostruzione() != null) {
            int anno = r.getAnnoCostruzione();
            if (anno < 1950) mod = mod.multiply(new BigDecimal("0.90"));
            else if (anno < 1981) mod = mod.multiply(new BigDecimal("0.95"));
            else if (anno < 2001) mod = mod.multiply(BigDecimal.ONE);
            else if (anno < 2011) mod = mod.multiply(new BigDecimal("1.05"));
            else mod = mod.multiply(new BigDecimal("1.10"));
        }

        // Piano
        Integer piano = r.getPiano();
        if (piano != null) {
            if (piano < 0) mod = mod.multiply(new BigDecimal("0.90"));
            else if (piano >= 1 && piano <= 3) mod = mod.multiply(new BigDecimal("1.05"));
            else if (piano >= 7) mod = mod.multiply(new BigDecimal("0.95"));
        }

        return mod.setScale(4, RoundingMode.HALF_UP);
    }

    /**
     * Genera note descrittive per la valutazione.
     */
    private String generaNote(Richieste richiesta, ZonePrezzi zona, BigDecimal modificatore) {
        StringBuilder note = new StringBuilder();
        note.append("Valutazione automatica generata il ").append(LocalDateTime.now().toLocalDate()).append(".\n\n");
        note.append("Zona: ").append(zona.getZonaNome()).append(" (").append(zona.getCitta())
                .append(" - CAP ").append(zona.getCap()).append(")\n");
        note.append("Prezzo base zona: €").append(zona.getPrezzoMqMedio()).append("/mq\n");
        note.append("Superficie: ").append(richiesta.getSuperficie()).append(" mq\n\n");

        BigDecimal percentualeModifica = modificatore.subtract(BigDecimal.ONE)
                .multiply(new BigDecimal("100"));
        note.append("Modificatore applicato: ");
        if (percentualeModifica.compareTo(BigDecimal.ZERO) > 0) {
            note.append("+");
        }
        note.append(percentualeModifica.setScale(1, RoundingMode.HALF_UP)).append("%\n\n");

        note.append("Fattori considerati:\n");
        if (richiesta.getStatoConservazione() != null) {
            note.append("- Stato conservazione: ").append(richiesta.getStatoConservazione()).append("\n");
        }
        if (richiesta.getClasseEnergetica() != null) {
            note.append("- Classe energetica: ").append(richiesta.getClasseEnergetica()).append("\n");
        }
        if (richiesta.getPiano() != null) {
            note.append("- Piano: ").append(richiesta.getPiano()).append("\n");
        }
        if (richiesta.getAnnoCostruzione() != null) {
            note.append("- Anno costruzione: ").append(richiesta.getAnnoCostruzione()).append("\n");
        }
        if (richiesta.getTipoImmobile() != null) {
            note.append("- Tipo immobile: ").append(richiesta.getTipoImmobile()).append("\n");
        }

        return note.toString();
    }

    // ========== CONVERSIONE RICHIESTA → IMMOBILE ==========

    /**
     * POST /api/richieste/{id}/converti-immobile
     * Converte una richiesta in un immobile completo.
     * Crea l'utente se non esiste, genera la valutazione e elimina la richiesta.
     */
    @PostMapping("/{id}/converti-immobile")
    public ResponseEntity<?> convertiInImmobile(@PathVariable Long id) {
        try {
            Immobili immobile = conversioneService.convertiRichiestaInImmobile(id);
            return ResponseEntity.status(HttpStatus.CREATED).body(immobile);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Errore durante la conversione: " + e.getMessage());
        }
    }
}