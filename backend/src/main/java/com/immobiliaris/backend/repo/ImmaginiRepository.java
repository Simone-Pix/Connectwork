package com.immobiliaris.backend.repo;

import com.immobiliaris.backend.model.Immagini;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Repository JPA per Immagini.
 */
public interface ImmaginiRepository extends JpaRepository<Immagini, Long> {
    List<Immagini> findByImmobile_Id(Long immobileId);
}
