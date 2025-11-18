import SuccessToast from "./SuccessToast";

function ComponentSummary({ data, back, submit, showSuccess }) {

  const requiredFields = [
    "tipoOperazione",
    "indirizzo",
    "superficie",
    "stanze",
    "bagni",
    "tempistica",
    "nome",
    "cognome",
    "email",
    "telefono",
  ];


  const isValid = requiredFields.every((field) => data[field]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-primary">Riepilogo dei dati</h2>

      {/* Card Dati Immobile */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-6 hover:shadow-2xl transition">
        <h3 className="text-xl font-semibold text-primary mb-4">Dati immobile</h3>

        <div className="grid grid-cols-2 gap-4">
          <span className="text-gray-600">Tipo operazione</span>
          <span className="font-medium">{data.tipoOperazione}</span>

          <span className="text-gray-600">Indirizzo</span>
          <span className="font-medium">{data.indirizzo}</span>

          <span className="text-gray-600">Superficie / Stanze / Bagni</span>
          <span className="font-medium">
            {data.superficie} m² / {data.stanze} stanze / {data.bagni} bagni
          </span>

          {data.piano && (
            <>
              <span className="text-gray-600">Piano</span>
              <span className="font-medium">{data.piano}</span>
            </>
          )}

          <span className="text-gray-600">Tempistica</span>
          <span className="font-medium">{data.tempistica}</span>
        </div>

        {/* Optional */}
        <div className="mt-4">
          <span className="text-gray-600 font-semibold">Optional</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {data.optional.length > 0 ? (
              data.optional.map((opt) => (
                <span
                  key={opt}
                  className="bg-primary-light text-primary font-semibold px-2 py-1 rounded-full"
                >
                  {opt}
                </span>
              ))
            ) : (
              <span className="text-gray-400">Nessuno</span>
            )}
          </div>
        </div>
      </div>

      {/* Card Dati Personali */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-6 hover:shadow-2xl transition">
        <h3 className="text-xl font-semibold text-primary mb-4">Dati personali</h3>

        <div className="grid grid-cols-2 gap-4">
          <span className="text-gray-600">Nome / Cognome</span>
          <span className="font-medium">{data.nome} {data.cognome}</span>

          <span className="text-gray-600">Email</span>
          <span className="font-medium">{data.email}</span>

          <span className="text-gray-600">Telefono</span>
          <span className="font-medium">{data.telefono}</span>
        </div>
      </div>

      {/* Pulsanti */}
      <div className="flex justify-between mt-4 gap-4">
        <button
          onClick={back}
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
        >
          Indietro
        </button>

        <button
          onClick={isValid ? submit : undefined}
          disabled={!isValid}
          className={`next-btn py-2 px-4 rounded-lg text-white bg-primary hover:bg-primary-dark transition ${
            !isValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-primary-dark"
          }`}
        >
          Invia richiesta
        </button>
      </div>

      {/* Toast */}
      <SuccessToast
        show={showSuccess}
        message="I dati sono stati inviati con successo!"
      />
    </div>
  );
}

export default ComponentSummary;
