import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";
import logo from "../assets/LogoImmobiliaris.png";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const res = await logout();
    if (res.success) navigate("/");
  };


  const scrollToMission = () => {
    if (window.location.pathname === "/") {
      const element = document.getElementById("la-nostra-missione");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { replace: true });
      setTimeout(() => {
        const element = document.getElementById("la-nostra-missione");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <Link to="/" className="flex items-center gap-2" onClick={scrollToTop}>
          <img
            src={logo}
            alt="Logo Immobiliaris"
            className="navbar-logo cursor-pointer"
          />
          <p className="navbar-title cursor-pointer">Immobiliaris</p>
        </Link>
      </div>

      {/* DESKTOP LINKS */}
      <div className="navbar-links hidden md:flex">
        <Link to="/" className="nav-link" onClick={scrollToTop}>
          Home
        </Link>
        <Link to="/cerca" className="nav-link">
          Acquista
        </Link>
        <Link to="/valuta" className="nav-link">
          Vendi
        </Link>
        <button onClick={scrollToMission} className="nav-link">
          Chi siamo
        </button>

        {isAuthenticated && user?.role === "admin" && (
          <Link to="/backoffice" className="nav-link">
            Backoffice
          </Link>
        )}
        {isAuthenticated && user?.role !== "admin" && (
          <Link to="/personal-area" className="nav-link">
            Area personale
          </Link>
        )}
      </div>

      {/* DESKTOP BUTTONS */}
      <div className="navbar-button-container hidden md:flex gap-2">
        {isAuthenticated ? (
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

      {/* HAMBURGER ICON (mobile) */}
      <button
        className="hamburger md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
      </button>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="mobile-menu md:hidden">
          <Link to="/" className="mobile-link" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link
            to="/cerca"
            className="mobile-link"
            onClick={() => setIsOpen(false)}
          >
            Acquista
          </Link>
          <Link to="/" className="mobile-link" onClick={() => setIsOpen(false)}>
            Affitta
          </Link>
          <Link
            to="/valuta"
            className="mobile-link"
            onClick={() => setIsOpen(false)}
          >
            Vendi
          </Link>

          {/* VOCE "IL NOSTRO IMPEGNO" - STILE UNIFORMATO */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              scrollToMission();
              setIsOpen(false);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                scrollToMission();
                setIsOpen(false);
              }
            }}
            className="mobile-link w-full text-left px-6 py-3"
          >
            Il Nostro Impegno
          </div>
          {/* FINE VOCE */}

          {isAuthenticated && user?.role === "admin" && (
            <Link
              to="/backoffice"
              className="mobile-link"
              onClick={() => setIsOpen(false)}
            >
              Backoffice
            </Link>
          )}
          {isAuthenticated && user?.role !== "admin" && (
            <Link
              to="/personal-area"
              className="mobile-link"
              onClick={() => setIsOpen(false)}
            >
              Area personale
            </Link>
          )}
          <div className="mt-4">
            {isAuthenticated ? (
              <div className="mobile-link">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="mobile-login-btn">Login</button>
                </Link>
                <Link to="/signin" onClick={() => setIsOpen(false)}>
                  <button className="mobile-register-btn">Registrati</button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
