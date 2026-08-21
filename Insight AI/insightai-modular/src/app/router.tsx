import { createHashRouter, Outlet } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import DatasetStartPage from "../pages/Home/DatasetStartPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import AnalyticsPage from "../pages/Analytics/AnalyticsPage";
import InsightsPage from "../pages/Insights/InsightsPage";
import DatasetsPage from "../pages/Datasets/DatasetsPage";
import ReportsPage from "../pages/Reports/ReportsPage";
import ChartStudioPage from "../pages/ChartStudio/ChartStudioPage";
import SettingsPage from "../pages/Settings/SettingsPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

function Shell() {
  return <AppShell><Outlet /></AppShell>;
}

export const router = createHashRouter([
  { path: "/", element: <DatasetStartPage /> },
  {
    element: <Shell />,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/analytics", element: <AnalyticsPage /> },
      { path: "/insights", element: <InsightsPage /> },
      { path: "/datasets", element: <DatasetsPage /> },
      { path: "/reports", element: <ReportsPage /> },
      { path: "/chart-studio", element: <ChartStudioPage /> },
      { path: "/settings", element: <SettingsPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
