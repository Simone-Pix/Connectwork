import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="hero">
      <div className="heroContent">
        <div className="configurator">

          <h2 className="section-title">Accedi</h2>
          <p className="section-subtitle">
            Inserisci le credenziali per accedere al tuo account
          </p>

          <div className="flex flex-col gap-4 mt-6">
            <input
              type="email"
              placeholder="Email"
              className="input-step2"
            />
            <input
              type="password"
              placeholder="Password"
              className="input-step2"
            />
          </div>

          <div className="button-group">
            <Link to="/signin">
              <button className="back-btn">Registrati</button>
            </Link>

            <button className="next-btn">Accedi</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
