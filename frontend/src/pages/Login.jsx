import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
    <div 
      className="hero relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #004E98 0%, #3A6EA5 50%, #5B8DB8 100%)' }}
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl bg-[#FF6700]"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl bg-[#EBEBEB]"></div>
      </div>


      <div className="configurator !h-auto !min-h-0">

        <div className="step-header-container justify-center border-b-0 pb-0">
          <h2 className="section-title m-0">Accedi</h2>
        </div>
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
        
        <div className="button-group-footer mt-2">
          <Link to="/signin">
            <button className="back-btn">Crea account</button>
          </Link>
          <button className="next-btn" onClick={handleLogin}>
            Accedi
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;