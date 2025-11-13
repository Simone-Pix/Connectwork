import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="menu">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cerca">Cerca</Link></li>
        <li><Link to="/valuta">Valuta</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;