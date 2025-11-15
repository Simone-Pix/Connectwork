function ComponentStep2({ data, updateField, next, back }) {
  return (
    <div className="configurator">
      <div className="progress-container">
        <span>Passo 2 di 6</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: "34%" }}></div>
        </div>
      </div>

      <h3 className="section-title">Inserisci l'indirizzo</h3>

      <input
        type="text"
        placeholder="Indirizzo completo"
        className="input-step2"
        value={data.indirizzo}
        onChange={(e) => updateField("indirizzo", e.target.value)}
      />

      <div className="button-group">
        <button className="back-btn" onClick={back}>Indietro</button>
        <button className="next-btn" onClick={next}>Avanti</button>
      </div>
    </div>
  );
}

export default ComponentStep2;
