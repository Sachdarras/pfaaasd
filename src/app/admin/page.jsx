"use client"; // Assurez-vous que cette ligne est au début de votre fichier

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Importer js-cookie

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userId = Cookies.get('userId'); // Récupérer l'ID de l'utilisateur à partir des cookies
    if (userId) {
      setIsAuthenticated(true); // L'utilisateur est authentifié
    } else {
      router.push('/auth/signin'); // Rediriger vers la page de connexion
    }
  }, [router]);

  return (
    <div className="admin-container1">
      <h1>Admin - Tableau de Bord</h1>
      {isAuthenticated && (
        <nav>
          <Link href="/admin/profil">Profil</Link>
          <Link href="/admin/projet">Projet</Link>
        </nav>
      )}
    </div>
  );
};

export default Admin;
