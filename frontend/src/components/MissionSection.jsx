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
      </div>
    </div>
  );
}