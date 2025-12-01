import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

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
          <div className="wrapper-1-step">
            <h2 className="section-title">Accedi</h2>

            {/* RIMOSSO "max-w-md mx-auto" per permettere larghezza piena */}
            <div className="flex flex-col gap-5 mt-6 w-full">
              
              {/* Email */}
              <div className="input-group">
                <label className="input-label">Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="input-step2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="input-group">
                <label className="input-label">Password</label>
                <input
                  type="password"
                  placeholder="Inserisci la password"
                  className="input-step2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
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
    </div>
  );
}

export default Login;