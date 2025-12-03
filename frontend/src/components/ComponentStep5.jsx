import React from "react";

function ComponentStep5({ data, updateField, next, back }) {
  const choices = ["Subito", "Entro 3 mesi", "Entro 6 mesi", "Solo curiosità"];

  return (
    <>
      <div className="step-header-container">
        <span className="progress-label">Passo 5 di 6</span>
        <div className="progress-bar-container">
          <div className="progress-fill" style={{ width: '83.3%' }}></div>
        </div>
        <div className="w-6"></div>
      </div>
      <div className="step-title-wrapper">
          <h3 className="section-title">Tempistiche</h3>
          <p className="section-subtitle">Entro quando vorresti vendere?</p>
        </div>
      <div className="step-body-scroll justify-center">
        <div className="w-full max-w-lg mx-auto">
          <div className="card-container">
            {choices.map(c => (
              <div
                key={c}
                className={`card ${data.tempistica === c ? 'active' : ''}`}
                onClick={() => updateField("tempistica", c)}
              >
                <h4 className="m-0">{c}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="button-group-footer">
        <button className="back-btn" onClick={back}>Indietro</button>
        <button className="next-btn" onClick={next} disabled={!data.tempistica}>Avanti</button>
      </div>
    </>
  );
}

export default ComponentStep5;