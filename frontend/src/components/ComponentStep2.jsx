function ComponentStep2({ data, updateField, next, back }) {

  const addressRegex = /^(via|viale|vicolo|piazza|corso|largo)\s+.+\s+\d+[a-zA-Z]?$/i;

  const trimmedAddress = data.indirizzo.trim();

  const isAddressValid = addressRegex.test(trimmedAddress);

  return (
    <div className="second-wrapper">
      <div className="progress-container">
        <span>Passo 2 di 6</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: "34%" }}></div>
        </div>
      </div>

      <h3 className="section-title">Inserisci l'indirizzo</h3>

      <input
        type="text"
        placeholder="Es: Via Roma 12"
        className={`input-step2 border p-3 rounded-lg ${
          trimmedAddress && !isAddressValid
            ? "border-red-500"
            : "border-gray-300"
        }`}
        value={data.indirizzo}
        onChange={(e) => updateField("indirizzo", e.target.value)}
      />

      <div className="button-group">
        <button className="back-btn" onClick={back}>Indietro</button>

       <button
  onClick={next}
  disabled={!isAddressValid} 
  className={`
    next-btn
    py-2 px-4
    rounded-lg
    text-white
    bg-primary
    hover:bg-primary-dark
    transition
    ${!isAddressValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
  `}
>
  Avanti
</button>

      </div>
    </div>
  );
}

export default ComponentStep2;
