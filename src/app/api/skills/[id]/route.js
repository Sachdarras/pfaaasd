import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Récupère une compétence par son ID
export async function GET(req, { params }) {
  const { id } = params;

  try {
    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(id) },
    });
    if (!skill) {
      return NextResponse.json({ message: 'Compétence non trouvée' }, { status: 404 });
    }
    return NextResponse.json(skill);
  } catch (error) {
    console.error('Erreur lors de la récupération de la compétence:', error);
    return NextResponse.error();
  }
}

// Met à jour une compétence par son ID
export async function PUT(req, { params }) {
  const { id } = params;
  const { name, image } = await req.json();

  try {
    const updatedSkill = await prisma.skill.update({
      where: { id: parseInt(id) },
      data: { name, image },
    });
    return NextResponse.json(updatedSkill);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la compétence:', error);
    return NextResponse.error();
  }
}

// Supprime une compétence par son ID
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.skill.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Compétence supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la compétence:', error);
    return NextResponse.error();
  }
}
