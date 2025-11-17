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

      <div className="card-body-search">
        <h3 className="card-title-search">{property.titolo || property.descrizione || "Unnamed property"}</h3>
        <div className="card-meta-search">
          <div className="card-location-search">
            <span className="icon-location-search">📍</span>
            <span>{property.citta || ""}{property.provincia ? `, ${property.provincia}` : ""}</span>
          </div>
          <div className="card-price-search">{formatPrice(property.prezzoRichiesto)}</div>
        </div>

        <div className="card-features-search">
          <div className="feature-item-search">🛏 {property.numLocali ?? "-"}</div>
          <div className="feature-item-search">🛁 {property.numBagni ?? "-"}</div>
          <div className="feature-item-search">📐 {property.superficie ? `${property.superficie} m²` : "-"}</div>
        </div>
      </div>
    </article>
  );
}


export default PropertyCard;