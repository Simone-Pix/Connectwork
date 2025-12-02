const optionalList = ["Balcone", "Terrazzo", "Parcheggio", "Giardino", "Garage"];

function ComponentStep4({ data, updateField, next, back }) {
  const toggleOptional = (item) => {
    if (data.optional.includes(item)) {
      updateField("optional", data.optional.filter((o) => o !== item));
    } else {
      updateField("optional", [...data.optional, item]);
    }
  };

  return (
    <div className="wrapper-1-step">
      {/* Progress Label */}
      <span className="progress-label">Passo 4 di 6</span>
      
      <h3 className="section-title">Optional dell'immobile</h3>

      <div className="card-container">
        {optionalList.map((opt) => (
          <div
            key={opt}
            className={`card ${data.optional.includes(opt) ? "active" : ""}`}
            onClick={() => toggleOptional(opt)}
          >
            <h4>{opt}</h4>
          </div>
        ))}
      </div>

      <div className="progress-bar">
        <div className="progress progress-step-4"></div>
      </div>

      {/* --- BOTTONI (posizionati come gli altri step) --- */}
      <div className="button-group absolute left-1/2 transform -translate-x-1/2 bottom-6 w-full max-w-3xl flex justify-between px-4">
        <button className="back-btn" onClick={back}>
          Indietro
        </button>

        <button
          onClick={next}
          className="next-btn cursor-pointer"
        >
          Avanti
        </button>
      </div>
    </div>
  );
}

export default ComponentStep4;
