import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "./PropertyCard"; 

export default function FeaturedProperties() {
  const navigate = useNavigate();

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
          setProperties(allProperties); 
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

  if (loading) {
    return (
      <section
        style={{ background: "linear-gradient(to bottom, #1f242f, #13497e)" }}
        className="py-16 px-4"
      >
        <div className="max-w-7xl mx-auto text-center text-white">
          <p>Caricamento immobili in evidenza...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      style={{ background: "linear-gradient(to bottom, #1f242f, #13497e)" }}
      className="py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-2">
            Immobili in evidenza
          </h2>
          <p className="text-blue-100">
            Le migliori opportunità selezionate per te
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {properties && properties.length > 0 ? (
            properties.slice(0, 3).map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                images={images} 
              />
            ))
          ) : (
            <div className="col-span-3 text-center text-white">
              <p>Nessun immobile disponibile al momento</p>
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate("/cerca")}
            className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
          >
            Vedi tutti gli annunci
          </button>
        </div>
      </div>
    </section>
  );
}