import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="error-page">
      <div className="error-content">

        <p className="error-code">404</p>
        <h1 className="error-title">Ops! Pagina Non Trovata</h1>
        <p className="error-message">
          Sembra che la pagina che stai cercando non esista o sia stata rimossa.
          Controlla l'URL o torna alla homepage.
        </p>
        <Link to="/" className="navbar-button">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;