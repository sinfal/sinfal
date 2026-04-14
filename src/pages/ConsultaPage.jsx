import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/context/ToastContext.jsx";
import LoadingSpinner from "@/components/LoadingSpinner.jsx";

export default function ConsultaPage() {
  const { success, error } = useToast();
  const [searchQuery, setSearchQuery] = useState("María Paula");
  const [selectedAfiliada, setSelectedAfiliada] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [casoOpen, setCasoOpen] = useState(false);

  const CATEGORIAS_CASO = [
    { key: "pago",       label: "Problemas de Pago",  icon: "payments",        color: "text-red-600",    bg: "bg-red-50",    border: "border-red-200" },
    { key: "infra",      label: "Infraestructura",    icon: "construction",    color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
    { key: "dotacion",   label: "Dotacion",           icon: "inventory_2",     color: "text-amber-600",  bg: "bg-amber-50",  border: "border-amber-200" },
    { key: "infantil",   label: "Cuidado Infantil",   icon: "child_care",      color: "text-pink-600",   bg: "bg-pink-50",   border: "border-pink-200" },
    { key: "admin",      label: "Administrativo",     icon: "admin_panel_settings", color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200" },
    { key: "otro",       label: "Otro",               icon: "more_horiz",      color: "text-slate-600",  bg: "bg-slate-100", border: "border-slate-200" },
  ];

  const mockResults = [
    {
      id: 1,
      nombre: "María Paula Rodriguez",
      cedula: "1.020.300.400",
      foto: "https://via.placeholder.com/300?text=María+Paula",
      regional: "Antioquia",
      seccional: "Centro Zonal Belén",
      email: "maria.p@email.com",
      telefono: "300 123 4567",
      estado: "AFILIADA ACTIVA",
      estadoMedico: "Hipertensión controlada. Tratamiento activo.",
      ultimaActualizacion: "14 de Octubre, 2023 por Centro Belén",
      validacionDocumental: [
        { tipo: "Identidad Válida", estado: true, mensaje: "Completo acorde a archivos" },
        { tipo: "Certificado Vence Pronto", estado: false, mensaje: "Expira en 30 días" },
      ],
      perfil: {
        edad: "45 años, sin discapacidad declarada.",
        estadoMedico: "Hipertensión controlada. Tratamiento activo.",
        ultimaActualizacion: "14 de Octubre, 2023 por Centro Belén",
      },
      familiaVinculos: [
        { nombre: "Carlos Rodriguez", relacion: "Hijo - Beneficiario" },
        { nombre: "Elena de Rodriguez", relacion: "Madre - Dependiente" },
      ],
      casoRepresentacion: {
        id: "CASO-2024-0183",
        categoria: "pago",
        estado: "En Gestion",
        prioridad: "Alta",
        fechaApertura: "08 de enero, 2025",
        responsable: "Coord. Maria Suarez",
        descripcion: "La afiliada reporta que su empleador no ha realizado el descuento y pago de la cuota sindical durante los ultimos 3 meses (octubre, noviembre y diciembre 2024), incumpliendo lo pactado en la convencion colectiva vigente. Se han enviado dos comunicaciones formales al empleador sin respuesta satisfactoria.",
        actuaciones: [
          { fecha: "08 Ene 2025", texto: "Apertura del caso. Se recibe denuncia verbal y se documenta.", icon: "folder_open", color: "text-blue-500" },
          { fecha: "15 Ene 2025", texto: "Envio de carta formal al empleador solicitando aclaracion.", icon: "send", color: "text-amber-500" },
          { fecha: "28 Ene 2025", texto: "Se radica queja ante el Ministerio de Trabajo. Numero de radicado: MT-2025-00412.", icon: "gavel", color: "text-violet-500" },
        ],
      },
    },
    {
      id: 2,
      nombre: "Jimena Duarte",
      cedula: "1.050.600.200",
      foto: "https://via.placeholder.com/300?text=Jimena",
      regional: "Bogotá",
      seccional: "Centro Zonal Sur",
      email: "jimena.d@email.com",
      telefono: "301 456 7890",
      estado: "AFILIADA ACTIVA",
      estadoMedico: "Diabetes tipo 2 controlada.",
      ultimaActualizacion: "Hace 5 min",
      validacionDocumental: [
        { tipo: "Identidad Válida", estado: true, mensaje: "Completo acorde a archivos" },
        { tipo: "Certificado Vigente", estado: true, mensaje: "Vigencia hasta 2025" },
      ],
    },
  ];

  // Ejecutar búsqueda automática al cargar
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = mockResults.filter(
        (a) =>
          a.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.cedula.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      if (filtered.length > 0) {
        setSelectedAfiliada(filtered[0]);
      }
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const filtered = mockResults.filter(
        (a) =>
          a.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.cedula.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      if (filtered.length > 0) {
        setSelectedAfiliada(filtered[0]);
      }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="mb-2 h-0.5 w-10 rounded-full bg-emerald-500" />
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
          Módulo de Consulta
        </p>
        <div className="mt-2 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-sinfal-navy">
              Resultado de Búsqueda
            </h2>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-sinfal-navy px-4 py-2 text-sm font-semibold text-white hover:bg-opacity-90">
            <span className="material-symbols-outlined text-[18px]">
              download
            </span>
            Exportar Ficha
          </button>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por Cédula o Nombre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-sinfal-input px-4 py-3 text-sm placeholder-slate-500 focus:border-sinfal-navy focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-sinfal-navy px-4 py-2 text-sm font-semibold text-white hover:bg-opacity-90"
          >
            Buscar
          </button>
        </div>
      </form>

      {selectedAfiliada && (
        <div className="space-y-6">
          {/* Card de perfil principal */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-3">
              {/* Foto y datos básicos */}
              <div className="sm:col-span-1">
                <img
                  src={selectedAfiliada.foto}
                  alt={selectedAfiliada.nombre}
                  className="mb-4 h-32 w-32 rounded-lg object-cover"
                />
                <h3 className="text-lg font-bold text-sinfal-navy">
                  {selectedAfiliada.nombre}
                </h3>
                <p className="text-xs text-slate-600">
                  Cédula: {selectedAfiliada.cedula}
                </p>
                <div className="mt-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {selectedAfiliada.estado}
                </div>
              </div>

              {/* Información de contacto y ubicación */}
              <div className="sm:col-span-1">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-600">
                      Regional
                    </p>
                    <p className="text-sm font-medium text-sinfal-navy">
                      {selectedAfiliada.regional}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-600">
                      Seccional
                    </p>
                    <p className="text-sm font-medium text-sinfal-navy">
                      {selectedAfiliada.seccional}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-600">
                      Email de Contacto
                    </p>
                    <p className="text-sm font-medium text-sinfal-navy">
                      {selectedAfiliada.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-600">
                      Teléfono
                    </p>
                    <p className="text-sm font-medium text-sinfal-navy">
                      {selectedAfiliada.telefono}
                    </p>
                  </div>
                </div>
              </div>

              {/* Validación documental */}
              <div className="sm:col-span-1">
                <p className="mb-3 text-xs font-semibold uppercase text-slate-600">
                  Validación Documental
                </p>
                <div className="space-y-2">
                  {selectedAfiliada.validacionDocumental.map((doc, idx) => (
                    <div key={idx} className="flex gap-2 rounded-lg bg-slate-50 p-3">
                      {doc.estado ? (
                        <span className="material-symbols-outlined text-green-600">
                          check_circle
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-orange-500">
                          warning
                        </span>
                      )}
                      <div className="flex-1">
                        <p className="text-xs font-medium text-slate-700">
                          {doc.tipo}
                        </p>
                        <p className="text-xs text-slate-500">{doc.mensaje}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Información detallada */}
          <div className="grid gap-6 sm:grid-cols-3">
            {/* Perfil */}
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-600">
                  person
                </span>
                <p className="text-xs font-semibold uppercase text-slate-600">
                  Perfil
                </p>
              </div>
              <p className="text-sm text-slate-700">{selectedAfiliada.perfil.edad}</p>
            </div>

            {/* Estado Médico */}
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-600">
                  health_check
                </span>
                <p className="text-xs font-semibold uppercase text-slate-600">
                  Estado Médico
                </p>
              </div>
              <p className="text-sm text-slate-700">
                {selectedAfiliada.perfil.estadoMedico}
              </p>
            </div>

            {/* Última Actualización */}
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-600">
                  update
                </span>
                <p className="text-xs font-semibold uppercase text-slate-600">
                  Última Actualización
                </p>
              </div>
              <p className="text-sm text-slate-700">
                {selectedAfiliada.perfil.ultimaActualizacion}
              </p>
            </div>
          </div>

          {/* Botones de accion */}
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 hover:-translate-y-0.5 transition-all">
              <span className="material-symbols-outlined text-[18px]">description</span>
              Ver Cedula
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 hover:-translate-y-0.5 transition-all">
              <span className="material-symbols-outlined text-[18px]">health_and_safety</span>
              Ver Certificado Medico
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
              <span className="material-symbols-outlined text-[18px]">edit</span>
              Editar Informacion
            </button>
          </div>

          {/* ─────── Caso de Representacion (desplegable) ─────── */}
          {selectedAfiliada.casoRepresentacion && (() => {
            const caso = selectedAfiliada.casoRepresentacion;
            const cat  = CATEGORIAS_CASO.find((c) => c.key === caso.categoria) || CATEGORIAS_CASO[5];
            const prioColor = caso.prioridad === "Alta"
              ? "text-red-600 bg-red-50 border-red-200"
              : caso.prioridad === "Media"
              ? "text-amber-600 bg-amber-50 border-amber-200"
              : "text-slate-600 bg-slate-50 border-slate-200";
            return (
              <div className="rounded-2xl border border-slate-200/60 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden">
                {/* Header desplegable */}
                <button
                  type="button"
                  onClick={() => setCasoOpen((v) => !v)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${cat.bg} ${cat.color} border ${cat.border}`}>
                      <span className="material-symbols-outlined text-[22px]">{cat.icon}</span>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2.5">
                        <p className="text-base font-bold text-sinfal-navy">Caso de Representacion</p>
                        <span className="font-mono text-[11px] font-bold text-slate-400">{caso.id}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${cat.bg} ${cat.color} ${cat.border}`}>
                          <span className="material-symbols-outlined text-[12px]">{cat.icon}</span>
                          {cat.label}
                        </span>
                        <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${prioColor}`}>
                          Prioridad {caso.prioridad}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-blue-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                          {caso.estado}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined text-slate-400 text-[22px] transition-transform duration-300 ${casoOpen ? "rotate-180" : ""}`}>
                    expand_more
                  </span>
                </button>

                {/* Contenido expandido */}
                {casoOpen && (
                  <div className="border-t border-slate-100 px-6 pb-6 pt-5 space-y-6">
                    {/* Meta info */}
                    <div className="grid gap-4 sm:grid-cols-3">
                      {[
                        { label: "Apertura",    value: caso.fechaApertura, icon: "calendar_today" },
                        { label: "Responsable", value: caso.responsable,   icon: "manage_accounts" },
                        { label: "Categoria",   value: cat.label,          icon: cat.icon },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 border border-slate-100">
                          <span className={`material-symbols-outlined text-[20px] ${cat.color}`}>{item.icon}</span>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{item.label}</p>
                            <p className="text-sm font-bold text-slate-700 mt-0.5">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Descripcion */}
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Descripcion del Caso</p>
                      <p className={`rounded-xl border ${cat.border} ${cat.bg} px-4 py-4 text-sm font-semibold text-slate-700 leading-relaxed`}>
                        {caso.descripcion}
                      </p>
                    </div>

                    {/* Linea de tiempo de actuaciones */}
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Actuaciones del Caso</p>
                      <div className="relative pl-6 space-y-4">
                        <div className="absolute left-2 top-1 bottom-1 w-px bg-slate-200" />
                        {caso.actuaciones.map((act, idx) => (
                          <div key={idx} className="relative flex gap-4">
                            <div className={`absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-slate-200 ${act.color} mt-0.5`}>
                              <span className="material-symbols-outlined text-[11px]">{act.icon}</span>
                            </div>
                            <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">{act.fecha}</p>
                              <p className="text-sm font-semibold text-slate-700">{act.texto}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Historial y Vínculos */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Historial */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h4 className="mb-4 font-semibold text-sinfal-navy">
                Historial de Trámites
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-3">
                  <span className="material-symbols-outlined text-emerald-600">
                    check_circle
                  </span>
                  <div>
                    <p className="text-xs font-medium text-slate-700">
                      Renovación de Carnet
                    </p>
                    <p className="text-xs text-slate-500">Hace 7 meses</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-3">
                  <span className="material-symbols-outlined text-emerald-600">
                    check_circle
                  </span>
                  <div>
                    <p className="text-xs font-medium text-slate-700">
                      Actualización de Dirección
                    </p>
                    <p className="text-xs text-slate-500">Hace 5 meses</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vínculos Familiares */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h4 className="mb-4 font-semibold text-sinfal-navy">
                Vínculos Familiares
              </h4>
              <div className="space-y-2">
                {selectedAfiliada.familiaVinculos.map((vinculo, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                    <span className="material-symbols-outlined text-slate-600">
                      person
                    </span>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-700">
                        {vinculo.nombre}
                      </p>
                      <p className="text-xs text-slate-500">{vinculo.relacion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Aviso Legal */}
          <div className="rounded-lg border border-slate-300 bg-sinfal-navy bg-opacity-95 p-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider">
              Aviso Legal
            </p>
            <p className="mt-2 text-sm">
              La consulta de esta información está sujeta a la Ley de Protección de Datos Personales. Todo acceso queda registrado en el historial institucional.
            </p>
          </div>
        </div>
      )}

      {searchResults.length === 0 && searchQuery && (
        <div className="rounded-lg border-2 border-dashed border-slate-300 py-12 text-center">
          <span className="material-symbols-outlined mb-3 block text-4xl text-slate-400">
            search
          </span>
          <p className="text-slate-600">No se encontraron resultados para "{searchQuery}"</p>
        </div>
      )}

      {!searchQuery && (
        <div className="rounded-lg border-2 border-dashed border-slate-300 py-12 text-center">
          <span className="material-symbols-outlined mb-3 block text-4xl text-slate-400">
            search
          </span>
          <p className="text-slate-600">Usa la barra de búsqueda para encontrar afiliadas</p>
        </div>
      )}
    </div>
  );
}
