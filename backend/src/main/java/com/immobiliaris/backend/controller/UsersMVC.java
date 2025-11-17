package com.immobiliaris.backend.controller;

import com.immobiliaris.backend.model.Users;
import com.immobiliaris.backend.repo.UsersRepository;

import jakarta.servlet.http.HttpSession;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    @GetMapping("/{id}")
    public ResponseEntity<Users> getById(@PathVariable Long id) {
        Optional<Users> u = usersRepository.findById(id);
        return u.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    //SIGN IN
     @GetMapping("/signin")
    public ResponseEntity<Map<String, String>> showSignin() {
        Map<String, String> response = new HashMap<>();
        response.put("page", "signin");
        response.put("message", "Pagina di registrazione");
        return ResponseEntity.ok(response);
    }
    // processa il form di registrazione
    @PostMapping("/signin")
    public ResponseEntity<Map<String, Object>> doSignin(@RequestParam String nome,
                           @RequestParam String cognome,
                           @RequestParam String email,
                           @RequestParam String password,
                           @RequestParam String telefono) {
        Map<String, Object> response = new HashMap<>();
        
        // normalize and validate email + password
        String emailNorm = email == null ? "" : email.trim().toLowerCase();
        if (emailNorm.isBlank()) {
            response.put("success", false);
            response.put("error", "Email è richiesta");
            return ResponseEntity.badRequest().body(response);
        }
        if (password == null || password.length() < 8) {
            response.put("success", false);
            response.put("error", "La password deve essere lunga almeno 8 caratteri");
            return ResponseEntity.badRequest().body(response);
        }
        // controlla se email già esiste
        if (usersRepository.findByEmail(emailNorm).isPresent()) {
            response.put("success", false);
            response.put("error", "Email già in uso");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        // crea nuovo utente
        Users u = new Users();
        u.setNome(nome);
        u.setCognome(cognome);
        u.setEmail(emailNorm);
        // Hash della password prima di salvare
        String hashed = com.immobiliaris.backend.util.PasswordUtils.hashPassword(password);
        u.setPassword(hashed);
        u.setTelefono(telefono);
        // valore coerente con lo schema DB
        u.setRuolo("utente");
        // registrazione parte come non verificata
        u.setVerificato(false);
        usersRepository.save(u);
        
        response.put("success", true);
        response.put("message", "Registrazione completata con successo");
        response.put("redirect", "/login");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

   // mostra form login
    @GetMapping("/login") //ogni volta che sul link scrivi login e la richiesta è di tipo get esegui il meotodo sotto
    public ResponseEntity<Map<String, String>> showLogin() {
        Map<String, String> response = new HashMap<>();
        response.put("page", "login");
        response.put("message", "Pagina di login");
        return ResponseEntity.ok(response);
    }

    // processa il login form
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> doLogin(@RequestParam String email,
                        @RequestParam String password,
                        HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        String emailNorm = email == null ? "" : email.trim().toLowerCase();
        Optional<Users> opt = usersRepository.findByEmail(emailNorm);
        if (opt.isEmpty()) {
            response.put("success", false);
            response.put("error", "Email o password errati");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        Users u = opt.get();
        // verifica usando l'hash memorizzato
        if (!com.immobiliaris.backend.util.PasswordUtils.verifyPassword(password, u.getPassword())) {
            response.put("success", false);
            response.put("error", "Email o password errati");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        // Nota: permettiamo il login anche se `verificato == false`.
        // Le azioni sensibili saranno protette tramite ruoli/authorities (es. ROLE_ADMIN).
        // login valido: memorizza l'utente in sessione
        session.setAttribute("userId", u.getId());
        session.setAttribute("userName", u.getNome());
        session.setAttribute("userRole", u.getRuolo());
        // Imposta il contesto di Spring Security in modo che il resto
        // dell'app (filtri, autorizzazioni) riconosca l'utente autenticato.
        SimpleGrantedAuthority auth = new SimpleGrantedAuthority("ROLE_" + (u.getRuolo() == null ? "UTENTE" : u.getRuolo().toUpperCase()));
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(u.getEmail(), null, List.of(auth));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        response.put("success", true);
        response.put("message", "Login effettuato con successo");
        response.put("userId", u.getId());
        response.put("email", u.getEmail());
        response.put("role", u.getRuolo());
        response.put("redirect", "/home");
        return ResponseEntity.ok(response);
    }

    // logout
    @GetMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpSession session) {
        session.invalidate();
        Map<String, String> response = new HashMap<>();
        response.put("success", "true");
        response.put("message", "Logout effettuato con successo");
        response.put("redirect", "/");
        return ResponseEntity.ok(response);
    }



     @GetMapping("/backoffice/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> backofficeUsers() {
        Map<String, Object> response = new HashMap<>();
        response.put("users", usersRepository.findAll());
        response.put("message", "Lista utenti per amministrazione");
        return ResponseEntity.ok(response);
    }

    /**
     * Crea un nuovo utente. Se l'email è già presente restituisce 409.
     */
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Users user) {
        String emailNorm = user.getEmail() == null ? "" : user.getEmail().trim().toLowerCase();
        if (emailNorm.isBlank()) {
            return ResponseEntity.badRequest().body("email is required");
        }
        if (usersRepository.findByEmail(emailNorm).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("email already exists");
        }
        // Hash password before saving to DB and validate length
        if (user.getPassword() == null || user.getPassword().length() < 8) {
            return ResponseEntity.badRequest().body("password must be at least 8 characters");
        }
        user.setPassword(com.immobiliaris.backend.util.PasswordUtils.hashPassword(user.getPassword()));
        // Ensure role matches DB constraint and start as not verified
        if (user.getRuolo() == null || user.getRuolo().isBlank()) user.setRuolo("utente");
        user.setEmail(emailNorm);
        user.setVerificato(false);
        Users saved = usersRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * Aggiorna un utente esistente. Restituisce 404 se l'id non esiste.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Users update) {
        Optional<Users> existing = usersRepository.findById(id);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();
        Users u = existing.get();
        // Aggiorna campi consentiti
        u.setNome(update.getNome());
        u.setCognome(update.getCognome());
        u.setTelefono(update.getTelefono());
        if (update.getPassword() != null && !update.getPassword().isBlank()) {
            // hash nuova password prima di salvare
            u.setPassword(com.immobiliaris.backend.util.PasswordUtils.hashPassword(update.getPassword()));
        }
        if (update.getRuolo() != null) u.setRuolo(update.getRuolo());
        usersRepository.save(u);
        return ResponseEntity.ok(u);
    }

    /**
     * Elimina un utente per id. Restituisce 204 anche se l'id non esiste
     * (idempotenza), o 200 se eliminazione avvenuta.
     */
    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (usersRepository.existsById(id)) {
            usersRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.noContent().build();
    }
}
