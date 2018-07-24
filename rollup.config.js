import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "./client/app/main.js",
  output: {
    file: "./client/dist/app.js",
    format: "cjs"
  },
  plugins: [
    resolve({
      browser: true
    }),
    commonjs()
  ]
};
