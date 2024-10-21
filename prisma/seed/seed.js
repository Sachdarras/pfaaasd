import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Ajouter une description
  const descriptionData = {
    name: "Alexandre-Sacha Darras",
    title: "Développeur web full-stack JavaScript",
    subtitle: "À propos de moi",
    content: "Après 10 ans passés dans le milieu du spectacle comme régisseur et concepteur lumières, il était temps de changer de vie. Je me suis donc orienté vers un métier qui reste créatif. C'est pour cela que mon regard s'est posé sur le développement web. Pour cela, je recherche une alternance pour une durée de 15 mois, afin de préparer un diplôme de Concepteur Développeur d'Applications de niveau Bac+4.",
    image: "/assets/images/profil.jpg",
  };

  const existingDescription = await prisma.description.findUnique({
    where: { name: descriptionData.name },
  });

  // Créer une nouvelle description seulement si elle n'existe pas déjà
  if (!existingDescription) {
    const description = await prisma.description.create({
      data: descriptionData,
    });
    console.log('Description ajoutée:', description);
  } else {
    console.log('La description existe déjà:', existingDescription);
  }

  // Ajouter des compétences avec un attribut order et image
  const skillsData = [
    { name: "HTML", image: "/assets/skills/html-1.svg" },
    { name: "CSS", image: "/assets/skills/css-3.svg" },
    { name: "JavaScript", image: "/assets/skills/javascript-1.svg" },
    { name: "Git", image: "/assets/skills/git-icon.svg" },
    { name: "GitHub", image: "/assets/skills/github-icon-1.svg" },
    { name: "Figma", image: "/assets/skills/figma-5.svg" },
    { name: "NPM", image: "/assets/skills/npm.svg" },
    { name: "Git Bash", image: "/assets/skills/git-bash.svg" },
    { name: "Node.js", image: "/assets/skills/nodejs-1.svg" },
    { name: "Leaflet", image: "/assets/skills/leaflet-seeklogo.svg" },
    { name: "React", image: "/assets/skills/react-2.svg" },
    { name: "Sass", image: "/assets/skills/sass-1.svg" },
    { name: "MySQL", image: "/assets/skills/mysql.png" },
    { name: "Three.js", image: "/assets/skills/three-js-icon.svg" },
  ];

  for (const skill of skillsData) {
    const existingSkill = await prisma.skill.findUnique({
      where: { name: skill.name },
    });

    // Créer une compétence seulement si elle n'existe pas déjà
    if (!existingSkill) {
      const createdSkill = await prisma.skill.create({
        data: {
          name: skill.name,
          image: skill.image,
        },
      });
      console.log('Compétence ajoutée:', createdSkill);
    } else {
      console.log('La compétence existe déjà:', existingSkill);
    }
  }

  // Ajouter des projets
  const projects = [
    {
      name: "go past or back to Future",
      img: "/assets/project/gopastorbacktofuture.png",
      description: "Voyage Temporel Humoristique : une chronologie animée décalée de l'histoire de l'humanité, de l'âge de pierre aux voyages dans l'espace. Avec des personnages loufoques et des clins d'œil humoristiques, découvrez le passé de manière ludique et pédagogique !",
      lien: "https://sachdarras.github.io/WCS-P1-Chronologie-Anim-e/",
      repo: "https://github.com/Sachdarras/WCS-P1-Chronologie-Anim-e",
      skills: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
      name: "Crew-Dragon-Location-Map",
      img: "/assets/project/Crewdragonlocationmap.png",
      description: "J'ai créé une carte interactive qui permet de localiser tous les élèves de ma promotion à travers la France. Cette carte facilite la communication et les rencontres entre les membres de la promo, en leur permettant de visualiser où se trouvent leurs camarades géographiquement.",
      lien: "https://sachdarras.github.io/Crew-Dragon-Location-Map/",
      repo: "https://github.com/Sachdarras/Crew-Dragon-Location-Map",
      skills: [1, 2, 3, 4, 5, 7, 8, 10, 9]
    },
    {
      name: "Star-Wild",
      img: "/assets/project/Star Wild.png",
      description: "Bienvenue sur Star Wild, votre passerelle virtuelle vers les merveilles et les mystères du système solaire, présentée dans une expérience immersive en 3D. Explorez les planètes, les lunes et les astéroïdes avec un système de carte interactif qui vous permet de plonger dans les détails de chaque corps céleste.",
      lien: "https://star-wild.netlify.app/",
      repo: "https://github.com/Sachdarras/JS-RemoteFR-CrewDragon-P2-Team3",
      skills: [1, 2, 3, 4, 5, 7, 8, 11, 12, 14, 9]
    },
    {
      name: "AgendStrauss",
      img: "/assets/project/agendstrauss.png",
      description: "L'agend strauss est un ensemble de fonctionnalités avec une todo-list, une calculatrice, un agenda et une horloge numérique.",
      lien: "https://agendstrauss.netlify.app/",
      repo: "https://github.com/Sachdarras/agendStrauss",
      skills: [1, 2, 3, 4, 5, 7, 8, 11, 12, 9]
    },
    {
      name: "Échappée Célébrement Fantasque",
      img: "/assets/project/ECF.png",
      description: "Échappée Célèbrement Fantasque est une plateforme en ligne unique qui propose aux utilisateurs de choisir des sujets thématiques et de les explorer en compagnie de célébrités ou de personnages fictifs...",
      lien: "https://echappee-celebrement-fantasque.netlify.app/",
      repo: "https://github.com/Sachdarras/wcs-Protojam-goupeA",
      skills: [1, 2, 3, 4, 5, 7, 8, 11, 12, 9]
    },
    {
      name: "Origins Digital",
      img: "/assets/project/orginsdigital.png",
      description: "Origin Digital est une plateforme innovante dédiée au visionnage de vidéos...",
      lien: "https://origins-digital.remote-fr-2.wilders.dev/",
      repo: "https://github.com/WildCodeSchool-2024-02/JS-RemoteFR-CrewDragon-P3-Origins-Digital",
      skills: [1, 2, 3, 4, 5, 7, 8, 11, 12, 9, 13]
    },
  ];

  for (const project of projects) {
    const existingProject = await prisma.project.findUnique({
      where: { name: project.name },
      include: { skills: true },
    });

    // Créer un projet seulement s'il n'existe pas déjà
    if (!existingProject) {
      const createdProject = await prisma.project.create({
        data: {
          name: project.name,
          img: project.img,
          description: project.description,
          lien: project.lien,
          repo: project.repo,
          skills: {
            connect: project.skills.map(skillId => ({ id: skillId })),
          },
        },
      });
      console.log('Projet ajouté:', createdProject);
    } else {
      console.log('Le projet existe déjà:', existingProject);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
