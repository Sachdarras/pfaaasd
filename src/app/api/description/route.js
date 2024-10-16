import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Récupérer toutes les descriptions
export async function GET(request) {
  const descriptions = await prisma.description.findMany();
  return new Response(JSON.stringify(descriptions), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Ajouter une nouvelle description
export async function POST(request) {
  const data = await request.json();
  const newDescription = await prisma.description.create({
    data,
  });
  return new Response(JSON.stringify(newDescription), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Mettre à jour une description existante
export async function PUT(request) {
  const { id, name, title, subtitle, content, image } = await request.json();
  const updatedDescription = await prisma.description.update({
    where: { id },
    data: { name, title, subtitle, content, image },
  });
  return new Response(JSON.stringify(updatedDescription), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Supprimer une description
export async function DELETE(request) {
  const { id } = await request.json();
  await prisma.description.delete({
    where: { id },
  });
  return new Response(JSON.stringify({ message: "Description supprimée" }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
