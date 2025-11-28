package com.immobiliaris.backend.repo;

import com.immobiliaris.backend.model.Valutazioni;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ValutazioniRepository extends JpaRepository<Valutazioni, Long> {
    List<Valutazioni> findByImmobileId(Long immobileId);
    Optional<Valutazioni> findByRichiestaId(Long richiestaId);
    List<Valutazioni> findAllByRichiestaId(Long richiestaId);
}
