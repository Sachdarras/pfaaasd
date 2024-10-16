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

  const existingDescription = await prisma.description.findFirst({
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

  // Ajouter des compétences
  const skills = [
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

  for (const skill of skills) {
    const existingSkill = await prisma.skill.findUnique({
      where: { name: skill.name },
    });

    // Créer une compétence seulement si elle n'existe pas déjà
    if (!existingSkill) {
      const createdSkill = await prisma.skill.create({
        data: skill,
      });
      console.log('Compétence ajoutée:', createdSkill);
    } else {
      console.log('La compétence existe déjà:', existingSkill);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
