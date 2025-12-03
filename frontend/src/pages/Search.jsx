import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FiltersSidebar from "../components/FiltersSidebar";
import PropertyList from "../components/PropertyList";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  // STATO PER GESTIRE L'APERTURA DEI FILTRI SU MOBILE
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const cities = [
    "Torino", "Rivoli", "Bra", "Cuneo", "Asti", "Alessandria",
    "Biella", "Alba", "Moncalieri", "Pinerolo", "Ivrea", "Fossano",
  ];

  const defaultFilters = {
    citta: "",
    minPrice: "",
    maxPrice: "",
    rooms: "all",
    baths: "all",
    minSurface: "",
  };

  const [filters, setFilters] = useState(defaultFilters);

  // 1. Leggi la città dall'URL all'avvio o quando cambia
  useEffect(() => {
    const cittaFromURL = searchParams.get("citta");
    if (cittaFromURL) {
      setFilters((prev) => ({ ...prev, citta: cittaFromURL }));
    } else {
      setFilters((prev) => ({ ...prev, citta: "" }));
    }
  }, [searchParams]);

  // 2. Carica dati
  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);
        const res = await fetch("/api/immobili");
        const data = await res.json();
        setAllProperties(data);

        const cittaFromURL = searchParams.get("citta");
        if (cittaFromURL) {
          const filtered = data.filter(p => p.citta === cittaFromURL);
          setFilteredProperties(filtered);
        } else {
          setFilteredProperties(data);
        }
      } catch (err) {
        console.error("Failed to fetch properties", err);
        setAllProperties([]);
        setFilteredProperties([]);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);

  // Caricamento immagini
  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch("/api/immagini");
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Failed to fetch images", err);
      }
    }
    loadImages();
  }, []);

  function applyFilters(newFilters) {
    setFilters(newFilters);

    if (newFilters.citta) {
      setSearchParams({ citta: newFilters.citta });
    } else {
      setSearchParams({});
    }

    const result = allProperties.filter((p) => {
      if (newFilters.citta && p.citta !== newFilters.citta) return false;
      if (newFilters.minPrice && Number(p.prezzoRichiesto) < Number(newFilters.minPrice)) return false;
      if (newFilters.maxPrice && Number(p.prezzoRichiesto) > Number(newFilters.maxPrice)) return false;
      if (newFilters.rooms !== "all" && Number(p.numLocali) < Number(newFilters.rooms)) return false;
      if (newFilters.baths !== "all" && Number(p.numBagni) < Number(newFilters.baths)) return false;
      if (newFilters.minSurface && Number(p.superficie) < Number(newFilters.minSurface)) return false;
      return true;
    });
    setFilteredProperties(result);
    
    //chiude i filtri su mobile dopo aver applicato
    setMobileFiltersOpen(false);
  }

  function resetFilters() {
    setFilters(defaultFilters);
    setFilteredProperties(allProperties);
    setSearchParams({});
  }

  return (
    <div className="search-page-wrapper pt-28 pb-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* PULSANTE MOBILE */}
        <div 
          className="lg:hidden bg-orange-500 text-white px-4 py-3 rounded-lg shadow-lg cursor-pointer font-semibold mb-6 flex justify-between items-center"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        >
          <span>{mobileFiltersOpen ? "Chiudi Filtri" : "Apri Filtri"}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-7">
          
          {/* Sidebar filtri con sfondo blu scuro */}
          <aside className={`
            bg-[#1E3A8A] rounded-xl p-5 shadow-lg border border-blue-400/30 h-fit top-28
            ${mobileFiltersOpen ? "block" : "hidden"} lg:block
          `}>
            <FiltersSidebar
              filters={filters}
              cities={cities}
              onApply={applyFilters}
              onReset={resetFilters}
            />
          </aside>

          {/* Area risultati */}
          <main>
            <header className="mb-6">
              <h2 className="text-white text-xl font-bold">
                Immobili {filters.citta ? `a ${filters.citta}` : "in vendita"}
              </h2>
              <p className="text-white text-sm">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'risultato trovato' : 'risultati trovati'}
              </p>
            </header>

            {loading ? (
              <div className="bg-[#1E3A8A] rounded-xl p-10 text-center text-blue-100 shadow-lg">
                Caricamento immobili...
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="bg-[#1E3A8A] rounded-xl p-10 text-center shadow-lg">
                <p className="text-blue-100 mb-2">Nessun immobile trovato</p>
                <p className="text-blue-200 text-sm">Prova a modificare i filtri di ricerca</p>
              </div>
            ) : (
              <PropertyList properties={filteredProperties} images={images} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Search;