// src/components/ComponentStep2.jsx

function ComponentStep2({ data, updateField, next, back }) {
  return (
    <div className="w-full">
      {/* Barra di progresso */}
      <div className="mb-4">
        <div className="text-gray-900 text-sm mb-1">Passo 2 di 6</div>
        <div className="h-1 bg-orange-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 rounded-full"
            style={{ width: "34%" }}
          ></div>
        </div>
      </div>

      {/* Titolo */}
      <h3 className="text-gray-900 text-xl font-semibold mb-4">Inserisci l'indirizzo</h3>

      {/* Box con sfondo crema */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 shadow-sm mb-6">
        <input
          type="text"
          placeholder="Indirizzo completo"
          className="w-full px-4 py-2.5 rounded-lg border border-orange-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
          value={data.indirizzo}
          onChange={(e) => updateField("indirizzo", e.target.value)}
        />
      </div>

      {/* Pulsanti */}
      <div className="flex gap-4">
        <button
          onClick={back}
          className="flex-1 py-2.5 px-4 bg-white border border-orange-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          Indietro
        </button>
        <button
          onClick={next}
          disabled={!data.indirizzo}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition shadow-md ${
            data.indirizzo
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Avanti
        </button>
      </div>
    </div>
  );
}

export default ComponentStep2;