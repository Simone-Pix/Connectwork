package com.immobiliaris.backend.model;

import jakarta.persistence.AttributeConverter;

/**
 * Generic abstract converter for enums implementing {@link PersistableEnum}.
 * Subclasses supply the concrete enum class via {@link #getEnumClass()}.
 */
public abstract class AbstractEnumConverter<T extends Enum<T> & PersistableEnum>
        implements AttributeConverter<T, String> {

    @Override
    public String convertToDatabaseColumn(T attribute) {
        return attribute == null ? null : attribute.getValue();
    }

    @Override
    public T convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;
        Class<T> enumClass = getEnumClass();
        for (T constant : enumClass.getEnumConstants()) {
            if (constant.getValue().equals(dbData)) {
                return constant;
            }
        }
        throw new IllegalArgumentException("Unknown value '" + dbData + "' for enum " + enumClass.getName());
    }

    protected abstract Class<T> getEnumClass();
}
