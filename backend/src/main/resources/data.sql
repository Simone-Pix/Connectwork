-- ============================================================
-- POPOLAMENTO DATABASE IMMOBILIARIS (H2)
-- ============================================================

-- 1️⃣ TABELLA USERS
INSERT INTO users (nome, cognome, email, password, telefono, ruolo, verificato)
VALUES
('Andrea', 'Verdi', 'andrea.verdi@email.com', '1234', '3331112222', 'admin', TRUE),
('Giulia', 'Rossi', 'giulia.rossi@email.com', 'abcd', '3334445555', 'utente', TRUE),
('Luca', 'Bianchi', 'luca.bianchi@email.com', 'pass', '3336667777', 'utente', FALSE);

-- ============================================================
-- 2️⃣ TABELLA IMMOBILI
INSERT INTO immobili (proprietario_id, tipo_immobile, indirizzo, citta, provincia, cap, superficie, num_locali, num_bagni, piano, anno_costruzione, stato_conservazione, classe_energetica, prezzo_richiesto, descrizione, disponibile_esclusiva, stato)
VALUES
(1, 'appartamento', 'Via Roma 10', 'Torino', 'TO', '10121', 85.50, 3, 1, 2, 1995, 'buono', 'C', 185000.00, 'Appartamento luminoso in centro città con balcone.', TRUE, 'in_vendita'),
(2, 'villa', 'Corso Francia 201', 'Rivoli', 'TO', '10098', 250.00, 6, 3, 0, 2008, 'ottimo', 'B', 580000.00, 'Villa indipendente con giardino e piscina privata.', TRUE, 'valutato'),
(2, 'ufficio', 'Via Garibaldi 5', 'Torino', 'TO', '10122', 120.00, 4, 2, 1, 2015, 'ottimo', 'A', 310000.00, 'Ufficio moderno con impianti domotici e reception.', FALSE, 'bozza'),
(3, 'commerciale', 'Via Nizza 150', 'Moncalieri', 'TO', '10024', 180.00, 5, 1, 0, 2000, 'buono', 'D', 250000.00, 'Locale commerciale con vetrine su strada di passaggio.', TRUE, 'in_vendita');

-- ============================================================
INSERT INTO immobile_features (immobile_id, feature_tipo)
VALUES
(1, 'ascensore'),
(1, 'riscaldamento'),
(2, 'giardino'),
(2, 'garage'),
(2, 'terrazzo'),  -- sostituito piscina con terrazzo
(3, 'condizionatore'),
(3, 'allarme'),
(4, 'vista'),
(4, 'accessibile_disabili');

-- ============================================================
-- 4️⃣ TABELLA IMMAGINI
INSERT INTO immagini (immobile_id, url, tipo)
VALUES
(1, 'http://localhost:8080/immagini/Immobile1Foto1.jpg', 'foto'),
(1, 'http://localhost:8080/immagini/Immobile1Foto2.jpg', 'planimetria'),
(2, 'http://localhost:8080/immagini/Immobile2Foto1.jpg', 'foto'),
(2, 'http://localhost:8080/immagini/Immobile2Foto2.jpg', 'foto'),
(3, 'http://localhost:8080/immagini/Immobile3Foto1.jpg', 'foto'),
(4, 'http://localhost:8080/immagini/Immobile4Foto1.jpg', 'foto'),
(4, 'http://localhost:8080/immagini/Immobile4Foto2.jpg', 'planimetria');



-- ============================================================
-- 5️⃣ TABELLA VALUTAZIONI
INSERT INTO valutazioni (immobile_id, valore_stimato_min, valore_stimato_max, prezzo_mq, note)
VALUES
(1, 175000.00, 190000.00, 2176.47, 'Valutazione basata su zona centrale e condizioni generali.'),
(2, 550000.00, 600000.00, 2320.00, 'Ottimo stato generale e giardino ben curato.'),
(3, 290000.00, 320000.00, 2583.33, 'Ufficio moderno con impianti efficienti.'),
(4, 240000.00, 260000.00, 1388.88, 'Posizione commerciale con alta visibilità.');

-- ============================================================
-- 6️⃣ TABELLA CONTRATTI
INSERT INTO contratti (immobile_id, proprietario_id, tipo, durata_mesi, commissione, stato)
VALUES
(1, 1, 'esclusiva', 12, 2.50, 'proposta'),
(2, 2, 'mandato', 24, 3.00, 'accettato'),
(3, 2, 'esclusiva', 18, 2.75, 'rifiutato'),
(4, 3, 'mandato', 6, 2.00, 'accettato');

INSERT INTO log_attivita (user_id, immobile_id, azione)
VALUES
(1, 1, 'Ha inserito un nuovo immobile in vendita.'),
(2, 2, 'Ha aggiornato la descrizione della villa.'),
(1, 1, 'Ha creato il contratto di esclusiva.'),
(2, 3, 'Ha effettuato la valutazione iniziale.'),
(3, 1, 'Ha modificato il prezzo richiesto.'),
(1, 4, 'Ha aggiunto foto e planimetria.'),
(2, 4, 'Ha contrassegnato come "in vendita".');

-- ============================================================
-- Tabella richieste (esempio dati forniti)
INSERT INTO richieste (nome, cognome, email, telefono, indirizzo, tipo_operazione, tempistica, piano, stanze, bagni, superficie, optional_info)
VALUES
('utente', 'user', 'user@its.net', 'tgfw', 'daf', 'appartamento', 'Subito', 4, 4, 4, 4.00, 'Balcone');
