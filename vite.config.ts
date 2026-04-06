import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/plex-sessions-card.ts",
      formats: ["es"],
      fileName: () => "plex-server-sessions.js",
    },
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      external: [],
    },
  },
});
