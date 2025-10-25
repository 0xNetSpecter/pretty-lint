export function getEslintHtml(metaConfig: Record<string, any>): string {
  const renderRule = (name: string, meta: any) => {
    let valueInput = "";

    switch (meta.type) {
      case "boolean":
        valueInput = `
          <div class="select-wrapper">
            <select class="arg" data-name="${name}">
              ${meta.options
                .map((opt: boolean) => `<option value="${opt}">${opt}</option>`)
                .join("")}
            </select>
          </div>`;
        break;

      case "number":
        valueInput = `
          <input class="arg" type="number"
                 value="${meta.default ?? 2}"
                 data-name="${name}" />`;
        break;

      case "select":
        valueInput = `
          <div class="select-wrapper">
            <select class="arg" data-name="${name}">
              ${meta.options
                .map((opt: string) => `<option value="${opt}">${opt}</option>`)
                .join("")}
            </select>
          </div>`;
        break;

      default:
        valueInput = `
          <input class="arg" type="text"
                 placeholder="value"
                 data-name="${name}" />`;
    }

    return `
      <div class="rule">
        <div class="rule-header">
          <strong>${name}</strong>
          ${
            meta.description
              ? `<span class="tooltip">
                  <span class="tooltip-icon">?</span>
                  <span class="tooltip-text">${meta.description}</span>
                 </span>`
              : ""
          }
        </div>
        <div class="select-wrapper">
          <select class="level" data-name="${name}">
            <option value="off">off</option>
            <option value="warn">warn</option>
            <option value="error">error</option>
          </select>
        </div>
        ${valueInput}
      </div>
    `;
  };

  const rulesHtml = Object.entries(metaConfig)
    .map(([name, meta]) => renderRule(name, meta))
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

      .rule {
        display: flex;
        align-items: center;
        gap: 10px;
        background: #2b2b2b;
        padding: 10px;
        border-radius: 8px;
        margin-bottom: 8px;
        border: 1px solid #333;
        position: relative;
      }

      .rule-header {
        display: flex;
        align-items: center;
        gap: 6px;
        width: 180px;
      }

      .rule strong {
        color: #9cdcfe;
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
        transition: background 0.2s ease;
      }

      .tooltip:hover .tooltip-icon {
        background: #0a84ff;
      }

      .tooltip-text {
        visibility: hidden;
        opacity: 0;
        width: max-content;
        max-width: 400px;
        background-color: rgba(30, 30, 30, 0.95);
        color: #eee;
        text-align: left;
        border-radius: 6px;
        padding: 8px 10px;
        position: absolute;
        z-index: 10;
        top: 24px;
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

      button {
        background: #007acc;
        border: none;
        color: #fff;
        padding: 8px 12px;
        border-radius: 6px;
        margin-top: 12px;
        cursor: pointer;
        transition: background 0.2s ease;
      }

      button:hover {
        background: #0a84ff;
      }
    </style>
  </head>
  <body>
    <h2>ESLint Configurator</h2>
    <div id="rules">${rulesHtml}</div>

    <button id="saveBtn">Save & Generate</button>

    <script>
      const vscode = acquireVsCodeApi();

      document.getElementById('saveBtn').addEventListener('click', () => {
        const rules = {};
        for (const ruleEl of document.querySelectorAll('.rule')) {
          const name = ruleEl.querySelector('.level').dataset.name;
          const level = ruleEl.querySelector('.level').value;
          const argEl = ruleEl.querySelector('.arg');
          let arg = argEl ? argEl.value : undefined;
          if (arg === "true") arg = true;
          if (arg === "false") arg = false;
          rules[name] = arg ? [level, arg] : [level];
        }
        vscode.postMessage({ command: 'save', data: { rules } });
      });
    </script>
  </body>
  </html>`;
}
