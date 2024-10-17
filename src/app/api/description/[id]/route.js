import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params; // Utilise les paramètres de l'URL pour obtenir l'ID
  try {
    const description = await prisma.description.findUnique({
      where: { id: Number(id) },
    });
    if (!description) {
      return new Response(JSON.stringify({ error: 'Description non trouvée' }), { status: 404 });
    }
    return new Response(JSON.stringify(description), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération de la description' }), { status: 500 });
  }
}

export async function POST(req) {
  const data = await req.json(); // Récupère les données envoyées dans la requête
  try {
    const newDescription = await prisma.description.create({
      data,
    });
    return new Response(JSON.stringify(newDescription), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la création de la description' }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params; // Utilise les paramètres de l'URL pour obtenir l'ID
  const data = await req.json(); // Récupère les données envoyées dans la requête
  try {
    const updatedDescription = await prisma.description.update({
      where: { id: Number(id) },
      data,
    });
    return new Response(JSON.stringify(updatedDescription), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la mise à jour de la description' }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params; // Utilise les paramètres de l'URL pour obtenir l'ID
  try {
    await prisma.description.delete({
      where: { id: Number(id) },
    });
    return new Response(JSON.stringify({ message: 'Description supprimée avec succès' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la suppression de la description' }), { status: 500 });
  }
}
