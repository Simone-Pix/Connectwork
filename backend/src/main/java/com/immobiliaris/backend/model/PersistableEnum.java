package com.immobiliaris.backend.model;

/**
 * Marker interface for enums that expose a DB string value via {@link #getValue()}.
 */
public interface PersistableEnum {
    String getValue();
}
