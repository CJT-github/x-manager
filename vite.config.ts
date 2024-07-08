import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import AntdResolver from "unplugin-auto-import-antd";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      dts: "@types/auto-imports.d.ts",
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.md$/, // .md,
      ],
      resolvers: [
        AntdResolver({
          prefix: "A",
        }),
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
