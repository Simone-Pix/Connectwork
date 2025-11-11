package com.immobiliaris.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.immobiliaris.backend.model.LogAttivita;
import com.immobiliaris.backend.repo.LogAttivitaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class LogAttivitaService {

    @Autowired
    private LogAttivitaRepository logAttivitaRepository;

    // Recupera tutti i log
    public List<LogAttivita> getAllLog() {
        return logAttivitaRepository.findAll();
    }

    // Recupera log per utente
    public List<LogAttivita> getLogByUser(Long userId) {
        return logAttivitaRepository.findByUserId(userId);
    }


    

    // Recupera log per immobile
    public List<LogAttivita> getLogByImmobile(Long immobileId) {
        return logAttivitaRepository.findByImmobileId(immobileId);
    }




    // Recupera un log per ID
    public Optional<LogAttivita> getLogById(Long id) {
        return logAttivitaRepository.findById(id);
    }

    // Crea un nuovo log
    public LogAttivita creaLog(LogAttivita log) {
        return logAttivitaRepository.save(log);
    }

    // Elimina un log
    public void eliminaLog(Long id) {
        logAttivitaRepository.deleteById(id);
    }
}
