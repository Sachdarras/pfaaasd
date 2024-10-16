"use client"; // Ajoutez ceci en haut de votre fichier

import Image from 'next/image';
import { useState, useEffect } from 'react';

function Description() {
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    fetch('/api/description')
      .then((res) => res.json())
      .then((data) => setDescriptions(data));
  }, []);

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
        src="/assets/images/profil.jpg" // Assurez-vous que le chemin est correct
        className="profil" 
        alt="profil" 
        width={150} 
        height={150} 
      />
    </div>
  );
}

export default Description;
