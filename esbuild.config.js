import * as esbuild from "esbuild";
import { glsl } from "esbuild-plugin-glsl";
import { aliasPath } from "esbuild-plugin-alias-path";

/* - Setup */
const env = process.env.NODE_ENV;
const production = env === "production";

const CONFIG = {
  PORT: 8000,
  ENTRY: ["src/app.js", "src/styles/main.css", "src/styles/out.css"],
  SERVE_DIR: "dist",
  OUT_DIR: "dist",
  BUILD_DIR: "build",
};

/* -- Plugins */
const plugins = [
  glsl({
    minify: production,
  }),
  aliasPath({
    alias: { "~": "./src" },
  }),
];

const loader = {
  ".png": "dataurl",
  ".webp": "dataurl",
  ".glb": "dataurl",
};

const ctx = await esbuild.context({
  // target: "es2019",
  target: ["chrome58", "firefox57", "safari11", "edge16"], // Add this line for CSS compatibility

  bundle: true,
  entryPoints: CONFIG.ENTRY,
  outdir: production ? CONFIG.BUILD_DIR : CONFIG.OUT_DIR,
  minify: production,
  sourcemap: !production,
  target: production ? "es2019" : "esnext",
  plugins,
  loader,
});

if (production) {
  await ctx.rebuild();
  ctx.dispose();
} else {
  await ctx.watch();
  await ctx
    .serve({
      servedir: CONFIG.SERVE_DIR,
      port: CONFIG.PORT,
    })
    .then(() => console.log("http://localhost:8000/"));
}
