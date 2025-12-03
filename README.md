# Guida Completa all'Installazione e Avvio - Immobiliaris

**Progetto**: Portale Immobiliare Immobiliaris  
**Team**: Connectwork (Gruppo 5) - ITS Academy ICT Piemonte  
**Stack**: Spring Boot 3.5.7 (Java 21) + React 19 + H2 Database + Vite

---

## Team Connectwork (Gruppo 5)

| Ruoli | Nomi | Responsabilità |
|--------|------|----------------|
| **Software Developers** | **BENAGOUB OMAR** [@Omarben05](https://github.com/Omarben05)<br>**VARDÉ DOMENICO** [@domenicovarde](https://github.com/domenicovarde)<br>**PIZZORNO SIMONE** [@Simone-Pix](https://github.com/Simone-Pix) | Backend, API REST, Database H2, Logiche valutazione automatica, Integrazione Brevo |
| **Web Developers** | **CENNI VITTORIO** [@ViTz1](https://github.com/ViTz1)<br>**GIRAUDO ANDREA** [@AndreaXVII17](https://github.com/AndreaXVII17)<br>**CACHI YOSSIANI MAYTÉ** [@MayteCachi](https://github.com/MayteCachi) | Frontend React, UX/UI, Componenti riutilizzabili, Integrazione API, Ottimizzazione SEO on-page |
| **Digital Strategists** | **MUSSANO ILARIA** [@ilariamussano-cyber](https://github.com/ilariamussano-cyber)<br>**CHIUSOLO SAVERIO** [@saveriochiusolo-cell](https://github.com/saveriochiusolo-cell)<br>**ALLIETTA TOMMASO** [@tommasoallietta-beep](https://github.com/tommasoallietta-beep) | Branding, Logo, Visual Identity, SEO Strategy, Campagne Meta/Google Ads, Lead Generation |

**Progetto sviluppato per**: ITS Academy ICT Piemonte – Laboratorio Integrato Biennio 2024/2026

---

## Indice

1. [Prerequisiti](#1-prerequisiti)
2. [Clonare il Repository](#2-clonare-il-repository)
3. [Struttura del Progetto](#3-struttura-del-progetto)
4. [Configurazione Backend](#4-configurazione-backend)
5. [Architettura Backend & Pattern DTO](#5-architettura-backend--pattern-dto)
6. [Configurazione Frontend](#6-configurazione-frontend)
7. [Architettura Frontend React](#7-architettura-frontend-react)
8. [Avvio del Progetto](#8-avvio-del-progetto)
9. [Database H2](#9-database-h2)
10. [Verifica Funzionamento](#10-verifica-funzionamento)
11. [Configurazione Email Brevo](#11-configurazione-email-brevo-opzionale)
12. [Guida Completa Integrazione Brevo](#12-guida-completa-integrazione-brevo-email-marketing)
13. [Troubleshooting](#13-troubleshooting)

---

## 1. Prerequisiti

### Software Richiesto

| Software | Versione Minima | Download |
|----------|----------------|----------|
| **Java Development Kit (JDK)** | 21 | [Oracle JDK 21](https://www.oracle.com/java/technologies/downloads/#java21) o [OpenJDK 21](https://adoptium.net/) |
| **Maven** | 3.9+ | [Apache Maven](https://maven.apache.org/download.cgi) (o wrapper incluso) |
| **Node.js** | 20+ | [Node.js](https://nodejs.org/) |
| **Git** | 2.40+ | [Git SCM](https://git-scm.com/) |
| **IDE** (opzionale) | - | [VS Code](https://code.visualstudio.com/), [IntelliJ IDEA](https://www.jetbrains.com/idea/), o [Eclipse](https://www.eclipse.org/) |

### Verifica Installazione

Apri un terminale (PowerShell su Windows, Terminal su macOS/Linux) e verifica:

```powershell
# Verifica Java (deve essere versione 21.x.x)
java -version

# Verifica Maven
mvn -version

# Verifica Node.js
node -v

# Verifica npm
npm -v

# Verifica Git
git --version
```

**Output atteso**:
```
java version "21.0.x"
Apache Maven 3.9.x
v20.x.x (Node.js)
10.x.x (npm)
git version 2.x.x
```

---

## 2. Clonare il Repository

### Opzione A: Clonazione HTTPS

```powershell
# Naviga nella cartella dove vuoi salvare il progetto
cd C:\Users\TuoNome\Desktop

# Clona il repository
git clone https://github.com/Simone-Pix/Connectwork.git

# Entra nella cartella del progetto
cd Connectwork
```

### Opzione B: Clonazione SSH (richiede chiave SSH configurata)

```powershell
git clone git@github.com:Simone-Pix/Connectwork.git
cd Connectwork
```

### Verifica Branch

Il progetto ha due branch principali:

```powershell
# Visualizza tutti i branch
git branch -a

# Cambia branch se necessario
git checkout main        # Branch principale stabile
git checkout SaimonCose  # Branch di sviluppo
```

---

## 3. Struttura del Progetto

```
Connectwork/
│
├── backend/                          # Backend Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/immobiliaris/backend/
│   │   │   │       ├── config/        # Configurazioni (CORS, Security)
│   │   │   │       ├── controller/    # REST Controllers
│   │   │   │       ├── dto/           # Data Transfer Objects
│   │   │   │       ├── model/         # Entità JPA
│   │   │   │       ├── repo/          # Repository JPA
│   │   │   │       ├── service/       # Business Logic
│   │   │   │       └── util/          # Utility classes
│   │   │   └── resources/
│   │   │       ├── application.properties   # Configurazione Spring Boot
│   │   │       ├── schema.sql              # Schema database H2
│   │   │       ├── data.sql                # Dati iniziali (utenti, zone_prezzi)
│   │   │       └── static/immagini/        # Immagini statiche
│   │   └── test/                     # Test unitari
│   ├── data/                         # Database H2 persistente (creato al primo avvio)
│   ├── pom.xml                       # Dipendenze Maven
│   ├── mvnw / mvnw.cmd              # Maven Wrapper (no installazione Maven richiesta)
│   └── README_BREVO.md              # Documentazione integrazione email
│
├── frontend/                         # Frontend React + Vite
│   ├── src/
│   │   ├── assets/                  # Immagini, loghi
│   │   ├── components/              # Componenti React riutilizzabili
│   │   ├── Contexts/                # Context API (AuthContext)
│   │   ├── Layout/                  # Layout principale
│   │   ├── pages/                   # Pagine (Home, Backoffice, PersonalArea, ecc.)
│   │   ├── styles/                  # CSS/Tailwind custom
│   │   ├── App.jsx                  # Componente root
│   │   └── main.jsx                 # Entry point
│   ├── public/                      # File pubblici
│   ├── package.json                 # Dipendenze npm
│   ├── vite.config.js              # Configurazione Vite
│   └── tailwind.config.js          # Configurazione Tailwind CSS
│
├── immagine_caricate/              # Upload utente (non tracciato da Git)
├── README.md                       # Documentazione generale progetto
├── READMEBACKEND.md               # Documentazione pattern DTO
└── .gitignore                     # File esclusi da Git
```

---

## 4. Configurazione Backend

### 4.1 Navigare nella Cartella Backend

```powershell
cd backend
```

### 4.2 Installare Dipendenze Maven

**Opzione A: Con Maven installato**
```powershell
mvn clean install
```

**Opzione B: Con Maven Wrapper (consigliato, no installazione Maven richiesta)**
```powershell
# Windows PowerShell
.\mvnw.cmd clean install

# macOS/Linux
./mvnw clean install
```

Questo comando:
- Scarica tutte le dipendenze da `pom.xml`
- Compila il codice Java
- Esegue i test
- Crea il file JAR in `target/backend-0.0.1-SNAPSHOT.jar`

### 4.3 Configurazione Database H2

Il database H2 è **embedded** e **persistente** (salva i dati su file).

**File**: `src/main/resources/application.properties`

```properties
# Database H2 file-based (persistente)
spring.datasource.url=jdbc:h2:file:./data/immobiliaris
spring.datasource.username=sa
spring.datasource.password=

# Hibernate: aggiorna schema senza perdere dati
spring.jpa.hibernate.ddl-auto=update

# Console H2 accessibile su http://localhost:8080/h2
spring.h2.console.enabled=true
spring.h2.console.path=/h2

# Non esegue data.sql a ogni avvio (preserva dati)
spring.sql.init.mode=never
```

**⚠️ Importante**: 
- Al primo avvio viene creata la cartella `backend/data/` con il file `immobiliaris.mv.db`
- **NON eliminare** questa cartella se vuoi preservare i dati
- Per **resettare il database**: elimina `backend/data/` e riavvia il backend

### 4.4 Dati del Database

**⚠️ IMPORTANTE**: I dati del database sono **già tracciati e persistenti** nei file:
- `backend/data/immobiliaris.mv.db` (database principale)
- `backend/data/immobiliaris.trace.db` (log transazioni)

Questi file vengono **creati automaticamente** al primo avvio e contengono già:
- **48 zone prezzi** Piemonte (Torino: 36 CAP, altre città: 12)
- **Schema completo** delle 9 tabelle (users, immobili, richieste, valutazioni, ecc.)

**File `data.sql`**: Contiene **SOLO dati di esempio** opzionali:
- 3 utenti di test (admin: `andrea.verdi@email.com` / password: `1234`)
- 4 immobili di esempio
- Valutazioni, contratti, immagini di esempio

**Configurazione attuale** (`application.properties`):
```properties
spring.sql.init.mode=never  # NON esegue data.sql (preserva dati esistenti)
```

**Per caricare dati di esempio** (solo se database vuoto):
1. Modifica `application.properties`:
   ```properties
   spring.sql.init.mode=always
   ```
2. Avvia il backend (vedi [Sezione 6](#6-avvio-del-progetto))
3. **Dopo il primo avvio**, torna a `never`:
   ```properties
   spring.sql.init.mode=never
   ```
   (altrimenti i dati vengono sovrascritti a ogni riavvio)

**Per resettare completamente il database**:
```powershell
# Elimina i file persistenti
Remove-Item backend/data/immobiliaris.mv.db
Remove-Item backend/data/immobiliaris.trace.db

# Riavvia backend → verranno ricreati automaticamente
```

### 4.5 Configurazione CORS (se Frontend su porta diversa)

**File**: `src/main/java/com/immobiliaris/backend/config/CorsConfig.java`

```java
.allowedOrigins("http://localhost:5173")  // Vite default port
```

Se il frontend gira su porta diversa, modifica questa linea.

Dato che il frontend gira sulla porta: ```localhost:5173``` nel caso venisse aperta una porta differente, assicurarsi di avere la porta del progetto libera e riavviare il progetto per avere tutte le funzionalità disponibili.

---

## 5. Architettura Backend & Pattern DTO

### 5.1 Panoramica Architettura

Il backend segue un'architettura **MVC (Model-View-Controller)** con Spring Boot:

```
Controller (REST API)
    ↓
Service (Business Logic)
    ↓
Repository (JPA)
    ↓
Database (H2)
```

**Layer principali**:
- **Controller**: Gestisce richieste HTTP, validazione input, ritorna DTO
- **Service**: Logica di business, orchestrazione operazioni complesse
- **Repository**: Accesso dati tramite Spring Data JPA
- **Entity**: Rappresentazione tabelle database (JPA)
- **DTO**: Data Transfer Objects per input/output API

---

### 5.2 Pattern DTO (Data Transfer Objects)

#### Perché Usare DTO Separati?

Il progetto utilizza **DTO distinti per input e output** invece di esporre direttamente le entità JPA. Esempio: `ImmobileCreateDTO` (input) vs `ImmobiliDTO` (output).

**Vantaggi**:

1. **Sicurezza**: Prevenzione di field spoofing
   - Client non può impostare `id`, `dataCreazione`, valori calcolati
   - Evita mass assignment vulnerabilities
   
2. **Manutenibilità**: Separazione responsabilità
   - Input: campi richiesti per creazione (es. `superficie`, `numeroLocali`)
   - Output: include campi generati (`id`, `timestamp`, relazioni calcolate)
   
3. **Validazione**: Regole diverse per input/output
   - Input: validazioni `@NotNull`, `@Size`, `@Pattern`
   - Output: può includere campi nullable o derivati
   
4. **Evoluzione**: Aggiungi campi output senza breaking changes
   - Nuovi campi calcolati non rompono contratti di creazione
   - Client ricevono più dati mantenendo compatibilità

#### Esempi Concreti

**Creazione immobile (POST)**:
```java
// ImmobileCreateDTO.java (INPUT)
public class ImmobileCreateDTO {
    @NotNull
    private String indirizzo;
    
    @NotNull
    @Positive
    private BigDecimal superficie;
    
    @NotNull
    private Integer numeroLocali;
    
    // NO id, NO dataCreazione, NO dataUltimoAggiornamento
}
```

**Risposta immobile (GET)**:
```java
// ImmobiliDTO.java (OUTPUT)
public class ImmobiliDTO {
    private Long id;  // Generato dal DB
    private String indirizzo;
    private BigDecimal superficie;
    private Integer numeroLocali;
    private LocalDate dataCreazione;  // Timestamp automatico
    private LocalDate dataUltimoAggiornamento;
    private String nomeProprietario;  // Join calcolato
    private BigDecimal valutazioneStimata;  // Campo calcolato
}
```

#### Best Practices Implementate

1. **MapStruct per conversioni**: Mapping automatico Entity ↔ DTO
2. **Validazione con Bean Validation**: Annotazioni `@Valid`, `@NotNull`, `@Size`
3. **Documentazione Swagger**: Schemi separati per request/response
4. **Naming convention**: `*CreateDTO` (input), `*DTO` (output), `*UpdateDTO` (patch)

#### Casi d'Uso nel Progetto

| Endpoint | DTO Input | DTO Output | Rationale |
|----------|-----------|------------|-----------|
| `POST /api/immobili` | `ImmobileCreateDTO` | `ImmobiliDTO` | Client fornisce dati obbligatori, server genera id/timestamp |
| `GET /api/immobili/{id}` | - | `ImmobiliDTO` | Include relazioni calcolate (proprietario, valutazione) |
| `POST /api/richieste/valuta` | `RichiesteCreateDTO` | `ValutazioneDTO` | Input: dati immobile, Output: valutazione calcolata |
| `POST /api/richieste/converti` | `Long` (richiesta_id) | `ImmobiliDTO` | Converte richiesta in immobile permanente |

---

### 5.3 Flusso Richieste → Valutazione → Conversione

**Scenario**: Utente richiede valutazione immobile

```
1. POST /api/richieste/valuta
   Input: RichiesteCreateDTO (superficie, locali, zona...)
   ↓
2. RichiesteController.valuaRichiestaAutomatica()
   - Crea entità Richieste
   - Calcola valutazione con ZonePrezziRepository
   - Salva Valutazioni con richiesta_id
   ↓
3. Output: ValutazioneDTO (prezzoMinimo, prezzoMassimo, coefficienti)
   
4. Utente accetta → POST /api/richieste/converti/{id}
   ↓
5. RichiesteConversioneService.convertiRichiestaInImmobile()
   - Crea entità Immobili da Richieste
   - Migra Valutazioni: richiesta_id → immobile_id
   - Mantiene Richieste visibile (PersonalArea)
   ↓
6. Output: ImmobiliDTO (immobile permanente con valutazione)
```

**Dettagli tecnici**:
- `richiesta_id` e `immobile_id` sono **mutuamente esclusivi** nella tabella `valutazioni`
- Conversione = **migrazione**, non duplicazione (update, non insert)
- Richieste originale **non viene eliminata** (tracciabilità storico utente)

---

## 6. Configurazione Frontend

### 6.1 Navigare nella Cartella Frontend

```powershell
# Dalla root del progetto
cd frontend
```

### 6.2 Installare Dipendenze npm

```powershell
npm install
```

Questo installa:
- React 19.1.1
- React Router DOM 7.9.5
- Vite 7.1.7
- Tailwind CSS 3.4.18
- ESLint (linting)

**Tempo stimato**: 1-3 minuti (prima volta)

### 6.3 Configurazione Proxy API

**File**: `frontend/vite.config.js`

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // Backend URL
        changeOrigin: true,
      }
    }
  }
})
```

Questo permette di chiamare `/api/...` senza CORS errors, reindirizzando a `http://localhost:8080/api/...`

---

## 7. Architettura Frontend React

### 7.1 Stack Tecnologico

Il frontend è una **Single Page Application (SPA)** costruita con:

| Tecnologia | Versione | Funzione |
|------------|----------|----------|
| **React** | 19.1.1 | Framework UI con componenti riutilizzabili |
| **React Router DOM** | 7.9.5 | Routing client-side e navigazione SPA |
| **Vite** | 7.1.7 | Build tool ultra-veloce con HMR |
| **Tailwind CSS** | 3.4.18 | Framework CSS utility-first |
| **ESLint** | 9.36.0 | Linting e code quality |

---

### 7.2 Architettura Componenti

```
src/
├── App.jsx                  # Router principale + lazy loading
├── main.jsx                 # Entry point applicazione
│
├── Contexts/
│   └── AuthContext.jsx      # Gestione autenticazione globale
│
├── Layout/
│   └── Layout.jsx           # Wrapper con Navbar + Footer
│
├── pages/                   # Pagine principali (route)
│   ├── Home.jsx             # Homepage con hero + CTA
│   ├── Search.jsx           # Ricerca immobili con filtri
│   ├── PropertyDetail.jsx   # Dettaglio singolo immobile
│   ├── Configurator.jsx     # Form multi-step valutazione
│   ├── PersonalArea.jsx     # Area utente + richieste
│   ├── Backoffice.jsx       # Pannello admin (richiede ruolo)
│   ├── Login.jsx            # Autenticazione sessione
│   ├── Signin.jsx           # Registrazione nuovo utente
│   └── NotFound.jsx         # Pagina 404
│
├── components/              # Componenti riutilizzabili
│   ├── navbar.jsx           # Header navigazione + auth status
│   ├── Footer.jsx           # Footer informazioni
│   ├── ScrollTop.jsx        # Auto-scroll top route change
│   │
│   ├── ComponentStep1-6.jsx # Step form valutazione
│   ├── ComponentSummary.jsx # Riepilogo pre-invio
│   │
│   ├── PropertyCard.jsx     # Card immobile (griglia)
│   ├── PropertyList.jsx     # Lista immobili
│   ├── FiltersSidebar.jsx   # Filtri ricerca avanzata
│   │
│   ├── FeaturedProperties.jsx # Immobili in evidenza
│   ├── SearchByCity.jsx     # Ricerca per città
│   ├── AgentsSection.jsx    # Sezione agenti
│   ├── MissionSection.jsx   # Mission aziendale
│   ├── WhyChoose.jsx        # Vantaggi competitivi
│   └── NewsLetter.jsx       # Iscrizione newsletter
│
└── styles/                  # CSS custom per pagine
    ├── backoffice_tailwind.css
    ├── configurator_tailwind.css
    ├── navbar_tailwind.css
    ├── personalArea_tailwind.css
    ├── propertyDetails_tailwind.css
    └── search_tailwind.css
```

---

### 7.3 Pattern & Architetture Implementate

#### Context API - Autenticazione Globale

**File**: `src/Contexts/AuthContext.jsx`

**Funzionalità**:
- Gestione stato utente autenticato (email, ruolo, dati personali)
- Persistenza sessione via cookie HTTP-only (no JWT, sicurezza backend)
- Metodi: `login()`, `logout()`, `checkAuth()`
- Auto-verifica sessione al mount componente

**Utilizzo**:
```jsx
import { useAuthContext } from "./Contexts/AuthContext.jsx";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthContext();
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <h1>Ciao {user.nome}!</h1>;
}
```

**Vantaggi**:
- **Evita prop drilling**: stato globale accessibile ovunque
- **Single source of truth**: un solo posto per auth state
- **Persistenza automatica**: ricarica pagina preserva sessione

---

#### Protected Routes

**File**: `src/App.jsx`

Implementa protezione route basata su autenticazione e ruolo:

```jsx
// Richiede autenticazione
<Route
  path="/personal-area"
  element={isAuthenticated ? <PersonalArea /> : <Navigate to="/login" />}
/>

// Richiede ruolo admin
<Route
  path="/backoffice"
  element={
    !isAuthenticated ? <Navigate to="/login" /> :
    user?.role !== "admin" ? <Navigate to="/" /> :
    <Backoffice />
  }
/>
```

**Protezioni implementate**:
- `/personal-area`: Solo utenti autenticati
- `/backoffice`: Solo admin (verifica doppia: auth + ruolo)

---

#### Lazy Loading & Code Splitting

**File**: `src/App.jsx`

Tutte le pagine sono caricate **on-demand** per ottimizzare performance:

```jsx
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Backoffice = lazy(() => import("./pages/Backoffice"));

<Suspense fallback={<LoadingScreen />}>
  <Routes>
    <Route path="/" element={<Home />} />
    {/* ... */}
  </Routes>
</Suspense>
```

**Vantaggi**:
- **Bundle size ridotto**: ogni pagina è un chunk separato
- **First Load veloce**: carica solo Home, non tutto
- **UX migliorata**: LoadingScreen durante fetch chunk

---

### 7.4 Flussi Applicativi Principali

#### Flusso Valutazione Immobile (Configurator)

**Pagina**: `src/pages/Configurator.jsx`

Form **multi-step wizard** per raccogliere dati immobile e inviare richiesta valutazione.

**Step**:
1. **Tipo immobile**: Appartamento, Villa, Ufficio, etc.
2. **Posizione**: Indirizzo, CAP, Città, Provincia
3. **Caratteristiche**: Superficie, stanze, bagni, piano
4. **Dettagli**: Anno costruzione, stato conservazione, classe energetica
5. **Optional**: Balcone, garage, giardino, ascensore
6. **Dati contatto**: Nome, cognome, email, telefono
7. **Summary**: Riepilogo completo pre-invio

**State management**:
```jsx
const [step, setStep] = useState(1);  // Step corrente (1-7)
const [formData, setFormData] = useState({
  tipoImmobile: "", indirizzo: "", cap: "",
  superficie: "", stanze: "", bagni: "",
  nome: "", email: "", telefono: "",
  // ... 20+ campi totali
});

const updateField = (field, value) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};
```

**Invio dati**:
```jsx
const handleSubmit = async () => {
  const res = await fetch("/api/richieste", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  // Toast successo → redirect homepage
};
```

**Backend endpoint**: `POST /api/richieste`  
**Salva in**: Tabella `richieste` (stato: `valutata = false`)

---

#### Flusso Backoffice Admin

**Pagina**: `src/pages/Backoffice.jsx` (998 righe, componente complesso)

**Sezioni**:

1. **Aggiungi Immobile**
   - Form completo per inserimento manuale
   - Upload multiplo immagini (FormData multipart)
   - Validazione campi obbligatori
   - Endpoint: `POST /api/immobili` + `POST /api/immobili/{id}/immagini`

2. **Valutazioni Richieste**
   - Lista richieste valutazione utenti
   - Stato visivo: Non valutata | Valutata
   - **Valutazione automatica**: Click bottone → calcolo prezzo basato su `zone_prezzi`
   - Endpoint: `POST /api/richieste/valuta/{id}`
   - **Conversione in immobile**: Trasforma richiesta in immobile vendibile
   - Endpoint: `POST /api/richieste/converti/{id}`

3. **Modifica Immobili**
   - Lista immobili esistenti
   - Edit inline: titolo, prezzo, descrizione, stato
   - Gestione immagini: aggiungi/elimina
   - Endpoint: `PUT /api/immobili/{id}`, `DELETE /api/immobili/{id}`

**Funzionalità avanzate**:
- **Accordion espandibili**: apri/chiudi dettagli immobile
- **Modal di conferma custom**: evita `window.confirm()` nativo
- **Toast successo**: feedback visivo operazioni
- **Mobile responsive**: sidebar collassabile, layout adattivo

---

#### Flusso Ricerca Immobili

**Pagina**: `src/pages/Search.jsx`

**Filtri avanzati**:
```jsx
const [filters, setFilters] = useState({
  citta: "Tutte",
  tipoImmobile: "Tutti",
  prezzoMin: "",
  prezzoMax: "",
  superficieMin: "",
  superficieMax: "",
  numeroLocali: "",
  stato: "Tutti",
});
```

**Logica filtraggio**:
```jsx
useEffect(() => {
  let filtered = [...allProperties];
  
  if (filters.citta !== "Tutte") 
    filtered = filtered.filter(p => p.citta === filters.citta);
  
  if (filters.prezzoMin) 
    filtered = filtered.filter(p => p.prezzoRichiesto >= filters.prezzoMin);
  
  // ... altri filtri
  
  setFilteredProperties(filtered);
}, [filters, allProperties]);
```

**Componenti**:
- `FiltersSidebar`: Form filtri con reset
- `PropertyList`: Griglia card immobili
- `PropertyCard`: Preview con immagine, prezzo, dettagli

---

#### Area Personale Utente

**Pagina**: `src/pages/PersonalArea.jsx`

**Funzionalità**:
1. **Dati utente**:
   - Visualizzazione: nome, email, telefono
   - Modifica email (inline edit)
   - Endpoint: `PUT /api/users/{id}`

2. **Storico richieste**:
   - Lista richieste valutazione inviate
   - Filtro: Tutte | Valutate | Non valutate
   - **Visualizza valutazione**: Modal con prezzo min/max, coefficienti
   - Endpoint: `GET /api/users/{email}/richieste`, `GET /api/valutazioni/richiesta/{id}`

**Stato valutazione**:
- **Non valutata**: admin non ha ancora calcolato
- **Valutata**: mostra bottone "Visualizza Valutazione"

---

### 7.5 Comunicazione Frontend ↔ Backend

#### Proxy API Configuration

**File**: `vite.config.js`

```javascript
server: {
  proxy: {
    "/api": {
      target: "http://localhost:8080",
      changeOrigin: true,
    }
  }
}
```

**Vantaggio**: Evita CORS. Frontend chiama `/api/immobili`, Vite reindirizza a `http://localhost:8080/api/immobili`.

---

#### Pattern Fetch Ricorrente

**Esempio standard**:
```jsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchData() {
    try {
      const res = await fetch("/api/immobili");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, []);
```

**Con autenticazione (cookies)**:
```jsx
const res = await fetch("/api/auth/me", {
  method: "GET",
  credentials: "include",  // Invia cookie sessione
});
```

---

### 7.6 Routing & Navigazione

**File**: `src/App.jsx`

**Route principali**:

| Path | Componente | Accesso | Descrizione |
|------|-----------|---------|-------------|
| `/` | `Home` | Pubblico | Homepage landing |
| `/cerca` | `Search` | Pubblico | Ricerca immobili con filtri |
| `/immobile/:id` | `PropertyDetail` | Pubblico | Dettaglio immobile |
| `/valuta` | `Configurator` | Pubblico | Form valutazione multi-step |
| `/login` | `Login` | Pubblico | Autenticazione |
| `/signin` | `Signin` | Pubblico | Registrazione |
| `/personal-area` | `PersonalArea` | Autenticato | Area utente + richieste |
| `/backoffice` | `Backoffice` | Admin only | Gestione immobili e valutazioni |
| `*` | `NotFound` | Pubblico | Pagina 404 |

**Navigazione programmatica**:
```jsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
navigate("/personal-area");  // Redirect dopo login
```

---

### 7.7 Styling & UI Framework

#### Tailwind CSS Utility-First

**Configurazione**: `tailwind.config.js`

**Palette colori progetto**:
```css
--primary-blue: #004E98   /* Blu aziendale */
--accent-orange: #FF6700  /* Arancione CTA */
--neutral-gray: #EBEBEB   /* Grigio background */
```

**Pattern comuni**:
```jsx
// Card immobile
<div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
  
// Bottone primario
<button className="bg-[#004E98] text-white px-6 py-3 rounded-lg hover:bg-[#003A73] transition-colors">

// Gradient background
<div style={{ background: 'linear-gradient(135deg, #004E98 0%, #3A6EA5 50%, #5B8DB8 100%)' }}>
```

---

#### File CSS Custom

**Organizzazione**:
- `App.css`: Stili globali, reset
- `index.css`: Tailwind imports + custom utilities
- `styles/*.css`: Override specifici per pagine complesse

**Esempio** (`configurator_tailwind.css`):
```css
.configurator {
  @apply min-h-screen flex items-center justify-center p-4;
}

.step-card {
  @apply bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full;
}
```

---

### 7.8 Ottimizzazioni Performance

1. **Lazy Loading Routes**: Riduce bundle iniziale da ~800KB a ~200KB
2. **Image Optimization**: Immagini caricate da `/api/immobili/{id}/immagini` (backend serve statico)
3. **Debounce Filters**: Evita re-render eccessivi durante digitazione filtri
4. **Memoization**: `useMemo` per calcoli pesanti (es. filtri complessi)
5. **Code Splitting**: Ogni pagina = chunk separato Vite

---

### 7.9 Gestione Errori & UX

#### Loading States
```jsx
{loading ? (
  <div className="flex justify-center py-20">
    <div className="spinner"></div>
  </div>
) : (
  <PropertyList properties={data} />
)}
```

#### Fallback 404
```jsx
<Route path="*" element={<NotFound />} />
```

#### Toast Notifications
```jsx
const [showSuccess, setShowSuccess] = useState(false);

// Mostra 3s poi chiudi
setShowSuccess(true);
setTimeout(() => setShowSuccess(false), 3000);
```

---

### 7.10 Best Practices Implementate

✅ **Component Composition**: Componenti piccoli, riutilizzabili  
✅ **Separation of Concerns**: Logica (pages) vs presentazione (components)  
✅ **Single Responsibility**: Ogni componente ha un compito specifico  
✅ **DRY Principle**: Evita duplicazione (es. PropertyCard riusato in Search/Home)  
✅ **Controlled Components**: Form gestiti via `useState`  
✅ **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation  
✅ **Mobile First**: Design responsive, sidebar collassabile  
✅ **Performance**: Lazy loading, code splitting, immagini ottimizzate  

---

## 8. Avvio del Progetto

### Ordine di Avvio Consigliato

1. **Backend** (prima)
2. **Frontend** (dopo che il backend è online)

---

### 8.1 Avviare il Backend

**Opzione A: Da Terminale (Maven)**

```powershell
# Dalla cartella backend/
cd backend

# Con Maven installato
mvn spring-boot:run

# OPPURE con Maven Wrapper
.\mvnw.cmd spring-boot:run   # Windows PowerShell
./mvnw spring-boot:run       # macOS/Linux
```

**Opzione B: Da Terminale (JAR diretto)**

```powershell
# Prima compila (se non fatto)
mvn clean package -DskipTests

# Poi esegui il JAR
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

**Opzione C: Da IDE (IntelliJ / Eclipse / VS Code)**

1. Apri il progetto `backend/` nell'IDE
2. Trova la classe `BackendApplication.java`
3. Click destro → **Run 'BackendApplication'**

**Output atteso**:
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/

...
Started BackendApplication in 3.456 seconds (process running for 4.123)
```

**Backend online su**: `http://localhost:8080`

---

### 8.2 Avviare il Frontend

**Apri un NUOVO terminale** (lascia il backend in esecuzione)

```powershell
# Dalla root del progetto
cd frontend

# Avvia server di sviluppo Vite
npm run dev
```

**Output atteso**:
```
  VITE v7.1.7  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Frontend online su**: `http://localhost:5173`

---

## 9. Database H2

### 9.1 Accedere alla Console H2

1. Assicurati che il **backend sia in esecuzione**
2. Apri browser e vai a: **http://localhost:8080/h2**

### 9.2 Credenziali di Accesso

Inserisci nel form di login:

| Campo | Valore |
|-------|--------|
| **JDBC URL** | `jdbc:h2:file:./data/immobiliaris` |
| **User Name** | `sa` |
| **Password** | *(lascia vuoto)* |

Click su **Connect**

### 9.3 Esplorare il Database

Ora puoi:
- Vedere le 9 tabelle: `users`, `immobili`, `richieste`, `valutazioni`, `zone_prezzi`, ecc.
- Eseguire query SQL:
  ```sql
  SELECT * FROM users;
  SELECT * FROM zone_prezzi WHERE citta = 'Torino';
  SELECT * FROM valutazioni WHERE richiesta_id IS NOT NULL;
  ```

### 9.4 Struttura Tabelle Principali

**users**
```sql
id, nome, cognome, email (UNIQUE), password, telefono, 
ruolo ('utente'|'admin'), data_registrazione, verificato
```

**immobili**
```sql
id, proprietario_id (FK→users), tipo_immobile, indirizzo, 
citta, cap, superficie, num_locali, prezzo_richiesto, 
stato ('bozza'|'valutato'|'in_vendita'|'venduto'), ...
```

**richieste**
```sql
id, nome, cognome, email, telefono, tipo_immobile, 
superficie, cap, stato_conservazione, classe_energetica,
valutata (BOOLEAN), data_creazione, ...
```

**valutazioni** **TABELLA IBRIDA**
```sql
id, 
immobile_id (FK→immobili, NULLABLE),    -- NULL se valutazione per richiesta
richiesta_id (FK→richieste, NULLABLE),  -- NULL se valutazione per immobile
valore_stimato_min, valore_stimato_max, 
prezzo_mq, note, data_valutazione
```

**zone_prezzi**
```sql
id, cap (UNIQUE), citta, zona_nome, prezzo_mq_medio
-- 48 zone Piemonte (Torino: 36 CAP, altre città: 12)
```

---

## 10. Verifica Funzionamento

### 10.1 Test Backend API

**Metodo A: Browser**

Apri browser e testa questi endpoint:

```
GET http://localhost:8080/api/immobili
→ Lista immobili (JSON)

GET http://localhost:8080/api/zone-prezzi
→ Lista zone prezzi Piemonte

GET http://localhost:8080/api/auth/check
→ Verifica sessione (risponde sempre, anche non autenticato)
```

**Metodo B: PowerShell**

```powershell
# Test endpoint immobili
Invoke-RestMethod -Uri 'http://localhost:8080/api/immobili' -Method Get

# Test endpoint zone prezzi
Invoke-RestMethod -Uri 'http://localhost:8080/api/zone-prezzi' -Method Get
```

**Metodo C: VS Code Extension (REST Client / Thunder Client)**

1. Installa estensione **REST Client** o **Thunder Client**
2. Crea file `test.http`:
   ```http
   ### Get all immobili
   GET http://localhost:8080/api/immobili

   ### Get zone prezzi
   GET http://localhost:8080/api/zone-prezzi
   ```
3. Click su "Send Request"

### 10.2 Test Frontend

1. Apri browser: **http://localhost:5173**
2. Dovresti vedere la **Homepage** di Immobiliaris
3. Naviga:
   - **Configuratore**: `/configurator` (form multi-step valutazione)
   - **Login**: `/login`
   - **Ricerca Immobili**: `/search`
   - **Backoffice**: `/backoffice` (richiede login admin)

### 10.3 Test Login Admin

1. Vai a: **http://localhost:5173/login**
2. Credenziali di test:
   ```
   Email: andrea.verdi@email.com
   Password: 1234
   ```
3. Dopo login, puoi accedere a `/backoffice` per gestire richieste

### 10.4 Test Flusso Completo Valutazione

**Scenario**: Utente richiede valutazione immobile

1. **Frontend** → `/configurator`
2. Compila form multi-step:
   - Dati personali
   - Indirizzo + CAP (es. `10121` Torino)
   - Caratteristiche (superficie, stanze, classe energetica)
3. Invia form → crea record in tabella `richieste`
4. **Backoffice** (`/backoffice` come admin):
   - Vedi richiesta nella lista
   - Click "Valuta automaticamente"
   - Sistema calcola valore basandosi su `zone_prezzi` + modificatori
   - Salva in tabella `valutazioni` con `richiesta_id`
   - Flag `richieste.valutata = TRUE` (pallino verde)
5. **Database H2** → verifica record:
   ```sql
   SELECT * FROM richieste WHERE valutata = TRUE;
   SELECT * FROM valutazioni WHERE richiesta_id IS NOT NULL;
   ```

---

## 11. Configurazione Email Brevo (Opzionale)

Il sistema può inviare email transazionali tramite **Brevo (ex Sendinblue)**.

### 11.1 Ottenere API Key Brevo

1. Registrati su: [https://www.brevo.com](https://www.brevo.com)
2. Vai a: **Settings → API Keys**
3. Crea una nuova chiave (tipo: `Transactional Emails`)
4. Copia la chiave (es. `xkeysib-abc123...`)

### 11.2 Configurare Variabile d'Ambiente

**⚠️ MAI scrivere la chiave in `application.properties` o committarla su Git!**

**Windows PowerShell**:
```powershell
$env:BREVO_API_KEY = "xkeysib-TUA_CHIAVE_QUI"
```

**macOS/Linux**:
```bash
export BREVO_API_KEY="xkeysib-TUA_CHIAVE_QUI"
```

**Permanente (Windows)**:
1. Cerca "Variabili d'ambiente" nel menu Start
2. **Variabili d'ambiente** → **Nuova** (utente)
3. Nome: `BREVO_API_KEY`
4. Valore: `xkeysib-TUA_CHIAVE_QUI`

### 11.3 Configurazione Backend

**File**: `application.properties`

```properties
brevo.api.key=${BREVO_API_KEY:}
brevo.sender.email=noreply@tuodominio.com
brevo.sender.name=Immobiliaris
```

### 11.4 Test Invio Email

**Endpoint**: `POST /api/email/send`

**Payload**:
```json
{
  "to": "destinatario@example.com",
  "name": "Mario Rossi",
  "subject": "Test Email",
  "text": "Corpo del messaggio"
}
```

**PowerShell**:
```powershell
$json = '{"to":"tua-email@example.com","name":"Test","subject":"Prova","text":"Funziona!"}'
$bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
Invoke-RestMethod -Uri 'http://localhost:8080/api/email/send' -Method Post -ContentType 'application/json' -Body $bytes
```

**Documentazione completa**: Vedi sezione successiva (Capitolo 11)

---

## 12. Guida Completa Integrazione Brevo (Email Marketing)

### 12.1 Panoramica Brevo

**Brevo** (ex Sendinblue) è la piattaforma di email marketing integrata nel progetto per:
- **Email transazionali**: conferma richiesta valutazione, notifiche
- **Campagne marketing**: newsletter, promozioni immobili
- **Gestione contatti**: liste utenti, segmentazione

**File coinvolti**:
- `backend/src/main/java/com/immobiliaris/backend/service/BrevoEmailService.java`
- `backend/src/main/java/com/immobiliaris/backend/controller/EmailController.java`
- `backend/src/main/resources/application.properties` (variabile `BREVO_API_KEY`)

---

### 12.2 Configurazione Chiave API

#### Passo 1: Ottenere API Key

1. Registrati su [Brevo](https://www.brevo.com/)
2. Vai su **Impostazioni → API Keys**
3. Genera nuova chiave (copia subito, mostrata una sola volta)

#### Passo 2: Impostare Variabile Ambiente

**PowerShell** (Windows):
```powershell
# Sessione corrente
$env:BREVO_API_KEY = "tua-chiave-api-brevo"

# Persistente (richiede riavvio terminale)
[System.Environment]::SetEnvironmentVariable('BREVO_API_KEY', 'tua-chiave-api', 'User')
```

**Bash** (macOS/Linux):
```bash
# Sessione corrente
export BREVO_API_KEY="tua-chiave-api-brevo"

# Persistente (aggiungi a ~/.bashrc o ~/.zshrc)
echo 'export BREVO_API_KEY="tua-chiave-api"' >> ~/.bashrc
source ~/.bashrc
```

**Verifica configurazione**:
```powershell
echo $env:BREVO_API_KEY  # PowerShell
echo $BREVO_API_KEY      # Bash
```

---

### 12.3 Endpoint API Disponibili

#### Verifica Stato Connessione

```http
GET http://localhost:8080/api/brevo/status
```

**Risposta**:
```json
{
  "status": "connected",
  "apiKeyConfigured": true,
  "accountName": "Immobiliaris"
}
```

#### Invio Email Transazionale

```http
POST http://localhost:8080/api/email/send
Content-Type: application/json

{
  "to": "destinatario@example.com",
  "name": "Mario Rossi",
  "subject": "Conferma Richiesta Valutazione",
  "text": "Grazie per la tua richiesta. La valuteremo entro 72 ore.",
  "listIds": [3]
}
```

**Parametri**:
- `to` (string, required): Email destinatario
- `name` (string, required): Nome destinatario
- `subject` (string, required): Oggetto email
- `text` (string, required): Corpo messaggio plain text
- `templateId` (integer, optional): ID template Brevo
- `params` (object, optional): Variabili per template
- `listIds` (array, optional): Aggiungi contatto a liste

**Risposta**:
```json
{
  "messageId": "abc123...",
  "success": true
}
```

---

### 12.4 API Brevo Dirette (Bypass Backend)

Per operazioni avanzate, chiama direttamente le API Brevo:

**Base URL**: `https://api.brevo.com/v3`  
**Header richiesti**:
- `api-key: YOUR_API_KEY`
- `Content-Type: application/json`

#### Lista Contatti

```bash
curl -X GET "https://api.brevo.com/v3/contacts" \
  -H "api-key: tua-chiave-api" \
  -H "Content-Type: application/json"
```

#### Crea/Aggiorna Contatto (Upsert)

```bash
curl -X POST "https://api.brevo.com/v3/contacts" \
  -H "api-key: tua-chiave-api" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "attributes": {
      "FIRSTNAME": "Mario",
      "LASTNAME": "Rossi"
    },
    "listIds": [3],
    "updateEnabled": true
  }'
```

#### Recupera Dettagli Contatto

```bash
curl -X GET "https://api.brevo.com/v3/contacts/{contactId}" \
  -H "api-key: tua-chiave-api"
```

#### Lista Campagne Email

```bash
curl -X GET "https://api.brevo.com/v3/emailCampaigns" \
  -H "api-key: tua-chiave-api"
```

#### Crea Campagna Email

```bash
curl -X POST "https://api.brevo.com/v3/emailCampaigns" \
  -H "api-key: tua-chiave-api" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nuovi Immobili Marzo",
    "subject": "Scopri le nuove proprietà disponibili",
    "sender": {
      "name": "Immobiliaris",
      "email": "info@immobiliaris.it"
    },
    "type": "classic",
    "htmlContent": "<h1>Nuovi immobili in esclusiva</h1>...",
    "listIds": [3]
  }'
```

#### Invia Campagna Immediatamente

```bash
curl -X POST "https://api.brevo.com/v3/emailCampaigns/{campaignId}/sendNow" \
  -H "api-key: tua-chiave-api"
```

#### Invio Transazionale Diretto

```bash
curl -X POST "https://api.brevo.com/v3/smtp/email" \
  -H "api-key: tua-chiave-api" \
  -H "Content-Type: application/json" \
  -d '{
    "sender": {
      "name": "Immobiliaris",
      "email": "noreply@immobiliaris.it"
    },
    "to": [
      {
        "email": "user@example.com",
        "name": "Mario"
      }
    ],
    "subject": "Conferma richiesta",
    "textContent": "Grazie per la tua richiesta..."
  }'
```

---

### 12.5 Test con Thunder Client (VS Code)

**Passo 1**: Installa estensione [Thunder Client](https://www.thunderclient.com/)

**Passo 2**: Crea nuova richiesta
- Method: `POST`
- URL: `http://localhost:8080/api/email/send`
- Headers: 
  - `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "to": "tua-email@example.com",
  "name": "Test User",
  "subject": "Test Invio",
  "text": "Questo è un messaggio di test",
  "listIds": [3]
}
```

**Passo 3**: Clicca **Send** → verifica risposta

---

### 12.6 Test con PowerShell

```powershell
# Prepara JSON payload
$json = @'
{
  "to": "tua-email@example.com",
  "name": "Test User",
  "subject": "Test PowerShell",
  "text": "Email inviata da PowerShell",
  "listIds": [3]
}
'@

# Converti in bytes UTF-8 (evita problemi encoding)
$bytes = [System.Text.Encoding]::UTF8.GetBytes($json)

# Invia richiesta
Invoke-RestMethod -Uri 'http://localhost:8080/api/email/send' `
  -Method Post `
  -ContentType 'application/json' `
  -Body $bytes
```

---

### 12.7 Troubleshooting Brevo

#### Errore: `403 permission_denied`

**Messaggio**: `"Unable to send email. Your SMTP account is not yet activated..."`

**Causa**: Account Brevo non abilitato per invii transazionali (limitazione nuovo account)

**Soluzione**:
1. Contatta supporto Brevo via email:
   ```
   Subject: Activate Transactional Email Account
   
   Hello,
   I need to enable transactional emails for my account.
   Account email: tuo-email@example.com
   Use case: Real estate platform confirmation emails
   
   Thanks,
   [Tuo Nome]
   ```
2. Attendi conferma (solitamente 24-48h)
3. Verifica status con `GET /api/brevo/status`

---

#### Errore: `535 Authentication failed`

**Causa**: Credenziali SMTP errate (se usi relay SMTP invece di API)

**Soluzione**:
1. Vai su pannello Brevo → **SMTP & API**
2. Rigenera password SMTP
3. Aggiorna credenziali in `application.properties`:
   ```properties
   spring.mail.username=tuo-username@brevo.com
   spring.mail.password=nuova-password-smtp
   ```

---

#### Errore PowerShell: `Invalid UTF-8 middle byte`

**Causa**: Encoding caratteri speciali non gestito

**Soluzione**: Usa conversione bytes UTF-8 (vedi esempio PowerShell sopra)

---

#### Rate Limit Superato

**Messaggio**: `429 Too Many Requests`

**Causa**: Piano gratuito Brevo limita invii (es. 300/giorno)

**Soluzione**:
1. Verifica limiti nel pannello Brevo
2. Upgrade piano (Starter: 20.000 email/mese)
3. Implementa throttling nel backend con `@RateLimiter`

---

### 12.8 Sicurezza & Best Practices

**❌ MAI fare**:
- Committare `BREVO_API_KEY` in `application.properties`
- Condividere chiave in chat/forum pubblici
- Usare stessa chiave per dev/staging/produzione

**✅ Best Practices**:
- Usa variabili ambiente (`$env:BREVO_API_KEY`)
- Produzione: secret manager (AWS Secrets, Azure Key Vault)
- Rigenera chiave se compromessa
- Chiavi diverse per ambiente (dev/staging/prod)
- Log: censura chiavi (`***` invece del valore)

---

## 13. Troubleshooting

### Problema: "Port 8080 already in use"

**Causa**: Un altro processo usa la porta 8080

**Soluzione Windows**:
```powershell
# Trova processo sulla porta 8080
netstat -ano | findstr :8080

# Termina processo (sostituisci PID)
taskkill /PID <numero_pid> /F
```

**Soluzione alternativa**: Cambia porta in `application.properties`:
```properties
server.port=8081
```

---

### Problema: "Cannot find module 'react'"

**Causa**: Dipendenze npm non installate

**Soluzione**:
```powershell
cd frontend
npm install
```

---

### Problema: "CORS policy error"

**Causa**: Frontend chiama backend senza proxy configurato

**Soluzione**: Verifica `frontend/vite.config.js`:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }
  }
}
```

Riavvia Vite: `Ctrl+C` → `npm run dev`

---

### Problema: Database H2 non si connette

**Causa**: JDBC URL errato

**Soluzione**: Nella console H2, usa esattamente:
```
jdbc:h2:file:./data/immobiliaris
```

(NON `~/data/immobiliaris` o `C:\...`)

---

### Problema: "Java version mismatch"

**Causa**: Java versione diversa da 21

**Soluzione**:
```powershell
# Verifica versione
java -version

# Se diversa da 21, scarica JDK 21 e imposta JAVA_HOME
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
```

---

### Problema: Maven build fallisce

**Causa**: Cache corrotta o dipendenze non scaricate

**Soluzione**:
```powershell
# Pulisci cache Maven
mvn clean

# Forza download dipendenze
mvn clean install -U

# Se fallisce ancora, elimina cache locale
Remove-Item -Recurse -Force ~\.m2\repository
mvn clean install
```

---

## Risorse Aggiuntive



### Documentazione Tecnologie

- [Spring Boot Docs](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [H2 Database Docs](https://www.h2database.com/html/main.html)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Brevo API Reference](https://developers.brevo.com/reference/getting-started-1)

### Contatti Team Connectwork

In caso di problemi non risolvibili, contatta i membri del team per area di competenza:

#### Backend & Database
- **Omar Benagoub** - [@Omarben05](https://github.com/Omarben05)
- **Domenico Vardé** - [@domenicovarde](https://github.com/domenicovarde)
- **Simone Pizzorno** - [@Simone-Pix](https://github.com/Simone-Pix)

#### Frontend & UX/UI
- **Vittorio Cenni** - [@ViTz1](https://github.com/ViTz1)
- **Andrea Giraudo** - [@AndreaXVII17](https://github.com/AndreaXVII17)
- **Mayté Cachi** - [@MayteCachi](https://github.com/MayteCachi)

#### Digital Strategy & Marketing
- **Ilaria Mussano** - [@ilariamussano-cyber](https://github.com/ilariamussano-cyber)
- **Saverio Chiusolo** - [@saveriochiusolo-cell](https://github.com/saveriochiusolo-cell)
- **Tommaso Allietta** - [@tommasoallietta-beep](https://github.com/tommasoallietta-beep)

**Repository GitHub**: [Simone-Pix/Connectwork](https://github.com/Simone-Pix/Connectwork)

---

## Checklist Post-Installazione

- [ ] Java 21 installato (`java -version`)
- [ ] Maven funzionante (`mvn -version` o `mvnw`)
- [ ] Node.js 20+ installato (`node -v`)
- [ ] Repository clonato correttamente
- [ ] Backend: dipendenze scaricate (`mvn clean install`)
- [ ] Frontend: dipendenze scaricate (`npm install`)
- [ ] Backend avviato senza errori (porta 8080)
- [ ] Frontend avviato senza errori (porta 5173)
- [ ] Console H2 accessibile (`http://localhost:8080/h2`)
- [ ] Homepage visibile (`http://localhost:5173`)
- [ ] Login admin funzionante (`andrea.verdi@email.com` / `1234`)
- [ ] Endpoint API rispondono (`/api/immobili`, `/api/zone-prezzi`)
- [ ] (Opzionale) Brevo API key configurata

---

**Installazione Completata!**

Il progetto Immobiliaris è ora pronto per lo sviluppo o il testing.

Per avviare il progetto in futuro:
1. Apri 2 terminali
2. **Terminale 1**: `cd backend` → `mvn spring-boot:run`
3. **Terminale 2**: `cd frontend` → `npm run dev`
4. Apri browser: `http://localhost:5173`

**Buon lavoro!**
