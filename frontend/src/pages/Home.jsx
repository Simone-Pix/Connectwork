import backgroundImg from "../assets/img_background.png";
import StepHome from "../components/ComponentStepHome";
import FeaturedProperties from "../components/FeaturedProperties";
import SearchByZone from "../components/SearchByZone";
import SearchByCity from "../components/SearchByCity";
import WhyChoose from "../components/WhyChoose";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <img
          src={backgroundImg}
          alt="Background edificio"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        <div className="absolute inset-0  -z-[1]"></div>

        <div className="max-w-3xl px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
            Trova la casa dei{" "}
            <span className="text-orange-500">tuoi sogni</span>
            <br />
            <span className="text-lg md:text-xl font-normal text-blue-100 mt-2 inline-block">
              Migliaia di annunci verificati di case in vendita e affitto in tutta Italia
            </span>
          </h1>
          <div className="mt-8">
            <StepHome />
          </div>
        </div>
      </section>

      {/*Sezione proprietà in evidenza*/}
      <FeaturedProperties />

      {/* Sezione ricerca da zona */}
      <SearchByZone />

      {/* Sezione ricerca da città */}
      <SearchByCity />

       {/* Sezione Perchè sceglierci con bottone cta  */}
      <WhyChoose />
    </>
  );
}

export default Home;