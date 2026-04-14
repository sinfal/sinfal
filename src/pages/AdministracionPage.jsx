const MODULE = {
  label: "Administracion",
  icon: "settings",
  iconColor: "text-slate-600",
  iconBg: "bg-slate-100",
  accent: "bg-slate-600",
  accentText: "text-slate-600",
  desc: "Configuracion del sistema, roles, permisos y parametros globales del portal.",
};

export default function AdministracionPage() {
  return <ModulePlaceholder m={MODULE} />;
}

function ModulePlaceholder({ m }) {
  return (
    <div>
      <div className="mb-10">
        <div className={`mb-3 h-1.5 w-12 rounded-full ${m.accent} shadow-sm`} />
        <p className={`text-xs font-bold uppercase tracking-widest ${m.accentText}`}>{m.label}</p>
        <h2 className="mt-2 text-4xl font-extrabold tracking-tight bg-gradient-to-br from-sinfal-navy to-slate-500 bg-clip-text text-transparent">
          {m.label}
        </h2>
        <p className="mt-2 text-base font-medium text-slate-500">{m.desc}</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white py-24 gap-6 shadow-sm">
        <div className={`flex h-24 w-24 items-center justify-center rounded-3xl ${m.iconBg} ${m.iconColor} shadow-inner`}>
          <span className="material-symbols-outlined text-[52px]">{m.icon}</span>
        </div>
        <div className="text-center">
          <p className="text-2xl font-extrabold text-sinfal-navy">Modulo en Desarrollo</p>
          <p className="mt-2 text-base font-semibold text-slate-400">
            Este modulo estara disponible proximamente.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-bold text-slate-500 shadow-sm">
          <span className="material-symbols-outlined text-[16px] text-amber-500">construction</span>
          En construccion
        </span>
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-5 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <span className="material-symbols-outlined text-[20px]">lightbulb</span>
        </div>
        <p className="text-[13px] font-semibold text-slate-600 leading-relaxed pt-0.5">
          El modulo <span className="font-black text-slate-800">{m.label}</span> se encuentra en fase de implementacion. Contacte al administrador del sistema para mas informacion.
        </p>
      </div>
    </div>
  );
}
