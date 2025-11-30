function ComponentStep3({ data, updateField, next, back }) {
  const isDisabled =
    data.superficie === "" ||
    data.stanze === "" ||
    data.bagni === "" ||
    (data.tipoImmobile === "appartamento" && data.piano === "") ||
    data.annoCostruzione === "" ||
    data.statoConservazione === "" ||
    data.classeEnergetica === "";

  return (
    <div className="wrapper-1-step">
      <div className="progress-container">
        <span>Passo 3 di 6</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: "51%" }}></div>
        </div>
      </div>

      <h3 className="section-title">Dati dell'immobile</h3>

      <div className="form-grid-step3 grid gap-4">

        {/* Superficie */}
        <input
          type="number"
          placeholder="Superficie in m²"
          value={data.superficie}
          min={0}
          onChange={(e) => {
            const val = Math.max(0, Number(e.target.value));
            updateField("superficie", val);
          }}
          className="input-step3"
        />

        {/* Stanze */}
        <input
          type="number"
          placeholder="Numero stanze"
          value={data.stanze}
          min={0}
          onChange={(e) => {
            const val = Math.max(0, Number(e.target.value));
            updateField("stanze", val);
          }}
          className="input-step3"
        />

        {/* Bagni */}
        <input
          type="number"
          placeholder="Numero bagni"
          value={data.bagni}
          min={0}
          onChange={(e) => {
            const val = Math.max(0, Number(e.target.value));
            updateField("bagni", val);
          }}
          className="input-step3"
        />

        {/* Piano solo se appartamento */}
        {data.tipoImmobile === "appartamento" && (
          <input
            type="number"
            placeholder="Piano"
            value={data.piano}
            min={0}
            onChange={(e) => {
              const val = Math.max(0, Number(e.target.value));
              updateField("piano", val);
            }}
            className="input-step3"
          />
        )}

        {/* Anno costruzione */}
        <input
          type="number"
          placeholder="Anno di costruzione"
          min={1800}
          max={new Date().getFullYear()}
          value={data.annoCostruzione}
          onChange={(e) =>
            updateField("annoCostruzione", Number(e.target.value))
          }
          className="input-step3"
        />

        {/* Stato conservazione */}
        <select
          value={data.statoConservazione}
          onChange={(e) => updateField("statoConservazione", e.target.value)}
          className="input-step3"
        >
          <option value="">Stato conservazione</option>
          <option value="da ristrutturare">Da ristrutturare</option>
          <option value="buono">Buono</option>
          <option value="ottimo">Ottimo</option>
          <option value="lusso">Lusso</option>
        </select>

        {/* Classe energetica */}
        <select
          value={data.classeEnergetica}
          onChange={(e) => updateField("classeEnergetica", e.target.value)}
          className="input-step3"
        >
          <option value="">Classe energetica</option>
          {["A","B","C","D","E","F","G"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

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
