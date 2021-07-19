import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

export default {
  // entry point for Rollup for component library, containing all exports
  input: "src/index.ts",
  //   since building the ESM and CommonJS bundles, reading output files for both bundles from package.json
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    //avoids bundling peerDeps(react in this case) in final bundleas these are provided by consumer application
    peerDepsExternal(),
    // includes 3rd party ext deps into final bundle(if any)
    resolve(),
    // enables conversion to CJS so that they can be included in final bundle
    commonjs(),
    // compiles ts code to js in final bundle
    typescript({ useTsconfigDeclarationDir: true }),
    // compiles css
    postcss({
      extensions: [".css"],
    }),
  ],
};
