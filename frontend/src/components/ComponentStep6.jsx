function ComponentStep6({ data, updateField, back, submit }) {
  return (
    <div className="">
      <div className="progress-container">
        <span>Passo 6 di 6</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: "100%" }}></div>
        </div>
      </div>

      <h3 className="section-title">I tuoi dati</h3>

      <div className="form-grid-step6">
        <input
          type="text"
          placeholder="Nome"
          value={data.nome}
          onChange={(e) => updateField("nome", e.target.value)}
        />

        <input
          type="text"
          placeholder="Cognome"
          value={data.cognome}
          onChange={(e) => updateField("cognome", e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => updateField("email", e.target.value)}
        />

        <input
          type="tel"
          placeholder="Telefono"
          value={data.telefono}
          onChange={(e) => updateField("telefono", e.target.value)}
        />
      </div>

      <div className="button-group">
        <button className="back-btn" onClick={back}>Indietro</button>
        <button className="next-btn" onClick={submit}>Invia</button>
      </div>
    </div>
  );
}

export default ComponentStep6;
