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
    <div 
      className="hero relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #004E98 0%, #3A6EA5 50%, #5B8DB8 100%)' }}
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl bg-[#FF6700]"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl bg-[#EBEBEB]"></div>
      </div>

       {/* Tasto Chiudi (X) */}
       <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 text-white/80 hover:text-white transition z-50"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      {/* MODIFICA QUI: 
         Aggiunto '!h-auto' per sovrascrivere l'altezza fissa del CSS e adattarsi al contenuto.
         Aggiunto 'min-h-0' per sicurezza.
      */}
      <div className="configurator !h-auto !min-h-0">
        
        {/* HEADER */}
        <div className="step-header-container justify-center border-b-0 pb-0">
          <h2 className="section-title m-0">Registrati</h2>
        </div>

        {/* BODY */}
        <div className="step-body-scroll !flex-none">
          <div className="w-full max-w-md mx-auto">

            <div className="form-grid">
              <div className="input-group">
                <label className="input-label">Nome</label>
                <input
                  type="text"
                  placeholder="Mario"
                  className="input-standard"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Cognome</label>
                <input
                  type="text"
                  placeholder="Rossi"
                  className="input-standard"
                  value={cognome}
                  onChange={(e) => setCognome(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="input-standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Telefono</label>
              <input
                type="tel"
                placeholder="333 1234567"
                className="input-standard"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                placeholder="Scegli una password sicura"
                className="input-standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="button-group-footer mt-2">
          <Link to="/login">
            <button className="back-btn">Ho già un account</button>
          </Link>
          <button className="next-btn" onClick={handleSubmit}>
            Registrati
          </button>
        </div>

      </div>
    </div>
  );
}

export default Signin;