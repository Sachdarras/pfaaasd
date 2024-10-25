import bcrypt from 'bcryptjs'; // Change ceci
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prsima'; // Vérifie que le chemin est correct
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
  }

  const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: '1h', // Durée de validité du token
  });

  return NextResponse.json({ token });
}
