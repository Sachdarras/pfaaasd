import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Récupère toutes les compétences
export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: {
        order: 'asc', // Assurez-vous de trier par ordre
      },
    });
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Erreur lors de la récupération des compétences:', error);
    return NextResponse.error();
  }
}

// Crée une nouvelle compétence
export async function POST(req) {
  const { name, image } = await req.json();

  try {
    const newSkill = await prisma.skill.create({
      data: {
        name,
        image,
        order: 0, // Définissez l'ordre par défaut ici si nécessaire
      },
    });
    return NextResponse.json(newSkill);
  } catch (error) {
    console.error('Erreur lors de la création de la compétence:', error);
    return NextResponse.error();
  }
}

// Met à jour l'ordre des compétences
export async function PATCH(req) {
  const skillsUpdate = await req.json();

  try {
    await Promise.all(
      skillsUpdate.map(({ id, order }) =>
        prisma.skill.update({
          where: { id: parseInt(id) },
          data: { order },
        })
      )
    );
    return NextResponse.json({ message: 'Ordre mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'ordre:', error);
    return NextResponse.error();
  }
}
