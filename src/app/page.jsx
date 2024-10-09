import Description from "../app/comoponents/Description"; // Correction du chemin
import Skills from "../app/comoponents/Skills"; // Correction du chemin

function Home() {
  return (
    <>
      <div className="homepage-container">
        <h1 className="header-title">Mon Portefolio</h1>
        <Description />
        <Skills />
      </div>
    </>
  );
}

export default Home;
