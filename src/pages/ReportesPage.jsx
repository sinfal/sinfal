import { useState } from "react";
import { useToast } from "@/context/ToastContext.jsx";
import { downloadCSV, downloadJSON, downloadPDF } from "@/lib/exportUtils.js";
import ConfirmModal from "@/components/ConfirmModal.jsx";

const METRICAS = [
  {
    label: "Crecimiento Mensual",
    value: "2.860",
    hint: "+3% vs mes anterior",
    icon: "trending_up",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    badge: "+3%",
    badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  {
    label: "Reportes de Auditoría",
    value: "142",
    hint: "Ciclo vigente",
    icon: "assignment_turned_in",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-100",
    badge: "142",
    badgeColor: "text-orange-700 bg-orange-50 border-orange-200",
  },
  {
    label: "Certificadores por Vencer",
    value: "89",
    hint: "Requieren atención",
    icon: "warning_amber",
    iconColor: "text-red-500",
    iconBg: "bg-red-100",
    badge: "89",
    badgeColor: "text-red-700 bg-red-50 border-red-200",
  },
  {
    label: "Promedio de Edad",
    value: "34.2 años",
    hint: "Universo total de afiliadas",
    icon: "people",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-100",
    badge: "34.2%",
    badgeColor: "text-violet-700 bg-violet-50 border-violet-200",
  },
];

const REGIONALES = [
  { region: "Región D.C.", porcentaje: 42, valor: 5240, color: "bg-blue-500" },
  { region: "Antioquia", porcentaje: 28, valor: 3504, color: "bg-emerald-500" },
  { region: "Valle del Cauca", porcentaje: 15, valor: 1890, color: "bg-purple-500" },
  { region: "Atlántico", porcentaje: 10, valor: 1260, color: "bg-amber-500" },
  { region: "Otros", porcentaje: 5, valor: 630, color: "bg-slate-400" },
];

const REPORTES = [
  { nombre: "Consolidado Nacional Q3 2024", fecha: "13 Oct 2024, 06:30 AM", regional: "Multirregional", formato: "PDF" },
  { nombre: "Afiliaciones Regional Antioquia", fecha: "14 Oct 2024, 02:15 PM", regional: "Antioquia", formato: "EXCEL" },
  { nombre: "Auditoría Mensual Pendientes", fecha: "14 Oct 2024, 11:03 AM", regional: "Macroce", formato: "PDF" },
  { nombre: "Demografía por Rango de Edad", fecha: "18 Oct 2024, 04:43 PM", regional: "Valle", formato: "PDF" },
  { nombre: "Renovaciones Bogotá 312", fecha: "12 Oct 2024, 08:20 AM", regional: "Bogotá D.C.", formato: "EXCEL" },
];

const TENDENCIA = [
  { mes: "Ene", v24: 45, v23: 38 },
  { mes: "Feb", v24: 52, v23: 42 },
  { mes: "Mar", v24: 48, v23: 44 },
  { mes: "Abr", v24: 61, v23: 55 },
  { mes: "May", v24: 55, v23: 48 },
  { mes: "Jun", v24: 67, v23: 58 },
  { mes: "Jul", v24: 72, v23: 62 },
  { mes: "Ago", v24: 68, v23: 60 },
  { mes: "Sep", v24: 75, v23: 65 },
  { mes: "Oct", v24: 78, v23: 68 },
  { mes: "Nov", v24: 82, v23: 72 },
];

const MAX_VAL = 82;

export default function ReportesPage() {
  const { success } = useToast();
  const [selectedDate, setSelectedDate] = useState({ start: "01-Dic-2024", end: "31-Dic-2024" });
  const [filterOpen, setFilterOpen] = useState(false);
  const [showExportConfirm, setShowExportConfirm] = useState(false);
  const [exportFormat, setExportFormat] = useState("csv");

  const handleExportReport = (format) => {
    setExportFormat(format);
    setShowExportConfirm(true);
  };

  const confirmExport = () => {
    const reportData = {
      fecha_generacion: new Date().toLocaleString("es-CO"),
      periodo: `${selectedDate.start} - ${selectedDate.end}`,
      metricas: { crecimiento_mensual: 2860, reportes_auditoria: 142, certificadores_vencidos: 89, promedio_edad: 34.2 },
      tendencia: TENDENCIA,
      regionales: REGIONALES,
    };

    if (exportFormat === "csv") downloadCSV(reportData.tendencia, `reporte_sinfal_${Date.now()}.csv`);
    else if (exportFormat === "json") downloadJSON(reportData, `reporte_sinfal_${Date.now()}.json`);
    else if (exportFormat === "pdf") downloadPDF(JSON.stringify(reportData, null, 2), `reporte_sinfal_${Date.now()}.pdf`);

    success(`✓ Reporte exportado como ${exportFormat.toUpperCase()}`);
    setShowExportConfirm(false);
  };

  return (
    <div>
      {/* ── Header ── */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
        <div>
          <div className="mb-3 h-1.5 w-12 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50" />
          <p className="text-xs font-bold uppercase tracking-widest text-purple-600">
            Centro de Analítica
          </p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight bg-gradient-to-br from-sinfal-navy to-slate-500 bg-clip-text text-transparent">
            Reportes &amp; Estadísticas
          </h2>
          <p className="mt-2 text-base text-slate-500 font-medium">
            Monitoreo de gestión y estadísticas de afiliación nacional.
          </p>
        </div>

        {/* Botones de exportación */}
        <div className="flex items-center gap-3 shrink-0">
          {["CSV", "JSON", "PDF"].map((fmt) => {
            const styles = {
              CSV: "bg-emerald-600 shadow-emerald-600/25 hover:bg-emerald-700",
              JSON: "bg-violet-600 shadow-violet-600/25 hover:bg-violet-700",
              PDF: "bg-red-600 shadow-red-600/25 hover:bg-red-700",
            };
            const icons = { CSV: "table_chart", JSON: "code", PDF: "picture_as_pdf" };
            return (
              <button
                key={fmt}
                onClick={() => handleExportReport(fmt.toLowerCase())}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-md ring-1 ring-inset ring-white/10 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 transition-all duration-200 ${styles[fmt]}`}
              >
                <span className="material-symbols-outlined text-[18px]">{icons[fmt]}</span>
                {fmt}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Filtros ── */}
      <div className="mb-8 flex items-center gap-3">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold shadow-sm ring-1 ring-inset transition-all duration-200 ${
            filterOpen
              ? "bg-sinfal-navy text-white ring-transparent shadow-sinfal-navy/30"
              : "bg-white text-sinfal-navy ring-slate-200 hover:bg-slate-50"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          Filtros Globales
          <span className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${filterOpen ? "rotate-180" : ""}`}>
            expand_more
          </span>
        </button>
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-600 shadow-sm">
          <span className="material-symbols-outlined text-[16px] text-slate-400">calendar_today</span>
          {selectedDate.start} – {selectedDate.end}
        </div>
      </div>

      {/* Filtros expandidos */}
      {filterOpen && (
        <div className="mb-8 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { label: "Período Inicial", type: "date", defaultValue: "2024-12-01" },
              { label: "Período Final",   type: "date", defaultValue: "2024-12-31" },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">{f.label}</label>
                <input
                  type={f.type}
                  defaultValue={f.defaultValue}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-700 focus:border-sinfal-navy focus:outline-none focus:ring-2 focus:ring-sinfal-navy/20 transition"
                />
              </div>
            ))}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">Regional</label>
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-700 focus:border-sinfal-navy focus:outline-none focus:ring-2 focus:ring-sinfal-navy/20 transition">
                <option>Todas las Regiones</option>
                <option>Antioquia</option>
                <option>Bogotá D.C.</option>
                <option>Valle del Cauca</option>
                <option>Atlántico</option>
              </select>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl bg-sinfal-navy px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-sinfal-navy/20 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 transition-all duration-200">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              Aplicar Filtros
            </button>
            <button
              onClick={() => setFilterOpen(false)}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* ── Métricas principales ── */}
      <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {METRICAS.map((m) => (
          <div
            key={m.label}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out"
          >
            <div className={`absolute -right-4 -top-4 h-20 w-20 rounded-full ${m.iconBg} opacity-40 transition-transform duration-500 group-hover:scale-150 group-hover:opacity-80`} />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${m.iconBg} ${m.iconColor} border border-white/50 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-sm`}>
                  <span className="material-symbols-outlined text-[24px]">{m.icon}</span>
                </div>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-black ${m.badgeColor}`}>
                  {m.badge}
                </span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{m.label}</p>
              <p className="mt-1.5 text-3xl font-extrabold text-sinfal-navy tracking-tight">{m.value}</p>
              <p className="mt-2 text-[13px] font-semibold text-slate-500">{m.hint}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Gráfico de Tendencia ── */}
      <div className="mb-10 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-sinfal-navy">Tendencia de Afiliaciones</h3>
            <p className="mt-1 text-[13px] font-semibold text-slate-500">Análisis histórico mensual del patrón de crecimiento anual.</p>
          </div>
          <div className="flex gap-2.5">
            <button className="flex items-center gap-1.5 rounded-lg bg-sinfal-navy px-3.5 py-1.5 text-xs font-bold text-white shadow-sm">
              <span className="h-2 w-2 rounded-full bg-white/60" /> 2024
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-50 transition">
              <span className="h-2 w-2 rounded-full bg-slate-300" /> 2023 (Ref)
            </button>
          </div>
        </div>

        {/* Barras */}
        <div className="flex items-end justify-between gap-2 h-52 px-1">
          {TENDENCIA.map((d, i) => (
            <div key={i} className="group flex flex-1 flex-col items-center justify-end gap-1">
              <div
                className="relative w-full"
                style={{ height: `${(d.v24 / MAX_VAL) * 100}%` }}
              >
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center justify-center rounded-lg bg-sinfal-navy px-2 py-1 text-[10px] font-bold text-white whitespace-nowrap shadow-lg">
                  {d.v24}
                </div>
                {/* barra referencia 2023 */}
                <div
                  className="absolute bottom-0 left-0 w-full rounded-t-md bg-slate-200 transition-all duration-300 group-hover:bg-slate-300"
                  style={{ height: `${(d.v23 / d.v24) * 100}%` }}
                />
                {/* barra 2024 */}
                <div className="absolute bottom-0 left-0 w-full rounded-t-md bg-gradient-to-t from-sinfal-navy to-blue-500 opacity-90 group-hover:opacity-100 transition-all duration-300 shadow-sm" style={{ height: "100%" }} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-sinfal-navy transition-colors">{d.mes}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dos columnas: Regional + Edad ── */}
      <div className="mb-10 grid gap-8 sm:grid-cols-2">
        {/* Afiliadas por Regional */}
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <h3 className="mb-6 text-xl font-bold text-sinfal-navy">Afiliadas por Regional</h3>
          <div className="space-y-5">
            {REGIONALES.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    <p className="text-sm font-bold text-slate-700">{item.region}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-xs font-bold text-slate-500">{item.valor.toLocaleString()}</p>
                    <p className="text-sm font-black text-sinfal-navy w-10 text-right">{item.porcentaje}%</p>
                  </div>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} opacity-80 transition-all duration-700`}
                    style={{ width: `${item.porcentaje}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distribución por Edad */}
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <h3 className="mb-6 text-xl font-bold text-sinfal-navy">Distribución por Edad</h3>
          <div className="flex justify-center">
            <div className="relative w-44 h-44">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#f1f5f9" strokeWidth="32" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#001233" strokeWidth="32" strokeDasharray="272 530" strokeDashoffset="0" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" strokeWidth="32" strokeDasharray="108 530" strokeDashoffset="-272" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="32" strokeDasharray="74 530" strokeDashoffset="-380" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-extrabold text-sinfal-navy leading-none">10.2k</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Total</p>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {[
              { label: "18 – 50 años", value: "54%", color: "bg-sinfal-navy" },
              { label: "21 – 60 años", value: "32%", color: "bg-emerald-500" },
              { label: "60+ años",     value: "14%", color: "bg-slate-300" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`h-3 w-3 rounded-full ${item.color}`} />
                  <span className="text-sm font-semibold text-slate-600">{item.label}</span>
                </div>
                <span className="text-sm font-black text-sinfal-navy">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Reportes Recientes Generados ── */}
      <div className="mb-10 rounded-2xl border border-slate-200/60 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <h3 className="text-xl font-bold text-sinfal-navy">Reportes Recientes Generados</h3>
          <a href="#" className="group flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
            Ver Historial
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                {["Nombre del Reporte", "Fecha Generada", "Regional", "Formato", ""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {REPORTES.map((r, idx) => (
                <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-800 group-hover:text-sinfal-navy transition-colors">
                    {r.nombre}
                  </td>
                  <td className="px-5 py-4 text-xs font-semibold text-slate-500">{r.fecha}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-600">{r.regional}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border ${
                        r.formato === "PDF"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[12px]">
                        {r.formato === "PDF" ? "picture_as_pdf" : "table_chart"}
                      </span>
                      {r.formato}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() => handleExportReport(r.formato.toLowerCase())}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500 hover:border-sinfal-navy hover:bg-sinfal-navy hover:text-white transition-all duration-200 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[15px]">download</span>
                      Descargar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Estado General ── */}
      <div className="rounded-2xl border border-slate-200/60 bg-white p-5 flex items-center gap-4 shadow-sm">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <span className="material-symbols-outlined text-[22px]">check_circle</span>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Estado del Sistema</p>
          <p className="text-sm font-bold text-slate-700">
            <span className="text-emerald-600">100% Operativo</span> — SINFAL funcionando normalmente. Últimas actualizaciones sincronizadas.
          </p>
        </div>
        <div className="ml-auto">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </div>
      </div>

      {/* ── Modal ── */}
      <ConfirmModal
        open={showExportConfirm}
        type="info"
        title="Exportar Reporte"
        message={`¿Deseas exportar el reporte como ${exportFormat.toUpperCase()}? Se descargará al dispositivo.`}
        confirmText="Sí, Descargar"
        cancelText="Cancelar"
        onConfirm={confirmExport}
        onCancel={() => setShowExportConfirm(false)}
      />
    </div>
  );
}
