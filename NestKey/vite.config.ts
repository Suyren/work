import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 在組件內import時, @指向/src目錄
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
