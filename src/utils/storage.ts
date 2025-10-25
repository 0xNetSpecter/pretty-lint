import * as vscode from "vscode";

export interface PrettyLintSettings {
  tabWidth: number;
  semi: boolean;
  singleQuote: boolean;
}

export function getStoredSettings(
  context: vscode.ExtensionContext
): PrettyLintSettings {
  const saved =
    context.globalState.get<PrettyLintSettings>("prettyLintSettings");
  const defaults: PrettyLintSettings = {
    tabWidth: 2,
    semi: true,
    singleQuote: true,
  };
  return { ...defaults, ...saved };
}
export async function saveSettings(
  context: vscode.ExtensionContext,
  settings: PrettyLintSettings
) {
  await context.globalState.update("prettyLintSettings", settings);
}
