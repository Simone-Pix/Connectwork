import { useState } from "react";

function ComponentStepOne() {
  const [selected, setSelected] = useState("acquista");

  const options = [
    { id: "acquista", title: "Acquista", subtitle: "Trova la casa dei tuoi sogni" },
    { id: "affitta", title: "Affitta", subtitle: "Trova l'affitto perfetto" },
    { id: "nuove-costruzioni", title: "Nuove costruzioni", subtitle: "Scopri i nuovi progetti" },
  ];

  return (
    <div className="step-container">
      <div className="progress-bar">
        <div className="progress" style={{ width: "17%" }}></div>
      </div>

      <p className="step-count">Passo 1 di 6</p>
      <h2 className="step-title">Cosa stai cercando?</h2>
      <p className="step-subtitle">Seleziona il tipo di operazione</p>

      <div className="options">
        {options.map((opt) => (
          <div
            key={opt.id}
            className={`card ${selected === opt.id ? "selected" : ""}`}
            onClick={() => setSelected(opt.id)}
          >
            <div className="icon">🏠</div>
            <h3>{opt.title}</h3>
            <p>{opt.subtitle}</p>
            {selected === opt.id && <span className="checkmark">✔</span>}
          </div>
        ))}
      </div>

      <div className="buttons">
        <button className="btn-back">Indietro</button>
        <button className="btn-next">Avanti →</button>
      </div>
    </div>
  );
}

export default ComponentStepOne;
