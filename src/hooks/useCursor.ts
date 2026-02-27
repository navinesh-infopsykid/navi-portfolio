import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

interface CursorState {
  dot: Point;
  ring: Point;
  hovered: boolean;
}

export function useCursor(): CursorState {
  const [dot, setDot] = useState<Point>({ x: -200, y: -200 });
  const [ring, setRing] = useState<Point>({ x: -200, y: -200 });
  const [hovered, setHovered] = useState(false);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef<Point>({ x: -200, y: -200 });

  useEffect(() => {
    const onMove = (e: MouseEvent): void => {
      setDot({ x: e.clientX, y: e.clientY });
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = (): void => {
      setRing((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.14,
        y: prev.y + (targetRef.current.y - prev.y) * 0.14,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, [data-hover]")) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return { dot, ring, hovered };
}
