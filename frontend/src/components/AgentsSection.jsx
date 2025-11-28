import React, { useState } from 'react';

export default function AgentsSection() {
  const [activeAgent, setActiveAgent] = useState(0);

  const agents = [
    {
      name: "Marco Marco",
      role: "Senior Real Estate Advisor",
      experience: "12 anni di esperienza",
      specialization: "Immobili di lusso e proprietà commerciali",
      achievements: "500+ transazioni completate",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Giulia Marco",
      role: "Property Consultant",
      experience: "8 anni di esperienza",
      specialization: "Residenze familiari e investimenti",
      achievements: "350+ famiglie soddisfatte",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "Luca Marco",
      role: "Investment Specialist",
      experience: "10 anni di esperienza",
      specialization: "Investimenti immobiliari e portfolio management",
      achievements: "€50M+ gestiti in portafoglio",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    {
      name: "  Marco",
      role: "Luxury Home Expert",
      experience: "15 anni di esperienza",
      specialization: "Ville di prestigio e proprietà esclusive",
      achievements: "Top 1% agenti nazionali",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">I Nostri Agenti Immobiliari</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-800 to-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professionisti certificati con anni di esperienza, pronti a guidarti in ogni fase del tuo percorso immobiliare
          </p>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {agents.map((agent, index) => (
            <div
              key={index}
              onClick={() => setActiveAgent(index)}
              className={`cursor-pointer group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ${
                activeAgent === index ? 'ring-4 ring-orange-500 scale-105' : ''
              }`}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
             
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{agent.name}</h3>
                <p className="text-orange-600 font-semibold mb-2">{agent.role}</p>
                <p className="text-sm text-gray-600">{agent.experience}</p>
              </div>
              {activeAgent === index && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Selezionato
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Agent Detail */}
        <div className="bg-gradient-to-br from-slate-800 to-blue-900 rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${agents[activeAgent].color} opacity-20 rounded-3xl blur-2xl`}></div>
              <img
                src={agents[activeAgent].image}
                alt={agents[activeAgent].name}
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
            <div>
              <div className="inline-block px-4 py-2 bg-orange-500/20 backdrop-blur-sm rounded-full border border-orange-500/30 mb-4">
                <span className="text-orange-300 font-semibold">Agente in Evidenza</span>
              </div>
              <h3 className="text-4xl font-bold mb-2">{agents[activeAgent].name}</h3>
              <p className="text-2xl text-blue-300 mb-6">{agents[activeAgent].role}</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🎓</div>
                  <div>
                    <div className="font-semibold text-lg">Esperienza</div>
                    <div className="text-blue-200">{agents[activeAgent].experience}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💼</div>
                  <div>
                    <div className="font-semibold text-lg">Specializzazione</div>
                    <div className="text-blue-200">{agents[activeAgent].specialization}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <div className="font-semibold text-lg">Risultati</div>
                    <div className="text-blue-200">{agents[activeAgent].achievements}</div>
                  </div>
                </div>
              </div>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                Richiedi Consulenza Gratuita
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}