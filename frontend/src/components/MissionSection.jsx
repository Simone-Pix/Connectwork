import React from "react";

export default function MissionSection() {
  return (
    <div
      id="la-nostra-missione"
      className="py-20 md:py-28 px-4 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Main heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
          Il Vostro Successo Immobiliare Inizia Qui
        </h2>

        {/* Main paragraph — allargato ai lati */}
        <div className="max-w-4xl mx-auto text-lg text-gray-300 leading-relaxed mb-12 px-4 sm:px-6">
          <p>
            Per noi, ogni cliente è una storia da ascoltare — non un numero da chiudere.  
            Siamo qui per guidarti con pazienza, onestà e dedizione, perché sappiamo che 
            acquistare o vendere una casa è una scelta di vita, non solo di mercato.
          </p>
        </div>


        <blockquote className="text-lg md:text-xl font-light italic text-orange-100 max-w-3xl mx-auto mb-10 px-4">
          “La vostra fiducia è il nostro bene più prezioso.”
        </blockquote>

        {/* Values icons — con allineamento perfetto */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-4xl mx-auto">
          {/* Icona 1 */}
          <div className="flex flex-col items-center group min-w-[120px] text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-full flex items-center justify-center mb-4 group-hover:from-orange-500/30 group-hover:to-orange-600/20 transition-all duration-300 group-hover:scale-110 shadow-lg ">
              <svg
                className="w-8 h-8 text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div className="text-sm font-semibold text-white">Trasparenza</div>
            <div className="text-xs text-gray-400 mt-1">Sempre onesti</div>
          </div>

          {/* Icona 2 */}
          <div className="flex flex-col items-center group min-w-[120px] text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-full flex items-center justify-center mb-4 group-hover:from-orange-500/30 group-hover:to-orange-600/20 transition-all duration-300 group-hover:scale-110 shadow-lg ">
              <svg
                className="w-8 h-8 text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div className="text-sm font-semibold text-white">Competenza</div>
            <div className="text-xs text-gray-400 mt-1">Esperti certificati</div>
          </div>

          {/* Icona 3 */}
          <div className="flex flex-col items-center group min-w-[120px] text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-full flex items-center justify-center mb-4 group-hover:from-orange-500/30 group-hover:to-orange-600/20 transition-all duration-300 group-hover:scale-110 shadow-lg ">
              <svg
                className="w-8 h-8 text-orange-400"
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
            </div>
            <div className="text-sm font-semibold text-white">
              Attenzione Personale
            </div>
            <div className="text-xs text-gray-400 mt-1">Dedicati a voi</div>
          </div>
        </div>
      </div>
    </div>
  );
}