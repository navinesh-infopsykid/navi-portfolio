import { useEffect, useRef } from "react";
import WebGLFluidEnhanced from "webgl-fluid-enhanced";

const FluidCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const container = containerRef.current;
    if (!container) return;
    if (window.innerWidth < 768) return;

    const Fluid = WebGLFluidEnhanced as unknown as new (
      container: HTMLElement,
      config?: Record<string, unknown>
    ) => { destroy?: () => void };

    const fluid = new Fluid(container, {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 512,

      DENSITY_DISSIPATION: 2.8,
      VELOCITY_DISSIPATION: 2.4,

      PRESSURE: 0.2,
      PRESSURE_ITERATIONS: 20,
      CURL: 30,

      SPLAT_RADIUS: 0.25,

      SHADING: true,
      COLORFUL: false,
      TRANSPARENT: true,

      BLOOM: true,
      BLOOM_INTENSITY: 0.8,
      SUNRAYS: false,
    });

    return () => {
      fluid.destroy?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "auto", // 🔥 REQUIRED
        zIndex: 9999,          // 🔥 MUST BE ON TOP
      }}
    />
  );
};

export default FluidCursor;
