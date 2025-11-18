function ComponentStep1({ data, updateField, next }) {
  const handleSelect = (value) => {
    updateField("tipoOperazione", value);
  };

  const isDisabled = !data.tipoOperazione; 


  return (
    <div className="">
      <div className="progress-container">
        <span>Passo 1 di 6</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: "17%" }}></div>
        </div>
      </div>

      <h3 className="section-title">Cosa vuoi vendere?</h3>


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
        <button
  onClick={next}
  disabled={isDisabled} 
  className={`
    next-btn
    py-2 px-4
    rounded-lg
    text-white
    bg-primary
    hover:bg-primary-dark
    transition
    ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
  `}
>
  Avanti
</button>
      </div>
    </div>
  );
}

export default ComponentStep1;
