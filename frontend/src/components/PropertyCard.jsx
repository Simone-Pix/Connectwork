import { useNavigate } from "react-router-dom";

function formatPrice(num) {
  if (!num && num !== 0) return "";
  return "€ " + Number(num).toLocaleString("it-IT");
}

function PropertyCard({ property, images }) {
  const navigate = useNavigate();

  const isExclusive = Boolean(property.disponibileEsclusiva);
  const isNew = property.annoCostruzione && Number(property.annoCostruzione) >= 2020;

  const imageObj = images?.find(
    img => img.immobile.id === property.id && img.tipo === "foto"
  );
  const image = imageObj?.url || "/placeholder-property.jpg";


function openDetail() {
  navigate(`/immobile/${property.id}`);
}

  return (
    <article className="pc-card" onClick={openDetail} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") openDetail(); }}>
      <div className="pc-image-wrapper">
        <img
          src={image}
          alt={property.titolo || "Property image"}
          className="pc-image"
        />

        <div className="pc-badge-container">
          {isNew && (
            <span className="pc-badge">
              Nuovo
            </span>
          )}
          {isExclusive && (
            <span className="pc-badge">
              Esclusiva
            </span>
          )}
        </div>
      </div>

      <div className="pc-body">
        <h3 className="pc-title">
          {property.titolo || property.descrizione || "Unnamed property"}
        </h3>

        <div className="pc-location-price">
          <div className="pc-location">
            <span className="pc-location-icon">📍</span>
            <span>
              {property.citta || ""}
              {property.provincia ? `, ${property.provincia}` : ""}
            </span>
          </div>

          <div className="pc-price">
            {formatPrice(property.prezzoRichiesto)}
          </div>
        </div>

        <div className="pc-features">
          <span>🛏 {property.numLocali ?? "-"}</span>
          <span>🛁 {property.numBagni ?? "-"}</span>
          <span>📐 {property.superficie ? `${property.superficie} m²` : "-"}</span>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;