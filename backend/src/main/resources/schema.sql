-- Database schema per l'applicazione immobiliare

-- Tabella users
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cognome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    ruolo VARCHAR(20) DEFAULT 'utente' CHECK (ruolo IN ('utente','admin')),
    data_registrazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verificato BOOLEAN DEFAULT FALSE
);

-- Tabella immobili
CREATE TABLE IF NOT EXISTS immobili (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    proprietario_id BIGINT NOT NULL,
    tipo_immobile VARCHAR(50) NOT NULL CHECK (tipo_immobile IN ('appartamento','villa','ufficio','commerciale')),
    indirizzo VARCHAR(255) NOT NULL,
    citta VARCHAR(100) NOT NULL,
    provincia VARCHAR(50) NOT NULL,
    cap VARCHAR(10) NOT NULL,
    superficie DECIMAL(10,2) NOT NULL,
    num_locali INT,
    num_bagni INT,
    piano INT,
    anno_costruzione SMALLINT,
    stato_conservazione VARCHAR(50) CHECK (stato_conservazione IN ('da_ristrutturare','buono','ottimo','lusso')),
    classe_energetica VARCHAR(2) CHECK (classe_energetica IN ('A','B','C','D','E','F','G')),
    prezzo_richiesto DECIMAL(12,2),
    descrizione CLOB,
    disponibile_esclusiva BOOLEAN DEFAULT FALSE,
    stato VARCHAR(20) DEFAULT 'bozza' CHECK (stato IN ('bozza','valutato','in_vendita','venduto')),
    data_inserimento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Immobili_Users FOREIGN KEY (proprietario_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabella immobile_features
CREATE TABLE IF NOT EXISTS immobile_features (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    immobile_id BIGINT NOT NULL,
    feature_tipo VARCHAR(50) NOT NULL CHECK (feature_tipo IN ('giardino','garage','terrazzo','ascensore','riscaldamento','condizionatore','allarme','arredato','vista','accessibile_disabili')),
    CONSTRAINT FK_Features_Immobili FOREIGN KEY (immobile_id) REFERENCES immobili(id) ON DELETE CASCADE
);

-- Tabella immagini
CREATE TABLE IF NOT EXISTS immagini (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    immobile_id BIGINT NOT NULL,
    url VARCHAR(500) NOT NULL,
    tipo VARCHAR(50) DEFAULT 'foto' CHECK (tipo IN ('foto','planimetria','video','360')),
    CONSTRAINT FK_Immagini_Immobili FOREIGN KEY (immobile_id) REFERENCES immobili(id) ON DELETE CASCADE
);

-- Tabella valutazioni
CREATE TABLE IF NOT EXISTS valutazioni (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    immobile_id BIGINT NOT NULL,
    valore_stimato_min DECIMAL(12,2),
    valore_stimato_max DECIMAL(12,2),
    prezzo_mq DECIMAL(8,2),
    note CLOB,
    data_valutazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Valutazioni_Immobili FOREIGN KEY (immobile_id) REFERENCES immobili(id) ON DELETE CASCADE
);

-- Tabella contratti
CREATE TABLE IF NOT EXISTS contratti (
    id_contract BIGINT AUTO_INCREMENT PRIMARY KEY,
    immobile_id BIGINT NOT NULL,
    proprietario_id BIGINT NOT NULL,
    tipo VARCHAR(20) DEFAULT 'esclusiva' CHECK (tipo IN ('esclusiva','mandato')),
    durata_mesi INT,
    commissione DECIMAL(5,2),
    stato VARCHAR(20) DEFAULT 'proposta' CHECK (stato IN ('proposta','accettato','rifiutato')),
    data_proposta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Contratti_Immobili FOREIGN KEY (immobile_id) REFERENCES immobili(id) ON DELETE CASCADE,
    CONSTRAINT FK_Contratti_Users FOREIGN KEY (proprietario_id) REFERENCES users(id)
);

-- Tabella log_attivita
CREATE TABLE IF NOT EXISTS log_attivita (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    immobile_id BIGINT,
    azione VARCHAR(255),
    data_azione TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Log_Users FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT FK_Log_Immobili FOREIGN KEY (immobile_id) REFERENCES immobili(id)
);

-- optional immobile null 

--tabella: richieste (richieste contatto / annunci semplificati)
CREATE TABLE IF NOT EXISTS richieste (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cognome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    indirizzo VARCHAR(255) NOT NULL,
    -- tipo operazione si puo far esplodere
    tipo_operazione VARCHAR(100) NOT NULL,
    tempistica VARCHAR(100) NOT NULL,
    piano INT NOT NULL,
    stanze INT NOT NULL,
    bagni INT NOT NULL,
    superficie DECIMAL(10,2) NOT NULL,
    optional_info VARCHAR(1000) NULL,
    -- Campi aggiunti per valutazione automatica
    cap VARCHAR(10),
    citta VARCHAR(100),
    provincia VARCHAR(50),
    tipo_immobile VARCHAR(50),
    anno_costruzione SMALLINT,
    stato_conservazione VARCHAR(50) CHECK (stato_conservazione IN ('da_ristrutturare','buono','ottimo','lusso')),
    classe_energetica VARCHAR(2) CHECK (classe_energetica IN ('A','B','C','D','E','F','G')),
    valutata BOOLEAN DEFAULT FALSE,
    data_creazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella zone_prezzi per la valutazione automatica
CREATE TABLE IF NOT EXISTS zone_prezzi (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cap VARCHAR(10) NOT NULL UNIQUE,
    citta VARCHAR(100) NOT NULL,
    zona_nome VARCHAR(255),
    prezzo_mq_medio DECIMAL(10,2) NOT NULL
);

