"use client";
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importer les icônes pour le menu
import projects from '../data/projectData'; // Importer les données des projets

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [randomProjectId, setRandomProjectId] = useState(null); // État pour l'ID du projet aléatoire

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false); // Ferme le menu
  };

  // Fonction pour générer un ID aléatoire parmi les projets existants
  const getRandomProjectId = () => {
    const randomIndex = Math.floor(Math.random() * projects.length);
    return projects[randomIndex].id; // Retourne l'ID du projet aléatoire
  };

  // Fonction pour gérer le clic sur le lien Projet
  const handleProjectClick = () => {
    const newProjectId = getRandomProjectId();
    setRandomProjectId(newProjectId); // Met à jour l'état avec un nouvel ID aléatoire
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
            <Link href={`/projet/${randomProjectId || getRandomProjectId()}`} className="nav-link" onClick={() => { handleProjectClick(); closeMenu(); }}>
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
