import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Créer un nouveau projet
export async function POST(req) {
  try {
    const data = await req.json();
    const { skills, ...projectData } = data;

    const newProject = await prisma.project.create({
      data: {
        ...projectData,
        skills: {
          connectOrCreate: skills.map(skill => ({
            where: { id: skill.id },
            create: { name: skill.name, image: skill.image, order: skill.order },
          })),
        },
      },
    });

    return new Response(JSON.stringify(newProject), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la création du projet.' }), {
      status: 500,
    });
  }
}

// Lire tous les projets
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: { skills: true }, // Inclure les compétences si nécessaire
    });

    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des projets.' }), {
      status: 500,
    });
  }
}
