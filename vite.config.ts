import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { blogSharePages } from "./vite-plugins/blog-share-pages";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Lovable serves /__l5e asset pointers from its own host; proxying keeps the
    // CDN-referenced logo artwork rendering in dev without committing binaries.
    proxy: {
      "/__l5e": {
        target: "https://fuselabsio.lovable.app",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    blogSharePages(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
