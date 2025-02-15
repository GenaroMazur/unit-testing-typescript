import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier"
import eslintConfigPrettier from "eslint-config-prettier"


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    plugins:{
      prettier:eslintPluginPrettier
    },
    rules:{
      "prettier/prettier":"error"
    }
  },
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
];