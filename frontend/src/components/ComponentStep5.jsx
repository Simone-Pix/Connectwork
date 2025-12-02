const choices = ["Subito", "Entro 6 mesi", "Entro 12 mesi", "Non ho fretta"];

function ComponentStep5({ data, updateField, next, back }) {

  const isDisabled = !data.tempistica;

  return (
    <div className="wrapper-1-step">
      {/* Progress Label */}
      <span className="progress-label">Passo 5 di 6</span>

      <h3 className="section-title">Entro quanto vuoi vendere?</h3>

      <div className="card-container">
        {choices.map((c) => (
          <div
            key={c}
            className={`card ${data.tempistica === c ? "active" : ""}`}
            onClick={() => updateField("tempistica", c)}
          >
            <h4>{c}</h4>
          </div>
        ))}
      </div>

      <div className="progress-bar">
        <div className="progress progress-step-5"></div>
      </div>

      <div className="button-group absolute left-1/2 transform -translate-x-1/2 bottom-6 w-full max-w-3xl flex justify-between px-4">
        <button className="back-btn" onClick={back}>Indietro</button>

        <button
          onClick={next}
          disabled={isDisabled}
          className={`next-btn ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          Avanti
        </button>

      </div>
    </div>
  );
}

export default ComponentStep5;
