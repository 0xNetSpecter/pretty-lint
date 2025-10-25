<img src="./icon.png" width="96" style="margin-inline: auto;" alt="PrettyLint Logo" />

</p>

<h1 align="center">PrettyLint</h1>

<p align="center">
  <strong>Visual tool to generate and customize ESLint + Prettier configs.</strong><br/>
  Simplify your setup, avoid syntax errors, and make your code beautiful.
</p>

---

## Available on VS Code Marketplace

You can install PrettyLint directly from the **Extensions panel** in VS Code:

1. Open **Extensions** (`Ctrl + Shift + X`)
2. Search for **"PrettyLint"**
3. Click **Install**

or install manually:

```bash
code --install-extension 0xnetspecter.pretty-lint
```

---

## Features

- **Interactive Configurator**

  - ESLint & Prettier configuration via a webview UI
  - Instant preview of all available rules and options

- **Smart Metadata**

  - All ESLint & Prettier settings are preloaded from JSON schemas
  - Each rule has type, description, and possible values

- **One-click generation**

  - Instantly creates `.eslintrc.json` and `.prettierrc` files in your workspace

- **Persistent Settings**
  - Saves user preferences between sessions

---

## Usage

1. Open **Command Palette** (`Ctrl + Shift + P` / `Cmd + Shift + P` / `Ctrl + P`)
2. Type and run one of the commands:

   - `>Open Prettier Configurator`
   - `>Open ESLint Configurator`

3. Adjust your preferences
4. Click **Save & Generate** — and your config files are created automatically!

---

## Example Output

**.prettierrc**

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100
}
```
