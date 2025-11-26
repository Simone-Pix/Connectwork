function ComponentStep2({ data, updateField, next, back }) {
  const addressRegex = /^(via|viale|vicolo|piazza|corso|largo)\s+.+\s+\d+[a-zA-Z]?$/i;
  const trimmedAddress = (data.indirizzo || "").trim();
  const isAddressValid = addressRegex.test(trimmedAddress);

  const capRegex = /^[0-9]{5}$/;
  const isCapValid = capRegex.test(data.cap || "");

  const isStepValid =
    isAddressValid &&
    isCapValid &&
    (data.citta || "").trim() !== "" &&
    (data.provincia || "").trim() !== "";

  const handleCapChange = (value) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 5);
    updateField("cap", numericValue);
  };

  return (
    <div className="wrapper-1-step">
      <div className="progress-container">
        <span>Passo 2 di 6</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: "34%" }}></div>
        </div>
      </div>

      <h3 className="section-title">Inserisci i dati dell’immobile</h3>

      <input
        type="text"
        placeholder="Es: Via Roma 12"
        className={`input-step2 border p-3 rounded-lg ${
          trimmedAddress && !isAddressValid
            ? "border-red-500"
            : "border-gray-300"
        }`}
        value={data.indirizzo || ""}
        onChange={(e) => updateField("indirizzo", e.target.value)}
      />

      <input
        type="text"
        placeholder="Città"
        value={data.citta || ""}
        onChange={(e) => updateField("citta", e.target.value)}
        className="border p-3 rounded-lg border-gray-300"
      />

      <input
        type="text"
        placeholder="CAP"
        value={data.cap || ""}
        onChange={(e) => handleCapChange(e.target.value)}
        className={`border p-3 rounded-lg ${
          data.cap && !isCapValid ? "border-red-500" : "border-gray-300"
        }`}
      />

      <input
        type="text"
        placeholder="Provincia"
        maxLength={2}
        value={data.provincia || ""}
        onChange={(e) =>
          updateField("provincia", e.target.value.toUpperCase())
        }
        className="border p-3 rounded-lg border-gray-300"
      />

      <div className="button-group">
        <button className="back-btn" onClick={back}>
          Indietro
        </button>
        <button
          onClick={next}
          disabled={!isStepValid}
          className={`next-btn py-2 px-4 rounded-lg text-white bg-primary hover:bg-primary-dark transition ${
            !isStepValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Avanti
        </button>
      </div>
    </div>
  );
}

export default ComponentStep2;
