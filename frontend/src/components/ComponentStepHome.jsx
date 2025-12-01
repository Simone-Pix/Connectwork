import { useNavigate } from "react-router-dom";

function ComponentStepHome() {
  const navigate = useNavigate();

  const handleAcquista = () => {
    navigate("/cerca");
  };

  const handleVendi = () => {
    navigate("/valuta");
  };

  return (
    <div className="max-w-xl w-full">
      {/* Titolo */}
      <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
        Trova la casa dei{" "}
        <span className="text-orange-500">tuoi sogni</span>
      </h1>
      <p className="text-blue-100 text-lg md:text-xl lg:text-2xl mb-12">
        Migliaia di annunci verificati di case in vendita e affitto in tutta Italia
      </p>

      {/* Due bottoni affiancati */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleAcquista}
          className="group flex-1 bg-orange-500 hover:bg-orange-600 rounded-xl px-8 py-5 transition-all duration-300 hover:scale-105 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Icona Home SVG */}
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-white text-lg font-bold">Acquista</span>
            </div>
            {/* Freccia SVG */}
            <svg className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        <button
          onClick={handleVendi}
          className="group flex-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white/30 rounded-xl px-8 py-5 transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Icona TrendingUp SVG */}
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-white text-lg font-bold">Vendi</span>
            </div>
            {/* Freccia SVG */}
            <svg className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}

export default ComponentStepHome;