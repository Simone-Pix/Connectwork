
const optionalList = ["Balcone", "Terrazzo", "Parcheggio", "Giardino", "Garage"];

const optionalIcons = {
  Balcone: "🪟",
  Terrazzo: "🌿",
  Parcheggio: "🅿️",
  Giardino: "🌳",
  Garage: "🚗",
};

function ComponentStep4({ data, updateField, next, back }) {
  const toggleOptional = (item) => {
    if (data.optional.includes(item)) {
      updateField("optional", data.optional.filter((o) => o !== item));
    } else {
      updateField("optional", [...data.optional, item]);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <div className="text-gray-900 text-sm mb-1">Passo 4 di 6</div>
        <div className="h-1 bg-orange-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 rounded-full"
            style={{ width: "68%" }}
          ></div>
        </div>
      </div>

      <h3 className="text-gray-900 text-xl font-semibold mb-4">Optional dell'immobile</h3>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 shadow-sm mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {optionalList.map((opt) => (
            <div
              key={opt}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center ${
                data.optional.includes(opt)
                  ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                  : "bg-white border-orange-300 text-gray-800 hover:bg-orange-100"
              }`}
              onClick={() => toggleOptional(opt)}
            >
              <span className="text-xl mb-1">{optionalIcons[opt]}</span>
              <span className="text-sm font-medium">{opt}</span>
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
          className="flex-1 py-2.5 px-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition shadow-md"
        >
          Avanti
        </button>
      </div>
    </div>
  );
}

export default ComponentStep4;
