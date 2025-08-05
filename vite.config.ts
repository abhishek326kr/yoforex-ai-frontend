import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      '/auth': {
        target: 'https://backend.axiontrust.com',
        changeOrigin: true,
      },
      '/prices': {
        target: 'https://backend.axiontrust.com',
        changeOrigin: true,
      },
    },
  },
});