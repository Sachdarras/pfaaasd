"use client"; // Ensure this is a client component

import projects from "../../data/projectData"; // Adjust path if necessary
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import the useRouter hook

function ProjectPage({ params }) {
  const { id } = params; // Retrieve the ID from parameters
  const router = useRouter(); // Use the router for navigation

  // Find the corresponding project by ID
  const project = projects.find((proj) => proj.id === Number(id));

  // Display an error message if the project is not found
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
              onClick={() => router.push(`/projet/${proj.id}`)} // Navigate to the corresponding project
            />
          </div>
        ))}
      </div>

      <div className="project-detail-container">
       

        <h1 className="header-title">{project.name}</h1>
        <Image className="imgproject" src={project.img} alt={project.name} width={500} height={300} />
        <p>{project.description}</p>
        <h2 className="skilltitle">Compétences</h2>
        <div className="techno-container">
          {project.techno.map((tech, index) => (
            <Image
              key={index}
              src={tech}
              alt="technology icon"
              className="tech-icon"
              width={50}
              height={50}
            />
          ))}
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
