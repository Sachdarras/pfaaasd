import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Lire un projet par ID
export async function GET(req, { params }) {
  const { id } = params;

  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: { skills: true }, // Inclure les compétences si nécessaire
    });

    if (!project) {
      return new Response(JSON.stringify({ error: 'Projet non trouvé.' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(project), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération du projet.' }), {
      status: 500,
    });
  }
}

// Mettre à jour un projet par ID
export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const data = await req.json();
    const { skills, ...projectData } = data;

    const updatedProject = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        ...projectData,
        skills: {
          set: [], // Détache toutes les compétences existantes d'abord pour réinitialiser
          connectOrCreate: skills.map(skill => ({
            where: { id: skill.id },
            create: { name: skill.name, image: skill.image, order: skill.order },
          })),
        },
      },
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

// Supprimer un projet par ID
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.project.delete({
      where: { id: parseInt(id) },
    });

    return new Response(JSON.stringify({ message: 'Projet supprimé avec succès.' }), {
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
