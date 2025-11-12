package com.immobiliaris.backend.service;

import com.immobiliaris.backend.dto.ImmobileCreateDTO;
import com.immobiliaris.backend.dto.ImmobiliDTO;
import com.immobiliaris.backend.model.Immobili;
import com.immobiliaris.backend.model.ImmobiliFeatures;
import com.immobiliaris.backend.model.Users;
import com.immobiliaris.backend.repo.ImmobiliRepository;
import com.immobiliaris.backend.repo.ImmobiliFeaturesRepository;
import com.immobiliaris.backend.repo.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service per la gestione degli Immobili.
 * Contiene tutta la logica di business per le operazioni CRUD.
 */
@Service
public class ImmobiliService {

    @Autowired
    private ImmobiliRepository immobiliRepository;

    @Autowired
    private ImmobiliFeaturesRepository immobiliFeaturesRepository;

    @Autowired
    private UsersRepository usersRepository;

    /**
     * Recupera tutti gli immobili.
     * @return Lista di ImmobiliDTO
     */
    public List<ImmobiliDTO> getAllImmobili() {
        List<Immobili> immobili = immobiliRepository.findAll();
        return immobili.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Recupera un immobile per ID.
     * @param id ID dell'immobile
     * @return ImmobileDTO
     * @throws RuntimeException se l'immobile non esiste
     */
    public ImmobiliDTO getImmobileById(Long id) {
        Immobili immobile = immobiliRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Immobile non trovato con id: " + id));
        return convertToDTO(immobile);
    }

    /**
     * Crea un nuovo immobile.
     * @param createDTO Dati dell'immobile da creare
     * @return ImmobileDTO dell'immobile creato
     * @throws RuntimeException se il proprietario non esiste
     */
    @Transactional
    public ImmobiliDTO createImmobile(ImmobileCreateDTO createDTO) {
        // Verifica che il proprietario esista
        Users proprietario = usersRepository.findById(createDTO.getProprietarioId())
                .orElseThrow(() -> new RuntimeException("Proprietario non trovato con id: " + createDTO.getProprietarioId()));

        // Crea l'entità Immobile
        Immobili immobile = new Immobili();
        immobile.setProprietario(proprietario);
        immobile.setTipoImmobile(createDTO.getTipoImmobile());
        immobile.setIndirizzo(createDTO.getIndirizzo());
        immobile.setCitta(createDTO.getCitta());
        immobile.setProvincia(createDTO.getProvincia());
        immobile.setCap(createDTO.getCap());
        immobile.setSuperficie(createDTO.getSuperficie());
        immobile.setNumLocali(createDTO.getNumLocali());
        immobile.setNumBagni(createDTO.getNumBagni());
        immobile.setPiano(createDTO.getPiano());
        immobile.setAnnoCostruzione(createDTO.getAnnoCostruzione());
        immobile.setStatoConservazione(createDTO.getStatoConservazione());
        immobile.setClasseEnergetica(createDTO.getClasseEnergetica());
        immobile.setPrezzoRichiesto(createDTO.getPrezzoRichiesto());
        immobile.setDescrizione(createDTO.getDescrizione());
        immobile.setDisponibileEsclusiva(createDTO.getDisponibileEsclusiva());
        immobile.setStato(createDTO.getStato() != null ? createDTO.getStato() : "bozza");
        immobile.setDataInserimento(LocalDateTime.now());

        // Salva l'immobile
        Immobili savedImmobile = immobiliRepository.save(immobile);

        // Gestisci le features se presenti
        if (createDTO.getFeatures() != null && !createDTO.getFeatures().isEmpty()) {
            for (String featureTipo : createDTO.getFeatures()) {
                ImmobiliFeatures feature = new ImmobiliFeatures();
                feature.setImmobile(savedImmobile);
                feature.setFeatureTipo(featureTipo);
                immobiliFeaturesRepository.save(feature);
            }
        }

        return convertToDTO(savedImmobile);
    }

    /**
     * Aggiorna un immobile esistente.
     * @param id ID dell'immobile da aggiornare
     * @param createDTO Nuovi dati dell'immobile
     * @return ImmobileDTO aggiornato
     * @throws RuntimeException se l'immobile non esiste
     */
    @Transactional
    public ImmobiliDTO updateImmobile(Long id, ImmobileCreateDTO createDTO) {
        // Verifica che l'immobile esista
        Immobili immobile = immobiliRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Immobile non trovato con id: " + id));

        // Verifica che il proprietario esista (se viene modificato)
        if (createDTO.getProprietarioId() != null && !createDTO.getProprietarioId().equals(immobile.getProprietario().getId())) {
            Users nuovoProprietario = usersRepository.findById(createDTO.getProprietarioId())
                    .orElseThrow(() -> new RuntimeException("Proprietario non trovato con id: " + createDTO.getProprietarioId()));
            immobile.setProprietario(nuovoProprietario);
        }

        // Aggiorna i campi
        immobile.setTipoImmobile(createDTO.getTipoImmobile());
        immobile.setIndirizzo(createDTO.getIndirizzo());
        immobile.setCitta(createDTO.getCitta());
        immobile.setProvincia(createDTO.getProvincia());
        immobile.setCap(createDTO.getCap());
        immobile.setSuperficie(createDTO.getSuperficie());
        immobile.setNumLocali(createDTO.getNumLocali());
        immobile.setNumBagni(createDTO.getNumBagni());
        immobile.setPiano(createDTO.getPiano());
        immobile.setAnnoCostruzione(createDTO.getAnnoCostruzione());
        immobile.setStatoConservazione(createDTO.getStatoConservazione());
        immobile.setClasseEnergetica(createDTO.getClasseEnergetica());
        immobile.setPrezzoRichiesto(createDTO.getPrezzoRichiesto());
        immobile.setDescrizione(createDTO.getDescrizione());
        immobile.setDisponibileEsclusiva(createDTO.getDisponibileEsclusiva());
        immobile.setStato(createDTO.getStato());

        // Salva l'immobile
        Immobili updatedImmobile = immobiliRepository.save(immobile);

        // Aggiorna le features: elimina le vecchie e crea le nuove
        if (createDTO.getFeatures() != null) {
            // Elimina le features esistenti
            List<ImmobiliFeatures> oldFeatures = immobiliFeaturesRepository.findByImmobileId(id);
            immobiliFeaturesRepository.deleteAll(oldFeatures);

            // Crea le nuove features
            for (String featureTipo : createDTO.getFeatures()) {
                ImmobiliFeatures feature = new ImmobiliFeatures();
                feature.setImmobile(updatedImmobile);
                feature.setFeatureTipo(featureTipo);
                immobiliFeaturesRepository.save(feature);
            }
        }

        return convertToDTO(updatedImmobile);
    }

    /**
     * Elimina un immobile per ID.
     * @param id ID dell'immobile da eliminare
     * @throws RuntimeException se l'immobile non esiste
     */
    @Transactional
    public void deleteImmobile(Long id) {
        Immobili immobile = immobiliRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Immobile non trovato con id: " + id));

        // Elimina prima le features associate (per evitare problemi di foreign key)
        List<ImmobiliFeatures> features = immobiliFeaturesRepository.findByImmobileId(id);
        immobiliFeaturesRepository.deleteAll(features);

        // Elimina l'immobile
        immobiliRepository.delete(immobile);
    }

    /**
     * Recupera immobili per proprietario.
     * @param proprietarioId ID del proprietario
     * @return Lista di ImmobileDTO
     */
    public List<ImmobiliDTO> getImmobiliByProprietario(Long proprietarioId) {
        List<Immobili> immobili = immobiliRepository.findByProprietarioId(proprietarioId);
        return immobili.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Recupera immobili per città.
     * @param citta Nome della città
     * @return Lista di ImmobiliDTO
     */
    public List<ImmobiliDTO> getImmobiliByCitta(String citta) {
        List<Immobili> immobili = immobiliRepository.findByCitta(citta);
        return immobili.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Recupera immobili per stato.
     * @param stato Stato dell'immobile (es. "bozza", "pubblicato")
     * @return Lista di ImmobiliDTO
     */
    public List<ImmobiliDTO> getImmobiliByStato(String stato) {
        List<Immobili> immobili = immobiliRepository.findByStato(stato);
        return immobili.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // ========== METODI PRIVATI DI CONVERSIONE ==========

    /**
     * Converte un'entità Immobile in ImmobileDTO.
     * Include anche le features associate.
     * @param immobile Entità da convertire
     * @return ImmobileDTO
     */
    private ImmobiliDTO convertToDTO(Immobili immobile) {
        ImmobiliDTO dto = new ImmobiliDTO();
        dto.setId(immobile.getId());
        dto.setProprietarioId(immobile.getProprietario().getId());
        dto.setProprietarioNome(immobile.getProprietario().getNome() + " " + immobile.getProprietario().getCognome());
        dto.setTipoImmobile(immobile.getTipoImmobile());
        dto.setIndirizzo(immobile.getIndirizzo());
        dto.setCitta(immobile.getCitta());
        dto.setProvincia(immobile.getProvincia());
        dto.setCap(immobile.getCap());
        dto.setSuperficie(immobile.getSuperficie());
        dto.setNumLocali(immobile.getNumLocali());
        dto.setNumBagni(immobile.getNumBagni());
        dto.setPiano(immobile.getPiano());
        dto.setAnnoCostruzione(immobile.getAnnoCostruzione());
        dto.setStatoConservazione(immobile.getStatoConservazione());
        dto.setClasseEnergetica(immobile.getClasseEnergetica());
        dto.setPrezzoRichiesto(immobile.getPrezzoRichiesto());
        dto.setDescrizione(immobile.getDescrizione());
        dto.setDisponibileEsclusiva(immobile.getDisponibileEsclusiva());
        dto.setStato(immobile.getStato());
        dto.setDataInserimento(immobile.getDataInserimento());

        // Recupera le features associate
        List<ImmobiliFeatures> features = immobiliFeaturesRepository.findByImmobileId(immobile.getId());
        List<String> featuresList = features.stream()
                .map(ImmobiliFeatures::getFeatureTipo)
                .collect(Collectors.toList());
        dto.setFeatures(featuresList);

        return dto;
    }
}