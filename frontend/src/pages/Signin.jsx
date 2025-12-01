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
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("cognome", cognome);
      formData.append("email", email);
      formData.append("telefono", telefono);
      formData.append("password", password);

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        alert(result.message);
        navigate("/login");
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
          <div className="wrapper-1-step">
            <h2 className="section-title">Crea un account</h2>

            <div className="form-grid-step6 mt-6">
              {/* Nome */}
              <div className="input-group">
                <label className="input-label">Nome</label>
                <input
                  type="text"
                  placeholder="Inserisci il nome"
                  className="input-step2"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              {/* Cognome */}
              <div className="input-group">
                <label className="input-label">Cognome</label>
                <input
                  type="text"
                  placeholder="Inserisci il cognome"
                  className="input-step2"
                  value={cognome}
                  onChange={(e) => setCognome(e.target.value)}
                />
              </div>

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

              {/* Telefono */}
              <div className="input-group">
                <label className="input-label">Telefono</label>
                <input
                  type="tel"
                  placeholder="Numero di telefono"
                  className="input-step2"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>

              {/* Password - Occupa 2 colonne su schermi grandi */}
              <div className="input-group col-span-1 sm:col-span-2">
                <label className="input-label">Password</label>
                <input
                  type="password"
                  placeholder="Scegli una password"
                  className="input-step2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
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
    </div>
  );
}

export default Signin;