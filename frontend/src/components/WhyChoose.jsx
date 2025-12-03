import { useNavigate } from "react-router-dom";

export default function WhyChooseAndCTA() {
  const navigate = useNavigate();
  const handleVendi = () => {
    navigate("/valuta");
  };

  const features = [
    {
      id: 1,

      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-orange-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
      title: "Migliaia di annunci",
      description: "Accesso a un vasto database di immobili in tutta Italia"
    },
    {
      id: 2,

      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-orange-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      title: "Sicurezza garantita",
      description: "Ogni annuncio è verificato e protetto"
    },
    {
      id: 3,

      icon: (
        <svg
                className="w-10 h-10 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
      ),
      title: "Attenzione personale",
      description: "La nostra missione è essere dedicati a voi"
    },
    {
      id: 4,

      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-orange-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: "Ricerca rapida",
      description: "Trova la casa dei tuoi sogni in pochi click"
    }
  ];

  return (
    <>
      {/* ========== Why Choose Section ========== */}
      <section style={{ backgroundColor: "#5E8DB9" }} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-3">
              Perché scegliere Immobiliaris
            </h2>
            <p className="text-white text-lg">
              La piattaforma più completa per la ricerca di immobili
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="p-4 text-center group">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
                  {feature.icon}
                </div>
                
                <h3 className="text-white font-bold text-lg mb-3">
                  {feature.title}
                </h3>
                <p className="text-white text-sm leading-relaxed px-2">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA Section ========== */}
      <section style={{ backgroundColor: "#5E8DB9" }} className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center border-t border-white/20 pt-16">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Hai un immobile da vendere o affittare?
          </h2>
          <p className="text-white text-lg mb-8">
            Pubblica il tuo annuncio e raggiungi migliaia di potenziali acquirenti
          </p>
          <button 
          onClick={handleVendi}
          className="px-10 py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition duration-300 text-lg shadow-lg hover:shadow-xl">
            Pubblica annuncio gratuito
          </button>
        </div>
      </section>
    </>
  );
}