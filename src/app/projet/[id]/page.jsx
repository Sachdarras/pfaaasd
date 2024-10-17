
"use client"; // Assurez-vous qu'il s'agit d'un composant client

import projects from "../../data/projectData"; // Ajustez le chemin si nécessaire
import skillsData from "../../data/technos"; // Importation des compétences
import Image from "next/image";
import { useRouter } from "next/navigation"; // Importer le hook useRouter

function ProjectPage({ params }) {
  const { id } = params; // Récupérer l'ID des paramètres
  const router = useRouter(); // Utiliser le router pour la navigation

  // Trouver le projet correspondant par ID
  const project = projects.find((proj) => proj.id === Number(id));

  // Afficher un message d'erreur si le projet n'est pas trouvé
  if (!project) {
    return <div>Projet non trouvé</div>;
  }

  return (
    <>
      <div className="project-carousel">
        {projects.map((proj) => (
          <div key={proj.id} className="carousel-item">
            <Image
              src={proj.img}
              alt={proj.name}
              width={100}
              height={60}
              className="carousel-image"
              onClick={() => router.push(`/projet/${proj.id}`)} // Naviguer vers le projet correspondant
            />
          </div>
        ))}
      </div>

      <div className="project-detail-container">
        <h1 className="header-title">{project.name}</h1>
        <Image 
          className="imgproject" 
          src={project.img} 
          alt={project.name} 
          width={500} 
          height={300} 
        />
        <p>{project.description}</p>
        <h2 className="skilltitle">Compétences</h2>
        <div className="techno-container">
          {project.techno.map((techId) => {
            const tech = skillsData.find(skill => skill.id === techId);
            return tech ? (
              <Image
                key={tech.id}
                src={tech.img}
                alt={tech.name}
                className="tech-icon"
                width={50}
                height={50}
              />
            ) : null;
          })}
        </div>
        <ul>
          <li>
            <a
              href={project.lien}
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lien du site
            </a>
          </li>
          <li>
            <a
              href={project.repo}
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lien du repo
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ProjectPage;
