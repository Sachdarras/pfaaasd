"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Envoie une requête POST à ton API pour créer un nouvel utilisateur
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      setSuccess("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      // Redirige vers la page de connexion après une inscription réussie
      setTimeout(() => {
        window.location.href = "/auth/signin";
      }, 2000);
    }
  };

  return (
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUp;
