import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  // Cherche l'utilisateur par email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Vérifie le mot de passe
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Retournez un token ou un ID d'utilisateur
  return new Response(JSON.stringify({ message: 'Login successful', userId: user.id }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
