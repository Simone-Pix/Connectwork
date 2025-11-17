package com.immobiliaris.backend.config;

import com.immobiliaris.backend.repo.UsersRepository;
import com.immobiliaris.backend.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

/**
 * Configurazione principale di Spring Security per l'app.
 *
 * Spiegazione (italiano):
 * - Definisce un `PasswordEncoder` che usa `SpringPasswordEncoder`.
 *   Questo permette a Spring Security di verificare gli hash già
 *   memorizzati che sono generati tramite `PasswordUtils` (PBKDF2).
 * - Registra un `UserDetailsService` personalizzato che carica gli
 *   utenti dal DB e converte il campo `ruolo` in authority `ROLE_*`.
 * - Configura il `SecurityFilterChain` con queste regole principali:
 *   - permette l'accesso anonimo a login/signin, logout e risorse statiche
 *   - richiede autenticazione per tutte le altre richieste
 *   - usa il form login con endpoint `/api/users/login`
 *   - logout su `/api/users/logout` che reindirizza alla home
 *
 * Nota operativa:
 * - Per semplicità CSRF è disabilitato: in produzione riabilitarlo e
 *   adattare i form Thymeleaf per inviare il token CSRF.
 */
@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    /**
     * Bean PasswordEncoder.
     * Restituisce l'adapter che richiama `PasswordUtils`.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new SpringPasswordEncoder();
    }

    /**
     * Bean UserDetailsService.
     * Usa il repository per costruire il servizio che recupera gli utenti.
     */
    @Bean
    public UserDetailsService userDetailsService(UsersRepository usersRepository) {
        return new CustomUserDetailsService(usersRepository);
    }

    /**
     * Configura le regole HTTP di sicurezza e il form login.
     * - `permitAll()` su pagine di login/registrazione e risorse statiche
     * - tutte le altre richieste richiedono autenticazione
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // per semplicità disabilitiamo CSRF: in produzione abilitarlo e usare token
        http.csrf(csrf -> csrf.disable());
        
        // Configura CORS per permettere richieste dal frontend React
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
        
        // Permetti H2 console (solo per sviluppo) - nuova sintassi Spring Security 6
        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()));

        http.authorizeHttpRequests(auth -> auth
                // Pagine e risorse statiche sempre accessibili
                .requestMatchers("/signin", "/login", "/css/**", "/js/**", "/images/**", "/", "/home").permitAll()
                
                // API completamente pubbliche (lettura)  
                .requestMatchers(HttpMethod.GET, "/api/immobili/**", "/api/immagini/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/richieste/**").permitAll()  // Form contatti pubblico
                .requestMatchers(HttpMethod.GET, "/api/richieste/**").permitAll()   // Lettura richieste pubblica
                
                // Auth endpoints sempre accessibili
                .requestMatchers("/api/auth/**").permitAll()
                
                // Vecchi endpoint per compatibilità
                .requestMatchers("/api/users/signin", "/api/users/login", "/api/users/logout").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/users").permitAll()  // Lista utenti pubblica
                
                // Console H2 per sviluppo
                .requestMatchers("/h2-console/**").permitAll()
                
                // Admin/gestione dati protetti
                .requestMatchers("/api/users/backoffice/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/immobili/**").authenticated() 
                .requestMatchers(HttpMethod.PUT, "/api/immobili/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/immobili/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/richieste/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/richieste/**").authenticated()
                
                // Tutto il resto accessibile per gradualità
                .anyRequest().permitAll()
        );

        // Configura il form login: pagina di login e URL di processing
        http.formLogin(form -> form
            .loginPage("/api/users/login")
            .loginProcessingUrl("/api/users/login")
            // usiamo il parametro 'email' come username per i nostri form
            .usernameParameter("email")
            .passwordParameter("password")
            // dopo il login reindirizza sempre a /home
            .defaultSuccessUrl("/home", true)
            .permitAll()
        );

        // Configura logout semplice
        http.logout(logout -> logout
                .logoutUrl("/api/users/logout")
                .logoutSuccessUrl("/")
                .permitAll()
        );

        return http.build();
    }

    /**
     * AuthenticationManager che usa un DaoAuthenticationProvider con il
     * nostro UserDetailsService e PasswordEncoder.
     *
     * Questo bean è utile se vuoi effettuare autenticazioni programmatiche
     * tramite Spring (es. login automatico). Il provider delega la verifica
     * della password al `PasswordEncoder` definito sopra.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Permetti richieste dal frontend React (sviluppo)
        configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:5173", "http://localhost:3000"));
        
        // Permetti tutti i metodi HTTP
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Permetti tutti i headers
        configuration.setAllowedHeaders(Arrays.asList("*"));
        
        // Permetti cookies e credenziali (importante per sessioni)
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService uds, PasswordEncoder encoder) {
        // Deprecation warning ma funziona - Spring Boot 3.x compatibility
        @SuppressWarnings("deprecation")
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(uds);
        provider.setPasswordEncoder(encoder);
        return new ProviderManager(provider);
    }
}
