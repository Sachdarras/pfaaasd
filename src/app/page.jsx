
import Description from "./comoponents/Description";
import Skills from "./comoponents/Skills";

function Home () {
    return ( <>
    <div className="homepage-container">
    <h1 className="header-title">Mon Portefolio</h1>
    <Description/>
    <Skills/>
  
    </div>
    </> );
}

export default Home ;