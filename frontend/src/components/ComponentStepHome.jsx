import { useNavigate } from "react-router-dom";

function ComponentStepHome() {
  const navigate = useNavigate();

  const handleSelect = (operation) => {
    if (operation === "acquista") {
      navigate("/cerca"); 
    } else if (operation === "vendi") {
      navigate("/valuta"); 
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-white text-xl font-semibold mb-2">
        Cosa stai cercando?
      </h3>
      <p className="text-blue-100 text-sm mb-6">
        Seleziona il tipo di operazione
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div
          className="bg-black/5 border-2 border-orange-400/40 rounded-xl p-5 text-white cursor-pointer transition-all duration-200 hover:bg-orange-300/30 hover:shadow-lg hover:border-orange-400/60"
          onClick={() => handleSelect("acquista")}
        >
          <div className="text-3xl mb-3">🏠</div>
          <h4 className="text-lg font-medium mb-1">Acquista</h4>
          <p className="text-blue-100 text-sm">Trova la casa dei tuoi sogni</p>
        </div>

        <div
          className="bg-black/5 border-2 border-orange-400/40 rounded-xl p-5 text-white cursor-pointer transition-all duration-200 hover:bg-orange-300/30 hover:shadow-lg hover:border-orange-400/60"
          onClick={() => handleSelect("vendi")}
        >
          <div className="text-3xl mb-3">🔑</div>

          <h4 className="text-lg font-medium mb-1">Vendi</h4>
          <p className="text-blue-100 text-sm">Vendi il tuo immobile</p>
        </div>
      </div>
    </div>
  );
}

export default ComponentStepHome;
