import { useState, useMemo } from "react";

/* ─── Datos simulados ─── */
const MOVIMIENTOS = [
  { id: "FIN-0001", nombre: "Maria Paula Rodriguez",  cedula: "10.100.200", concepto: "Cuota mensual",       monto: -25000,  estado: "Pendiente", fecha: "2025-01-01", seccional: "Norte" },
  { id: "FIN-0002", nombre: "Sandra Milena Lopez",    cedula: "11.101.201", concepto: "Cuota extraordinaria", monto: +50000, estado: "Pagado",   fecha: "2025-02-02", seccional: "Sur" },
  { id: "FIN-0003", nombre: "Gloria Esperanza Martinez", cedula: "12.102.202", concepto: "Aporte solidario", monto: +15000, estado: "Pagado",   fecha: "2025-03-03", seccional: "Este" },
  { id: "FIN-0004", nombre: "Claudia Patricia Torres", cedula: "13.103.203", concepto: "Cuota mensual",      monto: -25000,  estado: "Vencido",  fecha: "2025-01-15", seccional: "Centro" },
  { id: "FIN-0005", nombre: "Rosa Maria Gomez",        cedula: "14.104.204", concepto: "Aporte solidario",   monto: +15000, estado: "Pagado",   fecha: "2025-03-20", seccional: "Norte" },
  { id: "FIN-0006", nombre: "Liliana Vasquez Ruiz",    cedula: "15.105.205", concepto: "Cuota mensual",      monto: -25000,  estado: "Pendiente", fecha: "2025-02-10", seccional: "Sur" },
  { id: "FIN-0007", nombre: "Carmen Ines Pedraza",     cedula: "16.106.206", concepto: "Cuota extraordinaria", monto: +50000, estado: "Pagado", fecha: "2025-04-01", seccional: "Este" },
];

const fmt = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n);

const ESTADO_STYLES = {
  Pagado:   { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  Pendiente:{ badge: "bg-amber-50   text-amber-700   border-amber-200",   dot: "bg-amber-400"   },
  Vencido:  { badge: "bg-red-50     text-red-700     border-red-200",     dot: "bg-red-500"     },
};

/* ─── Componente: tarjeta KPI ─── */
function KpiCard({ label, value, icon, iconColor, iconBg, sub, subIcon, subColor }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out">
      <div className={`absolute -right-4 -top-4 h-20 w-20 rounded-full ${iconBg} opacity-40 transition-transform duration-500 group-hover:scale-150 group-hover:opacity-80`} />
      <div className="relative z-10">
        <div className={`flex h-13 w-13 items-center justify-center rounded-2xl ${iconBg} ${iconColor} shadow-sm border border-white/50 mb-4 transition-transform group-hover:scale-110 group-hover:-rotate-3 w-fit p-3`}>
          <span className="material-symbols-outlined text-[26px]">{icon}</span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
        <p className="mt-1.5 text-3xl font-extrabold text-sinfal-navy tracking-tight">{value}</p>
        {sub && (
          <div className={`mt-3 flex items-center gap-1.5 text-[12px] font-semibold ${subColor || "text-slate-500"}`}>
            {subIcon && <span className="material-symbols-outlined text-[15px]">{subIcon}</span>}
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Componente: boton Whatsapp ─── */
function WhatsappBtn({ nombre, monto, concepto, fecha }) {
  const msg = encodeURIComponent(
    `Hola ${nombre.split(" ")[0]}, te recordamos que tienes un movimiento pendiente:\n\nConcepto: ${concepto}\nMonto: ${fmt(Math.abs(monto))}\nFecha: ${fecha}\n\nPor favor, regulariza tu situacion a la brevedad. Gracias - SINFAL`
  );
  const href = `https://wa.me/?text=${msg}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title="Enviar recordatorio por WhatsApp"
      className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 hover:bg-[#25D366] hover:text-white transition-all duration-200 hover:shadow-md hover:shadow-[#25D366]/30 hover:scale-110 active:scale-95"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

/* ─── Pagina principal ─── */
export default function FinanzasPage() {
  const [search, setSearch]     = useState("");
  const [filterEstado, setFilterEstado] = useState("Todos");
  const [tab, setTab]           = useState("movimientos");

  const filtered = useMemo(() => {
    return MOVIMIENTOS.filter((m) => {
      const q = search.toLowerCase();
      const matchSearch =
        m.nombre.toLowerCase().includes(q) ||
        m.cedula.includes(q) ||
        m.id.toLowerCase().includes(q);
      const matchEstado = filterEstado === "Todos" || m.estado === filterEstado;
      return matchSearch && matchEstado;
    });
  }, [search, filterEstado]);

  const pendientes = MOVIMIENTOS.filter((m) => m.estado === "Pendiente" || m.estado === "Vencido");

  return (
    <div>
      {/* ── Header ── */}
      <div className="mb-10">
        <div className="mb-3 h-1.5 w-12 rounded-full bg-green-500 shadow-sm shadow-green-500/40" />
        <p className="text-xs font-bold uppercase tracking-widest text-green-700">Portal Financiero</p>
        <h2 className="mt-2 text-4xl font-extrabold tracking-tight bg-gradient-to-br from-sinfal-navy to-slate-500 bg-clip-text text-transparent">
          Finanzas
        </h2>
        <p className="mt-2 text-base font-medium text-slate-500">
          Estado de aportes, cuotas y movimientos de las afiliadas.
        </p>
      </div>

      {/* ── KPIs ── */}
      <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Saldo Actual"
          value="$ 45.800.000"
          icon="account_balance_wallet"
          iconColor="text-green-700"
          iconBg="bg-green-100"
          sub="+4.2% vs mes anterior"
          subIcon="trending_up"
          subColor="text-emerald-600"
        />
        <KpiCard
          label="Ingresos del Mes"
          value="$ 12.500.000"
          icon="arrow_circle_down"
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
          sub="Cuotas y aportes recibidos"
          subIcon="info"
          subColor="text-slate-400"
        />
        <KpiCard
          label="Egresos del Mes"
          value="$ 3.200.000"
          icon="arrow_circle_up"
          iconColor="text-red-500"
          iconBg="bg-red-100"
          sub="Gastos operativos"
          subIcon="info"
          subColor="text-slate-400"
        />
        <KpiCard
          label="Total Movimientos"
          value="100"
          icon="swap_horiz"
          iconColor="text-violet-600"
          iconBg="bg-violet-100"
          sub={`${pendientes.length} con pago pendiente`}
          subIcon="warning"
          subColor="text-amber-500"
        />
      </div>

      {/* ── Tabs ── */}
      <div className="mb-6 flex gap-2">
        {[
          { key: "movimientos", label: "Movimientos", icon: "receipt_long" },
          { key: "alertas",     label: "Alertas de Pago", icon: "notifications_active", badge: pendientes.length },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={[
              "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-200",
              tab === t.key
                ? "bg-sinfal-navy text-white shadow-md shadow-sinfal-navy/25"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
            ].join(" ")}
          >
            <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
            {t.label}
            {t.badge > 0 && (
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-black ${tab === t.key ? "bg-white/20 text-white" : "bg-amber-100 text-amber-700"}`}>
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Tab: Movimientos ── */}
      {tab === "movimientos" && (
        <div className="rounded-2xl border border-slate-200/60 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          {/* Barra de busqueda y filtros */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-slate-100 p-5">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-slate-400">search</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre, cedula o ID..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-700 focus:border-sinfal-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-sinfal-navy/10 transition"
              />
            </div>
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-600 focus:border-sinfal-navy focus:outline-none transition cursor-pointer"
            >
              {["Todos", "Pagado", "Pendiente", "Vencido"].map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  {["ID", "Afiliada", "Concepto", "Monto", "Estado", "Fecha", ""].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <span className="material-symbols-outlined text-[40px] text-slate-300 block mb-2">search_off</span>
                      <p className="text-sm font-bold text-slate-400">Sin resultados para esta busqueda.</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((m) => {
                    const es = ESTADO_STYLES[m.estado] || ESTADO_STYLES["Pendiente"];
                    const esIngreso = m.monto > 0;
                    const isPendiente = m.estado === "Pendiente" || m.estado === "Vencido";
                    return (
                      <tr key={m.id} className="group hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4 font-mono text-xs font-bold text-slate-500">{m.id}</td>
                        <td className="px-5 py-4">
                          <p className="font-bold text-slate-800 group-hover:text-sinfal-navy transition-colors">{m.nombre}</p>
                          <p className="text-xs font-semibold text-slate-400 mt-0.5">{m.cedula}</p>
                        </td>
                        <td className="px-5 py-4 font-semibold text-slate-600 whitespace-nowrap">{m.concepto}</td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className={`text-base font-extrabold ${esIngreso ? "text-emerald-600" : "text-red-500"}`}>
                            {esIngreso ? "+" : ""}{fmt(m.monto)}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${es.badge}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${es.dot}`} />
                            {m.estado}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs font-semibold text-slate-500 whitespace-nowrap">{m.fecha}</td>
                        <td className="px-5 py-4">
                          {isPendiente ? (
                            <WhatsappBtn
                              nombre={m.nombre}
                              monto={m.monto}
                              concepto={m.concepto}
                              fecha={m.fecha}
                            />
                          ) : (
                            <span className="inline-flex items-center justify-center h-9 w-9 rounded-xl text-slate-300" title="Sin accion requerida">
                              <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer tabla */}
          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
            <p className="text-xs font-semibold text-slate-400">
              Mostrando {filtered.length} de {MOVIMIENTOS.length} movimientos
            </p>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#25D366]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              El icono verde envia un recordatorio via WhatsApp a las afiliadas con pagos pendientes o vencidos.
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Alertas de Pago ── */}
      {tab === "alertas" && (
        <div className="rounded-2xl border border-slate-200/60 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h3 className="text-xl font-bold text-sinfal-navy">Alertas de Pago Pendiente</h3>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">Afiliadas con cuotas pendientes o vencidas que requieren recordatorio.</p>
            </div>
            <a
              href={`https://wa.me/?text=${encodeURIComponent("Recordatorio masivo SINFAL: Tienes pagos pendientes. Por favor regulariza tu situacion a la brevedad.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#25D366]/30 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 transition-all duration-200"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Recordatorio Masivo
            </a>
          </div>

          <div className="p-4 space-y-3">
            {pendientes.map((m) => {
              const es = ESTADO_STYLES[m.estado];
              return (
                <div key={m.id} className="group flex items-center gap-4 rounded-xl border border-slate-100 p-4 hover:border-amber-200 hover:bg-amber-50/30 transition-all">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <span className="material-symbols-outlined text-[22px]">
                      {m.estado === "Vencido" ? "error" : "schedule"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 truncate">{m.nombre}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <p className="text-xs font-semibold text-slate-500">{m.cedula}</p>
                      <span className="text-slate-300">·</span>
                      <p className="text-xs font-semibold text-slate-500">{m.concepto}</p>
                      <span className="text-slate-300">·</span>
                      <p className="text-xs font-bold text-red-500">{fmt(Math.abs(m.monto))}</p>
                    </div>
                  </div>
                  <span className={`hidden sm:inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${es.badge}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${es.dot}`} />
                    {m.estado}
                  </span>
                  <WhatsappBtn
                    nombre={m.nombre}
                    monto={m.monto}
                    concepto={m.concepto}
                    fecha={m.fecha}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Banner estado sistema ── */}
      <div className="mt-8 rounded-2xl border border-slate-200/60 bg-white p-5 flex items-center gap-4 shadow-sm">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
          <span className="material-symbols-outlined text-[22px]">shield</span>
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Datos Financieros</p>
          <p className="text-sm font-bold text-slate-700">
            Los montos mostrados son <span className="text-amber-600">simulados</span>. Se conectaran al sistema contable real en la siguiente fase de implementacion.
          </p>
        </div>
        <div className="ml-auto">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </div>
      </div>
    </div>
  );
}
