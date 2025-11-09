package com.immobiliaris.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.immobiliaris.backend.model.LogAttivita;
import com.immobiliaris.backend.service.LogAttivitaService;

import java.util.List;

@RestController
@RequestMapping("/api/log")
public class LogAttivitaController {

    @Autowired
    private LogAttivitaService logAttivitaService;

    @GetMapping
    public List<LogAttivita> getAllLog() {
        return logAttivitaService.getAllLog();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LogAttivita> getLogById(@PathVariable Long id) {
        return logAttivitaService.getLogById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<LogAttivita> getLogByUser(@PathVariable Long userId) {
        return logAttivitaService.getLogByUser(userId);
    }


/*  da capire se inserire o no (collegato al blocco commentato in LogAttivitaService)

    @GetMapping("/immobile/{immobileId}")
    public List<LogAttivita> getLogByImmobile(@PathVariable Long immobileId) {
        return logAttivitaService.getLogByImmobile(immobileId);
    }
*/



    @PostMapping
    public ResponseEntity<LogAttivita> creaLog(@RequestBody LogAttivita log) {
        LogAttivita nuovo = logAttivitaService.creaLog(log);
        return ResponseEntity.ok(nuovo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminaLog(@PathVariable Long id) {
        logAttivitaService.eliminaLog(id);
        return ResponseEntity.noContent().build();
    }
}
