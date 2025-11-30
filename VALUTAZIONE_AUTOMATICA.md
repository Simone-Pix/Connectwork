# Sistema di Valutazione Automatica Immobili

## Panoramica del Progetto **Immobiliaris**

### Architettura Generale
**Immobiliaris** è un portale immobiliare full-stack per la compravendita di immobili in Piemonte, sviluppato dal team Connectwork (ITS Academy ICT Piemonte).

**Stack Tecnologico:**
- **Backend:** Java 21 + Spring Boot 3.5.7 (REST API)
- **Frontend:** React 19 + Vite + Tailwind CSS
- **Database:** H2 (file-based)
- **Sicurezza:** Spring Security con autenticazione basata su sessione
- **Build:** Maven

### Struttura Database

Il sistema gestisce 9 tabelle principali:

1. **users** - Utenti del sistema (proprietari, admin)
2. **immobili** - Anagrafica immobili con dettagli completi
3. **immobile_features** - Features aggiuntive (giardino, garage, terrazzo, ecc.)
4. **immagini** - Foto e media degli immobili
5. **valutazioni** - Valutazioni immobiliari (manuali e automatiche)
6. **contratti** - Contratti di esclusiva
7. **log_attivita** - Log delle attività utente
8. **richieste** - Richieste di contatto/valutazione
9. **zone_prezzi** - ⭐ NUOVO: Prezzi medi al mq per CAP

---

## Sistema di Valutazione Automatica

### Componenti Implementati

#### 1. **Model: ZonePrezzi.java**
Entità JPA per la gestione dei prezzi al mq per zona.

**Campi:**
- `id` - Chiave primaria
- `cap` - CAP (unique, necessario per la ricerca)
- `citta` - Nome città
- `zonaNome` - Descrizione della zona
- `prezzoMqMedio` - Prezzo base al mq per la zona

#### 2. **Repository: ZonePrezziRepository.java**
Repository JPA con metodi custom:
- `findByCap(String cap)` - Trova zona per CAP
- `existsByCap(String cap)` - Verifica esistenza CAP

#### 3. **Service: ValutazioniServiceImpl.java**
Logica di business per la valutazione automatica.

**Metodo principale:**
```java
public Valutazioni generaValutazioneAutomatica(Long immobileId)
```

**Processo di valutazione:**
1. Recupera immobile e verifica esistenza
2. Trova il prezzo base dal CAP (tabella zone_prezzi)
3. Calcola il modificatore totale basandosi su:
   - Stato conservazione
   - Classe energetica
   - Piano
   - Anno di costruzione
   - Features (giardino, garage, ecc.)
4. Applica: `Prezzo finale = Prezzo base × Modificatore`
5. Calcola valore totale: `Superficie × Prezzo finale al mq`
6. Genera range min/max (±5%)
7. Salva valutazione e aggiorna stato immobile a "valutato"

#### 4. **Controllers**

**ZonePrezziController.java** - Gestione zone prezzi:
- `GET /api/zone-prezzi` - Lista tutte le zone
- `GET /api/zone-prezzi/cap/{cap}` - Trova zona per CAP
- `POST /api/zone-prezzi` - Crea nuova zona (admin)
- `PUT /api/zone-prezzi/{id}` - Aggiorna zona (admin)
- `DELETE /api/zone-prezzi/{id}` - Elimina zona (admin)

**ValutazioniMVC.java** - Gestione valutazioni (aggiornato):
- `POST /api/valutazioni/genera-automatica/{immobileId}` - ⭐ NUOVO endpoint

---

## Modificatori di Valutazione

### 1. Stato di Conservazione
| Stato | Modificatore | Variazione |
|-------|--------------|------------|
| da_ristrutturare | 0.85 | -15% |
| buono | 1.00 | 0% |
| ottimo | 1.10 | +10% |
| lusso | 1.25 | +25% |

### 2. Classe Energetica
| Classe | Modificatore | Variazione |
|--------|--------------|------------|
| A | 1.10 | +10% |
| B | 1.05 | +5% |
| C | 1.00 | 0% |
| D | 0.95 | -5% |
| E | 0.90 | -10% |
| F | 0.85 | -15% |
| G | 0.80 | -20% |

### 3. Piano
| Piano | Modificatore | Variazione |
|-------|--------------|------------|
| < 0 (interrato) | 0.90 | -10% |
| 0 (terra) | 1.00 | 0% |
| 1-3 | 1.05 | +5% |
| 4-6 | 1.00 | 0% |
| 7+ | 0.95 | -5% |

### 4. Anno di Costruzione
| Periodo | Modificatore | Variazione |
|---------|--------------|------------|
| < 1950 | 0.90 | -10% |
| 1950-1980 | 0.95 | -5% |
| 1981-2000 | 1.00 | 0% |
| 2001-2010 | 1.05 | +5% |
| > 2010 | 1.10 | +10% |

### 5. Features
| Feature | Modificatore | Variazione |
|---------|--------------|------------|
| giardino | 1.08 | +8% |
| terrazzo | 1.07 | +7% |
| garage | 1.05 | +5% |
| arredato | 1.05 | +5% |
| vista | 1.05 | +5% |
| ascensore | 1.03 | +3% |
| condizionatore | 1.03 | +3% |
| accessibile_disabili | 1.03 | +3% |
| riscaldamento | 1.02 | +2% |
| allarme | 1.02 | +2% |

**Nota:** I modificatori sono moltiplicativi e cumulativi.

---

## Dati Zone Prezzi - Piemonte

### Torino (CAP 10121-10156)
**36 zone mappate** con prezzi da €1.900/mq a €4.500/mq

**Zone Premium (> €3.500/mq):**
- 10123: Centro - Via Roma / Piazza San Carlo (€4.500/mq)
- 10122: Centro - Quadrilatero Romano (€4.200/mq)
- 10121: Centro - Crocetta (€3.500/mq)

**Zone Standard (€2.500-3.500/mq):**
- 10124: Centro - Vanchiglia (€3.200/mq)
- 10145: Cavoretto - Villa della Regina (€3.200/mq)
- 10139: Borgo Po - Crimea (€3.000/mq)

**Zone Economiche (< €2.500/mq):**
- 10156: Vallette Nord (€1.900/mq)
- 10134: Barriera di Milano (€1.900/mq)
- 10131: Vallette - Lucento (€2.000/mq)

### Altre Città (CAP unico)
- **Cuneo** (12100): €2.200/mq
- **Asti** (14100): €1.900/mq
- **Alessandria** (15121): €1.800/mq

---

## Esempi di Utilizzo

### Esempio 1: Appartamento Centro Torino
**Dati immobile:**
- CAP: 10122 (Quadrilatero Romano)
- Superficie: 80 mq
- Stato: ottimo
- Classe energetica: B
- Piano: 2
- Anno: 2005
- Features: ascensore, terrazzo

**Calcolo:**
1. Prezzo base: €4.200/mq
2. Modificatori:
   - Stato ottimo: 1.10
   - Classe B: 1.05
   - Piano 2: 1.05
   - Anno 2005: 1.05
   - Ascensore: 1.03
   - Terrazzo: 1.07
3. Modificatore totale: 1.10 × 1.05 × 1.05 × 1.05 × 1.03 × 1.07 ≈ **1.422**
4. Prezzo finale: €4.200 × 1.422 ≈ **€5.972/mq**
5. Valore totale: €5.972 × 80 ≈ **€477.760**
6. Range: **€453.872 - €501.648**

### Esempio 2: Appartamento Periferia
**Dati immobile:**
- CAP: 10134 (Barriera Milano)
- Superficie: 65 mq
- Stato: buono
- Classe energetica: D
- Piano: 5
- Anno: 1975
- Features: nessuna

**Calcolo:**
1. Prezzo base: €1.900/mq
2. Modificatori:
   - Stato buono: 1.00
   - Classe D: 0.95
   - Piano 5: 1.00
   - Anno 1975: 0.95
3. Modificatore totale: 1.00 × 0.95 × 1.00 × 0.95 ≈ **0.903**
4. Prezzo finale: €1.900 × 0.903 ≈ **€1.716/mq**
5. Valore totale: €1.716 × 65 ≈ **€111.540**
6. Range: **€105.963 - €117.117**

---

## API REST - Endpoint Chiave

### Valutazione Automatica
```http
POST /api/valutazioni/genera-automatica/{immobileId}
```

**Response:**
```json
{
  "id": 1,
  "immobile": { "id": 123, ... },
  "valoreStimatoMin": 453872.00,
  "valoreStimatoMax": 501648.00,
  "prezzoMq": 5972.00,
  "note": "Valutazione automatica generata il 2025-11-25...",
  "dataValutazione": "2025-11-25T14:30:00"
}
```

### Consultazione Zone Prezzi
```http
GET /api/zone-prezzi/cap/{cap}
```

### Gestione Immobili
```http
GET /api/immobili
GET /api/immobili/{id}
POST /api/immobili
PUT /api/immobili/{id}
DELETE /api/immobili/{id}
```

---

## Configurazione e Deploy

### 1. Database H2
Il file `zone_prezzi_data.sql` deve essere caricato all'avvio (una sola volta).

**In `application.properties`:**
```properties
spring.sql.init.mode=always  # Prima volta
spring.sql.init.mode=never   # Dopo il primo avvio
```

### 2. Dipendenze Maven
Già presenti:
- Spring Boot Starter Data JPA
- Spring Boot Starter Web
- Spring Boot Starter Security
- H2 Database
- Lombok

### 3. Sicurezza
Gli endpoint di valutazione sono protetti. Richiesta autenticazione per:
- `POST /api/valutazioni/**` (richiede login)
- `POST /api/zone-prezzi/**` (richiede admin)

---

## Prossimi Sviluppi Consigliati

1. **Frontend React:**
   - Componente per trigger valutazione automatica
   - Dashboard con visualizzazione grafici valutazioni
   - Form admin per gestione zone prezzi

2. **Miglioramenti Backend:**
   - Validazione CAP più robusta
   - Cache per zone prezzi
   - API per statistiche mercato
   - Export PDF valutazioni

3. **Business Logic:**
   - Ricalcolo automatico valutazioni periodico
   - Notifiche su variazioni prezzi zona
   - Comparazione con prezzi di mercato reali

4. **Estensione Dati:**
   - Aggiungere altri comuni Piemonte
   - Granularità maggiore per zone Torino
   - Storico prezzi per trend

---

## Files Modificati/Creati

### Nuovi File
- ✅ `model/ZonePrezzi.java`
- ✅ `repo/ZonePrezziRepository.java`
- ✅ `service/ValutazioniServiceImpl.java`
- ✅ `controller/ZonePrezziController.java`
- ✅ `resources/zone_prezzi_data.sql`

### File Modificati
- ✅ `controller/ValutazioniMVC.java` (aggiunto endpoint automatico)
- ✅ `resources/schema.sql` (aggiunta tabella zone_prezzi)

### File Esistenti Integrati
- `model/Immobili.java`
- `model/Valutazioni.java`
- `model/ImmobiliFeatures.java`
- `service/ImmobiliService.java`

---

## Testing Consigliato

### Test Valutazione Automatica
1. Creare un utente di test
2. Creare un immobile con CAP valido (es. 10122)
3. Chiamare `POST /api/valutazioni/genera-automatica/{immobileId}`
4. Verificare valutazione generata
5. Controllare che stato immobile sia "valutato"

### Test Zone Prezzi
1. `GET /api/zone-prezzi` → Verifica 39 zone caricate
2. `GET /api/zone-prezzi/cap/10122` → Verifica dati Quadrilatero Romano
3. Testare CAP non esistente → Errore 404

---

**Progetto:** Immobiliaris - Connectwork (Gruppo 5)  
**Sviluppatori Backend:** Omar Benagoub, Domenico Vardé, Simone Pizzorno  
**ITS Academy ICT Piemonte** - Laboratorio Integrato 2024/2026
