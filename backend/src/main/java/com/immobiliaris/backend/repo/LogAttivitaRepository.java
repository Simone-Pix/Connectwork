package com.immobiliaris.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.immobiliaris.backend.model.LogAttivita;

import java.util.List;

@Repository
public interface LogAttivitaRepository extends JpaRepository<LogAttivita, Long> {
    List<LogAttivita> findByUserId(Long userId);
    List<LogAttivita> findByImmobileId(Long immobileId);
    List<LogAttivita> findByAzioneContainingIgnoreCase(String azione);
}
