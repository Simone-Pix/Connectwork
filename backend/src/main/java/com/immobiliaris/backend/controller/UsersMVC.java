package com.immobiliaris.backend.controller;

import com.immobiliaris.backend.model.Users;
import com.immobiliaris.backend.repo.UsersRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller REST per la gestione degli utenti.
 * Espone operazioni CRUD su `Users`.
 */
@RestController
@RequestMapping("/api/users")
public class UsersMVC {

    private final UsersRepository usersRepository;

    public UsersMVC(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    /**
     * Lista tutti gli utenti.
     */
    @GetMapping
    public List<Users> listAll() {
        return usersRepository.findAll();
    }

    /**
     * Recupera un utente per id. Restituisce 404 se non trovato.
     */
    @GetMapping("/login")
    public ResponseEntity<Users> getById(@PathVariable Long id) {
        Optional<Users> u = usersRepository.findById(id);
        return u.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Crea un nuovo utente. Se l'email è già presente restituisce 409.
     */
    @PostMapping("/signup")
    public ResponseEntity<?> create(@RequestBody Users user) {
        if (user.getEmail() == null || user.getEmail().isBlank()) {
            return ResponseEntity.badRequest().body("email is required");
        }
        if (usersRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("email already exists");
        }
        Users saved = usersRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * Aggiorna un utente esistente. Restituisce 404 se l'id non esiste.
     */
    @PutMapping("/backoffice/utenti/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Users update) {
        Optional<Users> existing = usersRepository.findById(id);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();
        Users u = existing.get();
        // Aggiorna campi consentiti
        u.setNome(update.getNome());
        u.setCognome(update.getCognome());
        u.setTelefono(update.getTelefono());
        u.setPassword(update.getPassword());
        if (update.getRuolo() != null) u.setRuolo(update.getRuolo());
        usersRepository.save(u);
        return ResponseEntity.ok(u);
    }

    /**
     * Elimina un utente per id. Restituisce 204 anche se l'id non esiste
     * (idempotenza), o 200 se eliminazione avvenuta.
     */
    @DeleteMapping("/backoffice/utenti/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (usersRepository.existsById(id)) {
            usersRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.noContent().build();
    }
}
