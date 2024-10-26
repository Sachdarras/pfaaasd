import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken'; // Assurez-vous d'importer cela
import { setCookie } from 'cookies-next'; // Assurez-vous d'importer cela

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET; // Assurez-vous de définir cette clé dans votre .env

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && (await bcrypt.compare(credentials.password, user.password))) {
          // Génération du token JWT
          const token = sign({ userId: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1d' });

          // Définition du cookie avec le token
          setCookie('authToken', token, { maxAge: 60 * 60 * 24, httpOnly: true, secure: process.env.NODE_ENV === 'production' });

          return user;
        }

        throw new Error("Invalid credentials");
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt', // Utilise des JWT pour la gestion de session
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
