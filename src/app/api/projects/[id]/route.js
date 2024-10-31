// src/app/api/projects/[id]/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const projectId = parseInt(params.id, 10);

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { skills: true }, // Inclure les compétences associées
    });

    if (!project) {
      return NextResponse.json({ error: 'Projet non trouvé.' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération du projet.' }, { status: 500 });
  }
}
