"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Importez la bibliothèque pour gérer les cookies

const SignInPage = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const email = event.target.email.value;
    const password = event.target.password.value;

    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
      setSuccess(null);
    } else {
      setSuccess(data.message);
      setError(null);
      // Stocker le userId dans un cookie
      Cookies.set('userId', data.userId, { expires: 7 }); // Cookie expirant dans 7 jours
      // Rediriger vers la page admin après la connexion réussie
      router.push('/admin');
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Log In</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default SignInPage;
