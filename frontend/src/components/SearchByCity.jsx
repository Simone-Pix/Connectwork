import { useNavigate } from "react-router-dom";

export default function SearchByCity() {
  const navigate = useNavigate();
  
  const cities = [
    "Torino",
    "Rivoli",
    "Bra",
    "Cuneo",
    "Asti",
    "Alessandria",
    "Biella",
    "Alba",
    "Moncalieri",
    "Pinerolo",
    "Ivrea",
    "Fossano",
  ];

  const handleCityClick = (city) => {
    navigate(`/cerca?citta=${encodeURIComponent(city)}`);
  };

  return (
    <>
     

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
                onClick={() => handleCityClick(city)}
                style={{ backgroundColor: "#215E98" }}
                className="text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 group hover:opacity-90"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}