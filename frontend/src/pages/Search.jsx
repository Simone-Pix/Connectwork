import { useEffect, useState } from "react";
import FiltersSidebar from "../components/FiltersSidebar";
import PropertyList from "../components/PropertyList";

function Search() {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultFilters = {
    tipoContratto: "all", // e.g. "in_vendita", "in_affitto" — uses property.stato
    minPrice: "",
    maxPrice: "",
    rooms: "all",
    baths: "all",
    minSurface: ""
  };

  const [filters, setFilters] = useState(defaultFilters);

  // Fetch properties from backend on mount
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

  /**
   * Apply filters to the full properties list and update state.
   * @param {Object} newFilters
   */
  function applyFilters(newFilters) {
    setFilters(newFilters);

    const result = allProperties.filter((p) => {
      // tipoContratto / stato filter
      if (newFilters.tipoContratto && newFilters.tipoContratto !== "all") {
        if (!p.stato || p.stato !== newFilters.tipoContratto) return false;
      }

      // price filter
      if (newFilters.minPrice) {
        if (!p.prezzoRichiesto || Number(p.prezzoRichiesto) < Number(newFilters.minPrice)) return false;
      }
      if (newFilters.maxPrice) {
        if (!p.prezzoRichiesto || Number(p.prezzoRichiesto) > Number(newFilters.maxPrice)) return false;
      }

      // rooms filter
      if (newFilters.rooms && newFilters.rooms !== "all") {
        if (!p.numLocali || Number(p.numLocali) < Number(newFilters.rooms)) return false;
      }

      // baths filter
      if (newFilters.baths && newFilters.baths !== "all") {
        if (!p.numBagni || Number(p.numBagni) < Number(newFilters.baths)) return false;
      }

      // surface filter
      if (newFilters.minSurface) {
        if (!p.superficie || Number(p.superficie) < Number(newFilters.minSurface)) return false;
      }

      return true;
    });

    setFilteredProperties(result);
  }

  /**
   * Reset filters back to defaults.
   */
  function resetFilters() {
    setFilters(defaultFilters);
    setFilteredProperties(allProperties);
  }

  return (
    <div className="search-page-search">
      <div className="search-container-search">
        <aside className="filters-sidebar-search">
          <FiltersSidebar
            filters={filters}
            onApply={applyFilters}
            onReset={resetFilters}
          />
        </aside>

        <main className="results-area-search">
          <header className="results-header-search">
            <h2 className="section-title-search">Properties</h2>
            <p className="section-subtitle-search">Available homes matching your search</p>
          </header>

          {loading ? (
            <div className="loading-search">Loading properties...</div>
          ) : (
            <PropertyList properties={filteredProperties} />
          )}
        </main>
      </div>
    </div>
  );
}

export default Search;