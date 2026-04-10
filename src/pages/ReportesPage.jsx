import { useState } from "react";

export default function ReportesPage() {
  const [selectedDate, setSelectedDate] = useState({ start: "01-Dic-2024", end: "31-Dic-2024" });
  const [filterOpen, setFilterOpen] = useState(false);

  // Simulación de datos de gráfico de tendencia
  const tendenciaData = [
    { mes: "Ene", valor2024: 45, valor2023: 38 },
    { mes: "Feb", valor2024: 52, valor2023: 42 },
    { mes: "Mar", valor2024: 48, valor2023: 44 },
    { mes: "Abr", valor2024: 61, valor2023: 55 },
    { mes: "May", valor2024: 55, valor2023: 48 },
    { mes: "Jun", valor2024: 67, valor2023: 58 },
    { mes: "Jul", valor2024: 72, valor2023: 62 },
    { mes: "Ago", valor2024: 68, valor2023: 60 },
    { mes: "Sep", valor2024: 75, valor2023: 65 },
    { mes: "Oct", valor2024: 78, valor2023: 68 },
    { mes: "Nov", valor2024: 82, valor2023: 72 },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-2 h-0.5 w-10 rounded-full bg-emerald-500" />
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Centro de Reportes y Analítica
          </p>
          <h2 className="mt-2 text-2xl font-bold text-sinfal-navy">
            Monitoreo de gestión y estadísticas de afiliación nacional.
          </h2>
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-2 rounded-lg bg-sinfal-navy px-3 py-2 text-white text-sm font-semibold hover:bg-opacity-90"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          Filtros Globales
        </button>
        <div className="text-sm text-slate-600 font-medium">
          📅 {selectedDate.start} – {selectedDate.end}
        </div>
      </div>

      {/* Filtros expandidos */}
      {filterOpen && (
        <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Período Inicial
              </label>
              <input
                type="date"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-sinfal-input px-3 py-2 text-sm"
                defaultValue="2024-12-01"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Período Final
              </label>
              <input
                type="date"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-sinfal-input px-3 py-2 text-sm"
                defaultValue="2024-12-31"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Regional
              </label>
              <select className="mt-2 w-full rounded-lg border border-slate-300 bg-sinfal-input px-3 py-2 text-sm text-slate-600">
                <option>Todas las Regiones</option>
                <option>Antioquia</option>
                <option>Bogotá D.C.</option>
                <option>Valle del Cauca</option>
                <option>Atlántico</option>
              </select>
            </div>
          </div>
          <button className="mt-4 rounded-lg bg-sinfal-navy px-4 py-2 text-sm font-semibold text-white hover:bg-opacity-90">
            Aplicar Filtros
          </button>
        </div>
      )}

      {/* Métricas principales */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-2xl text-emerald-600">
              trending_up
            </span>
            <span className="text-xs font-semibold text-emerald-600">+3%</span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Crecimiento Mensual
          </p>
          <p className="mt-2 text-2xl font-bold text-sinfal-navy">2.860</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-2xl text-orange-500">
              assignment_turned_in
            </span>
            <span className="text-xs font-semibold text-slate-600">142</span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Reportes de Auditoría
          </p>
          <p className="mt-2 text-2xl font-bold text-sinfal-navy">142</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-2xl text-red-500">
              error
            </span>
            <span className="text-xs font-semibold text-red-600">89</span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Certificadores por Vencer
          </p>
          <p className="mt-2 text-2xl font-bold text-sinfal-navy">89</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-2xl text-slate-400">
              people
            </span>
            <span className="text-xs font-semibold text-emerald-600">34.2%</span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Promedio de Edad
          </p>
          <p className="mt-2 text-2xl font-bold text-sinfal-navy">34.2 años</p>
        </div>
      </div>

      {/* Gráfico de Tendencia */}
      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-sinfal-navy">
            Tendencia de Afiliaciones
          </h3>
          <div className="flex gap-2">
            <button className="text-xs px-2 py-1 rounded bg-sinfal-navy text-white font-medium">
              2024
            </button>
            <button className="text-xs px-2 py-1 rounded border border-slate-300 text-slate-600 font-medium">
              2023 (Ref)
            </button>
          </div>
        </div>
        <p className="mb-6 text-xs text-slate-500">
          Análisis histórico mensual del patrón de crecimiento anual.
        </p>

        {/* Gráfico de barras simulado */}
        <div className="flex items-end justify-between gap-1 h-64 pb-8">
          {tendenciaData.map((data, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center justify-end gap-1 group"
            >
              <div className="text-xs text-slate-500 group-hover:text-sinfal-navy font-medium hidden group-hover:block">
                {data.valor2024}
              </div>
              <div className="w-full bg-slate-200 rounded-t" style={{ height: `${(data.valor2023 / 82) * 100}%` }} />
              <div className="w-full bg-sinfal-navy rounded-t" style={{ height: `${(data.valor2024 / 82) * 100}%` }} />
              <div className="text-xs text-slate-600 mt-2">{data.mes}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dos columnas: Afiliadas por Regional + Distribución por Edad */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2">
        {/* Afiliadas por Regional */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-sinfal-navy">
            Afiliadas por Regional
          </h3>
          <div className="space-y-4">
            {[
              { region: "Región D.C.", porcentaje: 42, valor: 5240 },
              { region: "Antioquia", porcentaje: 28, valor: 3504 },
              { region: "Valle del Cauca", porcentaje: 15, valor: 1890 },
              { region: "Atlántico", porcentaje: 10, valor: 1260 },
              { region: "Otros", porcentaje: 5, valor: 630 },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium text-slate-700">{item.region}</p>
                  <p className="text-sm font-semibold text-slate-700">{item.porcentaje}%</p>
                </div>
                <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-sinfal-navy"
                    style={{ width: `${item.porcentaje}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distribución por Rango de Edad */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-sinfal-navy">
            Distribución por Rango de Edad
          </h3>
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Gráfico circular simulado */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#001233"
                  strokeWidth="40"
                  strokeDasharray="252 804"
                  strokeDashoffset="0"
                  transform="rotate(-90 100 100)"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="40"
                  strokeDasharray="100 804"
                  strokeDashoffset="-252"
                  transform="rotate(-90 100 100)"
                />
                {/* Texto central */}
                <text x="100" y="105" textAnchor="middle" className="text-2xl font-bold fill-sinfal-navy">
                  10.2k
                </text>
                <text x="100" y="125" textAnchor="middle" className="text-xs fill-slate-600">
                  Total
                </text>
              </svg>
            </div>
          </div>
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-sinfal-navy" />
              <span className="text-slate-700">18 - 50 años: <strong>54%</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-600" />
              <span className="text-slate-700">21 - 60 años: <strong>32%</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-slate-300" />
              <span className="text-slate-700">60+ años: <strong>14%</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Reportes Recientes Generados */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-sinfal-navy">
            Reportes Recientes Generados
          </h3>
          <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
            Ver Historial Completo →
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 font-semibold text-slate-700">
                  Nombre del Reporte
                </th>
                <th className="text-left py-3 px-3 font-semibold text-slate-700">
                  Fecha Generadora
                </th>
                <th className="text-left py-3 px-3 font-semibold text-slate-700">
                  Regional
                </th>
                <th className="text-left py-3 px-3 font-semibold text-slate-700">
                  Formato
                </th>
                <th className="text-center py-3 px-3 font-semibold text-slate-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                {
                  nombre: "Consolidado Nacional Q3 2024",
                  fecha: "13 Oct 2024, 06:30 AM",
                  regional: "Multirregional",
                  formato: "PDF",
                },
                {
                  nombre: "Afiliaciones Regional Antioquia",
                  fecha: "14 Oct 2024, 02:15 PM",
                  regional: "Antioquia",
                  formato: "EXCEL",
                },
                {
                  nombre: "Auditoría Mensual Pendientes",
                  fecha: "14 Oct 2024, 11:03 AM",
                  regional: "Macroce",
                  formato: "PDF",
                },
                {
                  nombre: "Demografía por Rango de Edad",
                  fecha: "18 Oct 2024, 04:43 PM",
                  regional: "Valle",
                  formato: "PDF",
                },
                {
                  nombre: "Renovaciones Bogotá 312",
                  fecha: "12 Oct 2024, 08:20 AM",
                  regional: "Bogotá D.C.",
                  formato: "EXCEL",
                },
              ].map((report, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3 px-3 text-slate-700 font-medium">
                    {report.nombre}
                  </td>
                  <td className="py-3 px-3 text-slate-600 text-xs">
                    {report.fecha}
                  </td>
                  <td className="py-3 px-3 text-slate-600">{report.regional}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        report.formato === "PDF"
                          ? "bg-red-100 text-red-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {report.formato}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button className="flex items-center gap-1 mx-auto text-slate-600 hover:text-sinfal-navy">
                      <span className="material-symbols-outlined text-[18px]">
                        download
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Estado General */}
      <div className="mt-8 rounded-lg border border-slate-200 bg-sinfal-navy bg-opacity-5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-sinfal-navy">
          Estado General
        </p>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-emerald-600" />
          <p className="text-sm font-medium text-slate-700">
            <strong>100% Operativo</strong> — Sistema SINFAL funcionando normalmente. Últimas actualizaciones sincronizadas.
          </p>
        </div>
      </div>
    </div>
  );
}
