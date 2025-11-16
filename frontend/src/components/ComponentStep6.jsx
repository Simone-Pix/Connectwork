
function ComponentStep6({ data, updateField, back, submit }) {
  return (
    <div className="w-full">
      <div className="mb-4">
        <div className="text-gray-900 text-sm mb-1">Passo 6 di 6</div>
        <div className="h-1 bg-orange-200 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 rounded-full" style={{ width: "100%" }}></div>
        </div>
      </div>

      <h3 className="text-gray-900 text-xl font-semibold mb-4">I tuoi dati</h3>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-gray-700 text-sm font-medium">Nome</label>
            <input
              type="text"
              placeholder="Mario"
              className="w-full px-4 py-2.5 rounded-lg border border-orange-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              value={data.nome}
              onChange={(e) => updateField("nome", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-700 text-sm font-medium">Cognome</label>
            <input
              type="text"
              placeholder="Rossi"
              className="w-full px-4 py-2.5 rounded-lg border border-orange-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              value={data.cognome}
              onChange={(e) => updateField("cognome", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-700 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="mario.rossi@email.com"
              className="w-full px-4 py-2.5 rounded-lg border border-orange-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              value={data.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-700 text-sm font-medium">Telefono</label>
            <input
              type="tel"
              placeholder="+39 123 456 7890"
              className="w-full px-4 py-2.5 rounded-lg border border-orange-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              value={data.telefono}
              onChange={(e) => updateField("telefono", e.target.value)}
            />
          </div>
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
          onClick={submit}
          disabled={!data.nome || !data.email}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition shadow-md ${
            data.nome && data.email
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Invia
        </button>
      </div>
    </div>
  );
}

export default ComponentStep6;