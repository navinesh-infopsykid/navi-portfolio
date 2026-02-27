import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/navi-portfolio/", // 🔥 Required for GitHub Pages
  plugins: [react()],
  build: {
    outDir: "docs",   // 🔥 Build output folder
    emptyOutDir: true // 🔥 Clears old docs before building
  }
});