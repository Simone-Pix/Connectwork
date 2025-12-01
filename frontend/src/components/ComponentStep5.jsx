const choices = ["Subito", "Entro 6 mesi", "Entro 12 mesi", "Non ho fretta"];

function ComponentStep5({ data, updateField, next, back }) {

  const isDisabled = !data.tempistica;

  return (
    <div className="wrapper-1-step">
      <div className="progress-container">
         <span 
            className="text-sm font-semibold" 
            style={{ color: '#3A6EA5' }}
          >
            Passo 5 di 6
          </span>
        <div className="progress-bar">
          <div className="progress" style={{ width: "85%" }}></div>
        </div>
      </div>

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

      <div className="button-group">
        <button className="back-btn" onClick={back}>Indietro</button>

        <button
  onClick={next}
  disabled={isDisabled}
  className={`
    next-btn py-2 px-4 rounded-lg text-white bg-primary hover:bg-primary-dark transition
    ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
  `}
>
  Avanti
</button>

      </div>
    </div>
  );
}

export default ComponentStep5;
