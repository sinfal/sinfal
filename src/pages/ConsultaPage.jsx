import { useState, useEffect } from "react";

export default function ConsultaPage() {
  const [searchQuery, setSearchQuery] = useState("María Paula");
  const [selectedAfiliada, setSelectedAfiliada] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(true);

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

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-opacity-90">
              <span className="material-symbols-outlined text-[18px]">
                description
              </span>
              Ver Cédula
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-opacity-90">
              <span className="material-symbols-outlined text-[18px]">
                certificate
              </span>
              Ver Certificado Médico
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              <span className="material-symbols-outlined text-[18px]">
                edit
              </span>
              Editar Información
            </button>
          </div>

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
