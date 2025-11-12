package com.immobiliaris.backend.repo;

import com.immobiliaris.backend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Repository JPA per Users. Interfaccia minimale che fornisce
 * operazioni CRUD e un metodo di utilità per trovare per email.
 */
public interface UsersRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);
}
