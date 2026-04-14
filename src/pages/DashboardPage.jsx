import { useAuth } from "@/context/AuthContext.jsx";

export default function DashboardPage() {
  const { user } = useAuth();

  const cards = [
    { label: "Total Afiliadas", value: "12,450", hint: "+12% vs mes anterior", icon: "group", iconColor: "text-blue-600", iconBg: "bg-blue-100", trend: "up" },
    { label: "Seccionales Activas", value: "32", hint: "Estado operativo", icon: "location_on", status: "Active", iconColor: "text-emerald-600", iconBg: "bg-emerald-100" },
    { label: "Registros de Hoy", value: "85", hint: "Tiempo real (simulado)", icon: "person", status: "Real-time", iconColor: "text-violet-600", iconBg: "bg-violet-100" },
  ];

  const registrosRecientes = [
    {
      iniciales: "JD",
      nombre: "Jimena Duarte",
      afiliacion: "Afiliada • Seccional Norte",
      tiempo: "Hace 5 min",
      estado: "COMPLETADO",
    },
    {
      iniciales: "MA",
      nombre: "Marcos Alvarez",
      afiliacion: "Afiliado • Seccional Sur",
      tiempo: "Hace 18 min",
      estado: "COMPLETADO",
    },
    {
      iniciales: "LC",
      nombre: "Lucia Castro",
      afiliacion: "Afiliada • Seccional Este",
      tiempo: "Hace 42 min",
      estado: "EN PROCESO",
    },
  ];

  const proximosReportes = [
    { mes: "OCT", dia: "12", titulo: "Auditoría Seccionales", desc: "Revisión anual obligatoria", color: "text-orange-600", bg: "bg-orange-50" },
    { mes: "OCT", dia: "15", titulo: "Cierre Trimestral", desc: "Consolidado de afiliadas", color: "text-blue-600", bg: "bg-blue-50" },
  ];

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
        <div>
          <div className="mb-3 h-1.5 w-12 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
            Resumen Operativo
          </p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight bg-gradient-to-br from-sinfal-navy to-slate-500 bg-clip-text text-transparent">
            Dashboard Institucional
          </h2>
          <p className="mt-2 text-base text-slate-500 font-medium">
            Métricas clave y estado de la federación nacional en tiempo real.
          </p>
        </div>
        <button className="flex items-center gap-2.5 rounded-xl bg-sinfal-navy px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_12px_rgba(0,18,51,0.25)] ring-1 ring-inset ring-white/10 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg hover:shadow-sinfal-navy/30 active:scale-95 active:-translate-y-0 transition-all duration-200">
          <span className="material-symbols-outlined text-[22px]">add_circle</span>
          Nuevo Registro
        </button>
      </div>

      {/* Cards de métricas */}
      <div className="mb-10 grid gap-6 sm:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out"
          >
            {/* Decal background */}
            <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full ${c.iconBg} opacity-50 transition-transform duration-500 group-hover:scale-150 group-hover:opacity-100`}></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-5">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${c.iconBg} ${c.iconColor} shadow-sm border border-white/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                   <span className="material-symbols-outlined text-[28px]">
                     {c.icon}
                   </span>
                </div>
                {c.status && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-600 border border-emerald-500/20 shadow-sm backdrop-blur-sm bg-white/80">
                    {c.status === "Real-time" ? (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Activo Auto
                      </>
                    ) : (
                      <>
                        <span className="h-2 w-2 rounded-full bg-emerald-500" /> Sistema OK
                      </>
                    )}
                  </span>
                )}
              </div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                {c.label}
              </p>
              <p className="mt-1.5 text-4xl font-extrabold text-sinfal-navy tracking-tight">{c.value}</p>
              <div className="mt-4 flex items-center gap-1.5 text-[13px] font-semibold text-slate-500">
                 {c.trend === "up" && <span className="material-symbols-outlined text-[18px] text-emerald-500">trending_up</span>}
                 {c.hint}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contenido principal con dos columnas */}
      <div className="grid gap-8 sm:grid-cols-3">
        {/* Registros Recientes - 2 columnas */}
        <div className="sm:col-span-2 flex flex-col rounded-2xl border border-slate-200/60 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <h3 className="text-xl font-bold text-sinfal-navy">
              Registros Recientes
            </h3>
            <a href="/consulta" className="group flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
              Ver todo 
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
            </a>
          </div>

          <div className="flex-1 p-3">
            {registrosRecientes.map((reg, idx) => (
              <div key={idx} className="group flex items-center gap-4 rounded-xl p-4 hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100 mb-1 last:mb-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-[15px] font-black text-slate-600 shadow-inner group-hover:shadow transition-all group-hover:from-blue-50 group-hover:to-blue-100 group-hover:text-blue-600 border border-slate-200/50">
                  {reg.iniciales}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-sinfal-navy truncate group-hover:text-blue-700 transition-colors">
                    {reg.nombre}
                  </p>
                  <p className="text-[13px] font-semibold text-slate-500 mt-0.5">{reg.afiliacion}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-400 mb-1.5">
                    {reg.tiempo}
                  </p>
                  <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                    reg.estado === 'COMPLETADO' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm' 
                    : 'bg-amber-50 text-amber-700 border border-amber-200 shadow-sm animate-pulse'
                  }`}>
                    {reg.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen Semanal */}
        <div className="relative overflow-hidden rounded-2xl bg-sinfal-navy p-8 text-white shadow-[0_12px_40px_rgba(0,18,51,0.2)] border border-slate-800">
          {/* Decorative background elements */}
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-3">
               <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-500/30">
                 <span className="material-symbols-outlined text-blue-400 text-[20px]">insights</span>
               </div>
               <h3 className="text-xl font-bold">Resumen Semanal</h3>
            </div>
            <p className="mt-2 text-[15px] font-medium text-slate-300 leading-relaxed">
              Crecimiento constante con aumento del <span className="text-emerald-400 font-extrabold bg-emerald-400/10 px-1.5 py-0.5 rounded">4%</span> vs el mes anterior.
            </p>

            <div className="mt-8 rounded-2xl bg-white/5 p-5 border border-white/10 backdrop-blur-md shadow-inner">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Progreso del Objetivo
              </p>
              <div className="flex items-end justify-between mb-3">
                 <div className="flex items-baseline gap-1">
                    <p className="text-4xl font-extrabold text-white tracking-tighter">75</p>
                    <p className="text-sm font-bold text-slate-400">%</p>
                 </div>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden shadow-inner flex">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.6)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 right-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[shine_2s_infinite_linear]"></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-[13px] font-semibold text-slate-400 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-blue-400">info</span>
                Documentación vs total de afiliadas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Próximos Reportes */}
      <div className="mt-10">
        <h3 className="mb-5 text-xl font-bold text-sinfal-navy">
          Próximos Reportes y Tareas
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          {proximosReportes.map((reporte, idx) => (
            <div
              key={idx}
              className="group flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border border-slate-200/60 bg-white p-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300 cursor-pointer"
            >
              <div className={`flex flex-col items-center justify-center rounded-2xl ${reporte.bg} p-3.5 min-w-[75px] shadow-inner transform group-hover:scale-105 group-hover:rotate-1 transition-transform border border-white`}>
                <p className={`text-[11px] font-black uppercase tracking-widest ${reporte.color} opacity-90`}>
                  {reporte.mes}
                </p>
                <p className={`mt-0.5 text-3xl font-black ${reporte.color}`}>
                  {reporte.dia}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-sinfal-navy group-hover:text-blue-700 transition-colors">
                  {reporte.titulo}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-500 line-clamp-2">
                  {reporte.desc}
                </p>
              </div>
              <div className="hidden sm:flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:-translate-x-1 group-hover:shadow-sm border border-transparent group-hover:border-blue-100 transition-all">
                <span className="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-5 flex items-start gap-4 backdrop-blur-sm">
         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
           <span className="material-symbols-outlined text-[20px]">lightbulb</span>
         </div>
         <p className="text-[13px] font-semibold text-slate-600 leading-relaxed pt-0.5">
           Los módulos de Registro, Consulta y Reportes están en proceso de estructuración visual. Los datos aquí mostrados son <span className="font-bold text-slate-800">estáticos (simulados)</span> y serán reemplazados una vez que se integre el back-end con la base de datos real.
         </p>
      </div>
    </div>
  );
}
