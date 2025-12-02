function ComponentStep1({ data, updateField, next }) {
  const handleSelect = (value) => {
    updateField("tipoImmobile", value);
  };

  const isStepValid = Boolean(data.tipoImmobile);

  return (
    <div className="flex flex-col h-full">
      {/* Progress Label */}
      <span className="progress-label">Passo 1 di 6</span>

      {/* Title */}
      <div className="flex flex-col items-center justify-start pt-6 pb-4">

        <h3 
          className="text-3xl font-bold mb-10 text-center section-title" 
          
        >
          Cosa vuoi vendere?
        </h3>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl px-4">
          {/* Card Appartamento */}
          <button
            className={`relative rounded-xl p-6 transition-all duration-200 transform hover:scale-[1.02] ${
              data.tipoImmobile === "appartamento" 
                ? "ring-3 shadow-lg" 
                : "shadow hover:shadow-md"
            }`}
            style={{
              backgroundColor: data.tipoImmobile === "appartamento" ? '#004E98' : 'white',
              borderWidth: data.tipoImmobile === "appartamento" ? '0' : '2px',
              borderColor: '#EBEBEB',
              ringColor: '#FF6700'
            }}
            onClick={() => handleSelect("appartamento")}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div 
                className="text-4xl p-3 rounded-full"
                style={{
                  backgroundColor: data.tipoImmobile === "appartamento" 
                    ? 'rgba(255, 103, 0, 0.15)' 
                    : '#F5F5F5'
                }}
              >
                🔑
              </div>
              <h4 
                className="text-xl font-bold"
                style={{
                  color: data.tipoImmobile === "appartamento" ? 'white' : '#004E98'
                }}
              >
                Appartamento
              </h4>
              <p 
                className="text-sm"
                style={{
                  color: data.tipoImmobile === "appartamento" ? '#EBEBEB' : '#3A6EA5'
                }}
              >
                Vendi il tuo immobile
              </p>
            </div>
          </button>

          {/* Card Villa */}
          <button
            className={`relative rounded-xl p-6 transition-all duration-200 transform hover:scale-[1.02] ${
              data.tipoImmobile === "villa" 
                ? "ring-3 shadow-lg" 
                : "shadow hover:shadow-md"
            }`}
            style={{
              backgroundColor: data.tipoImmobile === "villa" ? '#004E98' : 'white',
              borderWidth: data.tipoImmobile === "villa" ? '0' : '2px',
              borderColor: '#EBEBEB',
              ringColor: '#FF6700'
            }}
            onClick={() => handleSelect("villa")}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div 
                className="text-4xl p-3 rounded-full"
                style={{
                  backgroundColor: data.tipoImmobile === "villa" 
                    ? 'rgba(255, 103, 0, 0.15)' 
                    : '#F5F5F5'
                }}
              >
                🏠
              </div>
              <h4 
                className="text-xl font-bold"
                style={{
                  color: data.tipoImmobile === "villa" ? 'white' : '#004E98'
                }}
              >
                Villa/Casa indipendente
              </h4>
              <p 
                className="text-sm"
                style={{
                  color: data.tipoImmobile === "villa" ? '#EBEBEB' : '#3A6EA5'
                }}
              >
                Vendi il tuo immobile
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress progress-step-1"></div>
      </div>

      {/* Buttons positioned relative to the configurator container (same reference used elsewhere) */}
      <div className="button-group absolute left-1/2 transform -translate-x-1/2 bottom-6 w-full max-w-3xl flex justify-end px-4">
        <button
          onClick={next}
          disabled={!isStepValid}
          className={`next-btn ${!isStepValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          Avanti
        </button>
      </div>
    </div>
  );
}

export default ComponentStep1;