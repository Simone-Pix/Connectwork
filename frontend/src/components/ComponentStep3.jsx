function ComponentStep3({ data, updateField, next, back }) {
  const isValid = data.superficie && data.stanze && data.bagni && data.annoCostruzione && data.statoConservazione && data.classeEnergetica;

  return (
    <>
      <div className="step-header-container">
        <span className="progress-label">Passo 3 di 6</span>
        <div className="progress-bar-container">
          <div className="progress-fill" style={{ width: '50%' }}></div>
        </div>
        <div className="w-6"></div>
      </div>
      <div className="step-title-wrapper">
          <h3 className="section-title">Caratteristiche</h3>
          <p className="section-subtitle">Dettagli tecnici dell'immobile</p>
        </div>
      <div className="step-body-scroll">
        <div className="w-full max-w-lg mx-auto">


          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Superficie (m²)</label>
              <input type="number" placeholder="100" className="input-standard"
                value={data.superficie} onChange={(e) => updateField("superficie", e.target.value)} />
            </div>

            <div className="input-group">
              <label className="input-label">Locali</label>
              <input type="number" placeholder="4" className="input-standard"
                value={data.stanze} onChange={(e) => updateField("stanze", e.target.value)} />
            </div>

            <div className="input-group">
              <label className="input-label">Bagni</label>
              <input type="number" placeholder="2" className="input-standard"
                value={data.bagni} onChange={(e) => updateField("bagni", e.target.value)} />
            </div>

            <div className="input-group">
              <label className="input-label">Anno Costr.</label>
              <input type="number" placeholder="1990" className="input-standard"
                value={data.annoCostruzione} onChange={(e) => updateField("annoCostruzione", e.target.value)} />
            </div>

            <div className="input-group">
              <label className="input-label">Stato</label>
              <select className="input-standard bg-white" value={data.statoConservazione} onChange={(e) => updateField("statoConservazione", e.target.value)}>
                <option value="">Seleziona...</option>
                <option value="da ristrutturare">Da ristrutturare</option>
                <option value="buono">Buono</option>
                <option value="ottimo">Ottimo</option>
                <option value="nuovo">Nuovo</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Classe En.</label>
              <select className="input-standard bg-white" value={data.classeEnergetica} onChange={(e) => updateField("classeEnergetica", e.target.value)}>
                <option value="">Seleziona...</option>
                {['A4', 'A3', 'A2', 'A1', 'B', 'C', 'D', 'E', 'F', 'G'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Se appartamento, chiedi piano */}
          {data.tipoImmobile === 'appartamento' && (
            <div className="input-group mt-3">
              <label className="input-label">Piano</label>
              <input type="number" placeholder="1" className="input-standard"
                value={data.piano} onChange={(e) => updateField("piano", e.target.value)} />
            </div>
          )}
        </div>
      </div>

      <div className="button-group-footer">
        <button className="back-btn" onClick={back}>Indietro</button>
        <button className="next-btn" onClick={next} disabled={!isValid}>Avanti</button>
      </div>
    </>
  );
}

export default ComponentStep3;