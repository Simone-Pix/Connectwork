package com.immobiliaris.backend.repo;

import com.immobiliaris.backend.model.Valutazioni;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ValutazioniRepository extends JpaRepository<Valutazioni, Long> {
    List<Valutazioni> findByImmobileId(Long immobileId);
}
