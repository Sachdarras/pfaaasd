// src/components/Nav.jsx
 "use client"
import Link from 'next/link';
import { useState } from 'react';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="burger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`nav-list ${isOpen ? 'active' : ''}`}>
        <li>
          <Link href="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link href="/projet" className="nav-link">
            Projet
          </Link>
        </li>
        <li>
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
