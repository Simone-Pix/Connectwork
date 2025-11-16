// src/pages/Search.jsx
import { useEffect, useState } from "react";
import FiltersSidebar from "../components/FiltersSidebar";
import PropertyList from "../components/PropertyList";

function Search() {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultFilters = {
    tipoContratto: "all",
    minPrice: "",
    maxPrice: "",
    rooms: "all",
    baths: "all",
    minSurface: ""
  };

  const [filters, setFilters] = useState(defaultFilters);

  
  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);
        const res = await fetch("/api/immobili");
        const data = await res.json();
        setAllProperties(data);
        setFilteredProperties(data);
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

  function applyFilters(newFilters) {
    setFilters(newFilters);
    const result = allProperties.filter((p) => {
      if (newFilters.tipoContratto !== "all" && p.stato !== newFilters.tipoContratto) return false;
      if (newFilters.minPrice && Number(p.prezzoRichiesto) < Number(newFilters.minPrice)) return false;
      if (newFilters.maxPrice && Number(p.prezzoRichiesto) > Number(newFilters.maxPrice)) return false;
      if (newFilters.rooms !== "all" && Number(p.numLocali) < Number(newFilters.rooms)) return false;
      if (newFilters.baths !== "all" && Number(p.numBagni) < Number(newFilters.baths)) return false;
      if (newFilters.minSurface && Number(p.superficie) < Number(newFilters.minSurface)) return false;
      return true;
    });
    setFilteredProperties(result);
  }

  function resetFilters() {
    setFilters(defaultFilters);
    setFilteredProperties(allProperties);
  }

  return (
    <div className="bg-gray-100 pt-28 pb-10 min-h-screen"> 
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-7">
          {/* Sidebar filtri */}
          <aside className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <FiltersSidebar
              filters={filters}
              onApply={applyFilters}
              onReset={resetFilters}
            />
          </aside>

          {/* Area risultati */}
          <main>
            <header className="mb-6">
              <h2 className="text-gray-900 text-xl font-bold">Properties</h2>
              <p className="text-gray-600 text-sm">Available homes matching your search</p>
            </header>

            {loading ? (
              <div className="bg-white rounded-xl p-10 text-center text-gray-600 shadow-sm">
                Loading properties...
              </div>
            ) : (
              <PropertyList properties={filteredProperties} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Search;