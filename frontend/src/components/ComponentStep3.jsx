function ComponentStep3({ data, updateField, next, back }) {
  // Controllo per abilitare il pulsante solo se tutti i campi numerici richiesti sono compilati
  const isDisabled =
    data.superficie === "" ||
    data.stanze === "" ||
    data.bagni === "" ||
    (data.tipoOperazione === "appartamento" && data.piano === "");

  return (
    <div className="">
      <div className="progress-container">
        <span>Passo 3 di 6</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: "51%" }}></div>
        </div>
      </div>

      <h3 className="section-title">Dati dell'immobile</h3>

      <div className="form-grid-step3 grid gap-4">
        <input
          type="number"
          placeholder="Superficie in m²"
          value={data.superficie}
          min={0}
          onChange={(e) => {
            const val = Math.max(0, Number(e.target.value));
            updateField("superficie", val);
          }}
          className="p-3 border rounded-lg border-gray-300"
        />

        <input
          type="number"
          placeholder="Numero stanze"
          value={data.stanze}
          min={0}
          onChange={(e) => {
            const val = Math.max(0, Number(e.target.value));
            updateField("stanze", val);
          }}
          className="p-3 border rounded-lg border-gray-300"
        />

        <input
          type="number"
          placeholder="Numero bagni"
          value={data.bagni}
          min={0}
          onChange={(e) => {
            const val = Math.max(0, Number(e.target.value));
            updateField("bagni", val);
          }}
          className="p-3 border rounded-lg border-gray-300"
        />

        {data.tipoOperazione === "appartamento" && (
          <input
            type="number"
            placeholder="Piano"
            value={data.piano}
            min={0}
            onChange={(e) => {
              const val = Math.max(0, Number(e.target.value));
              updateField("piano", val);
            }}
            className="p-3 border rounded-lg border-gray-300"
          />
        )}
      </div>

      <div className="button-group flex mt-6 gap-4">
        <button
          className="back-btn "
          onClick={back}
        >
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
