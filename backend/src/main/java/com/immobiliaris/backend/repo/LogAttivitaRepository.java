package com.immobiliaris.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.immobiliaris.backend.model.LogAttivita;

import java.util.List;

@Repository
public interface LogAttivitaRepository extends JpaRepository<LogAttivita, Long> {

    // Corretto: filtra per l'id dell'utente associato
    List<LogAttivita> findByUtente_Id(Long id);

    // Corretto: filtra per l'id dell'immobile associato
    List<LogAttivita> findByImmobile_Id(Long id);

    // Questo va bene così, perché il campo "azione" esiste nel model
    List<LogAttivita> findByAzioneContainingIgnoreCase(String azione);
}
