export const ESLINT_RULES_META: Record<
  string,
  {
    type: "boolean" | "number" | "select" | "text";
    options?: (string | number | boolean)[];
    description?: string;
  }
> = {
  "no-var": {
    type: "boolean",
    options: [true, false],
    description: "Disallow var declarations.",
  },
  "prefer-const": {
    type: "boolean",
    options: [true, false],
    description: "Suggest using const for variables that are never reassigned.",
  },
  "no-console": {
    type: "select",
    options: ["off", "warn", "error"],
    description: "Disallow the use of console.",
  },
  "no-unused-vars": {
    type: "select",
    options: ["off", "warn", "error"],
    description: "Disallow unused variables.",
  },
  "no-debugger": {
    type: "select",
    options: ["off", "warn", "error"],
    description: "Disallow debugger statements.",
  },
  "no-alert": {
    type: "select",
    options: ["off", "warn", "error"],
    description: "Disallow alert, confirm, and prompt.",
  },
  "no-undef": {
    type: "select",
    options: ["off", "warn", "error"],
    description: "Disallow the use of undeclared variables.",
  },
  "no-empty": {
    type: "select",
    options: ["off", "warn", "error"],
    description: "Disallow empty block statements.",
  },

  eqeqeq: {
    type: "select",
    options: ["off", "warn", "error"],
    description: "Require === and !== instead of == and !=",
  },
  quotes: {
    type: "select",
    options: ["single", "double", "backtick"],
    description: "Specify whether to use single or double quotes.",
  },
  semi: {
    type: "select",
    options: ["always", "never"],
    description: "Require or disallow semicolons instead of ASI.",
  },
  indent: {
    type: "number",
    description: "Number of spaces per indentation level.",
  },
  "arrow-parens": {
    type: "select",
    options: ["always", "as-needed"],
    description: "Require parentheses around arrow function arguments.",
  },
  "object-curly-spacing": {
    type: "select",
    options: ["always", "never"],
    description: "Require or disallow spaces inside curly braces.",
  },
  "comma-dangle": {
    type: "select",
    options: ["always", "always-multiline", "never"],
    description: "Require or disallow trailing commas.",
  },
  "prefer-arrow-callback": {
    type: "boolean",
    options: [true, false],
    description: "Prefer arrow functions as callbacks.",
  },
  "no-trailing-spaces": {
    type: "boolean",
    options: [true, false],
    description: "Disallow trailing whitespace at the end of lines.",
  },
  "space-before-blocks": {
    type: "select",
    options: ["always", "never"],
    description: "Require or disallow space before blocks.",
  },

  "react/prop-types": {
    type: "select",
    options: ["off", "warn", "error"],
    description: "Prevent missing prop validation in React components.",
  },
  "react/react-in-jsx-scope": {
    type: "select",
    options: ["off", "warn", "error"],
    description: "Prevent missing React import in files using JSX.",
  },

  "vue/no-unused-components": {
    type: "select",
    options: ["off", "warn", "error"],
    description: "Disallow registration of components that are not used.",
  },
  "vue/multi-word-component-names": {
    type: "select",
    options: ["off", "warn", "error"],
    description: "Enforce multi-word component names in Vue.",
  },

  "@typescript-eslint/no-unused-vars": {
    type: "select",
    options: ["off", "warn", "error"],
    description: "Disallow unused variables in TypeScript.",
  },
  "@typescript-eslint/explicit-module-boundary-types": {
    type: "select",
    options: ["off", "warn", "error"],
    description:
      "Require explicit return and argument types on exported functions.",
  },
  "@typescript-eslint/no-explicit-any": {
    type: "select",
    options: ["off", "warn", "error"],
    description: "Disallow usage of the any type.",
  },
  "@typescript-eslint/no-inferrable-types": {
    type: "select",
    options: ["off", "warn", "error"],
    description:
      "Disallow explicit type declarations for variables or parameters initialized to a number, string, or boolean.",
  },
};
