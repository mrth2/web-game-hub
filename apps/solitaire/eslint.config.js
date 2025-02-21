import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact, { rules } from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      ...rules,
      "no-restricted-imports": ["error", {
        zones: [
          {
            target: './src/features',
            from: './src/app',
          },
          {
            target: [
              './src/components',
              './src/hooks',
              './src/utils',
              './src/types',
              './src/lib',
            ],
          }
        ]
      }],
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];