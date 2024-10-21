import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Récupérer un projet spécifique (GET)
export async function GET(req, { params }) {
  const { id } = params;

  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: { skills: true }, // Inclure les compétences
    });

    if (!project) {
      return new Response(JSON.stringify({ error: 'Projet non trouvé' }), { status: 404 });
    }

    return new Response(JSON.stringify(project), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération du projet' }), {
      status: 500,
    });
  }
}
