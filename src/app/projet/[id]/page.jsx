"use client"; // Assurez-vous qu'il s'agit d'un composant client

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ParticlesBackground from '../../components/ParticlesBackground'; // Corrigez le chemin ici

function ProjectPage({ params }) {
  const id = params.id; // Accéder à l'ID directement
  const router = useRouter(); // Utiliser le router pour la navigation

  // State pour stocker les données du projet et les projets pour le carrousel
  const [project, setProject] = useState(null);
  const [skills, setSkills] = useState([]); // Initialiser avec un tableau vide
  const [allProjects, setAllProjects] = useState([]); // Pour stocker tous les projets
  const [loading, setLoading] = useState(true);

  // Utiliser useEffect pour récupérer les données du projet et les projets pour le carrousel
  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return; // Ne pas faire la requête si l'ID n'est pas défini

      try {
        // Récupérer le projet spécifique par son ID via l'API
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();

        if (res.ok) {
          setProject(data); // Assurez-vous que les données existent
          setSkills(data.skills || []); // Assurez-vous que les compétences existent, sinon un tableau vide
        } else {
          console.error(data.error); // Afficher l'erreur si le projet n'est pas trouvé
        }

        // Récupérer tous les projets pour le carrousel
        const allProjectsRes = await fetch("/api/projects");
        const allProjectsData = await allProjectsRes.json();
        setAllProjects(allProjectsData);

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des projets:", error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Affichage du loader pendant le chargement
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  // Si le projet n'est pas trouvé
  if (!project) {
    return <div>Projet non trouvé</div>;
  }

  return (
    <>
      <ParticlesBackground />

      {/* Carousel des projets */}
      <div className="project-carousel">
        {allProjects.map((proj) => (
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

      {/* Détails du projet sélectionné */}
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
          {skills.length > 0 ? (
            skills.map((skill) => (
              <Image
                key={skill.id}
                src={skill.image}
                alt={skill.name}
                className="tech-icon"
                width={50}
                height={50}
              />
            ))
          ) : (
            <p>Aucune compétence disponible.</p>
          )}
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
