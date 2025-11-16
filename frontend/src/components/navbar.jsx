import { Link } from "react-router-dom";
import logo from "../assets/react.svg";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-16 bg-blue-900 flex items-center justify-between px-10 z-50">
      {/* Left side: logo + text */}
      <div className="flex items-center gap-2.5">
        <img src={logo} alt="Logo Immobilaris" className="w-7 h-7" />
        <p className="text-white text-lg">Immobilaris</p>
      </div>

      {/* Middle: navigation links */}
      <nav className="flex gap-8">
        <Link to="/" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
          Home
        </Link>
        <Link to="/cerca" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
          Acquista
        </Link>
        <Link to="/" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
          Affitta
        </Link>
        <Link to="/valuta" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
          Vendi
        </Link>
        <Link to="/" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
          Chi siamo
        </Link>
      </nav>

      {/* Right side: button */}
      <div>
        <button className="bg-orange-500 text-white px-5 py-2 rounded-md font-semibold hover:bg-orange-600 transition-colors duration-200">
          Pubblica annuncio
        </button>
      </div>
    </nav>
  );
}

export default Navbar;