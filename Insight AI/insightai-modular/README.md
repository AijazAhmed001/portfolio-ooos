# InsightAI Analytics Platform

A frontend-only AI analytics SaaS interface built with React, TypeScript and Vite. The codebase is deliberately modular: pages stay thin while dashboard, charts, AI, datasets, filters, tables, customization, reports, search, export, stores, hooks, services and utilities are separated by responsibility.

## Run

```bash
npm install
npm run dev
```

Open the Vite URL, normally `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Main routes

- `/` – dataset upload / sample dataset entry
- `/dashboard` – KPI dashboard, charts, comparison, AI insight, data table, customization
- `/analytics` – metrics explorer, forecasting, correlations, what-if simulation, goals
- `/insights` – AI opportunities, anomalies and findings
- `/datasets` – dataset health, upload/parse CSV, preview, schema information
- `/reports` – report management
- `/chart-studio` – custom visualization builder UI
- `/settings` – appearance and shortcuts

## Key interactions

- Upload a CSV and parse it client-side with Papa Parse.
- Switch date ranges to trigger skeleton-to-content loading transitions.
- Toggle comparison mode to reveal previous-period data on the revenue chart.
- Open AI Analyst and use prompt chips or type a question; mock responses stream word-by-word.
- Click Customize to drag/reorder or remove dashboard widgets. Layout is stored in `localStorage`.
- Use `Ctrl/Cmd + K` for the command palette and `A` to open AI when focus is not inside an input.
- Export the customer data as CSV from the header.
- Toggle dark/light appearance.

## Stack

React 19, TypeScript, Vite, React Router, Zustand, Framer Motion, Recharts, TanStack Table-ready data layer, dnd-kit, Papa Parse, Lucide React, html2canvas and jsPDF.

## Note

This project is frontend-only. AI answers, anomalies and forecasts are simulated/mocked for portfolio demonstration, while CSV upload/parsing, interactions, state, sorting-style table filtering/pagination, local persistence and exports run in the browser.
