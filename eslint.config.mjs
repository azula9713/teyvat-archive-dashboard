import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.config({
    ignorePatterns: [
      "node_modules",
      "build",
      "dist",
      "coverage",
      "public",
      "out",
      "next-env.d.ts",
      "next.config.js",
      "postcss.config.js",
      "tailwind.config.js",
      "babel.config.js",
      "jest.config.js",
      "eslint.config.js",
      "eslint.config.mjs",
      ".next",
      ".husky",
      ".vscode"
    ],
    plugins: ["import"],
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      "react/jsx-props-no-spreading": "off",
      "import/prefer-default-export": "off",
      "no-unused-vars": "off",
      "no-param-reassign": "off",
      "no-console": "off",
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/no-unescaped-entities": "off",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index"
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ]
    }
  })
];

export default eslintConfig;
