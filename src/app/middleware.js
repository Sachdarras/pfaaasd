import { NextResponse } from 'next/server';
import { authMiddleware } from './lib/authmiddleware';

// Appliquez le middleware à toutes les routes sous /admin
export const middleware = (req) => {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/admin')) {
    return authMiddleware(req); // Vérifiez l'authentification
  }

  return NextResponse.next(); // Continuez pour les autres routes
};

// Définir les chemins de middleware
export const config = {
  matcher: ['/admin/:path*'], // Appliquer le middleware à toutes les routes sous /admin
};
