import { useNavigate } from "react-router-dom";

function formatPrice(num) {
  if (!num && num !== 0) return "";
  return "€ " + Number(num).toLocaleString("it-IT");
}

export default function PropertyCard({ property, images }) {
  const navigate = useNavigate();

  const imageObj = images?.find(
    (img) => img.immobile.id === property.id && img.tipo === "foto"
  );
  const image = imageObj?.url || "/placeholder-property.jpg";

  const isExclusive = Boolean(property.disponibileEsclusiva);
  const isNew = property.annoCostruzione && Number(property.annoCostruzione) >= 2020;

  const location = `${property.citta || ""}${
    property.provincia ? `, ${property.provincia}` : ""
  }`;

  const openDetail = () => {
    navigate(`/immobile/${property.id}`);
  };

  return (
    <article
      className="prop-card"
      onClick={openDetail}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") openDetail();
      }}
    >
      <div className="prop-image-wrapper">
        <img
          src={image}
          alt={property.titolo || "Property image"}
          className="prop-image"
        />
        <div className="prop-badge-container">
          {isNew && <span className="prop-badge bg-green-500">Nuovo</span>}
          {isExclusive && <span className="prop-badge bg-orange-500">Esclusiva</span>}
        </div>
      </div>

      <div className="prop-content">
        <p className="prop-price">{formatPrice(property.prezzoRichiesto)}</p>
        
        <h3 className="prop-title">
          {property.descrizione || property.titolo || "Immobile senza nome"}
        </h3>

        <div className="prop-location">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="prop-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {location}
        </div>

        <div className="prop-features">
          {/* Locali */}
          <div className="prop-feature-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="prop-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 7v11" />
              <path d="M22 7v11" />
              <path d="M2 17h20" />
              <path d="M2 11h20" />
              <path d="M2 11c0-3 2.5-5 5.5-5S13 8 13 11" />
            </svg>
            {property.numLocali ?? "-"}
          </div>

          {/* Bagni */}
          <div className="prop-feature-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="prop-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12v5a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-5" />
              <path d="M4 12h16" />
              <path d="M7 20v2" />
              <path d="M17 20v2" />
              <path d="M13 3L13 6" />
              <path d="M13 6A3 3 0 0 1 10 9" />
              <path d="M10 11v2" />
              <path d="M7 11v2" />
            </svg>
            {property.numBagni ?? "-"}
          </div>

          {/* Superficie */}
          <div className="prop-feature-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="prop-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21L21 21L3 3V21Z" />
              <path d="M3 10H7" />
              <path d="M3 14H7" />
              <path d="M3 18H7" />
            </svg>
            {property.superficie ? `${property.superficie} m²` : "-"}
          </div>
        </div>
      </div>
    </article>
  );
}