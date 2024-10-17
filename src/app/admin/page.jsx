"use client"; // Assurez-vous que cette ligne est au début de votre fichier

import Link from 'next/link'; // Importez Link pour la navigation

const Admin = () => {
  return (
    <div className="admin-container1">
      <h1>Admin - Tableau de Bord</h1>

      {/* Lien vers la page de profil */}
      <nav>
        <Link href="/admin/profil">Profil</Link>
      </nav>
    </div>
  );
};

export default Admin;
