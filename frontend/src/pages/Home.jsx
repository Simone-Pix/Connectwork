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

  return (
    <>
      {/* Hero Section */}
      {/* FIX 1: pt-16 (4rem) corrisponde esattamente ad h-16 della navbar. 
          Nessuno spazio vuoto, nessuna sovrapposizione. */}
      <section className="relative min-h-screen flex flex-col pt-16">
        
        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[55%_45%] gap-0 items-center">
            
            {/* IMMAGINE */}
            {/* FIX 2: Calcoli aggiornati su 4rem (altezza navbar) */}
            {/* Mobile: h-[calc(50vh-2rem)] -> Metà schermo meno metà navbar per non scrollare */}
            {/* Desktop: h-[calc(100vh-4rem)] -> Intero schermo meno navbar */}
            <div className="relative h-[calc(50vh-2rem)] lg:h-[calc(100vh-4rem)] order-2 lg:order-1">
              <img 
                src={backgroundImg} 
                alt="Casa dei sogni" 
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradiente */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent from-50% via-blue-900/30 via-80% to-blue-900"></div>
              
              {/* Layer mobile */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-blue-900/40 lg:hidden"></div>
            </div>

            {/* CONTENUTO (StepHome) */}
            {/* FIX 3: Stessi calcoli dell'immagine per allineamento perfetto */}
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