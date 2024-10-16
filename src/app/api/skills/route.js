// app/api/skills/route.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // Récupérer toutes les compétences
    const skills = await prisma.skill.findMany();
    return new Response(JSON.stringify(skills), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des compétences:', error);
    return new Response('Erreur interne du serveur', { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, image } = await request.json();

    // Ajouter une compétence
    const newSkill = await prisma.skill.create({
      data: { name, image },
    });

    return new Response(JSON.stringify(newSkill), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'une compétence:', error);
    return new Response('Erreur interne du serveur', { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, name, image } = await request.json();

    // Modifier une compétence
    const updatedSkill = await prisma.skill.update({
      where: { id },
      data: { name, image },
    });

    return new Response(JSON.stringify(updatedSkill), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la compétence:', error);
    return new Response('Erreur interne du serveur', { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    // Supprimer une compétence
    await prisma.skill.delete({
      where: { id },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Erreur lors de la suppression de la compétence:', error);
    return new Response('Erreur interne du serveur', { status: 500 });
  }
}
