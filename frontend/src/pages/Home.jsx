import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import backgroundImg from "../assets/img_background.png";
import StepHome from "../components/ComponentStepHome";
import FeaturedProperties from "../components/FeaturedProperties";
import SearchByCity from "../components/SearchByCity";
import WhyChoose from "../components/WhyChoose";
import AgentsSection from "../components/AgentsSection";
import MissionSection from "../components/MissionSection";
import NewsLetter from "../components/NewsLetter";

function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Nome Della Tua Agenzia",
    "image": "https://tuosito.com/url-del-tuo-logo.jpg",
    "description": "Agenzia immobiliare leader per trovare la casa dei tuoi sogni.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Roma 10",
      "addressLocality": "Milano",
      "addressRegion": "MI",
      "postalCode": "20100",
      "addressCountry": "IT"
    },
    "url": "https://tuosito.com"
  };

  return (
    <>
      {/* --- INIZIO SEO REACT 19 --- */}
      <title>Case da Sogno | La tua Agenzia Immobiliare di Fiducia</title>
      <meta name="description" content="Trova la casa dei tuoi sogni con la nostra agenzia immobiliare. Offriamo le migliori proprietà in vendita e affitto nelle città più esclusive." />
      <meta name="keywords" content="immobiliare, case vendita, appartamenti affitto, agenzia immobiliare, case lusso" />
      <link rel="canonical" href="https://tuosito.com/" />

      {/* Open Graph / Facebook & WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Case da Sogno | Trova la tua nuova casa oggi" />
      <meta property="og:description" content="Esplora centinaia di proprietà esclusive. Affidati ai nostri esperti per trovare la soluzione perfetta per te." />
      <meta property="og:image" content="https://tuosito.com/og-image-home.jpg" /> 
      <meta property="og:url" content="https://tuosito.com/" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Case da Sogno | Agenzia Immobiliare" />
      <meta name="twitter:description" content="Scopri le migliori offerte immobiliari nella tua zona." />
      
      {/* Dati Strutturati JSON-LD per Rich Snippets */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      {/* --- FINE SEO REACT 19 --- */}

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col pt-16">
        
        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[55%_45%] gap-0 items-center">
            
            {/* IMMAGINE */}
            <div className="relative h-[calc(50vh-2rem)] lg:h-[calc(100vh-4rem)] order-2 lg:order-1">
              <img 
                src={backgroundImg} 
                alt="Interno moderno di una casa da sogno con vista panoramica" 
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradiente */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent from-50% via-blue-900/30 via-80% to-blue-900"></div>
              
              {/* Layer mobile */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-blue-900/40 lg:hidden"></div>
            </div>

            {/* CONTENUTO (StepHome) */}
            <div className="relative bg-blue-900 px-6 py-12 lg:py-0 lg:px-12 h-[calc(50vh-2rem)] lg:h-[calc(100vh-4rem)] flex items-center order-1 lg:order-2">
              <StepHome />
            </div>

          </div>
        </div>

      </section>

      <FeaturedProperties />
      <SearchByCity />
      <MissionSection />
       <div id="agentsId">
          <AgentsSection />
       </div>
      <WhyChoose />
      <NewsLetter />
    </>
  );
}

export default Home;