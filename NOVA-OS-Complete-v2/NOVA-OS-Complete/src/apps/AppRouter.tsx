import { lazy, Suspense, type ComponentType } from 'react';
import type { AppId } from '../store/useNovaStore';

const appLoaders: Record<AppId, () => Promise<{ default: ComponentType }>> = {
  dashboard: () => import('./dashboard/DashboardApp'), performance: () => import('./performance/PerformanceApp'),
  files: () => import('./files/FilesApp'), storage: () => import('./storage/StorageApp'), duplicates: () => import('./duplicates/DuplicateFinder'),
  processes: () => import('./processes/ProcessesApp'), services: () => import('./services/ServicesApp'), startup: () => import('./startup/StartupApp'),
  apps: () => import('./applications/ApplicationsApp'), network: () => import('./network/NetworkApp'), terminal: () => import('./terminal/TerminalApp'),
  developer: () => import('./developer/DeveloperApp'), health: () => import('./health/HealthApp'), notifications: () => import('./notifications/NotificationsApp'),
  clipboard: () => import('./clipboard/ClipboardApp'), screenshots: () => import('./screenshots/ScreenshotsApp'), media: () => import('./media/MediaApp'),
  notes: () => import('./notes/NotesApp'), tasks: () => import('./tasks/TasksApp'), calendar: () => import('./calendar/CalendarApp'), logs: () => import('./logs/LogsApp'),
  privacy: () => import('./privacy/PrivacyApp'), ai: () => import('./ai/NovaAIApp'), settings: () => import('./settings/SettingsApp'),
};

const apps = Object.fromEntries(Object.entries(appLoaders).map(([id, load]) => [id, lazy(load)])) as unknown as Record<AppId, ComponentType>;

export default function AppRouter({ id }: { id: AppId }) {
  const App = apps[id];
  return <Suspense fallback={<div className="app-loading" role="status" aria-label="Opening app"><span /></div>}><App /></Suspense>;
}
