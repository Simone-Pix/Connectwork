import React from "react";

function ComponentStep3({ data, updateField, next, back }) {
  // Logica di validazione rivista per essere più robusta
  const isDisabled =
    !data.superficie || Number(data.superficie) <= 0 ||
    !data.stanze || Number(data.stanze) <= 0 ||
    !data.bagni || Number(data.bagni) <= 0 ||
    // Per il piano: controlliamo che non sia stringa vuota (lo 0 è un piano valido)
    (data.tipoImmobile === "appartamento" && (data.piano === "" || data.piano === null)) ||
    !data.annoCostruzione ||
    // Controllo specifico per i menu a tendina
    !data.statoConservazione || data.statoConservazione === "" ||
    !data.classeEnergetica || data.classeEnergetica === "";

  return (
    <div className="wrapper-1-step">
      {/* Progress Bar */}
      <div className="progress-container">
        <span>Passo 3 di 6</span>
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
            onChange={(e) => {
              const val = Math.max(0, Number(e.target.value));
              updateField("superficie", val);
            }}
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
            onChange={(e) => {
              const val = Math.max(0, Number(e.target.value));
              updateField("stanze", val);
            }}
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
            onChange={(e) => {
              const val = Math.max(0, Number(e.target.value));
              updateField("bagni", val);
            }}
            className="input-step3"
          />
        </div>

        {/* Piano solo se appartamento */}
        {data.tipoImmobile === "appartamento" && (
          <div className="input-group">
            <label className="input-label">Piano</label>
            <input
              type="number"
              placeholder="Es. 1"
              value={data.piano}
              min={0}
              onChange={(e) => {
                const val = Math.max(0, Number(e.target.value));
                updateField("piano", val);
              }}
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
            max={new Date().getFullYear()}
            value={data.annoCostruzione}
            onChange={(e) =>
              updateField("annoCostruzione", Number(e.target.value))
            }
            className="input-step3"
          />
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
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

      </div>

      <div className="button-group">
        <button className="back-btn" onClick={back}>
          Indietro
        </button>

        <button
          className={`next-btn py-2 px-4 rounded-lg text-white bg-primary hover:bg-primary-dark transition ${
            isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
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