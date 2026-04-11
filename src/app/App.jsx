import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";
import AppShell from "@/components/AppShell.jsx";
import ToastContainer from "@/components/ToastContainer.jsx";
import LoginPage from "@/pages/LoginPage.jsx";
import DashboardPage from "@/pages/DashboardPage.jsx";
import RegistroPage from "@/pages/RegistroPage.jsx";
import ConsultaPage from "@/pages/ConsultaPage.jsx";
import ReportesPage from "@/pages/ReportesPage.jsx";
import AyudaPage from "@/pages/AyudaPage.jsx";
import GestionUsuariosPage from "@/pages/GestionUsuariosPage.jsx";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

function LoginRoute() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <LoginPage />;
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginRoute />} />
        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/consulta" element={<ConsultaPage />} />
          <Route path="/reportes" element={<ReportesPage />} />
          <Route path="/usuarios" element={<GestionUsuariosPage />} />
          <Route path="/ayuda" element={<AyudaPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </>
  );
}
