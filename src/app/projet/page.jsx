// app/page.jsx ou app/projets/page.jsx
import ProjectCard from "../comoponents/ProjectCard"; // Corrige le chemin d'importation

export default function Home() {
  return (
    <div>
      <h1 className="header-title">Mes Projets</h1>
      <ProjectCard />
    </div>
  );
}
