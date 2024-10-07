// src/components/Nav.jsx
import Link from 'next/link';

function Nav() {
  return (
    <div>
      <ul className="nav-list">
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
