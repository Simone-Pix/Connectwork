package com.immobiliaris.backend.controller;

import com.immobiliaris.backend.model.Users;
import com.immobiliaris.backend.repo.UsersRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.ui.Model;

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
    @GetMapping("/{id}")
    public ResponseEntity<Users> getById(@PathVariable Long id) {
        Optional<Users> u = usersRepository.findById(id);
        return u.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    //SIGN IN
     @GetMapping("/signin")
    public String showSignin() {
        return "signin";  // Thymeleaf cerca templates/signin.html
    }

   // mostra form registrazione
   @GetMapping("/signin")
    public String showSigninForm() {
         return "signin";
    }
    // processa il form di registrazione
    @PostMapping("/signin")
    public String doSignin(@RequestParam String nome,
                           @RequestParam String cognome,
                           @RequestParam String email,
                           @RequestParam String password,
                           @RequestParam String telefono,
                           Model model) {
        // controlla se email già esiste
        if (usersRepository.findByEmail(email).isPresent()) {
            model.addAttribute("error", "Email già in uso");
            return "signin";
        }

        // crea nuovo utente
        Users u = new Users();
        u.setNome(nome);
        u.setCognome(cognome);
        u.setEmail(email);
        u.setPassword(password); // in chiaro 
        u.setRuolo("USER");
        usersRepository.save(u);
        return "redirect:/login"; // dopo registrazione vai al login
    }

   // mostra form login
    @GetMapping("/login") //ogni volta che sul link scrivi login e la richiesta è di tipo get esegui il meotodo sotto
    public String showLogin() {
        return "login";
    }

    // processa il login form
    @PostMapping("/login")
    public String doLogin(@RequestParam String email,
                        @RequestParam String password,
                        HttpSession session,
                        Model model) {
        Optional<Users> opt = usersRepository.findByEmail(email);
        if (opt.isEmpty()) {
            model.addAttribute("error", "Email o password errati");
            return "login";
        }
        Users u = opt.get();
        // confronto in chiaro
        if (!u.getPassword().equals(password)) {
            model.addAttribute("error", "Email o password errati");
            return "login";
        }
        // login valido: memorizza l'utente in sessione
        session.setAttribute("userId", u.getId());
        session.setAttribute("userName", u.getNome());
        return "redirect:/home"; // o dashboard
    }

    // logout
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }



     @GetMapping("/backoffice/users")
    public String backofficeUsers(Model m) {
        m.addAttribute("users", usersRepository.findAll());
        return "backofficeUsers";
    }

    /**
     * Crea un nuovo utente. Se l'email è già presente restituisce 409.
     */
    @PostMapping
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
    @PutMapping("/{id}")
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
    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (usersRepository.existsById(id)) {
            usersRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.noContent().build();
    }
}
