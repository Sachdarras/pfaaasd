import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Récupérer toutes les compétences (GET)
export async function GET() {
  try {
    const skills = await prisma.skill.findMany();
    return new Response(JSON.stringify(skills), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des compétences:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des compétences.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Ajouter une compétence (POST)
export async function POST(req) {
  const data = await req.json();

  try {
    const skill = await prisma.skill.create({
      data: {
        name: data.name,
      },
    });

    return new Response(JSON.stringify(skill), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la compétence:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de l\'ajout de la compétence.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
