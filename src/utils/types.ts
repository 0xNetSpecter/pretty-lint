export interface PrettierSettings {
  semi: boolean;
  singleQuote: boolean;
  tabWidth: number;
  trailingComma: string;
  printWidth: number;
}

export interface EslintSettings {
  quotes: "single" | "double";
  semi: boolean;
  envBrowser: boolean;
  envNode: boolean;
}
