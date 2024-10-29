// src/components/ParticlesBackground.jsx
"use client";
import React, { useCallback } from 'react';
import Particles from "react-particles"; // Changer l'importation
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadSlim(engine); // Chargement du slim
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        
        particles: {
          color: {
            value: "#FFD700", // Couleur dorée (Gold)
          },
          links: {
            color: "#FFD700", // Couleur des liens dorés
            distance: 120,
            enable: true,
            opacity: 0.5,
            width: 2.5,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 0.4, // Vitesse des particules
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 250,
            },
            value: 50, // Nombre de particules
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "triangle", // Changement de la forme en triangle
            stroke: {
              width: 0.1, // Épaisseur du trait
              color: "#FFD700", // Couleur dorée pour le trait
            },
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Pour mettre le canvas en arrière-plan
      }}
    />
  );
};

export default ParticlesBackground;
