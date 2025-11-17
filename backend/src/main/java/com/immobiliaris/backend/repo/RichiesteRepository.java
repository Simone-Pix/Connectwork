package com.immobiliaris.backend.repo;

import com.immobiliaris.backend.model.Richieste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository JPA per Richieste.
 * Fornisce operazioni CRUD e metodi di ricerca personalizzati.
 */
@Repository
public interface RichiesteRepository extends JpaRepository<Richieste, Long> {
    
    /**
     * Trova tutte le richieste per email.
     */
    List<Richieste> findByEmail(String email);
    
    /**
     * Trova tutte le richieste per tipo di operazione.
     */
    List<Richieste> findByTipoOperazione(String tipoOperazione);
    
    /**
     * Trova tutte le richieste per tempistica.
     */
    List<Richieste> findByTempistica(String tempistica);
    
    /**
     * Trova tutte le richieste con numero di stanze >= al valore specificato.
     */
    List<Richieste> findByStanzeGreaterThanEqual(Integer stanze);
    
    /**
     * Trova tutte le richieste per nome e cognome (ricerca per anagrafica).
     */
    List<Richieste> findByNomeAndCognome(String nome, String cognome);
}