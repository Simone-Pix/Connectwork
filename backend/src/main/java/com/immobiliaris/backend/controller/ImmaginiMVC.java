package com.immobiliaris.backend.controller;

import com.immobiliaris.backend.model.Immagini;
import com.immobiliaris.backend.model.Immobili;
import com.immobiliaris.backend.repo.ImmaginiRepository;
import com.immobiliaris.backend.repo.ImmobiliRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller REST per la gestione delle immagini.
 * Espone operazioni CRUD e un endpoint per ottenere le immagini di un immobile.
 */
@RestController
@RequestMapping("/api/immagini")
public class ImmaginiMVC {

    private final ImmaginiRepository immaginiRepository;
    private final ImmobiliRepository immobiliRepository;

    public ImmaginiMVC(ImmaginiRepository immaginiRepository, ImmobiliRepository immobiliRepository) {
        this.immaginiRepository = immaginiRepository;
        this.immobiliRepository = immobiliRepository;
    }

    @GetMapping
    public List<Immagini> listAll() {
        return immaginiRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Immagini> getById(@PathVariable Long id) {
        Optional<Immagini> i = immaginiRepository.findById(id);
        return i.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/immobile/{immobileId}")
    public ResponseEntity<List<Immagini>> getByImmobile(@PathVariable Long immobileId) {
        if (!immobiliRepository.existsById(immobileId)) {
            return ResponseEntity.notFound().build();
        }
        List<Immagini> imgs = immaginiRepository.findByImmobile_Id(immobileId);
        return ResponseEntity.ok(imgs);
    }

    public static class ImageRequest {
        public Long immobileId;
        public String url;
        public String tipo;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ImageRequest req) {
        if (req == null || req.immobileId == null || req.url == null || req.url.isBlank()) {
            return ResponseEntity.badRequest().body("immobileId and url are required");
        }
        Optional<Immobili> immOpt = immobiliRepository.findById(req.immobileId);
        if (immOpt.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Immobile non trovato");

        Immagini img = new Immagini(immOpt.get(), req.url, req.tipo == null ? "foto" : req.tipo);
        Immagini saved = immaginiRepository.save(img);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }



//da mettere / back office

// per put e delete 

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ImageRequest req) {
        Optional<Immagini> existing = immaginiRepository.findById(id);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();
        Immagini img = existing.get();
        if (req.url != null) img.setUrl(req.url);
        if (req.tipo != null) img.setTipo(req.tipo);
        if (req.immobileId != null) {
            Optional<Immobili> immOpt = immobiliRepository.findById(req.immobileId);
            if (immOpt.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Immobile non trovato");
            img.setImmobile(immOpt.get());
        }
        immaginiRepository.save(img);
        return ResponseEntity.ok(img);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!immaginiRepository.existsById(id)) return ResponseEntity.notFound().build();
        immaginiRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
