import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": "warn",
      "no-console": "off",
      "linebreak-style": ["error", "windows"],
    },
  },
  eslintConfigPrettier,
];
