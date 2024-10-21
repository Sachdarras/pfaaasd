import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Récupérer tous les projets (GET)
export async function GET(req) {
  try {
    const projects = await prisma.project.findMany({
      include: { skills: true }, // Inclure les compétences si nécessaire
    });
    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des projets.' }), {
      status: 500,
    });
  }
}

// Ajouter un nouveau projet (POST)
export async function POST(req) {
  try {
    const data = await req.json();
    const newProject = await prisma.project.create({
      data,
    });
    return new Response(JSON.stringify(newProject), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la création du projet.' }), {
      status: 500,
    });
  }
}
