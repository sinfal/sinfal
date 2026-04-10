import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "grid_view", disabled: false },
  { to: "/registro", label: "Registro de Afiliada", icon: "person_add", disabled: false },
  { to: "/consulta", label: "Consulta", icon: "search", disabled: false },
  { to: "/reportes", label: "Reportes", icon: "bar_chart", disabled: false },
  { to: "/usuarios", label: "Gestión de Usuarios", icon: "group", disabled: false },
  { to: "/ayuda", label: "Ayuda", icon: "help", disabled: false },
];

export default function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sinfal-navy">
            <span className="material-symbols-outlined text-[20px] text-white">account_balance</span>
          </div>
          <div>
            <p className="text-sm font-bold text-sinfal-navy">SINFAL</p>
            <p className="text-[0.6rem] font-semibold uppercase tracking-wider text-slate-500">Portal</p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-2">
          {navItems.map(({ to, label, icon, disabled }) =>
            disabled ? (
              <span
                key={label}
                className="flex cursor-not-allowed items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400"
              >
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
                {label}
              </span>
            ) : (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(to)
                    ? "bg-sinfal-navy text-white"
                    : "text-sinfal-navy hover:bg-slate-100"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
                {label}
              </Link>
            )
          )}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <p className="truncate text-xs text-slate-500" title={user?.email}>
            {user?.email}
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-2 w-full rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center border-b border-slate-200 bg-white px-6">
          <h1 className="text-lg font-semibold text-sinfal-navy">Panel institucional</h1>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
