import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { PrettierSettings, EslintSettings } from "./types";

export function generatePrettier(config: PrettierSettings) {
  const workspace = vscode.workspace.workspaceFolders?.[0];
  if (!workspace) {
    vscode.window.showErrorMessage("Please open a folder first.");
    return;
  }

  const filePath = path.join(workspace.uri.fsPath, ".prettierrc");
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
  vscode.window.showInformationMessage(".prettierrc generated!");
}

export function generateEslint(config: EslintSettings) {
  const workspace = vscode.workspace.workspaceFolders?.[0];
  if (!workspace) {
    vscode.window.showErrorMessage("Please open a folder first.");
    return;
  }

  const filePath = path.join(workspace.uri.fsPath, ".eslintrc.json");
  const eslintConfig = {
    env: {
      browser: config.envBrowser,
      node: config.envNode,
      es2021: true,
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    rules: {
      quotes: ["error", config.quotes],
      semi: ["error", config.semi ? "always" : "never"],
    },
  };

  fs.writeFileSync(filePath, JSON.stringify(eslintConfig, null, 2));
  vscode.window.showInformationMessage(".eslintrc.json generated!");
}
