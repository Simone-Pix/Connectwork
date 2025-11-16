
function ComponentStep3({ data, updateField, next, back }) {
  return (
    <div className="w-full">
      <div className="mb-4">
        <div className="text-gray-900 text-sm mb-1">Passo 3 di 6</div>
        <div className="h-1 bg-orange-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 rounded-full"
            style={{ width: "51%" }}
          ></div>
        </div>
      </div>

      <h3 className="text-gray-900 text-xl font-semibold mb-4">Dati dell'immobile</h3>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-gray-700 text-sm font-medium">
              <span className="text-blue-600">📐</span> Superficie (m²)
            </label>
            <input
              type="number"
              placeholder="es. 120"
              className="w-full px-4 py-2.5 rounded-lg border border-orange-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              value={data.superficie}
              onChange={(e) => updateField("superficie", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="flex items-center gap-2 text-gray-700 text-sm font-medium">
              <span className="text-blue-600">🛏</span> Numero stanze
            </label>
            <input
              type="number"
              placeholder="es. 4"
              className="w-full px-4 py-2.5 rounded-lg border border-orange-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              value={data.stanze}
              onChange={(e) => updateField("stanze", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="flex items-center gap-2 text-gray-700 text-sm font-medium">
              <span className="text-blue-600">🛁</span> Numero bagni
            </label>
            <input
              type="number"
              placeholder="es. 2"
              className="w-full px-4 py-2.5 rounded-lg border border-orange-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              value={data.bagni}
              onChange={(e) => updateField("bagni", e.target.value)}
            />
          </div>

          {data.tipoOperazione === "appartamento" && (
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                <span className="text-blue-600">🏢</span> Piano
              </label>
              <input
                type="number"
                placeholder="es. 3"
                className="w-full px-4 py-2.5 rounded-lg border border-orange-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                value={data.piano}
                onChange={(e) => updateField("piano", e.target.value)}
              />
            </div>
          )}
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

export default ComponentStep3;