import type { ConfigSchema } from "./types";

export const PRETTIER_SCHEMA: ConfigSchema = {
  printWidth: {
    type: "number",
    default: 80,
    description: "The line length where Prettier will try to wrap code.",
  },
  tabWidth: {
    type: "number",
    default: 2,
    description: "Number of spaces per indentation level.",
  },
  useTabs: {
    type: "boolean",
    default: false,
    description: "Indent with tabs instead of spaces.",
  },
  semi: {
    type: "boolean",
    default: true,
    description: "Print semicolons at the ends of statements.",
  },
  singleQuote: {
    type: "boolean",
    default: true,
    description: "Use single quotes instead of double quotes.",
  },
  quoteProps: {
    type: "select",
    default: "as-needed",
    options: ["as-needed", "consistent", "preserve"],
    description: "Change when properties in objects are quoted.",
  },
  trailingComma: {
    type: "select",
    default: "es5",
    options: ["none", "es5", "all"],
    description: "Print trailing commas wherever possible when multi-line.",
  },
  arrowParens: {
    type: "select",
    default: "always",
    options: ["always", "avoid"],
    description: "Include parentheses around a sole arrow function parameter.",
  },
  endOfLine: {
    type: "select",
    default: "lf",
    options: ["auto", "lf", "crlf", "cr"],
    description: "Which end of line characters to apply.",
  },
};
