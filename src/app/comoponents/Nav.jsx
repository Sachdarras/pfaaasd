"use client";
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importer les icônes pour le menu

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false); // Ferme le menu
  };

  return (
    <nav>
      {/* Menu burger visible uniquement sur mobile et tablette */}
      <div className="burger" onClick={toggleMenu}>
        {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* La fenêtre de navigation qui s'ouvre sur mobile/tablette */}
      <div className={`nav-modal ${isOpen ? 'active' : ''}`}>
        <button className="close-button" onClick={closeMenu}>✖</button> {/* Bouton de fermeture */}
        <ul className="nav-list">
          <li>
            <Link href="/" className="nav-link" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/projet" className="nav-link" onClick={closeMenu}>
              Projet
            </Link>
          </li>
          <li>
            <Link href="/contact" className="nav-link" onClick={closeMenu}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
