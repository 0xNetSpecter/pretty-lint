import * as vscode from "vscode";
import { getPrettierHtml } from "./webview/getPrettierHtml";
import { getEslintHtml } from "./webview/getEslintHtml";
import { generatePrettier, generateEslint } from "./utils/fileGenerator";
import { PRETTIER_DEFAULT_CONFIG } from "./configs/prettier.config";
import { ESLINT_RULES_META } from "./configs/eslint.config";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("pretty-lint.openPrettier", () => {
      const panel = vscode.window.createWebviewPanel(
        "prettierConfig",
        "Prettier Configurator",
        vscode.ViewColumn.One,
        { enableScripts: true }
      );

      panel.webview.html = getPrettierHtml(PRETTIER_DEFAULT_CONFIG);

      panel.webview.onDidReceiveMessage((msg) => {
        if (msg.command === "save") generatePrettier(msg.data);
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("pretty-lint.openEslint", () => {
      const panel = vscode.window.createWebviewPanel(
        "eslintConfig",
        "ESLint Configurator",
        vscode.ViewColumn.One,
        { enableScripts: true }
      );

      panel.webview.html = getEslintHtml(ESLINT_RULES_META);

      panel.webview.onDidReceiveMessage((msg) => {
        if (msg.command === "save") generateEslint(msg.data);
      });
    })
  );
}

export function deactivate() {}
