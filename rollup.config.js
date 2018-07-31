import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import scss from "rollup-plugin-scss";
import babel from "rollup-plugin-babel";

const resolveConfig = {
  browser: true
};

const scssConfig = {
  output: "./client/dist/style/app.css"
};

const babelConfig = {
  babelrc: false,
  exclude: "node_modules/**",
  // presets: [
  //   [
  //     "env",
  //     {
  //       modules: false
  //     }
  //   ],
  //   ["minify"]
  // ],
  plugins: [["transform-react-jsx", { pragma: "h" }], "external-helpers"]
};

export default {
  input: "./client/app/main.js",
  output: {
    file: "./client/dist/js/app.js",
    format: "iife"
  },
  plugins: [
    resolve(resolveConfig),
    scss(scssConfig),
    babel(babelConfig),

    commonjs()
  ]
};
