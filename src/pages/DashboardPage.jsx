import { useAuth } from "@/context/AuthContext.jsx";

export default function DashboardPage() {
  const { user } = useAuth();

  const cards = [
    { label: "Total Afiliadas", value: "12.450", hint: "+12% vs mes anterior", icon: "group" },
    { label: "Seccionales Activas", value: "32", hint: "Estado operativo", icon: "location_on", status: "Active" },
    { label: "Registros de Hoy", value: "85", hint: "Tiempo real (simulado)", icon: "person", status: "Real-time" },
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
      estado: "COMPLETADO",
    },
  ];

  const proximosReportes = [
    { mes: "OCT", dia: "12", titulo: "Auditoría Seccionales", desc: "Revisión anual obligatoria" },
    { mes: "OCT", dia: "15", titulo: "Cierre Trimestral", desc: "Consolidado de afiliadas" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-2 h-0.5 w-10 rounded-full bg-emerald-500" />
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
            OPERATIONAL OVERVIEW
          </p>
          <h2 className="mt-2 text-3xl font-bold text-sinfal-navy">
            Institutional Dashboard
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Real-time metrics for national federation management.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-sinfal-navy px-4 py-2 text-sm font-semibold text-white hover:bg-opacity-90">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Nuevo Registro
        </button>
      </div>

      {/* Cards de métricas */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-2xl text-slate-400">
                {c.icon}
              </span>
              {c.status && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                  {c.status === "Real-time" ? (
                    <>
                      <span className="h-2 w-2 rounded-full bg-emerald-700" /> Real-time
                    </>
                  ) : (
                    <>
                      <span className="h-2 w-2 rounded-full bg-emerald-700" /> Active
                    </>
                  )}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {c.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-sinfal-navy">{c.value}</p>
            <p className="mt-1 text-xs text-slate-500">{c.hint}</p>
          </div>
        ))}
      </div>

      {/* Contenido principal con dos columnas */}
      <div className="grid gap-6 sm:grid-cols-3">
        {/* Registros Recientes - 2 columnas */}
        <div className="sm:col-span-2 rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-sinfal-navy">
              Registros Recientes
            </h3>
            <a href="/consulta" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
              Ver todo →
            </a>
          </div>

          <div className="space-y-3">
            {registrosRecientes.map((reg, idx) => (
              <div key={idx} className="flex items-center gap-4 rounded-lg bg-slate-50 p-4 hover:bg-slate-100 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sinfal-navy text-xs font-bold text-white">
                  {reg.iniciales}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sinfal-navy truncate">
                    {reg.nombre}
                  </p>
                  <p className="text-xs text-slate-500">{reg.afiliacion}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-slate-600">
                    {reg.tiempo}
                  </p>
                  <p className="text-xs font-semibold uppercase text-emerald-600">
                    {reg.estado}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen Semanal */}
        <div className="rounded-xl bg-gradient-to-br from-sinfal-navy to-sinfal-navy/90 p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold">Resumen Semanal</h3>
          <p className="mt-1 text-sm text-white/80">
            El crecimiento se mantiene constante con un aumento del 4% respecto al mes anterior.
          </p>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
              TARGET
            </p>
            <div className="mt-3">
              <div className="flex items-end justify-between mb-2">
                <p className="text-3xl font-bold">75%</p>
                <p className="text-xs text-white/80">de 100%</p>
              </div>
              <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full w-3/4 bg-emerald-400" />
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-white/20 pt-4">
            <p className="text-xs font-medium text-white/80">
              Metrica: Documentación completa vs. total de afiliadas
            </p>
          </div>
        </div>
      </div>

      {/* Próximos Reportes */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-sinfal-navy">
          Próximos Reportes
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {proximosReportes.map((reporte, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="rounded-lg bg-slate-100 px-3 py-2 text-center">
                <p className="text-xs font-semibold text-slate-600">
                  {reporte.mes}
                </p>
                <p className="text-xl font-bold text-sinfal-navy">{reporte.dia}</p>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sinfal-navy">{reporte.titulo}</p>
                <p className="text-xs text-slate-600">{reporte.desc}</p>
              </div>
              <span className="material-symbols-outlined text-slate-400">
                arrow_forward
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white/80 p-4 text-sm text-slate-600">
        Los módulos Registro, Consulta y Reportes están completamente implementados y funcionales. Los datos aquí mostrados están simulados hasta que se integre una base de datos real.
      </p>
    </div>
  );
}
