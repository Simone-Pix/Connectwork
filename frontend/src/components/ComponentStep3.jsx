import React from "react";

function ComponentStep3({ data, updateField, next, back }) {

  const currentYear = new Date().getFullYear();

  // Calcolo errore anno di costruzione in base al valore presente in data
  let annoError = "";
  if (data.annoCostruzione !== "" && data.annoCostruzione !== null && data.annoCostruzione !== undefined) {
    const year = Number(data.annoCostruzione);
    if (Number.isNaN(year) || year < 1800 || year > currentYear) {
      annoError = `Inserisci un anno tra 1800 e ${currentYear}`;
    }
  }

  const isDisabled =
    !data.superficie || Number(data.superficie) <= 0 ||
    !data.stanze || Number(data.stanze) <= 0 ||
    !data.bagni || Number(data.bagni) <= 0 ||
    (data.tipoImmobile === "appartamento" && (data.piano === "" || data.piano === null)) ||
    !data.annoCostruzione ||
    annoError || // <-- disabilita se l'anno è fuori range
    !data.statoConservazione ||
    !data.classeEnergetica;

  return (
    <div className="wrapper-1-step">

      {/* Progress Bar */}
      <div className="progress-container">
        <span 
          className="text-sm font-semibold" 
          style={{ color: '#3A6EA5' }}
        >
          Passo 3 di 6
        </span>
        <div className="progress-bar">
          <div className="progress" style={{ width: "51%" }}></div>
        </div>
      </div>

      <h3 className="section-title">Dati dell'immobile</h3>

      <div className="form-grid-step3 grid gap-4">

        {/* Superficie */}
        <div className="input-group">
          <label className="input-label">Superficie (m²)</label>
          <input
            type="number"
            placeholder="Es. 100"
            value={data.superficie}
            min={0}
            onChange={(e) => updateField("superficie", Math.max(0, Number(e.target.value)))}
            className="input-step3"
          />
        </div>

        {/* Stanze */}
        <div className="input-group">
          <label className="input-label">Numero Stanze</label>
          <input
            type="number"
            placeholder="Es. 4"
            value={data.stanze}
            min={0}
            onChange={(e) => updateField("stanze", Math.max(0, Number(e.target.value)))}
            className="input-step3"
          />
        </div>

        {/* Bagni */}
        <div className="input-group">
          <label className="input-label">Numero Bagni</label>
          <input
            type="number"
            placeholder="Es. 2"
            value={data.bagni}
            min={0}
            onChange={(e) => updateField("bagni", Math.max(0, Number(e.target.value)))}
            className="input-step3"
          />
        </div>

        {/* Piano */}
        {data.tipoImmobile === "appartamento" && (
          <div className="input-group">
            <label className="input-label">Piano</label>
            <input
              type="number"
              placeholder="Es. 1"
              value={data.piano}
              min={0}
              onChange={(e) => updateField("piano", Math.max(0, Number(e.target.value)))}
              className="input-step3"
            />
          </div>
        )}

        {/* Anno costruzione */}
        <div className="input-group">
          <label className="input-label">Anno di costruzione</label>
          <input
            type="number"
            placeholder="Es. 1990"
            min={1800}
            max={currentYear}
            value={data.annoCostruzione}
            onChange={(e) => {
              // qui lasciamo inserire il valore, la validazione la fa annoError
              updateField("annoCostruzione", e.target.value);
            }}
            className={`input-step3 ${annoError ? "border-red-500" : ""}`}
          />
          {annoError && (
            <p className="text-red-500 text-sm mt-1">{annoError}</p>
          )}
        </div>

        {/* Stato conservazione */}
        <div className="input-group">
          <label className="input-label">Stato conservazione</label>
          <select
            value={data.statoConservazione}
            onChange={(e) => updateField("statoConservazione", e.target.value)}
            className="input-step3"
          >
            <option value="">Seleziona...</option>
            <option value="da ristrutturare">Da ristrutturare</option>
            <option value="buono">Buono</option>
            <option value="ottimo">Ottimo</option>
            <option value="lusso">Lusso</option>
          </select>
        </div>

        {/* Classe energetica */}
        <div className="input-group">
          <label className="input-label">Classe energetica</label>
          <select
            value={data.classeEnergetica}
            onChange={(e) => updateField("classeEnergetica", e.target.value)}
            className="input-step3"
          >
            <option value="">Seleziona...</option>
            {["A", "B", "C", "D", "E", "F", "G"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

      </div>

      {/* BUTTONS (positioned relative to configurator container) */}
      <div className="button-group absolute left-1/2 transform -translate-x-1/2 bottom-6 w-full max-w-3xl flex justify-between px-4">
        <button className="back-btn" onClick={back}>
          Indietro
        </button>

        <button
          className={`next-btn ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={isDisabled ? undefined : next}
          disabled={isDisabled}
        >
          Avanti
        </button>

      </div>
    </div>
  );
}

export default ComponentStep3;
