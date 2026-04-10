import { useState } from "react";

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    // Datos Personales
    nombreCompleto: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    emailInstitucional: "",
    telefonoContacto: "",
    
    // Ubicación Regional
    regionAdministrativa: "",
    seccionalOperativa: "",
    ordenUnidad: "",
    
    // Salud y Previsión
    condicionesMedicas: "",
    grupoSanguineo: "",
    
    // Archivos
    archivos: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Formulario enviado:", formData);
    // Aquí irá la lógica para enviar a Stitch/Backend
  };

  const regions = [
    "Seleccione región",
    "Antioquia",
    "Bogotá",
    "Cauca",
    "Cundinamarca",
  ];
  const sections = [
    "Seleccione seccional",
    "Centro Zonal Belén",
    "Centro Zonal Sur",
    "Centro Zonal Norte",
    "Seccional Este",
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <div className="mb-2 h-0.5 w-10 rounded-full bg-emerald-500" />
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
          Nuevo Expediente
        </p>
        <h2 className="mt-2 text-2xl font-bold text-sinfal-navy">
          Registro de Afiliada
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Complete los datos requeridos para la formalización del afi liada de la institución. Asegúrese de que toda la documentación cargue sea rigurosa y verídica.
        </p>
      </div>

      {/* Indicador de pasos */}
      <div className="mb-8 flex gap-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                step === currentStep
                  ? "bg-sinfal-navy text-white"
                  : step < currentStep
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {step < currentStep ? "✓" : step}
            </div>
            <p
              className={`mt-1 text-xs font-medium ${
                step <= currentStep ? "text-sinfal-navy" : "text-slate-400"
              }`}
            >
              {["Datos\nPersonales", "Ubicación\nRegional", "Salud y\nPrevisión", "Carga de\nArchivos"][step - 1]}
            </p>
          </div>
        ))}
      </div>

      {/* Contenido del formulario */}
      <div className="space-y-6">
        {currentStep === 1 && (
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-sinfal-navy">
              1. Datos Personales
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                  placeholder="Ej. Ana Victoria"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-sinfal-input px-3 py-2 text-sm placeholder-slate-500 focus:border-sinfal-navy focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700">
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Ej. Martínez Sosa"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-sinfal-input px-3 py-2 text-sm placeholder-slate-500 focus:border-sinfal-navy focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700">
                  DNI / Documento Identidad
                </label>
                <input
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  placeholder="00-0000000-0"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-sinfal-input px-3 py-2 text-sm placeholder-slate-500 focus:border-sinfal-navy focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-sinfal-input px-3 py-2 text-sm focus:border-sinfal-navy focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700">
                  Email Institucional
                </label>
                <input
                  type="email"
                  name="emailInstitucional"
                  value={formData.emailInstitucional}
                  onChange={handleChange}
                  placeholder="usuario@monolith.org"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-sinfal-input px-3 py-2 text-sm placeholder-slate-500 focus:border-sinfal-navy focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700">
                  Teléfono de Contacto
                </label>
                <input
                  type="tel"
                  name="telefonoContacto"
                  value={formData.telefonoContacto}
                  onChange={handleChange}
                  placeholder="+54 011 4000-0000"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-sinfal-input px-3 py-2 text-sm placeholder-slate-500 focus:border-sinfal-navy focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-sinfal-navy">
              2. Ubicación (Regional/Seccional)
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700">
                  Región Administrativa
                </label>
                <select
                  name="regionAdministrativa"
                  value={formData.regionAdministrativa}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-sinfal-input px-3 py-2 text-sm text-slate-600 focus:border-sinfal-navy focus:outline-none"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700">
                  Seccional Operativa
                </label>
                <select
                  name="seccionalOperativa"
                  value={formData.seccionalOperativa}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-sinfal-input px-3 py-2 text-sm text-slate-600 focus:border-sinfal-navy focus:outline-none"
                >
                  {sections.map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700">
                  Orden de Unidad
                </label>
                <input
                  type="text"
                  name="ordenUnidad"
                  value={formData.ordenUnidad}
                  onChange={handleChange}
                  placeholder="Auto-generado"
                  disabled
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-500"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-sinfal-navy">
              3. Salud y Previsión
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700">
                  Afecciones Médicas
                </label>
                <textarea
                  name="condicionesMedicas"
                  value={formData.condicionesMedicas}
                  onChange={handleChange}
                  placeholder="Detalle condiciones críticas o alergias..."
                  rows="4"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-sinfal-input px-3 py-2 text-sm placeholder-slate-500 focus:border-sinfal-navy focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700">
                  Grupo Sanguíneo
                </label>
                <div className="mt-2 flex gap-2">
                  {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(
                    (grupo) => (
                      <button
                        key={grupo}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            grupoSanguineo: grupo,
                          }))
                        }
                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          formData.grupoSanguineo === grupo
                            ? "bg-sinfal-navy text-white"
                            : "border border-slate-300 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {grupo}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-sinfal-navy">
              4. Carga de Archivos
            </h3>
            <p className="mb-6 text-sm text-slate-600">
              Adjunte los documentos obligatorios a mano del caso courier, PDF, JPG HEIC SKML.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Copia del DNI */}
              <div className="rounded-lg border-2 border-dashed border-slate-300 p-6 text-center hover:border-sinfal-navy hover:bg-slate-50">
                <span className="material-symbols-outlined mb-2 block text-3xl text-slate-400">
                  cloud_upload
                </span>
                <p className="text-xs font-semibold text-slate-600">
                  Copia del DNI
                </p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.heic"
                  className="mt-2 w-full text-xs text-slate-500"
                />
              </div>

              {/* Cobertura de Título */}
              <div className="rounded-lg border-2 border-dashed border-slate-300 p-6 text-center hover:border-sinfal-navy hover:bg-slate-50">
                <span className="material-symbols-outlined mb-2 block text-3xl text-slate-400">
                  cloud_upload
                </span>
                <p className="text-xs font-semibold text-slate-600">
                  Cobertura de Título
                </p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.heic"
                  className="mt-2 w-full text-xs text-slate-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="mt-8 flex gap-3 justify-between">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setFormData({
                nombreCompleto: "",
                apellido: "",
                dni: "",
                fechaNacimiento: "",
                emailInstitucional: "",
                telefonoContacto: "",
                regionAdministrativa: "",
                seccionalOperativa: "",
                ordenUnidad: "",
                condicionesMedicas: "",
                grupoSanguineo: "",
                archivos: [],
              });
              setCurrentStep(1);
            }}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancelar Registro
          </button>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Paso Anterior
            </button>
          )}
        </div>

        <div className="flex gap-3">
          {currentStep < totalSteps && (
            <button
              type="button"
              onClick={() => {
                // Guardar como borrador
                console.log("Guardando borrador...");
              }}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Guardar Borrador
            </button>
          )}
          <button
            type="button"
            onClick={currentStep === totalSteps ? handleSubmit : handleContinue}
            className="flex items-center gap-2 rounded-lg bg-sinfal-navy px-4 py-2 text-sm font-semibold text-white hover:bg-opacity-90"
          >
            {currentStep === totalSteps ? "Completar Registro" : "Continuar Paso Sig."}
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
