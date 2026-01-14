import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import type { Engine } from "tsparticles-engine";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        fpsLimit: 60,
        detectRetina: true,

        particles: {
          number: {
            value: 140,
            density: { enable: true, area: 1400 },
          },

          color: {
            value: ["#ffffff", "#a78bfa", "#60a5fa"],
          },

          opacity: {
            value: { min: 0.15, max: 0.45 },
          },

          size: {
            value: { min: 0.5, max: 1.8 },
          },

          move: {
            enable: true,
            speed: 0.15,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
        },

        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
            },
          },

          modes: {
            bubble: {
              distance: 120,
              size: 2.8,
              duration: 2,
              opacity: 0.9,
            },
          },
        },
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background:
          "radial-gradient(circle at bottom, rgba(96,165,250,0.18), rgba(10,10,15,0.92) 50%, #0a0a0f 80%)",
      }}
    />
  );
};

export default ParticleBackground;
