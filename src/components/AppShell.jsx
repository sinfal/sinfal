import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";

const mainNav = [
  { to: "/dashboard", label: "Dashboard",  icon: "grid_view",  iconColor: "text-blue-500",    iconBg: "bg-blue-50" },
  { to: "/registro",  label: "Registro",   icon: "person_add", iconColor: "text-emerald-500", iconBg: "bg-emerald-50" },
  { to: "/consulta",  label: "Consulta",   icon: "search",     iconColor: "text-amber-500",   iconBg: "bg-amber-50" },
  { to: "/reportes",  label: "Reportes",   icon: "bar_chart",  iconColor: "text-purple-500",  iconBg: "bg-purple-50" },
  { to: "/usuarios",  label: "Usuarios",   icon: "group",      iconColor: "text-indigo-500",  iconBg: "bg-indigo-50" },
  { to: "/ayuda",     label: "Ayuda",      icon: "help",       iconColor: "text-slate-500",   iconBg: "bg-slate-100" },
];

const modulosNav = [
  { to: "/tramites",      label: "Tramites",      icon: "receipt_long",    iconColor: "text-sky-600",    iconBg: "bg-sky-50" },
  { to: "/directorio",   label: "Directorio",    icon: "menu_book",       iconColor: "text-teal-600",   iconBg: "bg-teal-50" },
  { to: "/finanzas",     label: "Finanzas",      icon: "paid",            iconColor: "text-green-700",  iconBg: "bg-green-50" },
  { to: "/beneficiarios",label: "Beneficiarios", icon: "family_restroom", iconColor: "text-violet-600", iconBg: "bg-violet-50" },
  { to: "/documentos",   label: "Documentos",    icon: "folder_open",     iconColor: "text-amber-700",  iconBg: "bg-amber-50" },
  { to: "/administracion",label: "Administracion",icon: "settings",        iconColor: "text-slate-600",  iconBg: "bg-slate-100" },
];

function NavLink({ to, label, icon, iconColor, iconBg, active }) {
  return (
    <Link
      to={to}
      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 overflow-hidden ${
        active
          ? "bg-sinfal-navy/5 text-sinfal-navy"
          : "text-slate-600 hover:bg-slate-50 hover:text-sinfal-navy"
      }`}
    >
      {active && (
        <div className="absolute left-0 top-1/2 h-[70%] w-1.5 -translate-y-1/2 rounded-r-md bg-sinfal-navy" />
      )}
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-300 ${active ? iconBg : "bg-transparent group-hover:" + iconBg}`}>
        <span className={`material-symbols-outlined text-[20px] ${active ? iconColor : "text-slate-400 group-hover:" + iconColor}`}>
          {icon}
        </span>
      </div>
      <span className={active ? "font-bold" : ""}>{label}</span>
    </Link>
  );
}

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
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200/60 bg-white/70 backdrop-blur-xl transition-all shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200/60 px-6 py-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sinfal-navy to-blue-900 shadow-md shadow-blue-900/20">
            <span className="material-symbols-outlined text-[22px] text-white">account_balance</span>
          </div>
          <div>
            <p className="text-[17px] font-extrabold tracking-tight text-sinfal-navy">SINFAL</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Portal Interno</p>
          </div>
        </div>
        
        <nav className="flex flex-1 flex-col gap-1 p-4 overflow-y-auto">
          {/* ── Menu Principal ── */}
          <p className="px-3 pb-1 pt-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            Menu Principal
          </p>
          {mainNav.map(({ to, label, icon, iconColor, iconBg }) => {
            const active = isActive(to);
            return (
              <NavLink
                key={to}
                to={to}
                label={label}
                icon={icon}
                iconColor={iconColor}
                iconBg={iconBg}
                active={active}
              />
            );
          })}

          {/* ── Modulos ── */}
          <div className="my-3 border-t border-slate-200/60" />
          <p className="px-3 pb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
            Modulos
          </p>
          {modulosNav.map(({ to, label, icon, iconColor, iconBg }) => {
            const active = isActive(to);
            return (
              <NavLink
                key={to}
                to={to}
                label={label}
                icon={icon}
                iconColor={iconColor}
                iconBg={iconBg}
                active={active}
              />
            );
          })}
        </nav>
        
        <div className="border-t border-slate-200/60 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white p-3 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
            <div className="flex-1 min-w-0">
               <p className="truncate text-sm font-bold text-slate-700" title={user?.email}>
                 {user?.email || "Administrador"}
               </p>
               <p className="text-[11px] font-semibold text-slate-500">Gestión General</p>
            </div>
            <button
               type="button"
               onClick={handleLogout}
               title="Cerrar sesión"
               className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </aside>
      
      <div className="flex min-w-0 flex-1 flex-col relative z-0">
        <header className="flex h-14 items-center justify-end border-b border-slate-200/60 bg-white/80 px-8 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-3">
             <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 hover:text-sinfal-navy transition-all hover:shadow">
                 <span className="material-symbols-outlined text-[20px]">search</span>
             </button>
             <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 hover:text-sinfal-navy transition-all hover:shadow relative">
                 <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                 <span className="material-symbols-outlined text-[20px]">notifications</span>
             </button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-8 relative isolate">
           <div className="mx-auto max-w-7xl">
              <Outlet />
           </div>
        </main>
      </div>
    </div>
  );
}
