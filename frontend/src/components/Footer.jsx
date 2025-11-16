// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-300 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Colonna 1: Logo + Descrizione */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-sm"></div>
            <span className="text-white text-xl font-bold">Immobilaris</span>
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

        {/* Colonna 3: Contatti */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contatti</h3>
          <address className="not-italic text-sm space-y-2">
            <p>📞 +39 011 1234567</p>
            <p>✉️ info@immobilaris.it</p>
            <p>📍 Torino, Italia</p>
          </address>
        </div>

        {/* Colonna 4: Social / CTA */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Seguici</h3>
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 bg-blue-800 hover:bg-orange-500 flex items-center justify-center rounded-full transition-colors">
              <span className="sr-only">Facebook</span>f
            </a>
            <a href="#" className="w-10 h-10 bg-blue-800 hover:bg-orange-500 flex items-center justify-center rounded-full transition-colors">
              <span className="sr-only">Instagram</span>i
            </a>
            <a href="#" className="w-10 h-10 bg-blue-800 hover:bg-orange-500 flex items-center justify-center rounded-full transition-colors">
              <span className="sr-only">LinkedIn</span>in
            </a>
          </div>
          <p className="mt-4 text-sm">
            Iscriviti alla newsletter per novità e offerte esclusive.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-blue-800 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Immobilaris. Tutti i diritti riservati.
      </div>
    </footer>
  );
};

export default Footer;