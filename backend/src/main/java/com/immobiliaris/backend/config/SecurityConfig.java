package com.immobiliaris.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new SpringPasswordEncoder();
    }

    /**
     * FILTRO: Se la sessione contiene userEmail, allora l'utente è autenticato.
     */
    public static class SessionAuthFilter extends OncePerRequestFilter {
        @Override
        protected void doFilterInternal(HttpServletRequest request,
                                        HttpServletResponse response,
                                        FilterChain filterChain)
                throws ServletException, IOException {

            HttpSession session = request.getSession(false);

            if (session != null && session.getAttribute("userEmail") != null) {

                String email = (String) session.getAttribute("userEmail");

                Authentication auth = new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        Collections.emptyList()
                );

                SecurityContextHolder.getContext().setAuthentication(auth);
            }

            filterChain.doFilter(request, response);
        }
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
        http.csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))
            .addFilterBefore(new SessionAuthFilter(),
                org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class)
            .authorizeHttpRequests(auth -> auth
                // Pagine pubbliche
                .requestMatchers("/", "/home", "/login", "/signin", "/css/**", "/js/**", "/images/**").permitAll()
                // API pubbliche
                .requestMatchers(HttpMethod.GET, "/api/immobili/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/immagini/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/richieste/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/richieste/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/zone-prezzi/**").permitAll()
                // Auth custom
                .requestMatchers("/api/auth/**").permitAll()
                // H2 console
                .requestMatchers("/h2-console/**").permitAll()
                // Rotte private
                .requestMatchers("/personal-area/**").authenticated()
                .requestMatchers("/auth/me").authenticated()
                // Backoffice e operazioni sensibili
                .requestMatchers("/api/users/backoffice/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/immobili/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/immobili/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/immobili/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/valutazioni/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/valutazioni/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/valutazioni/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/zone-prezzi/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/zone-prezzi/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/zone-prezzi/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/richieste/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/richieste/**").authenticated()
                .anyRequest().permitAll()
            )
            .formLogin(form -> form.disable());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(Arrays.asList(
                "http://localhost:5173",
                "http://localhost:3000"
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
