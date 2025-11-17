import { Link } from "react-router-dom";

function Login() {

  const handleLogin = async () => {
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert("Credenziali errate");
        return;
      }

      const user = await res.json();
      console.log("Login OK:", user);

      window.location.href = "/home";
    } catch (err) {
      console.error("Errore login", err);
      alert("Errore durante il login");
    }
  };

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

            <button className="next-btn" onClick={handleLogin}>
              Accedi
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
