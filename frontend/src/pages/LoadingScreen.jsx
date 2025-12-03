const LoadingScreen = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #004E98 0%, #3A6EA5 50%, #5B8DB8 100%)'
      }}
    >
      {/* --- Elementi decorativi sfondo (identici al configuratore) --- */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl" 
          style={{ backgroundColor: '#FF6700' }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl" 
          style={{ backgroundColor: '#EBEBEB' }}
        ></div>
      </div>

      {/* --- Card di Caricamento --- */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center justify-center z-10 animate-fade-in-up"
        style={{ 
            width: '100%', 
            maxWidth: '400px',
            minHeight: '300px',
            boxShadow: '0 6px 28px rgba(2, 6, 23, 0.6)'
        }}
      >
        {/* Container Animazione */}
        <div className="relative flex items-center justify-center mb-8">
          
          {/* 1. Anello esterno che gira (Arancione) */}
          <div className="w-24 h-24 border-4 border-gray-100 border-t-[#FF6700] rounded-full animate-spin"></div>
          
          {/* 2. Icona centrale che pulsa (Casa/Brand) */}
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <span className="text-4xl"><svg 
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" // Portato a 1.5 per matchare l'appartamento
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  style={{ width: '1.5em', height: '1.5em' }} // Dimensione adattata
                >
                  {/* Tracciato originale invariato */}
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg></span>
          </div>
        </div>

        {/* Testo */}
        <h3 
            className="text-xl font-bold mb-2 text-center"
            style={{ color: '#004E98' }}
        >
            Un attimo di pazienza...
        </h3>
      </div>
    </div>
  );
};

export default LoadingScreen;