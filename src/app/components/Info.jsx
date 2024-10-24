"use client"; // Assurez-vous que c'est un composant client

import Image from "next/image"; // Importez le composant Image


function Info() {
  return (
    <>
      <div className="info-container">
        <ul>
          <li>
            <div>
              <Image src="/assets/info/icons8-avatar-94.png" className="imginfo" alt="Avatar" width={94} height={94} />
              Alexandre-Sacha DARRAS
              <br />
            </div>
          </li>
          <li>
            <Image src="/assets/info/icons8-géorepérage-94.png" className="imginfo" alt="Location" width={94} height={94} />
            Pont-croix, Finistère
          </li>
          <li>
            <Image src="/assets/info/icons8-téléphone-94.png" className="imginfo" alt="Phone" width={94} height={94} />
            06-65-55-31-32
          </li>
          <li>
            <Image src="/assets/info/icons8-email-94.png" className="imginfo" alt="Email" width={94} height={94} />
            sachdarras@gmail.com
          </li>
          <li>
            <a
              href="https://github.com/Sachdarras"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/assets/info/github.png" className="imginfo" alt="GitHub" width={94} height={94} />
              https://github.com/Sachdarras
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/sacha-darras/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/assets/info/icons8-linkedin-94.png" className="imginfo" alt="LinkedIn" width={94} height={94} />
              https://www.linkedin.com/in/sacha-darras/
            </a>
          </li>
        </ul>
      </div>
      <div className="cv-container">
        <h2>Mon CV</h2>
        <Image src="/assets/CV/CV-ASDi.jpg" className="cv cv-image" alt="CV Alexandre-Sacha Darras" width={500} height={700} />
        <a href="/assets/CV/CVASD.pdf" download="cvASD.pdf">
          <button className="button-cv" type="button">
            Télécharger mon CV
          </button>
        </a>
      </div>
    </>
  );
}

export default Info;
