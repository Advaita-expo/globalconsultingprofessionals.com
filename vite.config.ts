import { defineConfig } from "vite";
import { resolve } from "node:path";

const pages = [
  "",
  "our-story",
  "expertise",
  "solutions",
  "why-gcp",
  "people",
  "experience",
  "contact",
];
export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [
          page || "home",
          resolve(import.meta.dirname, page, "index.html"),
        ]),
      ),
    },
  },
});
