import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const mainImage = images.find(i => i.tipo === "foto")?.url || property.urlImmagine || fallbackImage;
  const priceFormatted = property.prezzoRichiesto ? `€ ${Number(property.prezzoRichiesto).toLocaleString("it-IT")}` : "-";
  const pricePerM2 = (property.prezzoRichiesto && property.superficie) ? `€ ${Math.round(Number(property.prezzoRichiesto) / Number(property.superficie)).toLocaleString("it-IT")}/m²` : "";

  // Placeholder da aggiungere al banckend nella tabella se l'immobile ha un garage e un balcone
  const hasBalcone = property.balcone ?? null;
  const hasGarage = property.boxAuto ?? null;

  return (
    <main className="pt-28 pb-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">

        {/* HERO: immagine principale + piccole immagini a destra */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-6">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img src={mainImage} alt={property.titolo || "Immagine immobile"} className="w-full h-[420px] object-cover" />
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-500">{priceFormatted}</div>
                  <div className="text-sm text-gray-500">{pricePerM2}</div>
                </div>

                <div className="text-right">
                  <h1 className="text-xl font-bold text-gray-900">{property.titolo || "Appartamento"}</h1>
                  <div className="text-sm text-gray-600 mt-1">{property.indirizzo ? `${property.indirizzo}, ${property.citta}` : `${property.citta || ""}`}</div>
                </div>
              </div>

              {/* row delle caratteristiche */}
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
                  <div className="font-semibold">{property.superficie ? `${property.superficie} m²` : "-"}</div>
                  <div className="text-xs text-gray-500">Superficie</div>
                </div>
                <div className="p-3 bg-blue-900/5 rounded-lg">
                  <div className="font-semibold">{property.piano ?? "-"}</div>
                  <div className="text-xs text-gray-500">Piano</div>
                </div>
              </div>

              {/* bottone per prenotare una visita all’immobile */}
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition shadow-sm"
                  onClick={() => { alert("Funzione prenotazione visita: implementare backend/frontend per procedere."); }}
                >
                  Prenota visita
                </button>

                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  onClick={() => { navigator.clipboard?.writeText(window.location.href); }}
                >
                  Condividi
                </button>
              </div>
            </div>
          </div>

          {/* colonna destra: piccola galleria + info aggiuntive */}
          <aside className="space-y-4">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3">
              <div className="grid grid-cols-1 gap-2">
                {images.slice(0,3).map((img) => (
                  <img key={img.id} src={img.url} alt="thumb" className="w-full h-24 object-cover rounded" />
                ))}
                <div className="w-full h-24 bg-blue-900/80 rounded flex items-center justify-center text-white text-sm font-medium">+ Altre foto</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-sm text-gray-600">Anno costruzione</div>
              <div className="font-semibold">{property.annoCostruzione ?? "-"}</div>
              <div className="mt-3 text-sm text-gray-600">Classe energetica</div>
              <div className="font-semibold">{property.classeEnergetica ?? "-"}</div>
            </div>
          </aside>
        </div>

        {/* SEZIONE DETTAGLI */}
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

          <aside>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h4 className="text-sm text-gray-600">Contatti proprietario</h4>
              <div className="mt-3">
                <div className="text-sm text-gray-700">Proprietario ID: <span className="font-semibold">{property.proprietarioId ?? property.proprietario_id ?? "-"}</span></div>
                {/* If you have owner's contact in DB, show here */}
                <div className="mt-4">
                  <button
                    className="w-full py-2 px-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition"
                    onClick={() => alert("Apertura form contatto — implementare integrazione backend")}
                  >
                    Contatta proprietario
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mt-4">
              <div className="text-xs text-gray-500">Inserito il</div>
              <div className="font-semibold text-sm">{property.dataInserimento ?? property.data_inserimento ?? "-"}</div>
              <div className="mt-3 text-xs text-gray-500">CAP</div>
              <div className="font-semibold text-sm">{property.cap ?? "-"}</div>
            </div>
          </aside>
        </div>

      </div>
    </main>
  );
}
