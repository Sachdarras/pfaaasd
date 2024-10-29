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
    console.error('Erreur lors de la récupération des projets:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des projets.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Ajouter un nouveau projet (POST)
export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Données reçues pour création :", data); // Journaliser pour vérifier

    // Validation pour s'assurer que `data` est bien un objet et non vide
    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
      return new Response(JSON.stringify({ error: 'Format de données JSON invalide' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newProject = await prisma.project.create({
      data,
    });

    return new Response(JSON.stringify(newProject), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la création du projet.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
