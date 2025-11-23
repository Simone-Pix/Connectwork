import { useState, useEffect } from "react";

function formatPrice(num) {
  if (!num && num !== 0) return "";
  return "€ " + Number(num).toLocaleString("it-IT");
}

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const propertiesRes = await fetch("http://localhost:8080/api/immobili");
        const imagesRes = await fetch("http://localhost:8080/api/immagini");

        if (propertiesRes.ok && imagesRes.ok) {
          const allProperties = await propertiesRes.json();
          const allImages = await imagesRes.json();
          
          setProperties(allProperties.slice(0, 3));
          setImages(allImages);
        }
      } catch (error) {
        console.error("Errore nel caricamento dei dati:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  const getPropertyImage = (propertyId) => {
    const imageObj = images?.find(
      img => img.immobile.id === propertyId && img.tipo === "foto"
    );
    return imageObj?.url || "/placeholder-property.jpg";
  };

  const getPropertyBadges = (property) => {
    const badges = [];
    const isExclusive = Boolean(property.disponibileEsclusiva);
    const isNew = property.annoCostruzione && Number(property.annoCostruzione) >= 2020;

    if (isNew) badges.push({ type: "Nuovo", color: "bg-green-500" });
    if (isExclusive) badges.push({ type: "Esclusiva", color: "bg-orange-500" });

    return badges;
  };

  if (loading) {
    return (
      <section style={{ background: "linear-gradient(to bottom, #1f242f, #13497e)" }} className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <p>Caricamento immobili in evidenza...</p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: "linear-gradient(to bottom, #1f242f, #13497e)" }} className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-2">
            Immobili in evidenza
          </h2>
          <p className="text-blue-100">Le migliori opportunità selezionate per te</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {properties && properties.length > 0 ? (
            properties.map((property) => {
              const badges = getPropertyBadges(property);
              const image = getPropertyImage(property.id);
              const location = `${property.citta || ""}${property.provincia ? `, ${property.provincia}` : ""}`;

              return (
                <div key={property.id} style={{ backgroundColor: "#3A6EA5" }} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <img
                      src={image}
                      alt={property.titolo || "Property image"}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                      {badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${badge.color}`}
                        >
                          {badge.type}
                        </span>
                      ))}
                    </div>
                    <button style={{ backgroundColor: "rgba(27, 80, 132, 0.7)" }} className="absolute top-3 right-3 p-2 rounded-lg shadow-md hover:opacity-80 transition">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-5 text-white">
                    <p className="text-xl font-bold text-orange-500 mb-2">
                      {formatPrice(property.prezzoRichiesto)}
                    </p>
                    <h3 className="font-semibold mb-2 text-sm">
                      {property.titolo || property.descrizione || "Unnamed property"}
                    </h3>

                    <div className="flex items-center text-sm mb-3">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                      </svg>
                      {location}
                    </div>

                    <div className="flex gap-4 border-t pt-3">
                      <div className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 13H5v8h5v-8zm7-8H9c-1.1 0-2 .9-2 2v2h2V7h8v8h-8v-2h-2v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 8h-8V7h8v8z"/>
                        </svg>
                        {property.numLocali ?? "-"}
                      </div>
                      <div className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                        {property.numBagni ?? "-"}
                      </div>
                      <div className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                        {property.superficie ? `${property.superficie} m²` : "-"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-3 text-center text-white">
              <p>Nessun immobile disponibile al momento</p>
            </div>
          )}
        </div>

        <div className="text-center">
          <button className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
            Vedi tutti gli annunci
          </button>
        </div>
      </div>
    </section>
  );
}