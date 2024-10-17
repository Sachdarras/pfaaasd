import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Récupère toutes les descriptions
export async function GET(req) {
  try {
    const descriptions = await prisma.description.findMany();
    return NextResponse.json(descriptions);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des descriptions' }, { status: 500 });
  }
}

// Crée une nouvelle description
export async function POST(req) {
  const data = await req.json();

  try {
    const newDescription = await prisma.description.create({ data });
    return NextResponse.json(newDescription, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de la description' }, { status: 500 });
  }
}

// Met à jour une description existante
export async function PUT(req, { params }) {
  const { id } = params;
  const data = await req.json();

  try {
    const updatedDescription = await prisma.description.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json(updatedDescription);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la mise à jour de la description' }, { status: 500 });
  }
}

// Supprime une description par son ID
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.description.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Description supprimée avec succès' });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la suppression de la description' }, { status: 500 });
  }
}
