import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {

  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Usa FormData come si aspetta il nuovo AuthController
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('cognome', cognome);
      formData.append('email', email);
      formData.append('telefono', telefono);
      formData.append('password', password);

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await res.json();
      
      if (result.success) {
        alert(result.message);
        navigate("/login"); // registrazione ok → vai a login
      } else {
        alert(result.message || "Errore durante la registrazione");
      }

    } catch (err) {
      alert("Errore di rete");
      console.error(err);
    }
  };

  return (
    <div className="hero">
      <div className="heroContent">
        <div className="configurator">

          <h2 className="section-title">Crea un account</h2>
          <p className="section-subtitle">
            Compila i campi per registrarti alla piattaforma
          </p>

          <div className="form-grid-step6 mt-6">
            <input type="text" placeholder="Nome" className="input-step2" value={nome} onChange={(e) => setNome(e.target.value)} />
            <input type="text" placeholder="Cognome" className="input-step2" value={cognome} onChange={(e) => setCognome(e.target.value)} />
            <input type="email" placeholder="Email" className="input-step2" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="tel" placeholder="Telefono" className="input-step2" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            <input type="password" placeholder="Password" className="input-step2 col-span-1 sm:col-span-2" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="button-group">
            <Link to="/login">
              <button className="back-btn">Accedi</button>
            </Link>

            <button className="next-btn" onClick={handleSubmit}>
              Registrati
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signin;
