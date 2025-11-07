package com.immobiliaris.backend.model;

import jakarta.persistence.Converter;

/**
 * Single file containing concrete converters for the nested enums in {@link Enums}.
 */
public final class Converters {
    private Converters() { }

    @Converter(autoApply = false)
    public static class TipoImmobileConverter extends AbstractEnumConverter<Enums.TipoImmobile> {
        @Override protected Class<Enums.TipoImmobile> getEnumClass() { return Enums.TipoImmobile.class; }
    }

    @Converter(autoApply = false)
    public static class StatoConservazioneConverter extends AbstractEnumConverter<Enums.StatoConservazione> {
        @Override protected Class<Enums.StatoConservazione> getEnumClass() { return Enums.StatoConservazione.class; }
    }

    @Converter(autoApply = false)
    public static class ClasseEnergeticaConverter extends AbstractEnumConverter<Enums.ClasseEnergetica> {
        @Override protected Class<Enums.ClasseEnergetica> getEnumClass() { return Enums.ClasseEnergetica.class; }
    }

    @Converter(autoApply = false)
    public static class StatoImmobileConverter extends AbstractEnumConverter<Enums.StatoImmobile> {
        @Override protected Class<Enums.StatoImmobile> getEnumClass() { return Enums.StatoImmobile.class; }
    }
}
