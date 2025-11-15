function ComponentStep1({ data, updateField, next }) {
  const handleSelect = (value) => {
    updateField("tipoOperazione", value);
  };

  return (
    <div className="configurator">
      <div className="progress-container">
        <span>Passo 1 di 6</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: "17%" }}></div>
        </div>
      </div>

      <h3 className="section-title">Cosa stai cercando?</h3>
      <p className="section-subtitle">Seleziona il tipo di operazione</p>

      <div className="card-container">
        <div
          className={`card ${data.tipoOperazione === "appartamento" ? "active" : ""}`}
          onClick={() => handleSelect("appartamento")}
        >
          <div className="icon">🔑</div>
          <h4>Appartamento</h4>
          <p>Vendi il tuo immobile</p>
        </div>

        <div
          className={`card ${data.tipoOperazione === "villa" ? "active" : ""}`}
          onClick={() => handleSelect("villa")}
        >
          <div className="icon">🏠</div>
          <h4>Villa/Casa indipendente</h4>
          <p>Vendi il tuo immobile</p>
        </div>
      </div>

      <div className="button-group">
        <button className="next-btn" onClick={next}>
          Avanti →
        </button>
      </div>
    </div>
  );
}

export default ComponentStep1;
