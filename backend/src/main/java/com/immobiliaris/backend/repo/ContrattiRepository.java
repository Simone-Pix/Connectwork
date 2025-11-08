package com.immobiliaris.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.immobiliaris.backend.model.Contratti;

import java.util.List;

@Repository
public interface ContrattiRepository extends JpaRepository<Contratti, Long> {

    // Trova tutti i contratti di un certo immobile
    List<Contratti> findByImmobileId(Long immobileId);

    // Trova tutti i contratti associati a un proprietario
    List<Contratti> findByProprietarioId(Long proprietarioId);

    // Trova contratti filtrati per stato
    List<Contratti> findByStato(String stato);

    // Trova contratti filtrati per tipo (esclusiva/mandato)
    List<Contratti> findByTipo(String tipo);
}
