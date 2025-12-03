function ComponentStep2({ data, updateField, next, back }) {
  const isAddressValid = (data.indirizzo || "").trim().length > 5;
  const isCapValid = /^[0-9]{5}$/.test(data.cap || "");
  const isFormValid = isAddressValid && isCapValid && data.citta && data.provincia;

  return (
    <>
      {/* HEADER */}
      <div className="step-header-container">
        <span className="progress-label">Passo 2 di 6</span>
        <div className="progress-bar-container">
          <div className="progress-fill" style={{ width: '33.3%' }}></div>
        </div>
        <div className="w-6"></div>
      </div>

      {/* --- TITOLO FISSO --- */}
      <div className="step-title-wrapper">
        <h3 className="section-title">Dove si trova?</h3>
        <p className="section-subtitle">Inserisci l'indirizzo esatto</p>
      </div>

      {/* BODY */}
      <div className="step-body-scroll">
        <div className="w-full max-w-md mx-auto pt-2"> {/* Aggiunto un piccolo pt-2 opzionale */}
          
          <div className="input-group">
            <label className="input-label">Indirizzo</label>
            <input
              type="text"
              placeholder="Via Roma 12"
              className={`input-standard ${data.indirizzo && !isAddressValid ? 'input-error' : ''}`}
              value={data.indirizzo || ""}
              onChange={(e) => updateField("indirizzo", e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Città</label>
            <input
              type="text"
              placeholder="Milano"
              className="input-standard"
              value={data.citta || ""}
              onChange={(e) => updateField("citta", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="input-group">
              <label className="input-label">CAP</label>
              <input
                type="text"
                maxLength={5}
                placeholder="20100"
                className={`input-standard ${data.cap && !isCapValid ? 'input-error' : ''}`}
                value={data.cap || ""}
                onChange={(e) => updateField("cap", e.target.value.replace(/\D/g, '').slice(0,5))}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Provincia</label>
              <input
                type="text"
                maxLength={2}
                placeholder="MI"
                className="input-standard uppercase"
                value={data.provincia || ""}
                onChange={(e) => updateField("provincia", e.target.value.toUpperCase())}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="button-group-footer">
        <button className="back-btn" onClick={back}>Indietro</button>
        <button className="next-btn" onClick={next} disabled={!isFormValid}>
          Avanti
        </button>
      </div>
    </>
  );
}

export default ComponentStep2;