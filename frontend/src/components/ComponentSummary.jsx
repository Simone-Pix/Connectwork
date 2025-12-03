function ComponentSummary({ data, back, submit }) {

  // Campi obbligatori per abilitare il pulsante (extra check)
  const requiredFields = [
    "tipoImmobile", "indirizzo", "superficie", 
    "stanze", "bagni", "tempistica", 
    "nome", "cognome", "email", "telefono"
  ];

  const isValid = requiredFields.every((field) => data[field]);

  return (
    <>
      {/* 1. HEADER */}
      <div className="step-header-container justify-center">
        <h2 className="section-title m-0 text-xl">Riepilogo Dati</h2>
      </div>

      {/* 2. BODY SCROLLABILE */}
      <div className="step-body-scroll">
        <div className="w-full max-w-lg mx-auto">
          <p className="section-subtitle">Controlla che sia tutto corretto prima di inviare.</p>

          {/* Card Dati Immobile */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4">
            <h3 className="text-sm font-bold text-[#004E98] uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">
             Immobile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs">Tipologia</span>
                <span className="font-semibold text-gray-800 capitalize">{data.tipoImmobile}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-500 text-xs">Indirizzo</span>
                <span className="font-semibold text-gray-800 truncate" title={data.indirizzo}>
                  {data.indirizzo}, {data.citta} ({data.provincia})
                </span>
              </div>

              <div className="flex flex-col sm:col-span-2">
                <span className="text-gray-500 text-xs">Dettagli</span>
                <span className="font-semibold text-gray-800">
                  {data.superficie} m² • {data.stanze} Locali • {data.bagni} Bagni
                  {data.piano && ` • Piano ${data.piano}`}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-500 text-xs">Tempistica</span>
                <span className="font-semibold text-gray-800">{data.tempistica}</span>
              </div>
              
              <div className="flex flex-col">
                 <span className="text-gray-500 text-xs">Classe En. / Stato</span>
                 <span className="font-semibold text-gray-800 capitalize">{data.classeEnergetica} / {data.statoConservazione}</span>
              </div>
            </div>

            {/* Optional Tags */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <span className="text-gray-500 text-xs block mb-2">Optional inclusi</span>
              <div className="flex flex-wrap gap-2">
                {data.optional.length > 0 ? (
                  data.optional.map((opt) => (
                    <span
                      key={opt}
                      className="bg-white border border-gray-300 text-gray-700 text-xs font-medium px-2 py-1 rounded-md shadow-sm"
                    >
                      {opt}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-xs italic">Nessun optional selezionato</span>
                )}
              </div>
            </div>
          </div>

          {/* Card Dati Personali */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4">
            <h3 className="text-sm font-bold text-[#004E98] uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">
             I tuoi contatti
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs">Nome e Cognome</span>
                <span className="font-semibold text-gray-800">{data.nome} {data.cognome}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-500 text-xs">Telefono</span>
                <span className="font-semibold text-gray-800">{data.telefono}</span>
              </div>

              <div className="flex flex-col sm:col-span-2">
                <span className="text-gray-500 text-xs">Email</span>
                <span className="font-semibold text-gray-800 break-all">{data.email}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. FOOTER */}
      <div className="button-group-footer">
        <button
          onClick={back}
          className="back-btn"
        >
          Indietro
        </button>

        <button
          onClick={isValid ? submit : undefined}
          disabled={!isValid}
          className="next-btn"
        >
          Conferma e Invia
        </button>
      </div>
    </>
  );
}

export default ComponentSummary;