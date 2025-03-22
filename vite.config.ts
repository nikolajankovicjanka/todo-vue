import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(async () => {
  const tsconfigPaths = await import("vite-tsconfig-paths");

  return {
    plugins: [vue(), tsconfigPaths.default()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});