// src/components/PropertyCard.jsx
import React from 'react';

function formatPrice(num) {
  if (!num && num !== 0) return "";
  return "€ " + Number(num).toLocaleString("it-IT");
}

function PropertyCard({ property }) {
  const isExclusive = Boolean(property.disponibileEsclusiva);
  const isNew = property.annoCostruzione && Number(property.annoCostruzione) >= 2020;
  const image = property.imageUrl || "/placeholder-property.jpg";

  return (
    <article className="bg-white rounded-xl overflow-hidden border border-blue-900/10 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Immagine con badge */}
      <div className="relative h-40">
        <img
          src={image}
          alt={property.titolo || "Property image"}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2.5 right-2.5 flex flex-wrap gap-1.5">
          {isNew && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
              Nuovo
            </span>
          )}
          {isExclusive && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
              Esclusiva
            </span>
          )}
        </div>
      </div>

      {/* Corpo della card */}
      <div className="p-4">
        <h3 className="text-gray-900 font-bold text-base leading-tight mb-2">
          {property.titolo || property.descrizione || "Unnamed property"}
        </h3>

        {/* Metadati: località + prezzo */}
        <div className="flex justify-between items-center text-sm mb-2">
          <div className="flex items-center text-gray-600">
            <span className="mr-1">📍</span>
            <span>
              {property.citta || ""}{property.provincia ? `, ${property.provincia}` : ""}
            </span>
          </div>
          <div className="text-blue-600 font-bold">
            {formatPrice(property.prezzoRichiesto)}
          </div>
        </div>

        {/* Caratteristiche: camere, bagni, superficie */}
        <div className="flex gap-3 text-gray-600 text-sm">
          <span>🛏 {property.numLocali ?? "-"}</span>
          <span>🛁 {property.numBagni ?? "-"}</span>
          <span>📐 {property.superficie ? `${property.superficie} m²` : "-"}</span>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;