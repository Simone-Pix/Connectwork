export default function SearchByZone() {
  const zones = [
    { name: "Centro Storico", city: "Milano", count: 342 },
    { name: "Porto Romana", city: "Milano", count: 189 },
    { name: "Navigli", city: "Milano", count: 156 },
    { name: "Prati", city: "Roma", count: 298 },
    { name: "Trastevere", city: "Roma", count: 187 },
    { name: "Centro", city: "Firenze", count: 234 },
  ];

  return (
    <section style={{ backgroundColor: "#527597" }} className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-2">
            Cerca per zona
          </h2>
          <p className="text-white">Esplora la mappa interattiva e trova immobili nelle tue zone preferite</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden shadow-lg h-96 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11309.282217549693!2d7.680438!3d45.06421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sit!2sit!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                </svg>
                Ricerca nella mappa completa
              </button>
              <button style={{ backgroundColor: "#215E98" }} className="flex-1 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Disegna area di ricerca
              </button>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-white font-bold text-lg mb-4">Zone più cercate</h3>
            <div className="space-y-2">
              {zones.map((zone, idx) => (
                <button
                  key={idx}
                  style={{ backgroundColor: "#3A6EA5" }}
                  className="w-full text-left text-white py-3 px-4 rounded-lg transition flex justify-between items-center group hover:opacity-90"
                >
                  <div>
                    <p className="font-semibold">{zone.name}</p>
                    <p className="text-sm text-gray-100">{zone.city}</p>
                  </div>
                  <span style={{ backgroundColor: "#175B9D" }} className="text-sm font-bold px-3 py-1 rounded">
                    {zone.count}
                  </span>
                </button>
              ))}
            </div>
            <button style={{ backgroundColor: "#215E98" }} 
                  className="w-full text-left text-white py-3 px-4 rounded-lg transition flex justify-between items-center group hover:opacity-90 mt-6">
              Vedi tutte le zone →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}