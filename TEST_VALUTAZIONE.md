# Test Sistema Valutazione Automatica - Immobiliaris

## Setup Iniziale

### 1. Configurare il Database
Prima esecuzione dell'applicazione, modificare `application.properties`:

```properties
# Cambiare da "never" a "always" per caricare i dati delle zone
spring.sql.init.mode=always
```

**File SQL caricati automaticamente:**
- `schema.sql` - Struttura tabelle
- `data.sql` - Dati di test utenti/immobili
- `zone_prezzi_data.sql` - **NUOVO** - 39 zone Piemonte

**Dopo il primo avvio, tornare a:**
```properties
spring.sql.init.mode=never
```

### 2. Avviare l'Applicazione

**Backend (porta 8080):**
```bash
cd backend
./mvnw spring-boot:run
```

**Frontend (porta 5173):**
```bash
cd frontend
npm install
npm run dev
```

---

## Test API con Postman/cURL

### Test 1: Verificare Zone Prezzi Caricate

**Tutte le zone:**
```bash
GET http://localhost:8080/api/zone-prezzi
```

**Zona specifica per CAP:**
```bash
GET http://localhost:8080/api/zone-prezzi/cap/10122
```

**Risposta attesa:**
```json
{
  "id": 2,
  "cap": "10122",
  "citta": "Torino",
  "zonaNome": "Centro - Quadrilatero Romano",
  "prezzoMqMedio": 4200.00
}
```

---

### Test 2: Creare un Immobile di Test

**Login (necessario per creare immobili):**
```bash
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Creare immobile:**
```bash
POST http://localhost:8080/api/immobili
Content-Type: application/json
Cookie: JSESSIONID=<session_id_dal_login>

{
  "proprietarioId": 1,
  "tipoImmobile": "appartamento",
  "indirizzo": "Via Garibaldi 12",
  "citta": "Torino",
  "provincia": "TO",
  "cap": "10122",
  "superficie": 85.00,
  "numLocali": 3,
  "numBagni": 2,
  "piano": 2,
  "annoCostruzione": 2008,
  "statoConservazione": "ottimo",
  "classeEnergetica": "B",
  "prezzoRichiesto": 450000.00,
  "descrizione": "Bellissimo appartamento nel cuore del Quadrilatero",
  "disponibileEsclusiva": true,
  "stato": "bozza",
  "features": ["ascensore", "terrazzo", "riscaldamento"]
}
```

**Risposta:** Restituisce l'immobile creato con `id` (es. `id: 123`)

---

### Test 3: Generare Valutazione Automatica

```bash
POST http://localhost:8080/api/valutazioni/genera-automatica/123
Cookie: JSESSIONID=<session_id_dal_login>
```

**Risposta attesa:**
```json
{
  "id": 1,
  "immobile": {
    "id": 123,
    "cap": "10122",
    "citta": "Torino",
    "superficie": 85.00,
    ...
  },
  "valoreStimatoMin": 448532.00,
  "valoreStimatoMax": 493468.00,
  "prezzoMq": 5512.00,
  "note": "Valutazione automatica generata il 2025-11-25.\n\nZona: Centro - Quadrilatero Romano (Torino - CAP 10122)\nPrezzo base zona: €4200.00/mq\nSuperficie: 85.0 mq\n\nModificatore applicato: +31.2%\n\nFattori considerati:\n- Stato conservazione: ottimo\n- Classe energetica: B\n- Piano: 2\n- Anno costruzione: 2008\n- Features: ascensore, terrazzo, riscaldamento\n",
  "dataValutazione": "2025-11-25T15:30:00"
}
```

**Verifica calcolo:**
1. Prezzo base: €4.200/mq (CAP 10122)
2. Modificatori applicati:
   - Stato ottimo: ×1.10
   - Classe B: ×1.05
   - Piano 2: ×1.05
   - Anno 2008: ×1.05
   - Ascensore: ×1.03
   - Terrazzo: ×1.07
   - Riscaldamento: ×1.02
3. Modificatore totale: ≈ 1.312 (+31.2%)
4. Prezzo finale: €4.200 × 1.312 = **€5.510/mq**
5. Valore totale: €5.510 × 85 = **€468.350**
6. Range (±5%): €444.932 - €491.768

---

### Test 4: Verificare Stato Immobile Aggiornato

```bash
GET http://localhost:8080/api/immobili/123
```

**Verifica campo `stato`:**
```json
{
  "id": 123,
  "stato": "valutato",  // ← Cambiato da "bozza" a "valutato"
  ...
}
```

---

### Test 5: Consultare Valutazioni di un Immobile

```bash
GET http://localhost:8080/api/valutazioni/immobile/123
```

**Risposta:** Lista di tutte le valutazioni dell'immobile (storiche)

---

## Test Case Completi

### Caso 1: Appartamento Lusso Centro (Alto Valore)

```json
{
  "proprietarioId": 1,
  "tipoImmobile": "appartamento",
  "indirizzo": "Piazza San Carlo 5",
  "citta": "Torino",
  "provincia": "TO",
  "cap": "10123",
  "superficie": 120.00,
  "numLocali": 4,
  "numBagni": 3,
  "piano": 3,
  "annoCostruzione": 2015,
  "statoConservazione": "lusso",
  "classeEnergetica": "A",
  "features": ["giardino", "garage", "terrazzo", "ascensore", "condizionatore", "allarme", "vista"]
}
```

**Valutazione attesa:**
- Prezzo base: €4.500/mq
- Modificatore: molto alto (stato lusso, classe A, features premium)
- Stima: ~€900.000 - €1.000.000

---

### Caso 2: Appartamento Periferia (Basso Valore)

```json
{
  "proprietarioId": 1,
  "tipoImmobile": "appartamento",
  "indirizzo": "Via Avigliana 45",
  "citta": "Torino",
  "provincia": "TO",
  "cap": "10156",
  "superficie": 60.00,
  "numLocali": 2,
  "numBagni": 1,
  "piano": 7,
  "annoCostruzione": 1968,
  "statoConservazione": "da_ristrutturare",
  "classeEnergetica": "G",
  "features": []
}
```

**Valutazione attesa:**
- Prezzo base: €1.900/mq
- Modificatore: molto basso (da ristrutturare, classe G, vecchio)
- Stima: ~€70.000 - €85.000

---

### Caso 3: Città Diverse

**Cuneo:**
```json
{
  "cap": "12100",
  "citta": "Cuneo",
  "superficie": 90.00,
  ...
}
```
Prezzo base: €2.200/mq

**Alessandria:**
```json
{
  "cap": "15121",
  "citta": "Alessandria",
  "superficie": 75.00,
  ...
}
```
Prezzo base: €1.800/mq

**Asti:**
```json
{
  "cap": "14100",
  "citta": "Asti",
  "superficie": 80.00,
  ...
}
```
Prezzo base: €1.900/mq

---

## Test Errori

### Errore 1: CAP Non Mappato

```bash
POST http://localhost:8080/api/immobili
Content-Type: application/json

{
  "proprietarioId": 1,
  "cap": "20121",  // Milano - NON mappato
  "citta": "Milano",
  ...
}
```

Poi tentare valutazione:
```bash
POST http://localhost:8080/api/valutazioni/genera-automatica/{id}
```

**Risposta attesa (400 Bad Request):**
```json
{
  "message": "CAP non mappato nel sistema di valutazione: 20121"
}
```

---

### Errore 2: Immobile Inesistente

```bash
POST http://localhost:8080/api/valutazioni/genera-automatica/99999
```

**Risposta attesa (400 Bad Request):**
```json
{
  "message": "Immobile non trovato con id: 99999"
}
```

---

## Console H2 - Verifica Diretta Database

**URL:** http://localhost:8080/h2-console

**Credenziali:**
- JDBC URL: `jdbc:h2:file:./data/immobiliaris`
- Username: `sa`
- Password: (vuoto)

**Query utili:**

```sql
-- Verificare zone caricate
SELECT * FROM zone_prezzi ORDER BY prezzo_mq_medio DESC;

-- Contare zone per città
SELECT citta, COUNT(*) FROM zone_prezzi GROUP BY citta;

-- Vedere valutazioni generate
SELECT v.id, i.indirizzo, i.cap, v.prezzo_mq, v.valore_stimato_min, v.valore_stimato_max
FROM valutazioni v
JOIN immobili i ON v.immobile_id = i.id;

-- Immobili valutati
SELECT id, indirizzo, cap, stato FROM immobili WHERE stato = 'valutato';
```

---

## Checklist Completa

- [ ] Backend avviato su porta 8080
- [ ] Database H2 inizializzato con zone_prezzi_data.sql
- [ ] 39 zone caricate (verificare con GET /api/zone-prezzi)
- [ ] Login funzionante
- [ ] Creazione immobile con CAP valido
- [ ] Valutazione automatica generata con successo
- [ ] Stato immobile cambiato a "valutato"
- [ ] Note valutazione generate correttamente
- [ ] Range min/max calcolato (±5%)
- [ ] Test errore CAP non mappato
- [ ] Test errore immobile inesistente

---

## Integrazione Frontend (TODO)

### Componente React per Valutazione

```jsx
// components/ValutazioneAutomatica.jsx
import { useState } from 'react';

function ValutazioneAutomatica({ immobileId }) {
  const [valutazione, setValutazione] = useState(null);
  const [loading, setLoading] = useState(false);

  const generaValutazione = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/valutazioni/genera-automatica/${immobileId}`,
        {
          method: 'POST',
          credentials: 'include'
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setValutazione(data);
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Errore:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="valutazione-automatica">
      <button 
        onClick={generaValutazione}
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? 'Generazione...' : 'Genera Valutazione Automatica'}
      </button>

      {valutazione && (
        <div className="risultato-valutazione">
          <h3>Valutazione Immobile</h3>
          <p><strong>Prezzo al mq:</strong> €{valutazione.prezzoMq}</p>
          <p><strong>Valore stimato:</strong></p>
          <p>Min: €{valutazione.valoreStimatoMin.toLocaleString()}</p>
          <p>Max: €{valutazione.valoreStimatoMax.toLocaleString()}</p>
          <details>
            <summary>Note dettagliate</summary>
            <pre>{valutazione.note}</pre>
          </details>
        </div>
      )}
    </div>
  );
}

export default ValutazioneAutomatica;
```

---

## Supporto

**Problemi comuni:**

1. **Zone non caricate:** Verificare `spring.sql.init.mode=always` al primo avvio
2. **401 Unauthorized:** Login scaduto, effettuare nuovo login
3. **CAP non trovato:** Verificare che il CAP sia tra 10121-10156 (Torino) o 12100, 14100, 15121
4. **Errori calcolo:** Verificare che tutti i campi numerici siano validi (non null quando necessari)

**Contatti Team Backend:**
- Omar Benagoub (@Omarben05)
- Domenico Vardé (@domenicovarde)
- Simone Pizzorno (@Simone-Pix)
