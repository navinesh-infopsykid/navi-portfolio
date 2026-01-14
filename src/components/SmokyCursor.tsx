import { useEffect, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

class Particle {
  x: number;
  y: number;
  size: number;
  life: number;
  vx: number;
  vy: number;
  hue: number;

  constructor(x: number, y: number, hue: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 20 + 12;
    this.life = 1;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.hue = hue;
  }

  update(): void {
    this.x += this.vx;
    this.y += this.vy;
    this.size *= 0.96;
    this.life -= 0.02;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size
    );

    gradient.addColorStop(
      0,
      `hsla(${this.hue}, 100%, 60%, ${this.life})`
    );
    gradient.addColorStop(
      1,
      `hsla(${this.hue}, 100%, 60%, 0)`
    );

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

const SmokeyCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouse = useRef<MousePosition>({ x: 0, y: 0 });
  const hueRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "lighter";

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);

        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      hueRef.current = (hueRef.current + 1) % 360;

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      //  if ((e.target as HTMLElement).closest("[data-no-cursor]")) return; // skip curso
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      for (let i = 0; i < 3; i++) {
        particlesRef.current.push(
          new Particle(
            mouse.current.x,
            mouse.current.y,
            hueRef.current
          )
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default SmokeyCursor;
