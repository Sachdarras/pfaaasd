import Cookies from 'js-cookie';
import { NextResponse } from 'next/server';

export function authMiddleware(req) {
  // Vérifier si l'utilisateur est authentifié
  const userId = Cookies.get('userId'); // Obtenez l'ID de l'utilisateur des cookies

  // Si l'utilisateur n'est pas authentifié, redirigez vers la page de connexion
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { Location: '/auth/signin' },
    });
  }

  return NextResponse.next(); // Si l'utilisateur est authentifié, continuez
}
