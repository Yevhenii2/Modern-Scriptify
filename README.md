# 🧩 Scriptify

A modern Chrome extension that lets you manage, edit, and inject custom scripts on specific websites. Built with TypeScript, React, SCSS modules, and Webpack.

---

## ✨ Features

- ✅ Enable or disable custom scripts per domain
- ✏️ Edit, save, and inject scripts using `chrome.storage.local`
- 🌐 URL-to-domain formatting for clean display
- 📂 Uses SCSS modules for modular styling
- ⚙️ Fully custom Webpack setup (no CRA)
- 💅 ESLint + Stylelint support
- 🚀 Optimized for Chrome Extension Manifest V3

---

## 🛠️ Tech Stack

| Tool            | Purpose                          |
|-----------------|----------------------------------|
| React + TypeScript | App UI + component logic       |
| SCSS Modules    | Scoped and maintainable styles   |
| Webpack         | Bundles background/content/popup |
| `chrome.storage`| Script persistence               |
| React Router    | Navigation (e.g., edit by ID)    |
| ESLint + Stylelint | Code quality & formatting     |
---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start Dev Build

```bash
npm run build
```
The output will go to the dist/ folder. Load that folder as an "unpacked extension" in Chrome.