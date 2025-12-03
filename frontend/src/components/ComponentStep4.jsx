import React from "react";

function ComponentStep4({ data, updateField, next, back }) {
  const options = ["Balcone", "Terrazzo", "Giardino", "Box Auto", "Cantina", "Ascensore", "Allarme", "Condizionatore"];
  
  const toggle = (opt) => {
    if (data.optional.includes(opt)) updateField("optional", data.optional.filter(o => o !== opt));
    else updateField("optional", [...data.optional, opt]);
  };

  return (
    <>
      <div className="step-header-container">
        <span className="progress-label">Passo 4 di 6</span>
        <div className="progress-bar-container">
          <div className="progress-fill" style={{ width: '66.6%' }}></div>
        </div>
        <div className="w-6"></div>
      </div>
      <div className="step-title-wrapper">
          <h3 className="section-title">Optional</h3>
          <p className="section-subtitle">Seleziona cosa è incluso</p>
        </div>
      <div className="step-body-scroll">
        <div className="w-full max-w-lg mx-auto">
          <div className="card-container">
            {options.map(opt => (
              <div 
                key={opt} 
                className={`card ${data.optional.includes(opt) ? 'active' : ''}`}
                onClick={() => toggle(opt)}
              >
                <h4 className="m-0">{opt}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="button-group-footer">
        <button className="back-btn" onClick={back}>Indietro</button>
        <button className="next-btn" onClick={next}>Avanti</button>
      </div>
    </>
  );
}

export default ComponentStep4;