
function ComponentStep1({ data, updateField, next }) {
  const handleSelect = (value) => {
    
    if (data.tipoOperazione === value) {
      updateField("tipoOperazione", ""); 
    } else {
      updateField("tipoOperazione", value); 
    }
  };

  return (
    <div className="w-full">
      
      <div className="mb-4">
        <div className="text-gray-900 text-sm mb-1">Passo 1 di 6</div>
        <div className="h-1 bg-orange-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 rounded-full"
            style={{ width: "17%" }}
          ></div>
        </div>
      </div>

      
      <h3 className="text-gray-900 text-xl font-semibold mb-2">Cosa stai cercando?</h3>
      <p className="text-gray-600 text-sm mb-6">Seleziona il tipo di operazione</p>

     
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         
          <div
            className={`p-5 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center ${
              data.tipoOperazione === "appartamento"
                ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                : "bg-white border-orange-300 text-gray-800 hover:bg-orange-100"
            }`}
            onClick={() => handleSelect("appartamento")}
          >
            <div className="text-3xl mb-2">🔑</div>
            <h4 className="font-medium">Appartamento</h4>
            <p className="text-sm mt-1 text-gray-600">Vendi il tuo immobile</p>
          </div>

          
          <div
            className={`p-5 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center ${
              data.tipoOperazione === "villa"
                ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                : "bg-white border-orange-300 text-gray-800 hover:bg-orange-100"
            }`}
            onClick={() => handleSelect("villa")}
          >
            <div className="text-3xl mb-2">🏠</div>
            <h4 className="font-medium">Villa/Casa indipendente</h4>
            <p className="text-sm mt-1 text-gray-600">Vendi il tuo immobile</p>
          </div>
        </div>
      </div>

      
      <div className="flex justify-center">
        <button
          onClick={next}
          disabled={!data.tipoOperazione}
          className={`px-6 py-2.5 rounded-lg font-semibold transition shadow-md ${
            data.tipoOperazione
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

export default ComponentStep1;