import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "HangulTyping",
      fileName: (format) => `hangul-typing.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  server: {
    open: true,
  },
});

export const exampleServerConfig = defineConfig({
  root: resolve(__dirname, "examples"),
  server: {
    open: true,
  },
});
