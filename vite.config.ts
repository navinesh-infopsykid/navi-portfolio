import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * BASE PATH
 * - GitHub Pages serves this repo at https://<user>.github.io/navi-portfolio/
 *   so assets must be requested from "/navi-portfolio/".
 * - Docker / Netlify / Vercel / any custom domain serve from the root "/".
 *
 * The Dockerfile sets VITE_BASE=/ ; GitHub Actions leaves it unset.
 */
const base = process.env.VITE_BASE ?? "/navi-portfolio/";

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
