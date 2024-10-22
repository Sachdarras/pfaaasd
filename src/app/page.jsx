// src/app/page.jsx ou src/pages/Home.jsx (selon ta structure)
import Description from "./components/Description"; // Corrigez le chemin
import Skills from "./components/Skills"; // Corrigez le chemin
import ParticlesBackground from './components/ParticlesBackground'; // Corrigez le chemin ici

function Home() {
  return (
    <>
      <ParticlesBackground />
      <div className="homepage-container">
        <h1 className="header-title">Mon Portfolio</h1>
        <Description />
        <Skills />
      </div>
    </>
  );
}

export default Home;
