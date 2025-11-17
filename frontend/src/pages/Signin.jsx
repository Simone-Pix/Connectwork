import { Link } from "react-router-dom";

function Signin() {
  return (
    <div className="hero">
      <div className="heroContent">
        <div className="configurator">

          <h2 className="section-title">Crea un account</h2>
          <p className="section-subtitle">
            Compila i campi per registrarti alla piattaforma
          </p>

          <div className="form-grid-step6 mt-6">
            <input
              type="text"
              placeholder="Nome"
              className="input-step2"
            />
            <input
              type="text"
              placeholder="Cognome"
              className="input-step2"
            />
            <input
              type="email"
              placeholder="Email"
              className="input-step2"
            />
            <input
              type="tel"
              placeholder="Telefono"
              className="input-step2"
            />
            <input
              type="password"
              placeholder="Password"
              className="input-step2 col-span-1 sm:col-span-2"
            />
          </div>

          <div className="button-group">
            <Link to="/login">
              <button className="back-btn">Accedi</button>
            </Link>

            <button className="next-btn">Registrati</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signin;
