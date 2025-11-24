package com.immobiliaris.backend.controller;

import com.immobiliaris.backend.model.Immagini;
import com.immobiliaris.backend.model.Immobili;
import com.immobiliaris.backend.repo.ImmaginiRepository;
import com.immobiliaris.backend.repo.ImmobiliRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/api/immagini")
public class ImmaginiMVC {

    private final ImmaginiRepository immaginiRepository;
    private final ImmobiliRepository immobiliRepository;

    public ImmaginiMVC(ImmaginiRepository immaginiRepository, ImmobiliRepository immobiliRepository) {
        this.immaginiRepository = immaginiRepository;
        this.immobiliRepository = immobiliRepository;
    }

    // -----------------------------
    // LISTA COMPLETA IMMAGINI
    // -----------------------------
    @GetMapping
    public List<Immagini> listAll() {
        return immaginiRepository.findAll();
    }

    // -----------------------------
    // RECUPERA IMMAGINE PER ID
    // -----------------------------
    @GetMapping("/{id}")
    public ResponseEntity<Immagini> getById(@PathVariable Long id) {
        Optional<Immagini> i = immaginiRepository.findById(id);
        return i.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // -----------------------------
    // IMMAGINI DI UN IMMOBILE
    // -----------------------------
    @GetMapping("/immobile/{immobileId}")
    public ResponseEntity<List<Immagini>> getByImmobile(@PathVariable Long immobileId) {
        if (!immobiliRepository.existsById(immobileId)) {
            return ResponseEntity.notFound().build();
        }
        List<Immagini> imgs = immaginiRepository.findByImmobile_Id(immobileId);
        return ResponseEntity.ok(imgs);
    }

    // -----------------------------
    // CREAZIONE IMMAGINE MANUALE
    // -----------------------------
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
        if (immOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Immobile non trovato");
        }

        Immagini img = new Immagini(
                immOpt.get(),
                req.url,
                req.tipo == null ? "foto" : req.tipo
        );

        Immagini saved = immaginiRepository.save(img);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // -----------------------------
    // UPDATE
    // -----------------------------
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ImageRequest req) {
        Optional<Immagini> existing = immaginiRepository.findById(id);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();

        Immagini img = existing.get();

        if (req.url != null) img.setUrl(req.url);
        if (req.tipo != null) img.setTipo(req.tipo);

        if (req.immobileId != null) {
            Optional<Immobili> immOpt = immobiliRepository.findById(req.immobileId);
            if (immOpt.isEmpty())
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Immobile non trovato");
            img.setImmobile(immOpt.get());
        }

        immaginiRepository.save(img);
        return ResponseEntity.ok(img);
    }

    // -----------------------------
    // DELETE
    // -----------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!immaginiRepository.existsById(id)) return ResponseEntity.notFound().build();
        immaginiRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // -----------------------------
    // UPLOAD FILE
    // -----------------------------
    @PostMapping("/upload/{immobileId}")
    public ResponseEntity<?> uploadImage(
            @PathVariable Long immobileId,
            @RequestParam("file") MultipartFile file) {

        try {
            // Verifica immobile
            Optional<Immobili> immOpt = immobiliRepository.findById(immobileId);
            if (immOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Immobile non trovato");
            }

            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();

            // Percorso CARTELLA ESTERNA (quella che hai creato)
            String uploadDir = "../immagini_caricate/";
            java.nio.file.Path uploadPath = Paths.get(uploadDir);

            // Se non esiste la creo
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            java.nio.file.Path filePath = uploadPath.resolve(filename);

            // Salvo fisicamente il file
            Files.copy(file.getInputStream(), filePath);

            // URL pubblica
            String fullUrl = "http://localhost:8080/immagini_caricate/" + filename;

            // Salvo nel DB
            Immagini img = new Immagini(
                    immOpt.get(),
                    fullUrl,
                    "foto"
            );
            immaginiRepository.save(img);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("url", fullUrl);
            response.put("message", "Immagine caricata correttamente");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Errore durante l'upload dell'immagine");
        }
    }
}
