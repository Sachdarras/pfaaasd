import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
import { setCookie } from 'cookies-next'; // Assurez-vous d'importer cela

const prisma = new PrismaClient();

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
          // Ici, on peut définir un cookie après la connexion
          setCookie('user', JSON.stringify({ email: user.email, role: user.role }), { maxAge: 60 * 60 * 24 }); // 1 jour
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
