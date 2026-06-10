import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ReportsPage from "../pages/ReportsPage";
import BudgetPage from "../pages/BudgetPage";
import ProtectedRoute from "../components/ProtectedRoute";
import FinancialGoalPage from "../pages/FinancialGoalPage";
import ProfilePage from "../pages/ProfilePage";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/budget"
          element={
            <ProtectedRoute>
              <BudgetPage />
            </ProtectedRoute>
          }
        />
        <Route
  path="/financial-goal"
  element={
  <ProtectedRoute>
    <FinancialGoalPage />
  </ProtectedRoute>
}
/>
<Route
  path="/profile"
  element={<ProfilePage />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;