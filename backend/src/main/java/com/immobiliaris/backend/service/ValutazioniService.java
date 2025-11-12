package com.immobiliaris.backend.service;


import com.immobiliaris.backend.model.Valutazioni;
import java.util.List;

public interface ValutazioniService {

    Valutazioni createValutazione(Valutazioni valutazione);
    Valutazioni save(Valutazioni valutazione);
    List<Valutazioni> getAllValutazioni();
    Valutazioni getValutazioneById(Long id);
    Valutazioni updateValutazione(Long id, Valutazioni valutazione);
    Valutazioni deleteValutazione(Long id);
}
