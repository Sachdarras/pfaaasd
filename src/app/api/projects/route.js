// api/projects/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Récupérer tous les projets avec les compétences associées
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        skills: true, // Assurez-vous d'inclure les compétences
      },
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
