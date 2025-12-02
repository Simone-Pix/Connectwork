import React, { useState } from "react";

export default function AgentsSection() {
  const [activeAgent, setActiveAgent] = useState(0);

  const agents = [
    {
      name: "Davide Martinelli",
      role: "Senior Real Estate Advisor",
      experience: "12 anni di esperienza",
      specialization: "Immobili di lusso e proprietà commerciali",
      contacts: "davide.martinelli@immobiliaris.com",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format",
    },
    {
      name: "Giulia Dossetti",
      role: "Property Consultant",
      experience: "8 anni di esperienza",
      specialization: "Residenze familiari e investimenti",
      contacts: "giulia.dossetti@immobiliaris.com",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&auto=format",
    },
    {
      name: "Luigi Esposito",
      role: "Investment Specialist",
      experience: "10 anni di esperienza",
      specialization: "Investimenti immobiliari e portfolio management",
      contacts: "luigi.esposito@immobiliaris.com",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format",
    },
    {
      name: "Ramona Ciarnelli",
      role: "Luxury Home Expert",
      experience: "15 anni di esperienza",
      specialization: "Ville di prestigio e proprietà esclusive",
      contacts: "ramona.ciarnelli@immobiliaris.com",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&auto=format",
    },
  ];

  return (
    <div
      className="py-24 px-4 sm:px-6 md:px-6" // ← responsive padding laterale
      style={{ background: "linear-gradient(to bottom, #1f242f, #13497e)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
            I Nostri Agenti Immobiliari
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto px-2">
            Professionisti certificati con anni di esperienza, pronti a guidarti
            in ogni fase del tuo percorso immobiliare
          </p>
        </div>

        {/* Agent Cards Grid - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-6 mb-12 px-2">
          {agents.map((agent, index) => (
            <div
              key={index}
              onClick={() => setActiveAgent(index)}
              className={`cursor-pointer group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[240px] ${
                activeAgent === index ? "ring-2 ring-orange-500 scale-105" : ""
              }`}
              style={{ backgroundColor: "#3A6EA5" }}
            >
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg sm:text-xl text-white font-bold mb-0.5">
                  {agent.name.trim()}
                </h3>
                <p className="text-blue-200 font-medium text-sm mb-1">
                  {agent.role}
                </p>
                <p className="text-xs text-blue-100/80">{agent.experience}</p>
              </div>

              {activeAgent === index && (
                <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  Selezionato
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Agent Detail - responsive */}
        <div className="rounded-xl p-4 sm:p-6 text-white bg-indigo-500/10 shadow-lg max-w-5xl mx-auto px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <img
                src={agents[activeAgent].image}
                alt={agents[activeAgent].name}
                className="rounded-xl shadow-md w-2/3 sm:w-3/4 md:w-4/5"
              />
            </div>
            <div>
              <div className="inline-block px-2 py-0.5 bg-orange-500/20 backdrop-blur-sm rounded-full border border-orange-500/30 mb-2">
                <span className="text-orange-300 font-medium text-xs">
                  Agente in Evidenza
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1">
                {agents[activeAgent].name.trim()}
              </h3>
              <p className="text-base sm:text-lg text-blue-300 mb-4">
                {agents[activeAgent].role}
              </p>
              <div className="space-y-2 mb-5">
                <div className="flex items-start gap-1.5">
                  <div className="text-lg">🎓</div>
                  <div>
                    <div className="font-semibold text-sm">Esperienza</div>
                    <div className="text-blue-200 text-xs sm:text-sm">
                      {agents[activeAgent].experience}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <div className="text-lg">💼</div>
                  <div>
                    <div className="font-semibold text-sm">Specializzazione</div>
                    <div className="text-blue-200 text-xs sm:text-sm">
                      {agents[activeAgent].specialization}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <div className="text-lg">📧</div>
                  <div>
                    <div className="font-semibold text-sm">Contatti</div>
                    <div className="text-blue-200 text-xs sm:text-sm break-words">
                      {agents[activeAgent].contacts}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}