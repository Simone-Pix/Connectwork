function ComponentStep6({ data, updateField, next, back }) {
  const isValid = data.nome && data.cognome && data.email.includes('@') && data.telefono.length > 6;

  return (
    <>
      <div className="step-header-container">
        <span className="progress-label">Passo 6 di 6</span>
        <div className="progress-bar-container">
          <div className="progress-fill" style={{ width: '100%' }}></div>
        </div>
        <div className="w-6"></div>
      </div>
      <div className="step-title-wrapper">
          <h3 className="section-title">Contatti</h3>
          <p className="section-subtitle">Dove possiamo inviarti la valutazione?</p>
        </div>
      <div className="step-body-scroll">
        <div className="w-full max-w-md mx-auto">
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Nome</label>
              <input type="text" placeholder="Mario" className="input-standard"
                value={data.nome} onChange={(e) => updateField("nome", e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Cognome</label>
              <input type="text" placeholder="Rossi" className="input-standard"
                value={data.cognome} onChange={(e) => updateField("cognome", e.target.value)} />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Email</label>
            <input type="email" placeholder="mario@email.com" className="input-standard"
              value={data.email} onChange={(e) => updateField("email", e.target.value)} />
          </div>

          <div className="input-group">
            <label className="input-label">Telefono</label>
            <input type="tel" placeholder="333 1234567" className="input-standard"
              value={data.telefono} onChange={(e) => updateField("telefono", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="button-group-footer">
        <button className="back-btn" onClick={back}>Indietro</button>
        <button className="next-btn" onClick={next} disabled={!isValid}>
          Ricevi Valutazione
        </button>
      </div>
    </>
  );
}

export default ComponentStep6;