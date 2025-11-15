function ComponentStep3({ data, updateField, next, back }) {
  return (
    <div className="configurator">
      <div className="progress-container">
        <span>Passo 3 di 6</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: "51%" }}></div>
        </div>
      </div>

      <h3 className="section-title">Dati dell'immobile</h3>

      <div className="form-grid-step3">
        <input
          type="number"
          placeholder="Superficie in m²"
          value={data.superficie}
          onChange={(e) => updateField("superficie", e.target.value)}
        />

        <input
          type="number"
          placeholder="Numero stanze"
          value={data.stanze}
          onChange={(e) => updateField("stanze", e.target.value)}
        />

        <input
          type="number"
          placeholder="Numero bagni"
          value={data.bagni}
          onChange={(e) => updateField("bagni", e.target.value)}
        />

        {data.tipoOperazione === "appartamento" && (
          <input
            type="number"
            placeholder="Piano"
            value={data.piano}
            onChange={(e) => updateField("piano", e.target.value)}
          />
        )}
      </div>

      <div className="button-group">
        <button className="back-btn" onClick={back}>Indietro</button>
        <button className="next-btn" onClick={next}>Avanti →</button>
      </div>
    </div>
  );
}

export default ComponentStep3;
