// src/app/api/auth/signup/route.js

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body; // On n'inclut pas le champ name

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "admin", // Reste comme avant
      },
    });

    return new Response(JSON.stringify(user), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'User creation failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
