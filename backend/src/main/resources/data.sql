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


-- Dati per la tabella zone_prezzi
-- Prezzi medi al mq per le zone del Piemonte

-- TORINO - CAP da 10121 a 10156
INSERT INTO zone_prezzi (cap, citta, zona_nome, prezzo_mq_medio) VALUES
('10121', 'Torino', 'Centro - Crocetta', 3500.00),
('10122', 'Torino', 'Centro - Quadrilatero Romano', 4200.00),
('10123', 'Torino', 'Centro - Via Roma / Piazza San Carlo', 4500.00),
('10124', 'Torino', 'Centro - Vanchiglia', 3200.00),
('10125', 'Torino', 'Centro - San Salvario', 2900.00),
('10126', 'Torino', 'Cit Turin - Borgo San Paolo', 2600.00),
('10127', 'Torino', 'Cenisia - San Paolo', 2400.00),
('10128', 'Torino', 'Campidoglio - Parella', 2700.00),
('10129', 'Torino', 'Pozzo Strada - Parella Nord', 2500.00),
('10130', 'Torino', 'Madonna di Campagna', 2200.00),
('10131', 'Torino', 'Vallette - Lucento', 2000.00),
('10132', 'Torino', 'Madonna di Campagna Nord', 2100.00),
('10133', 'Torino', 'Borgo Vittoria', 2300.00),
('10134', 'Torino', 'Barriera di Milano', 1900.00),
('10135', 'Torino', 'Regio Parco - Barca', 2000.00),
('10136', 'Torino', 'Regio Parco Nord', 2100.00),
('10137', 'Torino', 'Borgo Rossini - Vanchiglietta', 2800.00),
('10138', 'Torino', 'Sassi - Madonna del Pilone', 2600.00),
('10139', 'Torino', 'Borgo Po - Crimea', 3000.00),
('10140', 'Torino', 'San Salvario Sud', 2700.00),
('10141', 'Torino', 'Mirafiori Nord - Santa Rita', 2200.00),
('10142', 'Torino', 'Mirafiori Sud', 2000.00),
('10143', 'Torino', 'Lingotto - Italia 61', 2400.00),
('10144', 'Torino', 'Nizza Millefonti', 2500.00),
('10145', 'Torino', 'Cavoretto - Villa della Regina', 3200.00),
('10146', 'Torino', 'Borgo Po Sud', 2900.00),
('10147', 'Torino', 'Precollina - Pautasso', 2700.00),
('10148', 'Torino', 'Moncalieri Borgo San Pietro', 2500.00),
('10149', 'Torino', 'Filadelfia - Lingotto Sud', 2300.00),
('10150', 'Torino', 'Mirafiori Sud Est', 2100.00),
('10151', 'Torino', 'Cenisia Nord', 2400.00),
('10152', 'Torino', 'Parella Ovest', 2600.00),
('10153', 'Torino', 'Pozzo Strada Nord', 2500.00),
('10154', 'Torino', 'Madonna di Campagna Ovest', 2200.00),
('10155', 'Torino', 'Lucento Ovest', 2000.00),
('10156', 'Torino', 'Vallette Nord', 1900.00);

-- CUNEO - CAP unico per tutta la città
INSERT INTO zone_prezzi (cap, citta, zona_nome, prezzo_mq_medio) VALUES
('12100', 'Cuneo', 'Centro e periferia', 2200.00);

-- ALESSANDRIA - CAP unico per tutta la città
INSERT INTO zone_prezzi (cap, citta, zona_nome, prezzo_mq_medio) VALUES
('15121', 'Alessandria', 'Centro e periferia', 1800.00);

-- ASTI - CAP unico per tutta la città
INSERT INTO zone_prezzi (cap, citta, zona_nome, prezzo_mq_medio) VALUES
('14100', 'Asti', 'Centro e periferia', 1900.00);

-- BIELLA - CAP unico per tutta la città
INSERT INTO zone_prezzi (cap, citta, zona_nome, prezzo_mq_medio) VALUES
('13900', 'Biella', 'Centro e periferia', 1700.00);

-- ALBA (CN) - CAP unico per tutta la città
INSERT INTO zone_prezzi (cap, citta, zona_nome, prezzo_mq_medio) VALUES
('12051', 'Alba', 'Centro e periferia', 2300.00);

-- MONCALIERI (TO) - CAP principali
INSERT INTO zone_prezzi (cap, citta, zona_nome, prezzo_mq_medio) VALUES
('10024', 'Moncalieri', 'Centro storico', 2400.00),
('10025', 'Moncalieri', 'Zona residenziale', 2200.00);

-- PINEROLO (TO) - CAP unico per tutta la città
INSERT INTO zone_prezzi (cap, citta, zona_nome, prezzo_mq_medio) VALUES
('10064', 'Pinerolo', 'Centro e periferia', 1800.00);

-- IVREA (TO) - CAP unico per tutta la città
INSERT INTO zone_prezzi (cap, citta, zona_nome, prezzo_mq_medio) VALUES
('10015', 'Ivrea', 'Centro e periferia', 1600.00);

-- FOSSANO (CN) - CAP unico per tutta la città
INSERT INTO zone_prezzi (cap, citta, zona_nome, prezzo_mq_medio) VALUES
('12045', 'Fossano', 'Centro e periferia', 1700.00);

-- RIVOLI (TO) - CAP unico per tutta la città
INSERT INTO zone_prezzi (cap, citta, zona_nome, prezzo_mq_medio) VALUES
('10098', 'Rivoli', 'Centro e periferia', 2100.00);

-- BRA (CN) - CAP unico per tutta la città
INSERT INTO zone_prezzi (cap, citta, zona_nome, prezzo_mq_medio) VALUES
('12042', 'Bra', 'Centro e periferia', 1800.00);

-- ALMESE (TO) - CAP unico per tutta la città
INSERT INTO zone_prezzi (cap, citta, zona_nome, prezzo_mq_medio) VALUES
('10040', 'Almese', 'Centro e periferia', 1500.00);
