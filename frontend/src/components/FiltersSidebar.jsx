// src/components/FiltersSidebar.jsx
import { useState, useEffect } from "react";

function FiltersSidebar({ filters, onApply, onReset }) {
  const [local, setLocal] = useState(filters);

  useEffect(() => {
    setLocal(filters);
  }, [filters]);

  function handleChange(e) {
    const { name, value } = e.target;
    setLocal((prev) => ({ ...prev, [name]: value }));
  }

  function handleApply(e) {
    e.preventDefault();
    onApply(local);
  }

  function handleReset(e) {
    e.preventDefault();
    setLocal({
      tipoContratto: "all",
      minPrice: "",
      maxPrice: "",
      rooms: "all",
      baths: "all",
      minSurface: ""
    });
    onReset();
  }

  return (
    <form onSubmit={handleApply} className="space-y-4">
      <h3 className="text-gray-900 text-lg font-bold">Filtra risultati</h3>

      {/* Tipo di contratto */}
      <div>
        <label className="block text-gray-600 text-sm mb-1">Tipo di contratto</label>
        <select
          name="tipoContratto"
          value={local.tipoContratto}
          onChange={handleChange}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        >
          <option value="all">Seleziona</option>
          <option value="in_vendita">Sale</option>
          <option value="in_affitto">Rent</option>
        </select>
      </div>

      {/* Prezzo */}
      <div>
        <label className="block text-gray-600 text-sm mb-1">Prezzo (min - max €)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            name="minPrice"
            value={local.minPrice}
            onChange={handleChange}
            placeholder="€ 10000"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <input
            type="number"
            name="maxPrice"
            value={local.maxPrice}
            onChange={handleChange}
            placeholder="€ 1.000.000"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Camere */}
      <div>
        <label className="block text-gray-600 text-sm mb-1">Camere</label>
        <select
          name="rooms"
          value={local.rooms}
          onChange={handleChange}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="all">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4+</option>
        </select>
      </div>

      {/* Bagni */}
      <div>
        <label className="block text-gray-600 text-sm mb-1">Bagni</label>
        <select
          name="baths"
          value={local.baths}
          onChange={handleChange}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="all">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3+</option>
        </select>
      </div>

      {/* Superficie */}
      <div>
        <label className="block text-gray-600 text-sm mb-1">Superficie minima (m²)</label>
        <input
          type="number"
          name="minSurface"
          value={local.minSurface}
          onChange={handleChange}
          placeholder="es. 80"
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      {/* Pulsanti */}
      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          Reset
        </button>
        <button
          type="submit"
          className="flex-1 py-2.5 px-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition shadow-sm"
        >
          Applica filtri
        </button>
      </div>
    </form>
  );
}

export default FiltersSidebar;