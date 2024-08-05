import { defineConfig } from "tsup";

export default defineConfig((opts) => ({
  entryPoints: ["src/index.ts"],
  splitting: true,
  format: ["esm"],
  dts: false,
  clean: !opts.watch,
  sourcemap: true,
  minify: false,
  outDir: "dist",
  target: "es2022",
}));
