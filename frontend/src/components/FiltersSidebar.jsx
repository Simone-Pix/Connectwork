import { useState, useEffect } from "react";

function FiltersSidebar({ filters, onApply, onReset }) {
  // keep local state to avoid applying every change immediately
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
    <form className="filters-form-search" onSubmit={handleApply}>
      <h3 className="filters-title-search">Filtra risultati</h3>

      <label className="label-search">Tipo di contratto</label>
      <select
        name="tipoContratto"
        value={local.tipoContratto}
        onChange={handleChange}
        className="select-search"
      >
        <option value="all">Seleziona</option>
        <option value="in_vendita">Sale</option>
        <option value="in_affitto">Rent</option>
      </select>

      <label className="label-search">Prezzo (min - max €)</label>
      <div className="price-inputs-search">
        <input
          type="number"
          name="minPrice"
          value={local.minPrice}
          onChange={handleChange}
          placeholder="€ 10000"
          className="input-search"
        />
        <input
          type="number"
          name="maxPrice"
          value={local.maxPrice}
          onChange={handleChange}
          placeholder="€ 1.000.000"
          className="input-search"
        />
      </div>

      <label className="label-search">Camere</label>
      <select name="rooms" value={local.rooms} onChange={handleChange} className="select-search">
        <option value="all">Any</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4+</option>
      </select>

      <label className="label-search">Bagni</label>
      <select name="baths" value={local.baths} onChange={handleChange} className="select-search">
        <option value="all">Any</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3+</option>
      </select>

      <label className="label-search">Superficie minima (m²)</label>
      <input
        type="number"
        name="minSurface"
        value={local.minSurface}
        onChange={handleChange}
        placeholder="es. 80"
        className="input-search"
      />

      <div className="filters-actions-search">
        <button type="button" className="btn-reset-search" onClick={handleReset}>
          Reset
        </button>
        <button type="submit" className="btn-apply-search">
          Applica filtri
        </button>
      </div>
    </form>
  );
}

export default FiltersSidebar;