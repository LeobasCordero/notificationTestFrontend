import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import pluginImport from "eslint-plugin-import";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginImport.configs.recommended.rules,
      ...pluginJsxA11y.configs.recommended.rules,
      "prettier/prettier": "error",
      "react/jsx-filename-extension": [1, { "extensions": [".jsx", ".tsx"] }],
      "import/extensions": [ "error", "ignorePackages", {
          "ts": "never",
          "tsx": "never"
      }],
      "import/no-unresolved": "off"
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react': pluginReact,
      'import': pluginImport,
      'jsx-a11y': pluginJsxA11y
    }
  }
];
