import backgroundImg from "../assets/img_background.png";
import StepHome from "../components/ComponentStepHome";
import FeaturedProperties from "../components/FeaturedProperties";
import SearchByCity from "../components/SearchByCity";
import WhyChoose from "../components/WhyChoose";
import NewsLetter from "../components/NewsLetter";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col">
        <div className="flex-1 flex items-center">
     
          <div className="w-full grid grid-cols-1 lg:grid-cols-[55%_45%] gap-0 items-center">
            
            
            <div className="relative h-[50vh] lg:h-screen order-2 lg:order-1">
              <img 
                src={backgroundImg} 
                alt="Casa dei sogni" 
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradiente spostato più a destra */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent from-50% via-blue-900/30 via-80% to-blue-900"></div>
              
              {/* Layer mobile */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-blue-900/40 lg:hidden"></div>
            </div>

            
            <div className="relative bg-blue-900 px-6 py-12 lg:py-0 lg:px-12 h-[50vh] lg:h-screen flex items-center order-1 lg:order-2">
              <StepHome />
            </div>
          </div>
        </div>

      </section>

      <FeaturedProperties />
      <SearchByCity />
      <WhyChoose />
      <NewsLetter />
    </>
  );
}

export default Home;