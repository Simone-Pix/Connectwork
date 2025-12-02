package com.immobiliaris.backend.controller;

import com.immobiliaris.backend.model.Users;
import com.immobiliaris.backend.repo.UsersRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller REST per l'autenticazione semplificata.
 * Gestisce login/logout mantenendo l'auth backend-side senza complessità frontend.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsersRepository usersRepository;

    /**
     * GET/POST /api/auth/check
     * Controlla se l'utente corrente è autenticato.
     * Frontend può chiamare questo endpoint per verificare lo stato auth.
     */
    @RequestMapping(value = "/check", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<Map<String, Object>> checkAuth(HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("userId") != null) {
            Long userId = (Long) session.getAttribute("userId");
            String email = (String) session.getAttribute("userEmail");
            String ruolo = (String) session.getAttribute("userRole");

            response.put("authenticated", true);
            response.put("userId", userId);
            response.put("email", email);
            response.put("role", ruolo);  
            return ResponseEntity.ok(response);
        }

        response.put("authenticated", false);
        return ResponseEntity.ok(response);
    }


    /**
     * POST /api/auth/session-login
     * Login semplificato che mantiene la sessione.
     * Frontend invia email/password, backend gestisce tutto.
     */
    @PostMapping("/session-login")
    public ResponseEntity<Map<String, Object>> sessionLogin(
            @RequestParam String email,
            @RequestParam String password,
            HttpServletRequest request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validazione credenziali
            if (email == null || email.trim().isEmpty() || 
                password == null || password.trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Email e password sono obbligatori");
                return ResponseEntity.badRequest().body(response);
            }

            // Verifica utente nel database
            Users user = usersRepository.findByEmail(email).orElse(null);
            if (user == null || !com.immobiliaris.backend.util.PasswordUtils.verifyPassword(password, user.getPassword())) {
                response.put("success", false);
                response.put("message", "Credenziali non valide");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // Crea sessione
            HttpSession session = request.getSession(true);
            session.setAttribute("userId", user.getId());
            session.setAttribute("userEmail", user.getEmail());
            session.setAttribute("userRole", user.getRuolo());
            session.setMaxInactiveInterval(3600); // 1 ora

            response.put("success", true);
            response.put("message", "Login effettuato con successo");
            response.put("userId", user.getId());
            response.put("email", user.getEmail());
            response.put("role", user.getRuolo());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Errore interno del server");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * POST /api/auth/signin
     * Registrazione nuovo utente - compatibile con frontend.
     */
    @PostMapping("/signin")
    public ResponseEntity<Map<String, Object>> signin(
            @RequestParam String nome,
            @RequestParam String cognome,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String telefono) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validazione input
            String emailNorm = email == null ? "" : email.trim().toLowerCase();
            if (emailNorm.isBlank()) {
                response.put("success", false);
                response.put("message", "Email è richiesta");
                return ResponseEntity.badRequest().body(response);
            }
            if (password == null || password.length() < 8) {
                response.put("success", false);
                response.put("message", "La password deve essere lunga almeno 8 caratteri");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Controlla se email già esiste
            if (usersRepository.findByEmail(emailNorm).isPresent()) {
                response.put("success", false);
                response.put("message", "Email già in uso");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            // Crea nuovo utente
            Users u = new Users();
            u.setNome(nome);
            u.setCognome(cognome);
            u.setEmail(emailNorm);
            // Hash della password prima di salvare
            String hashed = com.immobiliaris.backend.util.PasswordUtils.hashPassword(password);
            u.setPassword(hashed);
            u.setTelefono(telefono);
            u.setRuolo("utente");
            u.setVerificato(false);
            usersRepository.save(u);
            
            response.put("success", true);
            response.put("message", "Registrazione completata con successo");
            response.put("redirect", "/login");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Errore interno del server");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * POST /api/auth/logout
     * Logout che invalida la sessione.
     */
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        
        response.put("success", true);
        response.put("message", "Logout effettuato con successo");
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/auth/status
     * Endpoint per debugging - mostra info sessione corrente.
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus(HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        HttpSession session = request.getSession(false);
        if (session != null) {
            response.put("sessionId", session.getId());
            response.put("userId", session.getAttribute("userId"));
            response.put("userEmail", session.getAttribute("userEmail"));
            response.put("userRole", session.getAttribute("userRole"));
            response.put("creationTime", session.getCreationTime());
            response.put("lastAccessedTime", session.getLastAccessedTime());
            response.put("maxInactiveInterval", session.getMaxInactiveInterval());
        } else {
            response.put("message", "Nessuna sessione attiva");
        }
        
        return ResponseEntity.ok(response);
    }




    /**
 * GET /api/auth/me
 * Restituisce i dati completi dell’utente loggato.
 * Accessibile solo se la sessione è valida.
 */
@GetMapping("/me")
public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
    HttpSession session = request.getSession(false);

    // Nessuna sessione → non autenticato
    if (session == null || session.getAttribute("userId") == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of(
                        "authenticated", false,
                        "message", "Utente non autenticato"
                ));
    }

    // Recupero i dati dalla sessione
    Long userId = (Long) session.getAttribute("userId");
    String email = (String) session.getAttribute("userEmail");

    // Recupero l'utente dal DB
    return usersRepository.findById(userId)
            .map(user -> ResponseEntity.ok(Map.of(
                    "authenticated", true,
                    "id", user.getId(),
                    "nome", user.getNome(),
                    "cognome", user.getCognome(),
                    "email", user.getEmail(),
                    "telefono", user.getTelefono(),
                    "ruolo", user.getRuolo()
            )))
            .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "authenticated", false,
                            "message", "Utente non trovato"
                    )));
}

}