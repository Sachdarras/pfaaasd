import gopast from "../assets/project/Gopastorbacktofuture.png";
import locationmap from "../assets/project/Crewdragonlocationmap.png";
import starwild from "../assets/project/Star Wild.png";
import agendstrauss from "../assets/project/agendstrauss.png";
import ECF from "../assets/project/ECF.png";
import html from "../assets/skills/html-1.svg";
import css from "../assets/skills/css-3.svg";
import js from "../assets/skills/javascript-1.svg";
import react from "../assets/skills/react-2.svg";
import sass from "../assets/skills/sass-1.svg";
import nodejs from "../assets/skills/nodejs-1.svg";
import git from "../assets/skills/git-icon.svg";
import npm from "../assets/skills/npm.svg";
import github from "../assets/skills/github-icon-1.svg";
import bash from "../assets/skills/git-bash.svg";
import figma from "../assets/skills/figma-5.svg";
import threejs from "../assets/skills/three-js-icon.svg"
import originsdigital from "../assets/project/orginsdigital.png"
import mysql from "../assets/skills/mysql.png"


import leaflet from "../assets/skills/leaflet-seeklogo.svg";
const projects = [
  {
    name: "Go past or back to Future",
    img: gopast,
    description:
      "Voyage Temporel Humoristique : une chronologie animée décalée de l'histoire de l'humanité, de l'âge de pierre aux voyages dans l'espace. Avec des personnages loufoques et des clins d'œil humoristiques, découvrez le passé de manière ludique et pédagogique !",
    lien: "https://sachdarras.github.io/WCS-P1-Chronologie-Anim-e/",
    repo: "https://github.com/Sachdarras/WCS-P1-Chronologie-Anim-e",
    techno:[html,css,js,git,github,figma,npm,bash,nodejs]
  },

  {
    name: "Crew-Dragon-Location-Map",
    img: locationmap,
    description:
      "J'ai créé une carte interactive qui permet de localiser tous les élèves de ma promotion à travers la France. Cette carte facilite la communication et les rencontres entre les membres de la promo, en leur permettant de visualiser où se trouvent leurs camarades géographiquement.",
    lien: "https://sachdarras.github.io/Crew-Dragon-Location-Map/",
    repo: "https://github.com/Sachdarras/Crew-Dragon-Location-Map",
    techno:[html,css,js,git,github,npm,bash,leaflet,nodejs]
  },
  {
    name: "Star-Wild",
    img: starwild,
    description:
      "Bienvenue sur Star Wild, votre passerelle virtuelle vers les merveilles et les mystères du système solaire, présentée dans une expérience immersive en 3D. Explorez les planètes, les lunes et les astéroïdes avec un système de carte interactif qui vous permet de plonger dans les détails de chaque corps céleste.",
    lien: "https://star-wild.netlify.app/",
    repo: "https://github.com/Sachdarras/JS-RemoteFR-CrewDragon-P2-Team3",
    techno:[html,css,js,git,github,npm,bash,react,sass,threejs,nodejs]
  },
  {
    name: "AgendStrauss",
    img: agendstrauss,
    description:
      "L'agend strauss est un ensemble de fonctionalité avec une todo-list,une calculatrice,un agenda et une horloge numérique",
    lien: "https://agendstrauss.netlify.app/",
    repo: "https://github.com/Sachdarras/agendStrauss",
     techno:[html,css,js,git,github,npm,bash,react,sass,nodejs]
  },
  {
    name: "Échappée Célébrement Fantasque",
    img: ECF,
    description:
      "Échappée Célèbrement Fantasque est une plateforme en ligne unique qui propose aux utilisateurs de choisir des sujets thématiques et de les explorer en compagnie de célébrités ou de personnages fictifs. Le site permet de créer des expériences immersives et personnalisées, où les utilisateurs peuvent interagir avec des figures emblématiques issues du monde du cinéma, de la littérature, de la musique et bien plus encore. Que ce soit pour une aventure virtuelle avec un super-héros de bande dessinée, une conversation philosophique avec un grand penseur historique, ou une escapade imaginaire avec une star de la pop, Échappée Célèbrement Fantasque offre une multitude de possibilités pour des évasions fantastiques et enrichissantes.",
    lien: "https://echappee-celebrement-fantasque.netlify.app/",
    repo: "https://github.com/Sachdarras/wcs-Protojam-goupeA",
     techno:[html,css,js,git,github,npm,bash,react,sass,nodejs]
  },
  {
    name: "Origins Digital ",
    img: originsdigital,
    description:"Origin Digital est une plateforme innovante dédiée au visionnage de vidéos. Conçue pour offrir une expérience utilisateur exceptionnelle, cette plateforme met à disposition un vaste catalogue de contenus vidéo, allant des films et séries aux documentaires et vidéos éducatives.",
    lien: "https://origins-digital.remote-fr-2.wilders.dev/",
    repo: "https://github.com/WildCodeSchool-2024-02/JS-RemoteFR-CrewDragon-P3-Origins-Digital",
     techno:[html,css,js,git,github,npm,bash,react,sass,nodejs,mysql]
  },
];
export default projects;
