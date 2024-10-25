import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password, role } = await req.json();

  // Vérifie si l'email existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return new Response(JSON.stringify({ error: 'Email already in use' }), {
      status: 400,
    });
  }

  // Hash le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Crée l'utilisateur
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || 'ADMIN', // rôle par défaut si aucun n'est fourni
      },
    });
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'User creation failed' }),
      { status: 500 }
    );
  }
}
