
import { useState, useEffect } from 'react';


function formatPrice(num) {
  if (!num && num !== 0) return "";
  return "€ " + Number(num).toLocaleString("it-IT");
}


function PropertyCard({ property }) {
  const [imageUrl, setImageUrl] = useState("/placeholder-property.jpg");

  // Carica la prima immagine dell'immobile
  useEffect(() => {
    const loadImage = async () => {
      if (property.id) {
        try {
          const response = await fetch(`/api/immagini/immobile/${property.id}`);
          if (response.ok) {
            const images = await response.json();
            if (images.length > 0) {
              setImageUrl(images[0].url);
            }
          }
        } catch (error) {
          console.log('No images found for property', property.id);
        }
      }
    };
    loadImage();
  }, [property.id]);

  const isExclusive = Boolean(property.disponibileEsclusiva);
  const isNew = property.annoCostruzione && Number(property.annoCostruzione) >= 2020;

  return (
    <article className="property-card-search">
      <div className="card-image-wrapper-search">
        <img src={imageUrl} alt={property.titolo || "Property image"} className="card-image-search" />
        <div className="card-badges-search">
          {isNew && <span className="badge-new-search">Nuovo</span>}
          {isExclusive && <span className="badge-exclusive-search">Esclusiva</span>}

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