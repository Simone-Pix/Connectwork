// src/pages/ChiSiamo.jsx
import React from "react";
import AgentsSection from "../components/AgentsSection"; // 👈 Importa la nuova componente

export default function ChiSiamo() {
  const stats = [
    { value: "15K+", label: "Immobili Venduti" },
    { value: "50K+", label: "Clienti Felici" },
    { value: "150+", label: "Agenti Esperti" },
    { value: "25+", label: "Città Coperte" },
  ];

  const values = [
    {
      icon: "🎯",
      title: "Missione",
      description:
        "Rendere accessibile il sogno della casa perfetta attraverso tecnologia e competenza umana",
    },
    {
      icon: "💎",
      title: "Qualità",
      description:
        "Solo immobili selezionati e verificati per garantire eccellenza in ogni transazione",
    },
    {
      icon: "🤝",
      title: "Integrità",
      description:
        "Trasparenza totale e onestà in ogni fase del percorso immobiliare",
    },
    {
      icon: "⚡",
      title: "Efficienza",
      description:
        "Processi ottimizzati e tecnologia avanzata per risultati rapidi e sicuri",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-50">
        <div className="absolute inset-0 opacity-20"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-7xl md:text-8xl font-extrabold text-white mb-6 tracking-tight">
            Il Futuro degli
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">
              Immobili è Qui
            </span>
          </h1>
          <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Reinventiamo l'esperienza immobiliare con tecnologia, passione e un
            servizio senza compromessi
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-blue-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div> */}



       {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-7xl md:text-8xl font-extrabold text-white mb-6 tracking-tight">
            Il Futuro degli
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
              Immobili è Qui
            </span>
          </h1>
          <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Reinventiamo l'esperienza immobiliare con tecnologia, passione e un
            servizio senza compromessi
          </p>
         
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-24 bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                La Nostra Storia
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-800 to-blue-500 mb-8"></div>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Fondata nel 2010, Immobilaris nasce dalla visione di
                rivoluzionare il mercato immobiliare italiano, combinando
                l'esperienza di professionisti del settore con la potenza della
                tecnologia digitale.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Oggi siamo cresciuti fino a diventare uno dei punti di
                riferimento nazionali, con un team di oltre 150 agenti
                certificati che ogni giorno aiutano migliaia di persone a
                trovare la loro casa ideale.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                La nostra forza sta nell'equilibrio perfetto tra competenza
                umana e innovazione tecnologica, garantendo un servizio
                personalizzato senza compromessi sulla qualità.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-6">
                  {values.map((value, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="text-4xl">{value.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {value.title}
                        </h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Philosophy */}
      <div className="py-24 bg-gradient-to-b from-gray-100 to-white text-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 ">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-8">Il Nostro Impegno</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-800 to-blue-500 mx-auto"></div>

            <p className="text-xl text-black/80 mb-10 leading-relaxed pt-3">
              Ogni giorno lavoriamo per trasformare il modo in cui le persone
              cercano, trovano e vivono la propria casa ideale. Non siamo solo
              una piattaforma: siamo il tuo partner nel viaggio verso il futuro
              che desideri.
            </p>

            <p className="text-l text-gray-600 mb-10">
              Unisciti a migliaia di persone che hanno già trovato il loro posto
              perfetto
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                Inizia la Ricerca
              </button>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                Pubblica Annuncio Gratis
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* IMPORT DEGLI AGENTI */}
      <AgentsSection />

      {/* Why Choose Our Agents */}
      <div className="py-24 bg-gradient-to-b from-gray-100 to-white pt-9">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Perché Scegliere i Nostri Agenti
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-800 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-pink-50 hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🎓
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Certificati e Formati
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Tutti i nostri agenti sono certificati e partecipano a programmi
                di formazione continua per rimanere sempre aggiornati sulle
                ultime tendenze del mercato.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-pink-50 hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                💪
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Esperienza Comprovata
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Con una media di 10+ anni di esperienza nel settore, i nostri
                agenti hanno gestito migliaia di transazioni con successo
                garantito.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-pink-50 hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 ">
                🤝
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Assistenza Personalizzata
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ogni cliente viene seguito personalmente dal suo agente
                dedicato, garantendo un servizio su misura per ogni esigenza
                specifica.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-b from-gray-100 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Inizia il Tuo Viaggio Immobiliare Oggi
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-800 to-blue-500 mx-auto"></div>
          <p className="text-xl text-gray-700 mb-10 pt-3">
            Parla con uno dei nostri esperti e scopri come possiamo aiutarti a
            realizzare i tuoi obiettivi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
              Contatta un Agente
            </button>
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
              Esplora gli Immobili
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300"></div>
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-semibold text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
