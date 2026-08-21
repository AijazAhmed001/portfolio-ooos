import fs from 'node:fs';
const required=['electron/main/main.cjs','electron/preload/preload.cjs','electron/ipc/registerIpc.cjs','src/App.tsx','src/apps/AppRouter.tsx','src/apps/dashboard/DashboardApp.tsx','src/apps/files/FilesApp.tsx','src/apps/health/HealthApp.tsx','src/apps/ai/NovaAIApp.tsx','src/store/useNovaStore.ts'];
const missing=required.filter(p=>!fs.existsSync(p));if(missing.length){console.error('Missing:',missing);process.exit(1)}console.log(`NOVA structure OK (${required.length} critical files checked).`);
