function ComponentStep1({ data, updateField, next }) {
  const handleSelect = (value) => updateField("tipoImmobile", value);

  return (
    <>
      {/* HEADER */}
      <div className="step-header-container">
        <span className="progress-label">Passo 1 di 6</span>
        <div className="progress-bar-container">
          <div className="progress-fill" style={{ width: '16.6%' }}></div>
        </div>
        <div className="w-6"></div>
      </div>

      {/* --- TITOLO FISSO --- */}
      <div className="step-title-wrapper">
        <h3 className="section-title">Cosa vuoi vendere?</h3>
        <p className="section-subtitle">Scegli la tipologia di immobile</p>
      </div>

      {/* BODY (Scrollabile) */}
      <div className="step-body-scroll justify-center">
        <div className="w-full max-w-lg mx-auto">
          <div className="card-container">
            <button
              className={`card ${data.tipoImmobile === "appartamento" ? "active" : ""}`}
              onClick={() => handleSelect("appartamento")}
            >
              <div className="icon"><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: '1.5em', height: '1.5em' }} // Stile inline per la dimensione
                >
                  <path d="M2 22h20" />
                  <path d="M17 2H7a2 2 0 0 0-2 2v18h14V4a2 2 0 0 0-2-2Z" />
                  <path d="M9 22V12h6v10" />
                  <path d="M5 8h14" />
                  <path d="M5 12h4" />
                  <path d="M15 12h4" />
                  <path d="M5 16h4" />
                  <path d="M15 16h4" />
                </svg></div>
              <h4>Appartamento</h4>
              <p>Condominio, loft, ecc.</p>
            </button>

            <button
              className={`card ${data.tipoImmobile === "villa" ? "active" : ""}`}
              onClick={() => handleSelect("villa")}
            >
              <div className="icon"><svg 
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" // Portato a 1.5 per matchare l'appartamento
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  style={{ width: '1.5em', height: '1.5em' }} // Dimensione adattata
                >
                  {/* Tracciato originale invariato */}
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg></div>
              <h4>Villa / Casa</h4>
              <p>Indipendente, schiera</p>
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="button-group-footer">
        <div></div>
        <button className="next-btn" onClick={next} disabled={!data.tipoImmobile}>
          Avanti
        </button>
      </div>
    </>
  );
}

export default ComponentStep1;