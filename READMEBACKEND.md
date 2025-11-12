# Documentazione: Separazione tra DTO di Input e Output (`ImmobileCreateDTO` e `ImmobiliDTO`)

## Perché separare i DTO di input e output?

Nel design di API REST moderne, è considerata una best practice separare i Data Transfer Object (DTO) usati per la creazione/aggiornamento delle risorse (input) da quelli usati per la lettura (output). Questo approccio offre numerosi vantaggi in termini di sicurezza, manutenibilità e chiarezza del codice.

### Vantaggi principali

- **Sicurezza:**  
  L’utente non può forzare valori di campi che devono essere gestiti solo dal backend (es. id, data di inserimento, proprietà calcolate).  
  → `ImmobileCreateDTO` contiene solo i campi che l’utente può impostare in fase di creazione.

- **Chiarezza e manutenibilità:**  
  Ogni DTO ha una responsabilità chiara: uno per input, uno per output.  
  → `ImmobiliDTO` contiene anche campi che l’utente non deve mai inviare (id, dataInserimento, proprietarioNome, ecc.), ma che il backend può calcolare o restituire.

- **Validazione specifica:**  
  Puoi applicare regole di validazione diverse per input e output (es. obbligatorietà di certi campi solo in creazione).

- **Evoluzione dell’API:**  
  Se domani aggiungi un campo calcolato (es. “prezzo stimato”, “proprietarioNome”), lo aggiungi solo al DTO di output senza toccare la logica di input.

- **Decoupling dal modello di dominio:**  
  Il modello di dominio (entity JPA) può cambiare senza impattare direttamente le API pubbliche, e viceversa.

### Esempio pratico

- **DTO di input (`ImmobileCreateDTO`):**  
  Usato per POST/PUT. Contiene solo i campi che l’utente può/ha senso inviare in input.
- **DTO di output (`ImmobiliDTO`):**  
  Usato per GET. Contiene anche campi generati dal sistema (id, dataInserimento) o calcolati (proprietarioNome).

### Quando è particolarmente utile?

- Quando hai logiche di business che arricchiscono la risposta (es. join, campi calcolati, aggregazioni).
- Quando vuoi evitare che l’utente possa “spoofare” dati di sistema (es. id, date, ruoli).
- Quando l’input e l’output hanno strutture diverse (es. input con id di relazione, output con oggetti annidati o nomi calcolati).

### Best practice aggiuntive

- **Validazione:**  
  Usa annotazioni come `@NotNull`, `@Size`, ecc. su `ImmobileCreateDTO` per garantire la correttezza dei dati in input.
- **Mapping automatico:**  
  Usa librerie come MapStruct o ModelMapper per convertire tra DTO e entity, riducendo il boilerplate.
- **Documentazione API:**  
  Documenta chiaramente quali campi sono richiesti in input e quali vengono restituiti in output (Swagger/OpenAPI).

---

#### Esempio di utilizzo

- **POST /api/immobili**  
  Richiede un oggetto `ImmobileCreateDTO` come body.
- **GET /api/immobili/{id}**  
  Restituisce un oggetto `ImmobiliDTO` come risposta.

---

**In sintesi:**  
Separare i DTO di input e output è una scelta robusta e professionale che protegge il backend, rende l’API più chiara e facilita l’evoluzione futura del progetto.
