
const choices = ["Subito", "Entro 6 mesi", "Entro 12 mesi", "Non ho fretta"];

function ComponentStep5({ data, updateField, next, back }) {
  return (
    <div className="w-full">
      <div className="mb-4">
        <div className="text-gray-900 text-sm mb-1">Passo 5 di 6</div>
        <div className="h-1 bg-orange-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 rounded-full"
            style={{ width: "85%" }}
          ></div>
        </div>
      </div>

      <h3 className="text-gray-900 text-xl font-semibold mb-4">Entro quanto vuoi vendere?</h3>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {choices.map((choice) => (
            <div
              key={choice}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center ${
                data.tempistica === choice
                  ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                  : "bg-white border-orange-300 text-gray-800 hover:bg-orange-100"
              }`}
              onClick={() => updateField("tempistica", choice)}
            >
              <span className="font-medium">{choice}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={back}
          className="flex-1 py-2.5 px-4 bg-white border border-orange-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          Indietro
        </button>
        <button
          onClick={next}
          disabled={!data.tempistica}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition shadow-md ${
            data.tempistica
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

export default ComponentStep5;