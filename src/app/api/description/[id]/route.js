import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Récupérer une description par ID
export async function GET(req, { params }) {
  const description = await prisma.description.findUnique({
    where: { id: Number(params.id) },
  });
  return new Response(JSON.stringify(description), { status: 200 });
}

// Mettre à jour une description par ID
export async function PUT(req, { params }) {
  const data = await req.json();
  const updatedDescription = await prisma.description.update({
    where: { id: Number(params.id) },
    data,
  });
  return new Response(JSON.stringify(updatedDescription), { status: 200 });
}

// Supprimer une description par ID
export async function DELETE(req, { params }) {
  await prisma.description.delete({
    where: { id: Number(params.id) },
  });
  return new Response(JSON.stringify({ message: "Description supprimée" }), { status: 200 });
}

// Ajouter une nouvelle description
export async function POST(req) {
  const data = await req.json();
  const newDescription = await prisma.description.create({
    data,
  });
  return new Response(JSON.stringify(newDescription), { status: 201 });
}
