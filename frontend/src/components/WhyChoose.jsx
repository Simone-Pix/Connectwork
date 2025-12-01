// WhyChooseAndCTA.jsx
import { useNavigate } from "react-router-dom";
export default function WhyChooseAndCTA() {
  const navigate = useNavigate();
  const handleVendi = () => {
    navigate("/valuta");
  };

  const features = [
    {
      id: 1,
      icon: "🏠",
      title: "Migliaia di annunci",
      description: "Accesso a un vasto database di immobili in tutta Italia"
    },
    {
      id: 2,
      icon: "🔒",
      title: "Sicurezza garantita",
      description: "Ogni annuncio è verificato e protetto"
    },
    {
      id: 3,
      icon: "❤️",
      title: "Salva i preferiti",
      description: "Crea la tua lista di immobili da tenere d'occhio"
    },
    {
      id: 4,
      icon: "⚡",
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
              <div key={feature.id} className="p-8 text-center">
                <div className="text-5xl mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">
                  {feature.title}
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA Section ========== */}
      <section style={{ backgroundColor: "#5E8DB9" }} className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
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