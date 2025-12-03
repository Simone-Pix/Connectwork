import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorToast from "../components/ErrorToast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorShow, setErrorShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        const msg = result.message || "Credenziali sbagliate";
        setErrorMessage(msg);
        setErrorShow(true);
        setTimeout(() => setErrorShow(false), 4000);
        return;
      }

      console.log("Login OK:", result);
      window.location.href = "/";
    } catch (err) {
      console.error("Errore login", err);
      setErrorMessage("Errore durante il login");
      setErrorShow(true);
      setTimeout(() => setErrorShow(false), 4000);
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

      {/* MODIFICHE QUI: 
          1. !h-auto: altezza automatica come Signin.
          2. !min-h-0: rimuove vincoli minimi.
      */}
      <div className="configurator !h-auto !min-h-0">
        
        {/* HEADER: border-b-0 rimuove la linea grigia sotto il titolo */}
        <div className="step-header-container justify-center border-b-0 pb-0">
          <h2 className="section-title m-0">Accedi</h2>
        </div>

        {/* BODY: !flex-none impedisce che si espanda a vuoto. 
           Ho aumentato il padding verticale (py-8) e il gap (gap-5) 
           per dare volume al box e renderlo simile al Signin. 
        */}
        <div className="step-body-scroll !flex-none py-8">
          <div className="w-full max-w-sm mx-auto flex flex-col gap-5">

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
              <label className="input-label">Password</label>
              <input
                type="password"
                placeholder="Inserisci la password"
                className="input-standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* FOOTER: Rimosso bordo superiore (opzionale, se vuoi togliere anche quella linea) */}
        <div className="button-group-footer mt-2">
          <Link to="/signin">
            <button className="back-btn">Crea account</button>
          </Link>
          <button className="next-btn" onClick={handleLogin}>
            Accedi
          </button>
        </div>

        <ErrorToast show={errorShow} message={errorMessage} onClose={() => setErrorShow(false)} />

      </div>
    </div>
  );
}

export default Login;