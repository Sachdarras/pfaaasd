// src/app/api/projects/[id]/route.js

import { NextResponse } from 'next/server';
import prisma from '../../../lib/prsima'; // Assure-toi que le chemin est correct

export async function PUT(request, { params }) {
  const projectId = parseInt(params.id, 10);
  
  // Récupérer les données du corps de la requête
  const data = await request.json();

  try {
    // Mise à jour du projet avec les données fournies
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        name: data.name,
        img: data.img,
        description: data.description,
        lien: data.lien,
        repo: data.repo,
        skills: {
          connectOrCreate: data.skills.map(skill => ({
            where: { id: skill.id }, // Assure-toi que 'skill.id' existe
            create: {
              name: skill.name, // Assure-toi que 'skill.name' est défini
              image: skill.image, // Assure-toi que 'skill.image' est défini
           
            },
          })),
        },
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Error updating project' }, { status: 500 });
  }
}
