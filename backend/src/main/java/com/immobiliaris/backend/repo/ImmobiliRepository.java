package com.immobiliaris.backend.repo;

import com.immobiliaris.backend.model.Immobili;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository JPA per l'entità Immobili.
 * Fornisce operazioni CRUD standard estendendo JpaRepository.
 */
public interface ImmobiliRepository extends JpaRepository<Immobili, Long> {

}
