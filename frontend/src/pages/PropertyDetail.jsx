import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import placeholderImg from "../assets/img_background.png";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stato per il carosello
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

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

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = placeholderImg;
  };

  const openCarousel = (startIndex = 0) => {
    if (!images || images.length === 0) return;
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

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) nextImage();
    if (touchEndX - touchStartX > 50) prevImage();
  };

  if (loading) {
    return (
      <div className="pt-28 pb-10 min-h-screen bg-[#527597]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#1E3A8A] rounded-xl p-10 text-center text-blue-100 shadow-lg">
            Caricamento immobile...
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-28 pb-10 min-h-screen bg-[#527597]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#1E3A8A] rounded-xl p-10 text-center text-blue-100 shadow-lg">
            Impossibile trovare l'immobile.
          </div>
        </div>
      </div>
    );
  }

  const mainImage =
    images.find((i) => i.tipo === "foto")?.url || property.urlImmagine || "/placeholder-property.jpg"; 

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

        {/* PULSANTE INDIETRO */}
        <Link
          to="/cerca"
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-[#1E3A8A] text-white rounded-lg font-medium hover:bg-blue-900 transition shadow-md border border-blue-400/30 w-fit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Torna alla ricerca
        </Link>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-6">
          {/* 1. Immagine principale */}
          <div className="bg-[#1E3A8A] rounded-xl overflow-hidden shadow-lg border border-blue-400/30">
            <img
              src={mainImage}
              alt={property.titolo || "Immagine immobile"}
              className="w-full h-[420px] object-cover cursor-pointer"
              onClick={() => images.length > 0 && openCarousel(0)}
              onError={handleImageError}
            />

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-500">{priceFormatted}</div>
                  <div className="text-sm text-blue-200">{pricePerM2}</div>
                </div>

                <div className="text-right">
                  <h1 className="text-xl font-bold text-white">{property.tipoImmobile || ""}</h1>
                  <div className="text-sm text-blue-100 mt-1">
                    {property.indirizzo
                      ? `${property.indirizzo}, ${property.citta}`
                      : `${property.citta || ""}`}
                  </div>
                </div>
              </div>

              {/* Caratteristiche */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="p-3 bg-blue-800/50 rounded-lg border border-blue-400/20">
                  <div className="font-semibold text-white">{property.numLocali ?? "-"}</div>
                  <div className="text-xs text-blue-200">Camere</div>
                </div>
                <div className="p-3 bg-blue-800/50 rounded-lg border border-blue-400/20">
                  <div className="font-semibold text-white">{property.numBagni ?? "-"}</div>
                  <div className="text-xs text-blue-200">Bagni</div>
                </div>
                <div className="p-3 bg-blue-800/50 rounded-lg border border-blue-400/20">
                  <div className="font-semibold text-white">
                    {property.superficie ? `${property.superficie} m²` : "-"}
                  </div>
                  <div className="text-xs text-blue-200">Superficie</div>
                </div>
                <div className="p-3 bg-blue-800/50 rounded-lg border border-blue-400/20">
                  <div className="font-semibold text-white">{property.piano ?? "-"}</div>
                  <div className="text-xs text-blue-200">Piano</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition shadow-sm"
                  onClick={() => navigate("/Home#agentsId")}
                >
                  Contatta un agente
                </button>
              </div>
            </div>
          </div>

          {/* Colonna destra */}
          <aside className="space-y-4">
            <div className="bg-[#1E3A8A] rounded-xl overflow-hidden shadow-lg border border-blue-400/30 p-3">
              <div className="grid grid-cols-1 gap-2">
                {images[0] && (
                  <img
                    key={images[0].id}
                    src={images[0].url}
                    alt="Immagine immobile"
                    className="w-full h-24 object-cover rounded cursor-pointer"
                    onClick={() => images.length > 0 && openCarousel(0)}
                    onError={handleImageError}
                  />
                )}

                <button
                  className="w-full h-24 bg-orange-500 hover:bg-orange-600 rounded flex items-center justify-center text-white text-sm font-semibold cursor-pointer transition shadow-md"
                  onClick={() => images.length > 0 && openCarousel(0)}
                >
                  + Altre foto
                </button>
              </div>
            </div>

            <div className="bg-[#1E3A8A] rounded-xl p-4 shadow-lg border border-blue-400/30">
              <div className="text-sm text-blue-200">Anno costruzione</div>
              <div className="font-semibold text-white">{property.annoCostruzione ?? "-"}</div>
              <div className="mt-3 text-sm text-blue-200">Classe energetica</div>
              <div className="font-semibold text-white">{property.classeEnergetica ?? "-"}</div>
            </div>
            <div className="bg-[#1E3A8A] rounded-xl p-4 shadow-lg border border-blue-400/30 mt-4">
              <div className="text-xs text-blue-200">Inserito il</div>
              <div className="font-semibold text-sm text-white">{property.dataInserimento ?? property.data_inserimento ?? "-"}</div>
              <div className="mt-3 text-xs text-blue-200">CAP</div>
              <div className="font-semibold text-sm text-white">{property.cap ?? "-"}</div>
            </div>
          </aside>
        </div>

        {/* DESCRIZIONE E DETTAGLI */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <section>
            <div className="bg-[#1E3A8A] rounded-xl p-6 shadow-lg border border-blue-400/30 mb-6">
              <h3 className="text-lg font-bold text-white mb-3">Descrizione</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                {property.descrizione || "Descrizione non disponibile."}
              </p>
            </div>

            <div className="bg-[#1E3A8A] rounded-xl p-6 shadow-lg border border-blue-400/30 mb-6">
              <h3 className="text-lg font-bold text-white mb-3">Caratteristiche principali</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-blue-100">
                <div>Camere: <span className="font-semibold text-white">{property.numLocali ?? "-"}</span></div>
                <div>Bagni: <span className="font-semibold text-white">{property.numBagni ?? "-"}</span></div>
                <div>Superficie: <span className="font-semibold text-white">{property.superficie ? `${property.superficie} m²` : "-"}</span></div>
                <div>Piano: <span className="font-semibold text-white">{property.piano ?? "-"}</span></div>
                <div>Prezzo: <span className="font-semibold text-white">{priceFormatted}</span></div>
                <div>Stato: <span className="font-semibold text-white">{property.stato ?? "-"}</span></div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ===== CAROSELLO SOVRIMPRESSIONE ===== */}
      {showCarousel && images.length > 0 && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[999]"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeCarousel();
          }}>
          <div
            className="relative w-[90%] max-w-3xl bg-[#1E3A8A] rounded-xl overflow-hidden shadow-2xl border border-blue-400/30"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              className="absolute top-3 right-3 text-white text-2xl bg-orange-500 hover:bg-orange-600 rounded-full w-8 h-8 flex items-center justify-center z-10 transition"
              onClick={closeCarousel}
            >
              ✕
            </button>

            <img
              src={images[currentIndex].url}
              alt="Immagine immobile"
              className="w-full max-h-[75vh] object-contain bg-black"
              onError={handleImageError}
            />

            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-orange-500/90 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-2xl font-bold transition"
            >
              ‹
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500/90 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-2xl font-bold transition"
            >
              ›
            </button>

            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition ${i === currentIndex ? "bg-orange-500 w-8" : "bg-white/70"
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