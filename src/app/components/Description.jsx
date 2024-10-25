"use client"; // Ajoutez ceci en haut de votre fichier

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importez useRouter

function Description() {
  const [descriptions, setDescriptions] = useState([]);
  const [clickCount, setClickCount] = useState(0); // État pour suivre les clics
  const router = useRouter(); // Utilisez useRouter pour la redirection

  useEffect(() => {
    fetch('/api/description')
      .then((res) => res.json())
      .then((data) => setDescriptions(data));
  }, []);

  const handleProfileClick = () => {
    setClickCount((prevCount) => prevCount + 1); // Incrémente le compteur

    if (clickCount + 1 === 3) { // Vérifie si le compteur atteint 3
      router.push('/auth/signin'); // Redirige vers la page de connexion
      setClickCount(0); // Réinitialise le compteur après redirection
    }
  };

  return (
    <div className="content">
      <div className="description-container">
        <h2>A propos de</h2>
        <h3>Alexandre-Sacha Darras</h3>
        <h4 className="sub-title">Développeur web full-stack JavaScript</h4>

        {descriptions.map((desc) => (
          <div key={desc.id}>
            <p>{desc.content}</p>
          </div>
        ))}
      </div>
      <Image 
        src={descriptions.length > 0 ? descriptions[0].image : '/assets/images/profil.jpg'} // Vérifiez que le chemin est correct
        className="profil" 
        alt="profil" 
        width={150} 
        height={150} 
        onClick={handleProfileClick} // Ajoutez le gestionnaire d'événements
      />
     
    </div>
  );
}

export default Description;
