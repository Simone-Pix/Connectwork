================================================================================
  FLUSSO LOGICO VALUTAZIONE AUTOMATICA TRAMITE RICHIESTE
================================================================================

🔄 FLUSSO LOGICO COMPLETO

================================================================================
1️⃣ UTENTE → Configuratore (Frontend)
================================================================================

L'utente compila il form multi-step:

STEP 1-2 (Già esistenti):
- Tipo operazione (vendita/affitto)
- Indirizzo completo
- Superficie, stanze, bagni, piano

STEP 2-bis (NUOVO - Dati per valutazione):
- 📍 CAP (con validazione real-time)
- 🏙️ Città/Provincia (auto-compilate da CAP o manuali)
- 🏠 Tipo immobile (appartamento/villa/ufficio)
- 📅 Anno costruzione
- 🔧 Stato conservazione (da ristrutturare/buono/ottimo/lusso)
- ⚡ Classe energetica (A-G)

STEP 3-4 (Già esistenti):
- Optional/features
- Tempistica
- Contatti personali

SUBMIT → POST /api/richieste

Payload esempio:
{
  nome: "Mario",
  cognome: "Rossi",
  email: "mario@example.com",
  telefono: "3331234567",
  indirizzo: "Via Roma 15",
  tipoOperazione: "vendita",
  superficie: 85,
  stanze: 3,
  bagni: 2,
  piano: 2,
  // NUOVI CAMPI
  cap: "10121",
  citta: "Torino",
  provincia: "TO",
  tipoImmobile: "appartamento",
  annoCostruzione: 2005,
  statoConservazione: "buono",
  classeEnergetica: "C",
  // FINE NUOVI
  tempistica: "1-3 mesi",
  optionalInfo: "garage, terrazzo"
}

================================================================================
2️⃣ BACKEND → Salvataggio Richiesta
================================================================================

RichiesteController.java:

@PostMapping
public ResponseEntity<Richieste> createRichiesta(@RequestBody Richieste richiesta) {
    // Valida CAP (se presente, controlla se mappato)
    if (richiesta.getCap() != null) {
        zonePrezziRepository.findByCap(richiesta.getCap())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.BAD_REQUEST, 
                "CAP non supportato per valutazione automatica"
            ));
    }
    
    Richieste saved = richiesteRepository.save(richiesta);
    return ResponseEntity.ok(saved);
}

Record salvato in tabella `richieste` con TUTTI i dati necessari.

================================================================================
3️⃣ ADMIN → Backoffice (Visualizzazione)
================================================================================

L'admin vede la lista richieste in Backoffice.jsx:

ID | Nome         | Email            | Indirizzo      | CAP   | Azioni
---+-------------+------------------+----------------+-------+--------
45 | Mario Rossi | mario@example.com| Via Roma 15    | 10121 | [Valuta] [Converti] [Elimina]

INDICATORI VISIVI:
- ✅ Badge verde "Valutabile" se CAP presente
- ⚠️ Badge giallo "Incompleta" se CAP mancante
- 📊 Mostra città, superficie, tipo immobile

================================================================================
4️⃣ ADMIN → Genera Valutazione Automatica
================================================================================

Click su [Valuta] → chiama endpoint:

POST /api/richieste/{id}/valuta-automatica

@PostMapping("/{id}/valuta-automatica")
public ResponseEntity<ValutazioneDTO> valuaRichiesta(@PathVariable Long id) {
    Richieste richiesta = richiesteRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Richiesta non trovata"));
    
    // Verifica che abbia CAP
    if (richiesta.getCap() == null) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
            "CAP obbligatorio per valutazione");
    }
    
    // Lookup zona
    ZonePrezzi zona = zonePrezziRepository.findByCap(richiesta.getCap())
        .orElseThrow(() -> new RuntimeException("CAP non mappato"));
    
    // Calcolo base
    BigDecimal prezzoBase = zona.getPrezzoMqMedio();
    BigDecimal modificatore = calcolaModificatore(richiesta);
    BigDecimal prezzoFinale = prezzoBase.multiply(modificatore);
    
    // Valore totale
    BigDecimal valoreTotale = prezzoFinale.multiply(richiesta.getSuperficie());
    BigDecimal valoreMin = valoreTotale.multiply(new BigDecimal("0.95"));
    BigDecimal valoreMax = valoreTotale.multiply(new BigDecimal("1.05"));
    
    // Crea DTO risposta (non salva ancora)
    ValutazioneDTO valutazione = new ValutazioneDTO(
        valoreMin,
        valoreMax,
        prezzoFinale,
        generaNote(richiesta, zona, modificatore)
    );
    
    return ResponseEntity.ok(valutazione);
}

private BigDecimal calcolaModificatore(Richieste r) {
    BigDecimal mod = BigDecimal.ONE;
    
    // Stato conservazione
    if (r.getStatoConservazione() != null) {
        mod = mod.multiply(switch(r.getStatoConservazione()) {
            case "da_ristrutturare" -> new BigDecimal("0.85");
            case "buono" -> BigDecimal.ONE;
            case "ottimo" -> new BigDecimal("1.10");
            case "lusso" -> new BigDecimal("1.25");
            default -> BigDecimal.ONE;
        });
    }
    
    // Classe energetica
    if (r.getClasseEnergetica() != null) {
        mod = mod.multiply(switch(r.getClasseEnergetica()) {
            case "A" -> new BigDecimal("1.10");
            case "B" -> new BigDecimal("1.05");
            case "C" -> BigDecimal.ONE;
            case "D" -> new BigDecimal("0.95");
            case "E" -> new BigDecimal("0.90");
            case "F" -> new BigDecimal("0.85");
            case "G" -> new BigDecimal("0.80");
            default -> BigDecimal.ONE;
        });
    }
    
    // Anno costruzione
    if (r.getAnnoCostruzione() != null) {
        int anno = r.getAnnoCostruzione();
        if (anno < 1950) mod = mod.multiply(new BigDecimal("0.90"));
        else if (anno < 1981) mod = mod.multiply(new BigDecimal("0.95"));
        else if (anno < 2001) mod = mod.multiply(BigDecimal.ONE);
        else if (anno < 2011) mod = mod.multiply(new BigDecimal("1.05"));
        else mod = mod.multiply(new BigDecimal("1.10"));
    }
    
    // Piano
    Integer piano = r.getPiano();
    if (piano < 0) mod = mod.multiply(new BigDecimal("0.90"));
    else if (piano >= 1 && piano <= 3) mod = mod.multiply(new BigDecimal("1.05"));
    else if (piano >= 7) mod = mod.multiply(new BigDecimal("0.95"));
    
    return mod;
}

================================================================================
5️⃣ ADMIN → Visualizza Risultato
================================================================================

Modal o sidebar mostra:

╔══════════════════════════════════════════╗
║  VALUTAZIONE AUTOMATICA                  ║
╠══════════════════════════════════════════╣
║  Immobile: Via Roma 15, Torino           ║
║  Superficie: 85 mq                       ║
║  Zona: Centro (CAP 10121)                ║
║                                          ║
║  Prezzo base: €3.500/mq                  ║
║  Modificatore: +8% (stato, energia, ecc.)║
║  Prezzo finale: €3.780/mq                ║
║                                          ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ║
║  VALORE STIMATO:                         ║
║  €305.370 - €333.630                     ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ║
║                                          ║
║  [Conferma e Converti in Immobile]      ║
║  [Modifica Manualmente]                  ║
║  [Chiudi]                                ║
╚══════════════════════════════════════════╝

================================================================================
6️⃣ ADMIN → Conferma (Opzionale)
================================================================================

Se conferma, due opzioni:

OPZIONE A: Resta come Richiesta
- Salva valutazione in campo JSON/testo nella richiesta
- Rimane in stato "valutata"
- Admin invia email con stima al cliente

OPZIONE B: Converti in Immobile

POST /api/richieste/{id}/converti-immobile

@PostMapping("/{id}/converti-immobile")
public ResponseEntity<Immobili> convertiInImmobile(@PathVariable Long id) {
    Richieste richiesta = richiesteRepository.findById(id).orElseThrow();
    
    // Crea utente se non esiste
    Users proprietario = usersRepository.findByEmail(richiesta.getEmail())
        .orElseGet(() -> {
            Users newUser = new Users();
            newUser.setNome(richiesta.getNome());
            newUser.setCognome(richiesta.getCognome());
            newUser.setEmail(richiesta.getEmail());
            newUser.setTelefono(richiesta.getTelefono());
            newUser.setPassword(passwordEncoder.encode(generateTempPassword()));
            newUser.setRuolo("utente");
            return usersRepository.save(newUser);
        });
    
    // Crea immobile
    Immobili immobile = new Immobili();
    immobile.setProprietario(proprietario);
    immobile.setTipoImmobile(richiesta.getTipoImmobile());
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
    
    Immobili saved = immobiliRepository.save(immobile);
    
    // Genera valutazione automatica sull'immobile
    valutazioniService.generaValutazioneAutomatica(saved.getId());
    
    // Elimina richiesta (già processata)
    richiesteRepository.delete(richiesta);
    
    return ResponseEntity.ok(saved);
}

================================================================================
📊 VANTAGGI DI QUESTO FLUSSO
================================================================================

✅ Semplicità: Un solo form, un solo invio
✅ Flessibilità: Valutazione immediata o conversione successiva
✅ UX migliore: Utente compila tutto una volta
✅ Meno duplicazioni: Dati già completi sin da subito
✅ Backward compatible: Richieste vecchie (senza CAP) continuano a funzionare

================================================================================
⚠️ PUNTI DI ATTENZIONE
================================================================================

- CAP deve essere validato in real-time (mostra se zona supportata)
- Campi valutazione possono essere opzionali (richiesta funziona anche senza)
- Admin può comunque modificare manualmente la valutazione
- Features (garage, terrazzo) vanno parsate da optionalInfo o aggiungi tabella richieste_features

================================================================================
📋 MODIFICHE DA IMPLEMENTARE
================================================================================

DATABASE (schema.sql):
- Aggiungi campi a tabella richieste:
  * cap VARCHAR(10)
  * citta VARCHAR(100)
  * provincia VARCHAR(50)
  * tipo_immobile VARCHAR(50)
  * anno_costruzione SMALLINT
  * stato_conservazione VARCHAR(50)
  * classe_energetica VARCHAR(2)

BACKEND:
- Richieste.java: aggiungi attributi + getter/setter
- RichiesteController.java: aggiungi endpoint /valuta-automatica/{id}
- RichiesteController.java: aggiungi endpoint /converti-immobile/{id}
- Crea ValutazioneDTO.java per risposta valutazione

FRONTEND:
- Configurator.jsx: aggiungi step con nuovi campi
- ComponentStep2bis.jsx (NUOVO): form CAP, città, tipo, anno, stato, classe
- Backoffice.jsx: aggiungi pulsante [Valuta] per ogni richiesta
- ModalValutazione.jsx (NUOVO): mostra risultato valutazione
- Validazione CAP real-time: fetch /api/zone-prezzi/cap/{cap}

================================================================================
Fine documento
================================================================================
