import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/react.svg";

function Navbar() {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  // Controlla se l'utente è loggato quando il componente monta
  useEffect(() => {
    fetch("/api/users/current")
      .then(res => res.json())
      .then(data => {
        if (data.id) setUser(data);
      })
      .catch(err => console.log("No user logged in"));
  }, []);

  const handleLogout = () => {
    fetch("/api/users/logout")
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo Immobilaris" className="navbar-logo" />
        <p className="navbar-title">Immobilaris</p>
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/cerca" className="nav-link">Acquista</Link>
        <Link to="/" className="nav-link">Affitta</Link>
        <Link to="/valuta" className="nav-link">Vendi</Link>
        <Link to="/" className="nav-link">Chi siamo</Link>
      </div>

      <div className="navbar-button-container flex gap-2">
        {user ? (
          <>
            <button onClick={handleLogout} className="navbar-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="navbar-button">Login</button>
            </Link>
            <Link to="/signin">
              <button className="navbar-button navbar-signin">
                Registrati
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
