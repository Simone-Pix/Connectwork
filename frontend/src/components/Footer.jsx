import logo from "../assets/LogoImmobiliaris.png";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-300 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Colonna 1: Logo + Descrizione */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 text-orange-500">
              <img src={logo} alt="Logo Immobiliaris" className="navbar-logo" />
            </div>
            <span className="text-white text-xl font-bold">Immobiliaris</span>
          </div>
          <p className="text-sm leading-relaxed">
            La tua piattaforma affidabile per comprare, vendere e affittare immobili in tutta Italia.
          </p>
        </div>

        {/* Colonna 2: Link veloci */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Navigazione</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="/cerca" className="hover:text-white transition-colors">Acquista</a></li>
            <li><a href="/cerca" className="hover:text-white transition-colors">Affitta</a></li>
            <li><a href="/valuta" className="hover:text-white transition-colors">Vendi</a></li>
            <li><a href="/chi-siamo" className="hover:text-white transition-colors">Chi siamo</a></li>
          </ul>
        </div>

        {/* Colonna 3: Contatti (ICONE AGGIORNATE) */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contatti</h3>
          <address className="not-italic text-sm space-y-3">
            
            {/* Telefono */}
            <p className="flex items-center gap-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-5 h-5 text-orange-500 shrink-0" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.12 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.57A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+39 011 1234567</span>
            </p>

            {/* Email */}
            <p className="flex items-center gap-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-5 h-5 text-orange-500 shrink-0" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <a href="mailto:info@immobiliaris.it" className="hover:text-white transition-colors">info@immobiliaris.it</a>
            </p>

            {/* Posizione */}
            <p className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-orange-500 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Torino, Italia</span>
            </p>

          </address>
        </div>

        {/* Colonna 4: Social / CTA */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Seguici</h3>
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 bg-blue-800 hover:bg-orange-500 flex items-center justify-center rounded-full transition-colors group">
              <span className="sr-only">Facebook</span>
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 bg-blue-800 hover:bg-orange-500 flex items-center justify-center rounded-full transition-colors group">
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.228 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 bg-blue-800 hover:bg-orange-500 flex items-center justify-center rounded-full transition-colors group">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h5v-8.306c0-4.613 6.132-4.975 6.132 0v8.306h5v-10.457c0-6.726-7.509-6.521-10.024-3.131v-2.718z"/></svg>
            </a>
          </div>
          <p className="mt-4 text-sm">
            Iscriviti alla newsletter per novità e offerte esclusive.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-blue-800 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Immobiliaris. Tutti i diritti riservati.
      </div>
    </footer>
  );
};

export default Footer;