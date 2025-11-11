package com.immobiliaris.backend.service;
import com.immobiliaris.backend.model.Immagini;
import java.util.List;


public interface ImmaginiService {

    List<Immagini> findAll();

    Immagini findById(Long id);

    List<Immagini> findByImmobileId(Long immobileId);

    Immagini create(Immagini immagini);

    Immagini update(Long id, Immagini immagini);

    void delete(Long id);
}
