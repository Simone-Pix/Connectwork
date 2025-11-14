function ComponentStepHome() {

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
        <div className="card active">
          <div className="icon">🏠</div>
          <h4>Acquista</h4>
          <p>Trova la casa dei tuoi sogni</p>
        </div>

        <div className="card">
          <div className="icon">🔑</div>
          <h4>Vendi</h4>
          <p>Vendi il tuo immobile</p>
        </div>
      </div>

      <div className="button-group">
        <button className="back-btn">Indietro</button>
        <button className="next-btn">Avanti →</button>
      </div>
    </div>
    );
};

export default ComponentStepHome;