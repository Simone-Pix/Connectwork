-- Inserimento zone prezzi Piemonte
-- Copia e incolla questo SQL nella console H2

INSERT INTO zone_prezzi (cap, citta, zona_nome, prezzo_mq_medio) VALUES
('10121', 'Torino', 'Centro - Crocetta', 3500.00),
('10122', 'Torino', 'Centro - Quadrilatero Romano', 4200.00),
('10123', 'Torino', 'Centro - Via Roma / Piazza San Carlo', 4500.00),
('10124', 'Torino', 'Centro - Vanchiglia', 3200.00),
('10125', 'Torino', 'Centro - San Salvario', 2900.00),
('10126', 'Torino', 'Cit Turin - Borgo San Paolo', 2600.00),
('10127', 'Torino', 'Cenisia - San Paolo', 2400.00),
('10128', 'Torino', 'Campidoglio - Parella', 2700.00),
('10129', 'Torino', 'Pozzo Strada - Santa Rita', 2300.00),
('10130', 'Torino', 'Madonna di Campagna', 2200.00),
('10131', 'Torino', 'Barriera Milano - Regio Parco', 1900.00),
('10132', 'Torino', 'Madonna del Pilone - Sassi', 2100.00),
('10133', 'Torino', 'Borgo Po - Cavoretto', 3100.00),
('10134', 'Torino', 'Cavoretto - Villa della Regina', 3400.00),
('10135', 'Torino', 'Parella - Pozzo Strada', 2500.00),
('10136', 'Torino', 'Mirafiori Nord', 2000.00),
('10137', 'Torino', 'Mirafiori Sud', 1800.00),
('10138', 'Torino', 'Lingotto - Nizza Millefonti', 2400.00),
('10139', 'Torino', 'Vallette - Lucento', 1900.00),
('10140', 'Torino', 'Vallette - Le Vallette', 1800.00),
('10141', 'Torino', 'Borgo Vittoria - Madonna di Campagna', 2100.00),
('10142', 'Torino', 'Borgo San Paolo - Cenisia', 2300.00),
('10143', 'Torino', 'Santa Rita - Mirafiori', 2000.00),
('10144', 'Torino', 'Barriera di Milano', 1900.00),
('10145', 'Torino', 'Falchera - Villaretto', 1700.00),
('10146', 'Torino', 'Regio Parco - Barca', 2000.00),
('10147', 'Torino', 'Vanchiglietta - Bertolla', 2200.00),
('10148', 'Torino', 'Precollina - Reaglie', 2600.00),
('10149', 'Torino', 'Borgo Po - Gran Madre', 3300.00),
('10150', 'Torino', 'Mirafiori - Stupinigi', 1900.00),
('10151', 'Torino', 'Pozzo Strada - Parella', 2400.00),
('10152', 'Torino', 'Lucento - Borgata Vittoria', 2000.00),
('10153', 'Torino', 'Villaretto - Aeronautica', 1800.00),
('10154', 'Torino', 'Barriera Milano - Rebaudengo', 2000.00),
('10155', 'Torino', 'Borgata Vittoria - Aurora', 2100.00),
('10156', 'Torino', 'Bertolla - Rebaudengo', 2200.00);

-- Altre città Piemonte
INSERT INTO zone_prezzi (cap, citta, zona_nome, prezzo_mq_medio) VALUES
('12100', 'Cuneo', 'Centro storico', 2200.00),
('15121', 'Alessandria', 'Centro', 1800.00),
('14100', 'Asti', 'Centro', 1900.00);
