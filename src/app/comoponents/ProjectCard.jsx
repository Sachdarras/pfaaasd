"use client";

import { useState } from "react";
import Image from "next/image";
import projects from "../data/projectData"; // Ensure the path is correct
import { useRouter } from "next/navigation"; // Make sure to use the correct import

function ProjectCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const handleViewMore = () => {
    const projectId = projects[currentIndex].id;
    router.push(`/projet/${projectId}`);
  };

  return (
    <div className="page-container">
      <div className="projectcard-container">
        <div className="carousel">
          <div className="carousel-inner">
            <div className="project">
              <h4>{projects[currentIndex].name}</h4>
              <Image
                className="img-project"
                src={projects[currentIndex].img}
                alt={projects[currentIndex].name}
                width={500} // Adjust image width
                height={300} // Adjust image height
              />
              <button onClick={handleViewMore} className="view-more-button">
                Détails
              </button>
            </div>
          </div>
          <button className="carousel-control next" onClick={nextProject}>
            <Image src="/assets/arrow/next.png" alt="Next" width={50} height={50} />
          </button>
          <button className="carousel-control prev" onClick={prevProject}>
            <Image src="/assets/arrow/prev.png" alt="Previous" width={50} height={50} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
