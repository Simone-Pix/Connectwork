import { useState, useEffect } from "react";

function FiltersSidebar({ filters, cities, onApply, onReset }) {
  const [local, setLocal] = useState(filters);

  // Sincronizza lo stato locale quando i filtri cambiano (es. cliccando dalla Home)
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
      citta: "",
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
      <div className="flex items-center justify-between mb-2">
         <h3 className="text-gray-900 text-lg font-bold">Filtra risultati</h3>
      </div>

      {/* NUOVO: Filtro Città (Sostituisce Tipo Contratto) */}
      <div>
        <label className="block text-gray-600 text-sm mb-1 font-medium">Città</label>
        <select
          name="citta"
          value={local.citta}
          onChange={handleChange}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
        >
          <option value="">Tutte le città</option>
          {cities && cities.map((city, idx) => (
            <option key={idx} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <hr className="border-gray-100" />

      {/* Prezzo */}
      <div>
        <label className="block text-gray-600 text-sm mb-1">Prezzo (min - max €)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            name="minPrice"
            value={local.minPrice}
            onChange={handleChange}
            placeholder="Min"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
          <input
            type="number"
            name="maxPrice"
            value={local.maxPrice}
            onChange={handleChange}
            placeholder="Max"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
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
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
        >
          <option value="all">Qualsiasi</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
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
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
        >
          <option value="all">Qualsiasi</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
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
          placeholder="Es. 80"
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Pulsanti */}
      <div className="flex gap-2 pt-4">
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          Reset
        </button>
        <button
          type="submit"
          className="flex-1 py-2.5 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
        >
          Cerca
        </button>
      </div>
    </form>
  );
}

export default FiltersSidebar;