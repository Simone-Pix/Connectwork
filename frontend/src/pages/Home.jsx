import backgroundImg from "../assets/img_background.png"
import StepHome from "../components/ComponentStepHome";

function Home() {
  return (
    <section className="hero">
      <img src={backgroundImg} alt="Background edificio" className="hero-bg" />
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>
          Trova la casa dei <span>tuoi sogni</span><br />
          <span class="subtitle">Migliaia di annunci verificati di case in vendita e affitto in tutta Italia</span>
        </h1>
        <StepHome />
      </div>
    </section>
  );
}

export default Home;