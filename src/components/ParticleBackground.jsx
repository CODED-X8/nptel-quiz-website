import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function ParticleBackground({ theme }) {
  const particlesInit = useCallback(async (engine) => {
    // loadSlim is lighter than loadFull for simpler shapes
    await loadSlim(engine);
  }, []);

  const particleColor = theme === 'light' ? "#0891b2" : "#06b6d4";
  const linkColor = theme === 'light' ? "#4f46e5" : "#6366f1";
  const opacity = theme === 'light' ? 0.6 : 0.4;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: 0 },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 150,
              links: {
                opacity: opacity + 0.1,
              },
            },
          },
        },
        particles: {
          color: {
            value: particleColor,
          },
          links: {
            color: linkColor,
            distance: 150,
            enable: true,
            opacity: opacity - 0.1,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 60,
          },
          opacity: {
            value: opacity,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 pointer-events-auto transition-opacity duration-500"
    />
  );
}
