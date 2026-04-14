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
import TramitesPage from "@/pages/TramitesPage.jsx";
import DirectorioPage from "@/pages/DirectorioPage.jsx";
import FinanzasPage from "@/pages/FinanzasPage.jsx";
import BeneficiariosPage from "@/pages/BeneficiariosPage.jsx";
import DocumentosPage from "@/pages/DocumentosPage.jsx";
import AdministracionPage from "@/pages/AdministracionPage.jsx";

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
          {/* Menu Principal */}
          <Route path="/dashboard"  element={<DashboardPage />} />
          <Route path="/registro"   element={<RegistroPage />} />
          <Route path="/consulta"   element={<ConsultaPage />} />
          <Route path="/reportes"   element={<ReportesPage />} />
          <Route path="/usuarios"   element={<GestionUsuariosPage />} />
          <Route path="/ayuda"      element={<AyudaPage />} />
          {/* Modulos */}
          <Route path="/tramites"       element={<TramitesPage />} />
          <Route path="/directorio"     element={<DirectorioPage />} />
          <Route path="/finanzas"       element={<FinanzasPage />} />
          <Route path="/beneficiarios"  element={<BeneficiariosPage />} />
          <Route path="/documentos"     element={<DocumentosPage />} />
          <Route path="/administracion" element={<AdministracionPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </>
  );
}
