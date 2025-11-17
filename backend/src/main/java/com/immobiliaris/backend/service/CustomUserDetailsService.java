package com.immobiliaris.backend.service;

import com.immobiliaris.backend.model.Users;
import com.immobiliaris.backend.repo.UsersRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

/**
 * Servizio per integrare gli utenti dell'app con Spring Security.
 *
 * Funzionalità principali (documentazione in italiano):
 * - Carica l'utente dal database tramite `UsersRepository` usando
 *   l'email (normalizzata: trim + lowercase).
 * - Converte il campo `ruolo` presente nell'entità `Users` in una
 *   `GrantedAuthority` con prefisso `ROLE_` (es. `ROLE_ADMIN`,
 *   `ROLE_UTENTE`). Questo rende semplice usare `@PreAuthorize("hasRole('ADMIN')")`.
 * - NON disabilita l'account quando `verificato == false`: la scelta
 *   è di permettere il login subito dopo la registrazione e poi
 *   proteggere le azioni sensibili tramite ruoli o ulteriori authority.
 *
 * Nota su `verificato`:
 * - Se preferisci bloccare il login finché l'utente non verifica la
 *   propria email, cambiare `.disabled(false)` in
 *   `.disabled(!u.isVerificato())` in questo metodo.
 */
public class CustomUserDetailsService implements UserDetailsService {

    private final UsersRepository usersRepository;

    public CustomUserDetailsService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        String normalized = email == null ? "" : email.trim().toLowerCase();
        Users u = usersRepository.findByEmail(normalized)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        // Determina il ruolo e crea le authorities di Spring Security.
        String role = u.getRuolo() == null ? "utente" : u.getRuolo();
        GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role.toUpperCase());

        // Costruisce un UserDetails compatibile con Spring Security.
        // - username = email
        // - password = hash memorizzato (PasswordUtils PBKDF2)
        // - authorities = lista con ROLE_<RUOLO>
        // - disabled = false -> permettiamo il login anche se `verificato==false`
        //   (vedi nota sopra per cambiare questo comportamento)
        return org.springframework.security.core.userdetails.User
            .withUsername(u.getEmail())
            .password(u.getPassword())
            .authorities(List.of(authority))
            .accountExpired(false)
            .accountLocked(false)
            .credentialsExpired(false)
            .disabled(false)
            .build();
    }
}
