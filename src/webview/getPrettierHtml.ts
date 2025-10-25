import { PRETTIER_SCHEMA } from "../configs/prettier.schema";

export function getPrettierHtml(config: Record<string, any>): string {
  const renderField = (key: string, meta: any, value: any) => {
    const tooltip = meta.description
      ? `<span class="tooltip">
            <span class="tooltip-icon">?</span>
            <span class="tooltip-text">${meta.description}</span>
         </span>`
      : "";

    switch (meta.type) {
      case "boolean":
        return `
          <div class="field">
            <div class="field-label">
              <label for="${key}">${key}</label>
              ${tooltip}
            </div>
            <label class="switch">
              <input type="checkbox" id="${key}" ${value ? "checked" : ""}/>
              <span class="slider"></span>
            </label>
          </div>
        `;

      case "number":
        return `
          <div class="field">
            <div class="field-label">
              <label for="${key}">${key}</label>
              ${tooltip}
            </div>
            <input type="number" id="${key}" value="${value}" />
          </div>
        `;

      case "select":
        const options = (meta.options || [])
          .map(
            (opt: string) =>
              `<option value="${opt}" ${
                value === opt ? "selected" : ""
              }>${opt}</option>`
          )
          .join("");
        return `
          <div class="field">
            <div class="field-label">
              <label for="${key}">${key}</label>
              ${tooltip}
            </div>
            <div class="select-wrapper">
              <select id="${key}">${options}</select>
            </div>
          </div>
        `;

      default:
        return `
          <div class="field">
            <div class="field-label">
              <label for="${key}">${key}</label>
              ${tooltip}
            </div>
            <input type="text" id="${key}" value="${value}" />
          </div>
        `;
    }
  };

  const fieldsHtml = Object.entries(PRETTIER_SCHEMA)
    .map(([key, meta]) =>
      renderField(key, meta, config[key] ?? meta.default ?? "")
    )
    .join("");

  return `
  <html>
  <head>
    <style>
      body {
        font-family: 'Segoe UI', sans-serif;
        background: #1e1e1e;
        color: #ddd;
        padding: 1rem;
      }

      h2 {
        color: #fff;
        margin-bottom: 1rem;
      }

      .field {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #2b2b2b;
        padding: 10px;
        border-radius: 8px;
        margin-bottom: 8px;
        border: 1px solid #333;
      }

      .field-label {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      input, select {
        background: #1e1e1e;
        color: #ddd;
        border: 1px solid #444;
        border-radius: 6px;
        padding: 4px 8px;
        outline: none;
        font-size: 13px;
        transition: all 0.2s ease;
      }

      input:focus, select:focus {
        border-color: #007acc;
        box-shadow: 0 0 4px #007acc66;
      }

      .select-wrapper {
        position: relative;
        display: inline-block;
      }

      .select-wrapper::after {
        content: "▾";
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: #aaa;
        font-size: 10px;
      }

      select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        padding-right: 22px;
      }

      .tooltip {
        position: relative;
        display: inline-block;
        cursor: pointer;
      }

      .tooltip-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: #007acc;
        border-radius: 50%;
        text-align: center;
        line-height: 16px;
        color: #fff;
        font-size: 11px;
        font-weight: bold;
      }

      .tooltip-text {
        visibility: hidden;
        opacity: 0;
        width: max-content;
        max-width: 350px;
        background-color: rgba(30,30,30,0.95);
        color: #eee;
        border-radius: 6px;
        padding: 8px 10px;
        position: absolute;
        z-index: 10;
        top: 22px;
        left: 0;
        border: 1px solid #444;
        box-shadow: 0 4px 8px rgba(0,0,0,0.4);
        transition: opacity 0.2s ease, visibility 0.2s ease;
        font-size: 12px;
      }

      .tooltip:hover .tooltip-text {
        visibility: visible;
        opacity: 1;
      }

      .switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 20px;
      }

      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0; left: 0;
        right: 0; bottom: 0;
        background-color: #444;
        transition: 0.2s;
        border-radius: 20px;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 14px; width: 14px;
        left: 3px; bottom: 3px;
        background-color: white;
        transition: 0.2s;
        border-radius: 50%;
      }

      input:checked + .slider {
        background-color: #007acc;
      }

      input:checked + .slider:before {
        transform: translateX(20px);
      }

      button {
        background: #007acc;
        border: none;
        color: #fff;
        padding: 8px 12px;
        border-radius: 6px;
        margin-top: 20px;
        cursor: pointer;
        transition: background 0.2s ease;
      }

      button:hover {
        background: #0a84ff;
      }
    </style>
  </head>
  <body>
    <h2>Prettier Configurator</h2>
    <form>${fieldsHtml}</form>
    <button id="saveBtn">Save & Generate</button>

    <script>
      const vscode = acquireVsCodeApi();
      document.getElementById('saveBtn').addEventListener('click', () => {
        const data = {};
        for (const el of document.querySelectorAll('input, select')) {
          const id = el.id;
          if (!id) continue;
          if (el.type === 'checkbox') data[id] = el.checked;
          else if (el.type === 'number') data[id] = Number(el.value);
          else data[id] = el.value;
        }
        vscode.postMessage({ command: 'save', data });
      });
    </script>
  </body>
  </html>`;
}
