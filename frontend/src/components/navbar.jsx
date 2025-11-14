import { Link } from "react-router-dom";
import logo from "../assets/react.svg";

function Navbar() {
  return (
  <navbar className="navbar">
    <div class="navbar-left">
      <img src={logo} alt="Logo Immobiliaris" class="logo" />
      <p>Immobiliaris</p>
    </div>
    <nav class="navbar-menu">
      <Link to="/" className="Link">Home</Link>
      <Link to="/cerca" className="Link">Acquista</Link>
      <Link to="/" className="Link">Affitta</Link>
      <Link to="/valuta" className="Link">Vendi</Link>
      <Link to="/" className="Link">Chi siamo</Link>
    </nav>
    <div class="navbar-right">
      <button class="publish-btn">Pubblica annuncio</button>
    </div>
  </navbar>
  );
}

export default Navbar;

