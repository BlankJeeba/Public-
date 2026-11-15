# Installation Guide — BlankJeeba Website

Follow these steps to install and run the **BlankJeeba** website locally on Windows, macOS, or Linux.

---

## 1. Prerequisites

- **Node.js**: Version `20.x` or `22.x` LTS recommended (`node -v`)
- **Package Manager**: `npm` (included with Node.js) or `bun` (`bun.lock` is included)

---

## 2. Install Dependencies

Open a terminal inside the project root (`BlankJeeba_Complete_Website_Backup/`):

Using **npm**:
```bash
npm install
```

Or using **bun**:
```bash
bun install
```

> **Note:** No `.env` file or secret API keys are required to run or build the website. Copying `.env.example` to `.env` is completely optional.

---

## 3. Run the Local Development Server

Start the Vite dev server on port `3000`:

```bash
npm run dev
```

Open your browser to:
- `http://localhost:3000` (English)
- `http://localhost:3000/hi` (Hindi)

---

## 4. Verify TypeScript Types & Build for Production

Run the TypeScript compiler check:
```bash
npm run lint
```

Build the production static site into `dist/`:
```bash
npm run build
```

Preview the compiled `dist/` build locally:
```bash
npm run preview
```

---

## 5. Troubleshooting

- **Port 3000 already in use**: Run `npx vite --port=5173` to use a different local port.
- **Peer dependency warning on older npm**: Run `npm install --legacy-peer-deps` if using an older npm version, though React 19 peer ranges are already supported by all dependencies in `package.json`.
- **Clean build artifacts**: Run `npm run clean` (`rm -rf dist server.js`) and rebuild with `npm run build`.
