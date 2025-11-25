package com.immobiliaris.backend.service;

import com.immobiliaris.backend.model.Immobili;
import com.immobiliaris.backend.model.ImmobiliFeatures;
import com.immobiliaris.backend.model.Valutazioni;
import com.immobiliaris.backend.model.ZonePrezzi;
import com.immobiliaris.backend.repo.ImmobiliFeaturesRepository;
import com.immobiliaris.backend.repo.ImmobiliRepository;
import com.immobiliaris.backend.repo.ValutazioniRepository;
import com.immobiliaris.backend.repo.ZonePrezziRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Implementazione del servizio di valutazione immobiliare.
 * Calcola il valore stimato di un immobile basandosi su:
 * - Prezzo medio al mq della zona (CAP)
 * - Modificatori basati sulle caratteristiche (features, stato conservazione, classe energetica, piano, ecc.)
 */
@Service
public class ValutazioniServiceImpl implements ValutazioniService {

    @Autowired
    private ValutazioniRepository valutazioniRepository;

    @Autowired
    private ImmobiliRepository immobiliRepository;

    @Autowired
    private ZonePrezziRepository zonePrezziRepository;

    @Autowired
    private ImmobiliFeaturesRepository immobiliFeaturesRepository;

    @Override
    @Transactional
    public Valutazioni createValutazione(Valutazioni valutazione) {
        valutazione.setDataValutazione(LocalDateTime.now());
        return valutazioniRepository.save(valutazione);
    }

    @Override
    @Transactional
    public Valutazioni save(Valutazioni valutazione) {
        return valutazioniRepository.save(valutazione);
    }

    @Override
    public List<Valutazioni> getAllValutazioni() {
        return valutazioniRepository.findAll();
    }

    @Override
    public Valutazioni getValutazioneById(Long id) {
        return valutazioniRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Valutazione non trovata con id: " + id));
    }

    @Override
    @Transactional
    public Valutazioni updateValutazione(Long id, Valutazioni valutazione) {
        Valutazioni existing = getValutazioneById(id);
        existing.setValoreStimatoMin(valutazione.getValoreStimatoMin());
        existing.setValoreStimatoMax(valutazione.getValoreStimatoMax());
        existing.setPrezzoMq(valutazione.getPrezzoMq());
        existing.setNote(valutazione.getNote());
        return valutazioniRepository.save(existing);
    }

    @Override
    @Transactional
    public Valutazioni deleteValutazione(Long id) {
        Valutazioni valutazione = getValutazioneById(id);
        valutazioniRepository.delete(valutazione);
        return valutazione;
    }

    /**
     * Genera una valutazione automatica per un immobile basandosi sul CAP e sui modificatori.
     * 
     * @param immobileId ID dell'immobile da valutare
     * @return Valutazione creata e salvata
     * @throws RuntimeException se l'immobile non esiste o il CAP non è mappato
     */
    @Transactional
    public Valutazioni generaValutazioneAutomatica(Long immobileId) {
        // Recupera l'immobile
        Immobili immobile = immobiliRepository.findById(immobileId)
                .orElseThrow(() -> new RuntimeException("Immobile non trovato con id: " + immobileId));

        // Recupera il prezzo base per CAP
        ZonePrezzi zona = zonePrezziRepository.findByCap(immobile.getCap())
                .orElseThrow(() -> new RuntimeException("CAP non mappato nel sistema di valutazione: " + immobile.getCap()));

        BigDecimal prezzoBaseAlMq = zona.getPrezzoMqMedio();

        // Calcola il modificatore totale
        BigDecimal modificatoreTotale = calcolaModificatore(immobile);

        // Applica il modificatore al prezzo base
        BigDecimal prezzoFinaleAlMq = prezzoBaseAlMq.multiply(modificatoreTotale)
                .setScale(2, RoundingMode.HALF_UP);

        // Calcola il valore totale (superficie * prezzo al mq)
        BigDecimal valoreTotale = prezzoFinaleAlMq.multiply(immobile.getSuperficie())
                .setScale(2, RoundingMode.HALF_UP);

        // Crea range min/max (±5%)
        BigDecimal cinquePercento = new BigDecimal("0.05");
        BigDecimal valoreStimatoMin = valoreTotale.multiply(BigDecimal.ONE.subtract(cinquePercento))
                .setScale(2, RoundingMode.HALF_UP);
        BigDecimal valoreStimatoMax = valoreTotale.multiply(BigDecimal.ONE.add(cinquePercento))
                .setScale(2, RoundingMode.HALF_UP);

        // Crea la valutazione
        Valutazioni valutazione = new Valutazioni();
        valutazione.setImmobile(immobile);
        valutazione.setPrezzoMq(prezzoFinaleAlMq);
        valutazione.setValoreStimatoMin(valoreStimatoMin);
        valutazione.setValoreStimatoMax(valoreStimatoMax);
        valutazione.setNote(generaNote(immobile, zona, modificatoreTotale));
        valutazione.setDataValutazione(LocalDateTime.now());

        // Salva e restituisce
        Valutazioni saved = valutazioniRepository.save(valutazione);

        // Aggiorna lo stato dell'immobile a "valutato"
        immobile.setStato("valutato");
        immobiliRepository.save(immobile);

        return saved;
    }

    /**
     * Calcola il modificatore totale basandosi sulle caratteristiche dell'immobile.
     * Il modificatore è un valore moltiplicativo (1.0 = nessuna modifica).
     * 
     * Modificatori considerati:
     * - Stato conservazione: da_ristrutturare (-15%), buono (0%), ottimo (+10%), lusso (+25%)
     * - Classe energetica: A (+10%), B (+5%), C (0%), D (-5%), E (-10%), F (-15%), G (-20%)
     * - Piano: interrato/seminterrato (-10%), piano terra (0%), 1-3 (+5%), 4-6 (0%), 7+ (-5%)
     * - Anno costruzione: prima del 1950 (-10%), 1950-1980 (-5%), 1981-2000 (0%), 2001-2010 (+5%), dopo 2010 (+10%)
     * - Features: giardino (+8%), garage (+5%), terrazzo (+7%), ascensore (+3%), condizionatore (+3%), 
     *             allarme (+2%), arredato (+5%), vista (+5%), accessibile_disabili (+3%)
     * 
     * @param immobile L'immobile da valutare
     * @return Modificatore moltiplicativo (es. 1.15 = +15%, 0.85 = -15%)
     */
    private BigDecimal calcolaModificatore(Immobili immobile) {
        BigDecimal modificatore = BigDecimal.ONE; // Partiamo da 1.0 (100%)

        // 1. Stato di conservazione
        modificatore = modificatore.multiply(getModificatoreStatoConservazione(immobile.getStatoConservazione()));

        // 2. Classe energetica
        modificatore = modificatore.multiply(getModificatoreClasseEnergetica(immobile.getClasseEnergetica()));

        // 3. Piano
        modificatore = modificatore.multiply(getModificatorePiano(immobile.getPiano()));

        // 4. Anno di costruzione
        modificatore = modificatore.multiply(getModificatoreAnnoCostruzione(immobile.getAnnoCostruzione()));

        // 5. Features
        List<ImmobiliFeatures> features = immobiliFeaturesRepository.findByImmobileId(immobile.getId());
        modificatore = modificatore.multiply(getModificatoreFeatures(features));

        return modificatore.setScale(4, RoundingMode.HALF_UP);
    }

    private BigDecimal getModificatoreStatoConservazione(String stato) {
        if (stato == null) return BigDecimal.ONE;
        return switch (stato.toLowerCase()) {
            case "da_ristrutturare" -> new BigDecimal("0.85");  // -15%
            case "buono" -> BigDecimal.ONE;                      // 0%
            case "ottimo" -> new BigDecimal("1.10");             // +10%
            case "lusso" -> new BigDecimal("1.25");              // +25%
            default -> BigDecimal.ONE;
        };
    }

    private BigDecimal getModificatoreClasseEnergetica(String classe) {
        if (classe == null) return BigDecimal.ONE;
        return switch (classe.toUpperCase()) {
            case "A" -> new BigDecimal("1.10");   // +10%
            case "B" -> new BigDecimal("1.05");   // +5%
            case "C" -> BigDecimal.ONE;           // 0%
            case "D" -> new BigDecimal("0.95");   // -5%
            case "E" -> new BigDecimal("0.90");   // -10%
            case "F" -> new BigDecimal("0.85");   // -15%
            case "G" -> new BigDecimal("0.80");   // -20%
            default -> BigDecimal.ONE;
        };
    }

    private BigDecimal getModificatorePiano(Integer piano) {
        if (piano == null) return BigDecimal.ONE;
        if (piano < 0) return new BigDecimal("0.90");           // Interrato/seminterrato -10%
        if (piano == 0) return BigDecimal.ONE;                  // Piano terra 0%
        if (piano >= 1 && piano <= 3) return new BigDecimal("1.05"); // Piani bassi +5%
        if (piano >= 4 && piano <= 6) return BigDecimal.ONE;    // Piani medi 0%
        return new BigDecimal("0.95");                          // Piani alti -5%
    }

    private BigDecimal getModificatoreAnnoCostruzione(Integer anno) {
        if (anno == null) return BigDecimal.ONE;
        if (anno < 1950) return new BigDecimal("0.90");         // -10%
        if (anno < 1981) return new BigDecimal("0.95");         // -5%
        if (anno < 2001) return BigDecimal.ONE;                 // 0%
        if (anno < 2011) return new BigDecimal("1.05");         // +5%
        return new BigDecimal("1.10");                          // +10%
    }

    private BigDecimal getModificatoreFeatures(List<ImmobiliFeatures> features) {
        BigDecimal modificatore = BigDecimal.ONE;
        
        for (ImmobiliFeatures feature : features) {
            String tipo = feature.getFeatureTipo().toLowerCase();
            modificatore = modificatore.multiply(switch (tipo) {
                case "giardino" -> new BigDecimal("1.08");           // +8%
                case "garage" -> new BigDecimal("1.05");             // +5%
                case "terrazzo" -> new BigDecimal("1.07");           // +7%
                case "ascensore" -> new BigDecimal("1.03");          // +3%
                case "condizionatore" -> new BigDecimal("1.03");     // +3%
                case "allarme" -> new BigDecimal("1.02");            // +2%
                case "arredato" -> new BigDecimal("1.05");           // +5%
                case "vista" -> new BigDecimal("1.05");              // +5%
                case "accessibile_disabili" -> new BigDecimal("1.03"); // +3%
                case "riscaldamento" -> new BigDecimal("1.02");      // +2%
                default -> BigDecimal.ONE;
            });
        }
        
        return modificatore;
    }

    /**
     * Genera note descrittive per la valutazione
     */
    private String generaNote(Immobili immobile, ZonePrezzi zona, BigDecimal modificatore) {
        StringBuilder note = new StringBuilder();
        note.append("Valutazione automatica generata il ").append(LocalDateTime.now().toLocalDate()).append(".\n\n");
        note.append("Zona: ").append(zona.getZonaNome()).append(" (").append(zona.getCitta()).append(" - CAP ").append(zona.getCap()).append(")\n");
        note.append("Prezzo base zona: €").append(zona.getPrezzoMqMedio()).append("/mq\n");
        note.append("Superficie: ").append(immobile.getSuperficie()).append(" mq\n\n");
        
        BigDecimal percentualeModifica = modificatore.subtract(BigDecimal.ONE).multiply(new BigDecimal("100"));
        note.append("Modificatore applicato: ");
        if (percentualeModifica.compareTo(BigDecimal.ZERO) > 0) {
            note.append("+");
        }
        note.append(percentualeModifica.setScale(1, RoundingMode.HALF_UP)).append("%\n\n");
        
        note.append("Fattori considerati:\n");
        if (immobile.getStatoConservazione() != null) {
            note.append("- Stato conservazione: ").append(immobile.getStatoConservazione()).append("\n");
        }
        if (immobile.getClasseEnergetica() != null) {
            note.append("- Classe energetica: ").append(immobile.getClasseEnergetica()).append("\n");
        }
        if (immobile.getPiano() != null) {
            note.append("- Piano: ").append(immobile.getPiano()).append("\n");
        }
        if (immobile.getAnnoCostruzione() != null) {
            note.append("- Anno costruzione: ").append(immobile.getAnnoCostruzione()).append("\n");
        }
        
        List<ImmobiliFeatures> features = immobiliFeaturesRepository.findByImmobileId(immobile.getId());
        if (!features.isEmpty()) {
            note.append("- Features: ");
            note.append(features.stream()
                    .map(ImmobiliFeatures::getFeatureTipo)
                    .reduce((a, b) -> a + ", " + b)
                    .orElse("nessuna"));
            note.append("\n");
        }
        
        return note.toString();
    }
}
