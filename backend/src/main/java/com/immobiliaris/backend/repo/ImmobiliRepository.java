package com.immobiliaris.backend.repo;

import com.immobiliaris.backend.model.Immobili;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ImmobiliRepository extends JpaRepository<Immobili, Long> {
    
    // Query methods personalizzate (Spring le implementa automaticamente)
    List<Immobili> findByProprietarioId(Long proprietarioId);
    List<Immobili> findByStato(String stato);
    List<Immobili> findByCitta(String citta);
}