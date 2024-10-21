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
    console.error('Erreur lors de la récupération du projet:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération du projet' }), {
      status: 500,
    });
  }
}

// Mettre à jour un projet spécifique (PUT)
export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const data = await req.json();
    const updatedProject = await prisma.project.update({
      where: { id: parseInt(id) },
      data,
    });

    return new Response(JSON.stringify(updatedProject), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du projet:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la mise à jour du projet.' }), {
      status: 500,
    });
  }
}

// Supprimer un projet spécifique (DELETE)
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const deletedProject = await prisma.project.delete({
      where: { id: parseInt(id) },
    });

    return new Response(JSON.stringify(deletedProject), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la suppression du projet.' }), {
      status: 500,
    });
  }
}
