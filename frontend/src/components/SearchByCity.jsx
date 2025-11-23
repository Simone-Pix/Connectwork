export default function SearchByCity() {
  const cities = [
    "Milano",
    "Roma",
    "Napoli",
    "Torino",
    "Firenze",
    "Bologna",
    "Venezia",
    "Genova",
    "Palermo",
    "Bari",
    "Catania",
    "Verona",
  ];

  return (
    <>
   {/* Linea divisoria con Bordo Colorato */}
<div 
  style={{ backgroundColor: "#527597" }} // 1. Questo colore coprirà TUTTA la larghezza dello schermo (i "lati bianchi")
  className="w-full h-1" 
>
  {/* 2. Questo div è la linea centrale, limitata e centrata */}
  <div 
    style={{ backgroundColor: "#3a6ea5" }} 
    className="max-w-7xl mx-auto h-1"
  >
  </div>
</div>

      {/* Search by City Section */}
      <section style={{ backgroundColor: "#527597" }} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl md:text-4xl font-bold">Cerca per città</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {cities.map((city, idx) => (
              <button
                key={idx}
                style={{ backgroundColor: "#215E98" }}
                className="text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 group hover:opacity-90"
              >
                <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                </svg>
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}