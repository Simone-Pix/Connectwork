package com.immobiliaris.backend.model;

/**
 * Single file containing all enums used by the application to reduce file count.
 */
public final class Enums {
    private Enums() { /* utility */ }

    public static enum TipoImmobile implements PersistableEnum {
        APPARTAMENTO("appartamento"), VILLA("villa"), UFFICIO("ufficio"), COMMERCIALE("commerciale");

        private final String value;
        TipoImmobile(String v) { this.value = v; }
        @Override public String getValue() { return value; }
        public static TipoImmobile fromValue(String v) {
            if (v == null) return null;
            for (TipoImmobile t : values()) if (t.value.equals(v)) return t;
            throw new IllegalArgumentException("Unknown TipoImmobile: " + v);
        }
    }

    public static enum StatoConservazione implements PersistableEnum {
        DA_RISTRUTTURARE("da_ristrutturare"), BUONO("buono"), OTTIMO("ottimo"), LUSSO("lusso");
        private final String value;
        StatoConservazione(String v) { this.value = v; }
        @Override public String getValue() { return value; }
        public static StatoConservazione fromValue(String v) {
            if (v == null) return null;
            for (StatoConservazione s : values()) if (s.value.equals(v)) return s;
            throw new IllegalArgumentException("Unknown StatoConservazione: " + v);
        }
    }

    public static enum ClasseEnergetica implements PersistableEnum {
        A("A"), B("B"), C("C"), D("D"), E("E"), F("F"), G("G");
        private final String value;
        ClasseEnergetica(String v) { this.value = v; }
        @Override public String getValue() { return value; }
        public static ClasseEnergetica fromValue(String v) {
            if (v == null) return null;
            for (ClasseEnergetica c : values()) if (c.value.equals(v)) return c;
            throw new IllegalArgumentException("Unknown ClasseEnergetica: " + v);
        }
    }

    public static enum StatoImmobile implements PersistableEnum {
        BOZZA("bozza"), VALUTATO("valutato"), IN_VENDITA("in_vendita"), VENDUTO("venduto");
        private final String value;
        StatoImmobile(String v) { this.value = v; }
        @Override public String getValue() { return value; }
        public static StatoImmobile fromValue(String v) {
            if (v == null) return null;
            for (StatoImmobile s : values()) if (s.value.equals(v)) return s;
            throw new IllegalArgumentException("Unknown StatoImmobile: " + v);
        }
    }




    ///other enums
    
}
