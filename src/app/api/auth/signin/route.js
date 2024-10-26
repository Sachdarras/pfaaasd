import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken'; // Assurez-vous d'importer cela
import { setCookie } from 'cookies-next'; // Assurez-vous d'importer cela

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET; // Assurez-vous de définir cette clé dans votre .env

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

  // Générer le token JWT
  const token = sign({ userId: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1d' });

  // Définir le cookie avec le token
  setCookie('authToken', token, { maxAge: 60 * 60 * 24, httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  // Retournez le message ou d'autres informations si nécessaire
  return new Response(JSON.stringify({ message: 'Login successful', userId: user.id }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
