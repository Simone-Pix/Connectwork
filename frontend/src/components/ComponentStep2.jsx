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
    <div className="wrapper-step-2">
      {/* Progress Label */}
      <span className="progress-label">Passo 2 di 6</span>

      <h3 className="section-title">Inserisci i dati dell'immobile</h3>

      {/* Indirizzo */}
      <div className="input-group">
        <label className="input-label">Indirizzo completo</label>
        <input
          type="text"
          placeholder="Es: Via Roma 12"
          className={`input-step2 ${
            trimmedAddress && !isAddressValid ? "border-red-500" : "border-gray-300"
          }`}
          value={data.indirizzo || ""}
          onChange={(e) => updateField("indirizzo", e.target.value)}
        />
      </div>

      {/* Città */}
      <div className="input-group">
        <label className="input-label">Città</label>
        <input
          type="text"
          placeholder="Inserisci il comune"
          className="input-step2 border-gray-300"
          value={data.citta || ""}
          onChange={(e) => updateField("citta", e.target.value)}
        />
      </div>

      {/* Riga divisa per CAP e Provincia */}
      <div className="row-split">
        <div className="input-group">
          <label className="input-label">CAP</label>
          <input
            type="text"
            placeholder="00000"
            maxLength={5}
            className={`input-step2 ${
              data.cap && !isCapValid ? "border-red-500" : "border-gray-300"
            }`}
            value={data.cap || ""}
            onChange={(e) => handleCapChange(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Provincia</label>
          <input
            type="text"
            placeholder="TO"
            maxLength={2}
            className="input-step2 border-gray-300 uppercase"
            value={data.provincia || ""}
            onChange={(e) =>
              updateField("provincia", e.target.value.toUpperCase())
            }
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress progress-step-2"></div>
      </div>

      <div className="button-group absolute left-1/2 transform -translate-x-1/2 bottom-6 w-full max-w-3xl flex justify-between px-4">
        <button className="back-btn" onClick={back}>
          Indietro
        </button>
        <button
          onClick={next}
          disabled={!isStepValid}
          className={`next-btn ${!isStepValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          Avanti
        </button>
      </div>
    </div>
  );
}

export default ComponentStep2;
