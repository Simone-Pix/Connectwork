package com.immobiliaris.backend.repo;

import com.immobiliaris.backend.model.ZonePrezzi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ZonePrezziRepository extends JpaRepository<ZonePrezzi, Long> {
    
    /**
     * Trova la zona/prezzo per un CAP specifico
     */
    Optional<ZonePrezzi> findByCap(String cap);
    
    /**
     * Verifica se esiste una zona per un determinato CAP
     */
    boolean existsByCap(String cap);
}
