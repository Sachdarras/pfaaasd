"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Récupérer les compétences depuis l'API
    fetch('/api/skills')
      .then((response) => response.json())
      .then((data) => setSkills(data))
      .catch((error) => console.error('Erreur lors de la récupération des compétences:', error));
  }, []);

  return (
    <div className="skills-container">
      <h2>Mes Compétences</h2>
      <ul className="logo-container">
        {skills.map((skill) => (
          <li key={skill.id}>
            <Image
              className="logo"
              src={skill.image} // Utilisez la propriété `image` de l'objet skill
              alt={skill.name}
              width={50} // Ajustez la largeur selon vos besoins
              height={50} // Ajustez la hauteur selon vos besoins
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Skills;
