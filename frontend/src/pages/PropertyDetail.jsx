import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  //stato per aprire il carosello
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fallbackImage = "/placeholder";

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const resProp = await fetch(`/api/immobili/${id}`);
        if (!resProp.ok) throw new Error("Failed to fetch property");
        const propData = await resProp.json();

        const resImgs = await fetch(`/api/immagini`);
        const imgsData = resImgs.ok ? await resImgs.json() : [];

        const imgsForThis = imgsData.filter((img) => img.immobile?.id === Number(id));
        setProperty(propData);
        setImages(imgsForThis);
      } catch (err) {
        console.error("Property load error:", err);
        setProperty(null);
        setImages([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  // FUNZIONI PER IL CAROSELLO
  const openCarousel = (startIndex = 0) => {
    if (!images || images.length === 0) return; // aggiunta per non fare aorire il carosello se non ci sono img
    setCurrentIndex(startIndex);
    setShowCarousel(true);
  };

  const closeCarousel = () => {
    setShowCarousel(false);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Swipe mobile
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX;
  };

  //funzioni per lo swipe del carosello

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) nextImage();
    if (touchEndX - touchStartX > 50) prevImage();
  };

  if (loading) {
    return (
      <div className="pt-28 pb-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl p-10 text-center text-gray-600 shadow-sm">
            Caricamento immobile...
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-28 pb-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl p-10 text-center text-gray-600 shadow-sm">
            Impossibile trovare l'immobile.
          </div>
        </div>
      </div>
    );
  }

  const mainImage =
    images.find((i) => i.tipo === "foto")?.url ||
    property.urlImmagine ||
    fallbackImage;

  const priceFormatted = property.prezzoRichiesto
    ? `€ ${Number(property.prezzoRichiesto).toLocaleString("it-IT")}`
    : "-";

  const pricePerM2 =
    property.prezzoRichiesto && property.superficie
      ? `€ ${Math.round(
        Number(property.prezzoRichiesto) / Number(property.superficie)
      ).toLocaleString("it-IT")}/m²`
      : "";

  return (
    <main className="pt-28 pb-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-6">
          {/* Immagine principale */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img
              src={mainImage}
              alt={property.titolo || "Immagine immobile"}
              className="w-full h-[420px] object-cover cursor-pointer"
              onClick={() => images.length > 0 && openCarousel(0)}
            />

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-500">{priceFormatted}</div>
                  <div className="text-sm text-gray-500">{pricePerM2}</div>
                </div>

                <div className="text-right">
                  <h1 className="text-xl font-bold text-gray-900">{property.tipoImmobile || ""}</h1>
                  <div className="text-sm text-gray-600 mt-1">
                    {property.indirizzo
                      ? `${property.indirizzo}, ${property.citta}`
                      : `${property.citta || ""}`}
                  </div>
                </div>
              </div>

              {/* Caratteristiche */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-gray-700">
                <div className="p-3 bg-blue-900/5 rounded-lg">
                  <div className="font-semibold">{property.numLocali ?? "-"}</div>
                  <div className="text-xs text-gray-500">Camere</div>
                </div>
                <div className="p-3 bg-blue-900/5 rounded-lg">
                  <div className="font-semibold">{property.numBagni ?? "-"}</div>
                  <div className="text-xs text-gray-500">Bagni</div>
                </div>
                <div className="p-3 bg-blue-900/5 rounded-lg">
                  <div className="font-semibold">
                    {property.superficie ? `${property.superficie} m²` : "-"}
                  </div>
                  <div className="text-xs text-gray-500">Superficie</div>
                </div>
                <div className="p-3 bg-blue-900/5 rounded-lg">
                  <div className="font-semibold">{property.piano ?? "-"}</div>
                  <div className="text-xs text-gray-500">Piano</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition shadow-sm"
                  onClick={() => alert("Placeholder per la richeista di contatto")}
                >
                  Contatta proprietario
                </button>
              </div>
            </div>
          </div>

          {/* Colonna destra → UNA sola foto */}
          <aside className="space-y-4">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3">
              <div className="grid grid-cols-1 gap-2">
                {images[0] && (
                  <img
                    key={images[0].id}
                    src={images[0].url}
                    alt="Immagine immobile"
                    className="w-full h-24 object-cover rounded cursor-pointer"
                    onClick={() => images.length > 0 && openCarousel(0)}
                  />
                )}

                <div
                  className="w-full h-24 bg-blue-900/80 rounded flex items-center justify-center text-white text-sm font-medium cursor-pointer"
                  onClick={() => images.length > 0 && openCarousel(0)}
                >
                  + Altre foto
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-sm text-gray-600">Anno costruzione</div>
              <div className="font-semibold">{property.annoCostruzione ?? "-"}</div>
              <div className="mt-3 text-sm text-gray-600">Classe energetica</div>
              <div className="font-semibold">{property.classeEnergetica ?? "-"}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mt-4">
              <div className="text-xs text-gray-500">Inserito il</div>
              <div className="font-semibold text-sm">{property.dataInserimento ?? property.data_inserimento ?? "-"}</div>
              <div className="mt-3 text-xs text-gray-500">CAP</div>
              <div className="font-semibold text-sm">{property.cap ?? "-"}</div>
            </div>
          </aside>
        </div>

        {/* DESCRIZIONE E DETTAGLI (invariati) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <section>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Descrizione</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {property.descrizione || "Descrizione non disponibile."}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Caratteristiche principali</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
                <div>Camere: <span className="font-semibold">{property.numLocali ?? "-"}</span></div>
                <div>Bagni: <span className="font-semibold">{property.numBagni ?? "-"}</span></div>
                <div>Superficie: <span className="font-semibold">{property.superficie ? `${property.superficie} m²` : "-"}</span></div>
                <div>Piano: <span className="font-semibold">{property.piano ?? "-"}</span></div>
                <div>Prezzo: <span className="font-semibold">{priceFormatted}</span></div>
                <div>Stato: <span className="font-semibold">{property.stato ?? "-"}</span></div>
              </div>
            </div>
          </section>
        </div>

      </div>

      {/* ===== CAROSELLO SOVRIMPRESSIONE ===== */}
      {showCarousel && images.length > 0 && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999]"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeCarousel();
          }}>
          <div
            className="relative w-[90%] max-w-3xl bg-white rounded-xl overflow-hidden shadow-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* X CHIUDI */}
            <button
              className="absolute top-3 right-3 text-gray-900 text-xl bg-white/70 backdrop-blur-sm rounded-full px-2"
              onClick={closeCarousel}
            >
              ✕
            </button>

            {/* IMMAGINE */}
            <img
              src={images[currentIndex].url}
              className="w-full max-h-[75vh] object-contain bg-black"
            />

            {/* FRECCIA SINISTRA */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-full text-xl"
            >
              ‹
            </button>

            {/* FRECCIA DESTRA */}
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-full text-xl"
            >
              ›
            </button>

            {/* INDICATORI */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === currentIndex ? "bg-orange-500" : "bg-white/70"
                    }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
