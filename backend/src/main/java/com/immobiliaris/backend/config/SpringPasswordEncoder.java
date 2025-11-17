package com.immobiliaris.backend.config;

import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Adapter per integrare la nostra `PasswordUtils` con Spring Security.
 *
 * Descrizione in italiano (chiara e concisa):
 * - L'app usa internamente `PasswordUtils` (PBKDF2) per generare e
 *   verificare gli hash delle password senza dipendenze esterne.
 * - Spring Security si aspetta un'implementazione di
 *   `org.springframework.security.crypto.password.PasswordEncoder`.
 * - Questa classe fa da ponte: quando Spring richiede di codificare
 *   una password chiama `encode(...)`, che delega a
 *   `PasswordUtils.hashPassword(...)`.
 * - Quando Spring verifica una password (compare raw vs encoded)
 *   chiama `matches(...)`, che delega a
 *   `PasswordUtils.verifyPassword(...)`.
 *
 * Motivazione:
 * - Evitiamo di cambiare il formato degli hash già salvati nel DB.
 * - Non introduciamo BCrypt o altre dipendenze: riusiamo la
 *   funzionalità PBKDF2 scritta in `PasswordUtils`.
 *
 * Note operative:
 * - `encode` restituisce `null` se la password raw è `null`.
 * - `matches` restituisce `false` se uno dei due valori è `null`.
 */
public class SpringPasswordEncoder implements PasswordEncoder {

    /**
     * Genera un hash della password in chiaro delegando a PasswordUtils.
     * Utilizzare questo metodo quando si salva una nuova password.
     */
    @Override
    public String encode(CharSequence rawPassword) {
        if (rawPassword == null) return null;
        return com.immobiliaris.backend.util.PasswordUtils.hashPassword(rawPassword.toString());
    }

    /**
     * Verifica se la password in chiaro corrisponde all'hash memorizzato.
     * Delegato a PasswordUtils.verifyPassword che applica PBKDF2.
     */
    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        if (rawPassword == null || encodedPassword == null) return false;
        return com.immobiliaris.backend.util.PasswordUtils.verifyPassword(rawPassword.toString(), encodedPassword);
    }
}
