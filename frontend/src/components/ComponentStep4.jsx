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
    <div className="">
      <div className="progress-container">
        <span>Passo 4 di 6</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: "68%" }}></div>
        </div>
      </div>

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

      <div className="button-group">
        <button className="back-btn" onClick={back}>Indietro</button>
        <button
  onClick={next}
  className="next-btn py-2 px-4 rounded-lg text-white bg-primary hover:bg-primary-dark transition cursor-pointer"
>
  Avanti
</button>

      </div>
    </div>
  );
}

export default ComponentStep4;
