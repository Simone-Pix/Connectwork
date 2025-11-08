package com.immobiliaris.backend.controller;

import com.immobiliaris.backend.model.Contratti;
import com.immobiliaris.backend.service.ContrattiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contratti")
public class ContrattiController {

    @Autowired
    private ContrattiService contrattiService;

    // 1️⃣ Recupera tutti i contratti
    @GetMapping
    public List<Contratti> getAllContratti() {
        return contrattiService.getAllContratti();
    }

    // 2️⃣ Recupera un contratto per ID
    @GetMapping("/{id}")
    public ResponseEntity<Contratti> getContrattoById(@PathVariable Long id) {
        return contrattiService.getContrattoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3️⃣ Recupera contratti per ID immobile
    @GetMapping("/immobile/{immobileId}")
    public List<Contratti> getContrattiByImmobile(@PathVariable Long immobileId) {
        return contrattiService.getContrattiByImmobile(immobileId);
    }

    // 4️⃣ Recupera contratti per proprietario
    @GetMapping("/proprietario/{proprietarioId}")
    public List<Contratti> getContrattiByProprietario(@PathVariable Long proprietarioId) {
        return contrattiService.getContrattiByProprietario(proprietarioId);
    }

    // 5️⃣ Crea un nuovo contratto
    @PostMapping
    public ResponseEntity<Contratti> creaContratto(@RequestBody Contratti contratto) {
        Contratti nuovoContratto = contrattiService.creaContratto(contratto);
        return ResponseEntity.ok(nuovoContratto);
    }

    // 6️⃣ Aggiorna un contratto esistente
    @PutMapping("/{id}")
    public ResponseEntity<Contratti> aggiornaContratto(@PathVariable Long id, @RequestBody Contratti contratto) {
        Contratti aggiornato = contrattiService.aggiornaContratto(id, contratto);
        return ResponseEntity.ok(aggiornato);
    }

    // 7️⃣ Elimina un contratto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminaContratto(@PathVariable Long id) {
        contrattiService.eliminaContratto(id);
        return ResponseEntity.noContent().build();
    }
}
