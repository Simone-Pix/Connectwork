import { Link } from "react-router-dom";

function Login() {

  const handleLogin = async () => {
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    try {
      // Usa il nuovo endpoint auth e FormData come si aspetta il backend
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const res = await fetch("/api/auth/session-login", {
        method: "POST",
        credentials: "include", 
        body: formData,
      });

      const result = await res.json();
      
      if (!result.success) {
        alert(result.message || "Credenziali errate");
        return;
      }

      console.log("Login OK:", result);
      alert("Login effettuato con successo!");
      window.location.href = "/";
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
