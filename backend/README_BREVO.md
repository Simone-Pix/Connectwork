

# Brevo — Guida rapida

Breve e pratico: come configurare la `BREVO_API_KEY`, avviare il backend e testare invii usando le API o il relay SMTP.

## Prerequisiti
- Java 21 (backend). Se vuoi testare il relay, Python 3 è utile.
- Una Brevo API key (`BREVO_API_KEY`) o credenziali SMTP per `smtp-relay.brevo.com:587`.
inviata nel gruppo e mai scriverla nei files. senno da problemi

## Impostare la chiave (PowerShell)
```powershell
$env:BREVO_API_KEY = "chiave"
```

## Avviare il backend (debug)
```powershell
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

## Endpoint utili
- `GET /api/brevo/status` — stato delle API Brevo
- `GET "https://api.brevo.com/v3/contacts"` — elenco contatti
- `GET "https://api.brevo.com/v3/emailCampaigns` - elenco campagne
- `POST /api/email/send` — invio transazionale
- `POST "https://api.brevo.com/v3/contacts"` — crea contatto
- `POST "https://api.brevo.com/v3/emailCampaigns` - crea campagna

## Payload minimo per `POST /api/email/send`
```json
{
  "to": "destinatario@example.com",
  "name": "Nome",
  "subject": "Oggetto",
  "text": "Corpo del messaggio",
  "listIds": [3]
}
```

## Esempi rapidi
- curl:
```bash
curl -X POST "http://localhost:8080/api/email/send" \
  -H "Content-Type: application/json" \
  -d '{"to":"alliettatommaso@gmail.com","name":"Tommaso","subject":"Test","text":"Prova","listIds":[3]}'
```
- PowerShell (UTF-8 safe):
```powershell
$json = '{"to":"alliettatommaso@gmail.com","name":"Tommaso","subject":"Test","text":"Prova","listIds":[3]}'
$bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
Invoke-RestMethod -Uri 'http://localhost:8080/api/email/send' -Method Post -ContentType 'application/json' -Body $bytes
```
- Thunder Client: POST a `http://localhost:8080/api/email/send` con  IN HEADER scrivere `Content-Type : application/json` e incolla il JSON sopra.


## Esempi diretti delle API Brevo (GET/POST)

Questi esempi mostrano come chiamare direttamente le API Brevo (base `https://api.brevo.com/v3`). Sostituisci `YOUR_API_KEY` con la tua chiave.

- Header comune:
  - `api-key: YOUR_API_KEY`
  - `Content-Type: application/json`

- 1) Lista contatti (GET)
```bash
curl -X GET "https://api.brevo.com/v3/contacts" \
  -H "api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

- 2) Crea o upsert contatto (POST)
```bash
curl -X POST "https://api.brevo.com/v3/contacts" \
  -H "api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","attributes":{"FIRSTNAME":"Mario","LASTNAME":"Rossi"},"listIds":[3],"updateEnabled":true}'
```

- 3) Recupera un contatto (GET)
```bash
curl -X GET "https://api.brevo.com/v3/contacts/{contactId}" \
  -H "api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

- 4) Elenco campagne (GET)
```bash
curl -X GET "https://api.brevo.com/v3/emailCampaigns" \
  -H "api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

- 5) Crea campagna email (POST)
```bash
curl -X POST "https://api.brevo.com/v3/emailCampaigns" \
  -H "api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name":"Campagna test","subject":"Oggetto","sender":{"name":"Connect Work","email":"q4zmzc5jfy@privaterelay.appleid.com"},"type":"classic","htmlContent":"<h1>Ciao</h1>","listIds":[3]}'
```

- 6) Invia campagna ora (POST)
```bash
curl -X POST "https://api.brevo.com/v3/emailCampaigns/{campaignId}/sendNow" \
  -H "api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

- 7) Invio transazionale (POST /smtp/email)
```bash
curl -X POST "https://api.brevo.com/v3/smtp/email" \
  -H "api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"sender":{"name":"Connect Work","email":"q4zmzc5jfy@privaterelay.appleid.com"},"to":[{"email":"user@example.com","name":"Mario"}],"subject":"Oggetto transazionale","textContent":"Test"}'
```

## Errori comuni

- `403 permission_denied`: l'account non è abilitato per invii transazionali — contatta Brevo.
- `535 Authentication failed`: credenziali SMTP errate; rigenera la password nel pannello Brevo.
- PowerShell encoding: invia il body come bytes UTF-8 (vedi esempi PowerShell sopra).
- `403 permission_denied`: l'account non è abilitato per invii transazionali — contatta Brevo.
- `535 Authentication failed`: credenziali SMTP errate; rigenera la password nel pannello Brevo.
- Problemi PowerShell con l'encoding: usa l'esempio che invia bytes UTF-8.

## Sicurezza
- Non pubblicare `BREVO_API_KEY` o password SMTP. Se le condividi per debug, rigenerale subito.

Se vuoi, posso generare un export Thunder Client o uno script PowerShell che automatizza i test (rispondi `thunder` o `powershell`).


## Payload per `POST /api/email/send`

Esempio minimo (testo semplice):
```json
{
  "to": "destinatario@example.com",
  "name": "Nome Destinatario",
  "subject": "Oggetto di test",
  "text": "Contenuto in testo semplice",
  "listIds": [3]
}
```

- `to` (string): indirizzo destinatario
- `name` (string): nome del destinatario (usato anche per l'upsert contatti)
- `subject` (string): oggetto
- `text` (string): corpo in plain text
- `templateId` / `params` (opzionali): se vuoi inviare tramite template Brevo
- `listIds` (opzionale): array di interi; se presente il backend prova ad iscrivere/aggiornare il contatto in quelle liste prima dell'invio.

## Esempi di richieste
con terminale
1) Usare `curl` (Windows include `curl.exe`):

```bash
curl -X POST "http://localhost:8080/api/email/send" \
  -H "Content-Type: application/json" \
  -d '{"to":"alliettatommaso@gmail.com","name":"Tommaso","subject":"Test","text":"Messaggio di prova","listIds":[3]}'
```

2) Usare PowerShell (attenzione all'encoding UTF-8):

```powershell
$json = '{"to":"alliettatommaso@gmail.com","name":"Tommaso","subject":"Test","text":"Messaggio di prova","listIds":[3]}'
$bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
Invoke-RestMethod -Uri 'http://localhost:8080/api/email/send' -Method Post -ContentType 'application/json' -Body $bytes
```

3) Thunder Client (VS Code):
- Method: POST
- URL: `http://localhost:8080/api/email/send`
- Header: `Content-Type: application/json`
- Body (raw JSON): usa lo stesso payload JSON mostrato sopra.




## Troubleshooting — errori comuni

- `403 permission_denied` dalla API Brevo: tipico messaggio: `"Unable to send email. Your SMTP account is not yet activated..."`. Significa che l'account Brevo non ha ancora i permessi per invii transazionali. Azione: contattare il supporto Brevo e richiedere l'attivazione (vedi modello di mail in repo / note di lavoro).
- `535 Authentication failed` sul relay SMTP: credenziali SMTP errate o non ancora abilitate. Verificare la password SMTP nel pannello Brevo (spesso è una password dedicata) o rigenerarla.
- Errori PowerShell `Invalid UTF-8 middle byte`: assicurati di inviare il body come bytes UTF-8 (vedi esempio PowerShell sopra) oppure usa `curl.exe`.

## Sicurezza e raccomandazioni

- Non pubblicare la `BREVO_API_KEY` o le credenziali SMTP in chat pubbliche; se le condividi temporaneamente per debug, rigenerale/ruotale subito dopo il test.
- Per produzione, salva le chiavi negli appositi secret manager (Hashicorp Vault, AWS Secrets Manager, Azure Key Vault, ecc.) e non in `application.properties` in chiaro.

---
File correlati nel repo:
- `backend/src/main/java/com/immobiliaris/backend/service/BrevoEmailService.java` — implementazione chiamate a Brevo
- `backend/src/main/java/com/immobiliaris/backend/controller/EmailController.java` — endpoint `POST /api/email/send`


 

