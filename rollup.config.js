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
  presets: [
    [
      "env",
      {
        modules: false
      }
    ]
  ],
  plugins: ["external-helpers", "transform-react-jsx"]
};

export default {
  input: "./client/app/main.js",
  output: {
    file: "./client/dist/js/app.js",
    format: "cjs"
  },
  plugins: [
    resolve(resolveConfig),
    commonjs(),
    scss(scssConfig)
    // babel(babelConfig)
  ]
};
