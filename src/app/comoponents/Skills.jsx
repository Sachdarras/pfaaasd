import Image from 'next/image';
import skills from "../data/technos"; // Assurez-vous que ce chemin est correct

function Skills() {
  return (
    <div className="skills-container">
      <h2>Mes Compétences</h2>
      <ul className="logo-container">
        {skills.map((skill) => (
          <li key={skill.id}>
            <Image
              className="logo"
              src={skill.img}
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
