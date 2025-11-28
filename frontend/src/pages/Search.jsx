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

  const defaultFilters = {
    tipoContratto: "all",
    minPrice: "",
    maxPrice: "",
    rooms: "all",
    baths: "all",
    minSurface: "",
    citta: "" // Aggiungi il filtro città
  };

  const [filters, setFilters] = useState(defaultFilters);

  // Leggi la città dall'URL all'avvio
  useEffect(() => {
    const cittaFromURL = searchParams.get("citta");
    if (cittaFromURL) {
      setFilters(prev => ({ ...prev, citta: cittaFromURL }));
    }
  }, [searchParams]);

  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);
        const res = await fetch("/api/immobili");
        const data = await res.json();
        setAllProperties(data);
        
        // Applica il filtro città se presente
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
  }, [searchParams]);
  
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
    const result = allProperties.filter((p) => {
      // Filtro città
      if (newFilters.citta && p.citta !== newFilters.citta) return false;
      
      // Filtro tipo contratto
      if (newFilters.tipoContratto !== "all" && p.stato !== newFilters.tipoContratto) return false;
      
      // Filtro prezzo
      if (newFilters.minPrice && Number(p.prezzoRichiesto) < Number(newFilters.minPrice)) return false;
      if (newFilters.maxPrice && Number(p.prezzoRichiesto) > Number(newFilters.maxPrice)) return false;
      
      // Filtro camere
      if (newFilters.rooms !== "all" && Number(p.numLocali) < Number(newFilters.rooms)) return false;
      
      // Filtro bagni
      if (newFilters.baths !== "all" && Number(p.numBagni) < Number(newFilters.baths)) return false;
      
      // Filtro superficie
      if (newFilters.minSurface && Number(p.superficie) < Number(newFilters.minSurface)) return false;
      
      return true;
    });
    setFilteredProperties(result);
    
    // Rimuovi il parametro città dall'URL quando l'utente cambia i filtri manualmente
    if (searchParams.get("citta")) {
      searchParams.delete("citta");
      setSearchParams(searchParams);
    }
  }

  function resetFilters() {
    setFilters(defaultFilters);
    setFilteredProperties(allProperties);
    
    // Rimuovi il parametro città dall'URL
    if (searchParams.get("citta")) {
      searchParams.delete("citta");
      setSearchParams(searchParams);
    }
  }

  function removeCityFilter() {
    const newFilters = { ...filters, citta: "" };
    setFilters(newFilters);
    applyFilters(newFilters);
  }

  return (
    <div className="pt-28 pb-10 min-h-screen"> 
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-7">
          {/* Sidebar filtri */}
          <aside className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            {/* Badge città selezionata */}
            {filters.citta && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 mb-1">
                  📍 <strong>{filters.citta}</strong>
                </p>
                <button
                  onClick={removeCityFilter}
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Rimuovi filtro città
                </button>
              </div>
            )}
            
            <FiltersSidebar
              filters={filters}
              onApply={applyFilters}
              onReset={resetFilters}
            />
          </aside>

          {/* Area risultati */}
          <main>
            <header className="mb-6">
              <h2 className="text-gray-900 text-xl font-bold">
                Immobili {filters.citta && `a ${filters.citta}`}
              </h2>
              <p className="text-gray-600 text-sm">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'risultato trovato' : 'risultati trovati'}
              </p>
            </header>

            {loading ? (
              <div className="bg-white rounded-xl p-10 text-center text-gray-600 shadow-sm">
                Caricamento immobili...
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                <p className="text-gray-600 mb-2">Nessun immobile trovato</p>
                <p className="text-gray-500 text-sm">Prova a modificare i filtri di ricerca</p>
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