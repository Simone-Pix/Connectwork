package com.immobiliaris.backend.service;

import com.immobiliaris.backend.model.Immobili;
import com.immobiliaris.backend.model.Richieste;
import com.immobiliaris.backend.model.Users;
import com.immobiliaris.backend.model.Valutazioni;
import com.immobiliaris.backend.repo.ImmobiliRepository;
import com.immobiliaris.backend.repo.RichiesteRepository;
import com.immobiliaris.backend.repo.UsersRepository;
import com.immobiliaris.backend.repo.ValutazioniRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.util.Optional;

/**
 * Service per la conversione di richieste in immobili.
 * Gestisce la creazione di utenti se necessario e la migrazione dei dati.
 */
@Service
public class RichiesteConversioneService {

    @Autowired
    private RichiesteRepository richiesteRepository;

    @Autowired
    private ImmobiliRepository immobiliRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private ValutazioniRepository valutazioniRepository;

    @Autowired
    private ValutazioniServiceImpl valutazioniService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    private static final SecureRandom random = new SecureRandom();

    /**
     * Converte una richiesta in un immobile completo.
     * Crea l'utente se non esiste, poi crea l'immobile e genera la valutazione.
     * Infine elimina la richiesta originale.
     */
    @Transactional
    public Immobili convertiRichiestaInImmobile(Long richiestaId) {
        // Recupera richiesta
        Richieste richiesta = richiesteRepository.findById(richiestaId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Richiesta non trovata con id: " + richiestaId
                ));

        // Verifica che abbia CAP (necessario per valutazione)
        if (richiesta.getCap() == null || richiesta.getCap().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "La richiesta deve avere un CAP per essere convertita in immobile"
            );
        }

        // Trova o crea utente
        Users proprietario = trovaOCreaUtente(richiesta);

        // Crea immobile
        Immobili immobile = creaImmobileDaRichiesta(richiesta, proprietario);
        Immobili saved = immobiliRepository.save(immobile);

        // Recupera e aggiorna valutazione esistente (se presente)
        try {
            Optional<Valutazioni> valutazioneEsistente = valutazioniRepository.findByRichiestaId(richiestaId);
            
            if (valutazioneEsistente.isPresent()) {
                // Aggiorna valutazione esistente associandola all'immobile
                Valutazioni valutazione = valutazioneEsistente.get();
                valutazione.setImmobile(saved);
                valutazione.setRichiestaId(null); // Rimuovi riferimento alla richiesta
                valutazioniRepository.save(valutazione);
                
                // Aggiorna stato immobile a "valutato"
                saved.setStato("valutato");
                immobiliRepository.save(saved);
            } else {
                // Se non esiste valutazione, creane una nuova
                valutazioniService.generaValutazioneAutomatica(saved.getId());
            }
        } catch (Exception e) {
            // Valutazione opzionale, non blocca la conversione
                System.err.println("Errore nell'aggiornamento valutazione: " + e.getMessage());
        }

        // NON elimina la richiesta - deve rimanere visibile nella PersonalArea dell'utente

        return saved;
    }    /**
     * Trova utente esistente per email o ne crea uno nuovo con password temporanea.
     */
    private Users trovaOCreaUtente(Richieste richiesta) {
        Optional<Users> existing = usersRepository.findByEmail(richiesta.getEmail());

        if (existing.isPresent()) {
            return existing.get();
        }

        // Crea nuovo utente
        Users newUser = new Users();
        newUser.setNome(richiesta.getNome());
        newUser.setCognome(richiesta.getCognome());
        newUser.setEmail(richiesta.getEmail());
        newUser.setTelefono(richiesta.getTelefono());
        newUser.setPassword(passwordEncoder.encode(generaPasswordTemporanea()));
        newUser.setRuolo("utente");
        newUser.setVerificato(false);

        return usersRepository.save(newUser);
    }

    /**
     * Crea un immobile a partire dai dati della richiesta.
     */
    private Immobili creaImmobileDaRichiesta(Richieste richiesta, Users proprietario) {
        Immobili immobile = new Immobili();

        immobile.setProprietario(proprietario);
        immobile.setTipoImmobile(richiesta.getTipoImmobile() != null ? 
                richiesta.getTipoImmobile() : "appartamento");
        immobile.setIndirizzo(richiesta.getIndirizzo());
        immobile.setCitta(richiesta.getCitta());
        immobile.setProvincia(richiesta.getProvincia());
        immobile.setCap(richiesta.getCap());
        immobile.setSuperficie(richiesta.getSuperficie());
        immobile.setNumLocali(richiesta.getStanze());
        immobile.setNumBagni(richiesta.getBagni());
        immobile.setPiano(richiesta.getPiano());
        immobile.setAnnoCostruzione(richiesta.getAnnoCostruzione());
        immobile.setStatoConservazione(richiesta.getStatoConservazione());
        immobile.setClasseEnergetica(richiesta.getClasseEnergetica());
        immobile.setStato("bozza");

        // Aggiungi note dalle optional_info
        if (richiesta.getOptionalInfo() != null && !richiesta.getOptionalInfo().isBlank()) {
            immobile.setDescrizione("Convertito da richiesta.\nInformazioni aggiuntive: " 
                    + richiesta.getOptionalInfo());
        }

        return immobile;
    }

    /**
     * Genera una password temporanea casuale di 12 caratteri.
     */
    private String generaPasswordTemporanea() {
        StringBuilder sb = new StringBuilder(12);
        for (int i = 0; i < 12; i++) {
            sb.append(CHARS.charAt(random.nextInt(CHARS.length())));
        }
        return sb.toString();
    }
}
