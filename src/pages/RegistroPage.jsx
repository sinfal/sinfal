import { useState } from "react";
import { useToast } from "@/context/ToastContext.jsx";
import { validateForm } from "@/lib/validation.js";
import ConfirmModal from "@/components/ConfirmModal.jsx";
import LoadingSpinner from "@/components/LoadingSpinner.jsx";

const INITIAL_FORM = {
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
};

const STEPS = [
  { label: "Datos Personales",    icon: "person"        },
  { label: "Ubicacion Regional",  icon: "location_on"   },
  { label: "Salud y Prevision",   icon: "favorite"      },
  { label: "Carga de Archivos",   icon: "attach_file"   },
];

const REGIONS   = ["Seleccione region", "Antioquia", "Bogota", "Cauca", "Cundinamarca"];
const SECTIONS  = ["Seleccione seccional", "Centro Zonal Belen", "Centro Zonal Sur", "Centro Zonal Norte", "Seccional Este"];
const SANGRE    = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

/* ────────────────────────────────────────────── */
/* Componentes reutilizables internos             */
/* ────────────────────────────────────────────── */

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-500">
          <span className="material-symbols-outlined text-[14px]">error</span>
          {error}
        </p>
      )}
    </div>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      className={[
        "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5",
        "text-sm font-medium text-slate-800 placeholder-slate-400",
        "focus:border-sinfal-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-sinfal-navy/10",
        "disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed",
        "transition duration-200",
        className,
      ].join(" ")}
      {...props}
    />
  );
}

function Select({ className = "", children, ...props }) {
  return (
    <select
      className={[
        "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5",
        "text-sm font-medium text-slate-700",
        "focus:border-sinfal-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-sinfal-navy/10",
        "transition duration-200 appearance-none cursor-pointer",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </select>
  );
}

/* ────────────────────────────────────────────── */
/* Componente principal                           */
/* ────────────────────────────────────────────── */

export default function RegistroPage() {
  const { success, error } = useToast();
  const [formData, setFormData]       = useState(INITIAL_FORM);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors]           = useState({});
  const [isSaving, setIsSaving]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const totalSteps = 4;

  const validationSchema = {
    nombreCompleto:     ["required", "name"],
    apellido:           ["required", "name"],
    dni:                ["required", "dni"],
    emailInstitucional: ["required", "email"],
    telefonoContacto:   ["required", "phone"],
  };

  const validateStep = () => {
    const stepFields = {
      1: ["nombreCompleto", "apellido", "dni", "emailInstitucional", "telefonoContacto"],
      2: ["regionAdministrativa", "seccionalOperativa"],
      3: ["grupoSanguineo"],
      4: [],
    };
    const fieldsToValidate = stepFields[currentStep];
    const stepSchema = Object.keys(validationSchema)
      .filter((key) => fieldsToValidate.includes(key))
      .reduce((acc, key) => { acc[key] = validationSchema[key]; return acc; }, {});

    const newErrors = validateForm(formData, stepSchema);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      error("Por favor completa los campos requeridos");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleContinue = () => {
    if (!validateStep()) return;
    if (currentStep < totalSteps) {
      success("Paso " + currentStep + " completado");
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      success("Borrador guardado. Puedes continuar despues.");
      setIsSaving(false);
    }, 1000);
  };

  const handleSubmit = () => {
    if (!validateStep()) return;
    setShowConfirm(true);
  };

  const confirmSubmit = () => {
    setIsSaving(true);
    setShowConfirm(false);
    setTimeout(() => {
      success("Registro completado exitosamente.");
      setIsSaving(false);
      setFormData(INITIAL_FORM);
      setCurrentStep(1);
    }, 1500);
  };

  /* ── Render ── */
  return (
    <div className="mx-auto max-w-3xl">
      {isSaving && <LoadingSpinner text="Guardando..." fullScreen />}

      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 h-1.5 w-12 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
          Nuevo Expediente
        </p>
        <h2 className="mt-2 text-4xl font-extrabold tracking-tight bg-gradient-to-br from-sinfal-navy to-slate-500 bg-clip-text text-transparent">
          Registro de Afiliada
        </h2>
        <p className="mt-2 text-base font-medium text-slate-500">
          Complete los datos requeridos para la formalizacion del expediente institucional.
          Asegurese de que toda la documentacion sea rigurosa y veridica.
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-10 flex items-center gap-0">
        {STEPS.map((step, i) => {
          const num      = i + 1;
          const done     = num < currentStep;
          const active   = num === currentStep;
          const upcoming = num > currentStep;
          return (
            <div key={num} className="flex flex-1 items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={[
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 shadow-sm",
                    done    ? "border-emerald-500 bg-emerald-500 text-white shadow-emerald-500/30" : "",
                    active  ? "border-sinfal-navy bg-sinfal-navy text-white shadow-sinfal-navy/30 scale-110" : "",
                    upcoming? "border-slate-200 bg-white text-slate-400" : "",
                  ].join(" ")}
                >
                  {done ? (
                    <span className="material-symbols-outlined text-[22px]">check_circle</span>
                  ) : (
                    <span className="material-symbols-outlined text-[22px]">{step.icon}</span>
                  )}
                </div>
                <p className={[
                  "mt-2 text-center text-[11px] font-bold leading-tight max-w-[72px]",
                  active  ? "text-sinfal-navy" : "",
                  done    ? "text-emerald-600" : "",
                  upcoming? "text-slate-400"   : "",
                ].join(" ")}>
                  {step.label}
                </p>
              </div>
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className={[
                  "h-0.5 flex-1 mx-2 rounded-full transition-all duration-500",
                  num < currentStep ? "bg-emerald-400" : "bg-slate-200",
                ].join(" ")} />
              )}
            </div>
          );
        })}
      </div>

      {/* ── PASO 1: Datos Personales ── */}
      {currentStep === 1 && (
        <div className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="flex items-center gap-3 mb-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <span className="material-symbols-outlined text-[24px]">person</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-sinfal-navy">Datos Personales</h3>
              <p className="text-xs font-semibold text-slate-400">Informacion de identificacion de la afiliada</p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nombre Completo" error={errors.nombreCompleto}>
              <Input
                type="text"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleChange}
                placeholder="Ej. Ana Victoria"
              />
            </Field>
            <Field label="Apellido" error={errors.apellido}>
              <Input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Ej. Martinez Sosa"
              />
            </Field>
            <Field label="DNI / Documento de Identidad" error={errors.dni}>
              <Input
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                placeholder="00-0000000-0"
              />
            </Field>
            <Field label="Fecha de Nacimiento">
              <Input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />
            </Field>
            <Field label="Email Institucional" error={errors.emailInstitucional}>
              <Input
                type="email"
                name="emailInstitucional"
                value={formData.emailInstitucional}
                onChange={handleChange}
                placeholder="usuario@sinfal.org"
              />
            </Field>
            <Field label="Telefono de Contacto" error={errors.telefonoContacto}>
              <Input
                type="tel"
                name="telefonoContacto"
                value={formData.telefonoContacto}
                onChange={handleChange}
                placeholder="+57 300 000 0000"
              />
            </Field>
          </div>
        </div>
      )}

      {/* ── PASO 2: Ubicacion Regional ── */}
      {currentStep === 2 && (
        <div className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="flex items-center gap-3 mb-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <span className="material-symbols-outlined text-[24px]">location_on</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-sinfal-navy">Ubicacion Regional</h3>
              <p className="text-xs font-semibold text-slate-400">Asignacion geografica e institucional</p>
            </div>
          </div>

          <div className="space-y-5">
            <Field label="Region Administrativa" error={errors.regionAdministrativa}>
              <Select
                name="regionAdministrativa"
                value={formData.regionAdministrativa}
                onChange={handleChange}
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </Select>
            </Field>

            <Field label="Seccional Operativa" error={errors.seccionalOperativa}>
              <Select
                name="seccionalOperativa"
                value={formData.seccionalOperativa}
                onChange={handleChange}
              >
                {SECTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </Field>

            <Field label="Orden de Unidad">
              <Input
                type="text"
                name="ordenUnidad"
                value={formData.ordenUnidad}
                onChange={handleChange}
                placeholder="Auto-generado por el sistema"
                disabled
              />
            </Field>
          </div>
        </div>
      )}

      {/* ── PASO 3: Salud y Prevision ── */}
      {currentStep === 3 && (
        <div className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="flex items-center gap-3 mb-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-500">
              <span className="material-symbols-outlined text-[24px]">favorite</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-sinfal-navy">Salud y Prevision</h3>
              <p className="text-xs font-semibold text-slate-400">Condiciones medicas e informacion de salud</p>
            </div>
          </div>

          <div className="space-y-6">
            <Field label="Afecciones Medicas">
              <textarea
                name="condicionesMedicas"
                value={formData.condicionesMedicas}
                onChange={handleChange}
                placeholder="Detalle condiciones criticas, alergias o antecedentes relevantes..."
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:border-sinfal-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-sinfal-navy/10 transition duration-200 resize-none"
              />
            </Field>

            <Field label="Grupo Sanguineo" error={errors.grupoSanguineo}>
              <div className="grid grid-cols-4 gap-2.5 mt-1">
                {SANGRE.map((grupo) => (
                  <button
                    key={grupo}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, grupoSanguineo: grupo }))}
                    className={[
                      "rounded-xl py-2.5 text-sm font-bold border transition-all duration-200",
                      formData.grupoSanguineo === grupo
                        ? "bg-red-500 border-red-500 text-white shadow-md shadow-red-500/30 scale-105"
                        : "bg-white border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-500 hover:bg-red-50",
                    ].join(" ")}
                  >
                    {grupo}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        </div>
      )}

      {/* ── PASO 4: Carga de Archivos ── */}
      {currentStep === 4 && (
        <div className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="flex items-center gap-3 mb-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <span className="material-symbols-outlined text-[24px]">attach_file</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-sinfal-navy">Carga de Archivos</h3>
              <p className="text-xs font-semibold text-slate-400">Adjunte documentacion obligatoria (PDF, JPG, PNG)</p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { titulo: "Copia del DNI",      icono: "badge",            color: "text-blue-500",   bg: "bg-blue-50",   border: "hover:border-blue-400" },
              { titulo: "Cobertura de Titulo", icono: "workspace_premium", color: "text-purple-500", bg: "bg-purple-50", border: "hover:border-purple-400" },
            ].map((doc) => (
              <label
                key={doc.titulo}
                className={[
                  "flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200",
                  "p-8 text-center cursor-pointer transition-all duration-300 group",
                  doc.border, "hover:bg-slate-50",
                ].join(" ")}
              >
                <div className={[
                  "flex h-16 w-16 items-center justify-center rounded-2xl",
                  doc.bg, doc.color,
                  "group-hover:scale-110 transition-transform duration-300",
                ].join(" ")}>
                  <span className="material-symbols-outlined text-[32px]">{doc.icono}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">{doc.titulo}</p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-400">
                    Haz clic o arrastra el archivo aqui
                  </p>
                </div>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.heic"
                  className="sr-only"
                />
                <span className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold text-slate-600 shadow-sm group-hover:border-sinfal-navy group-hover:text-sinfal-navy transition-colors">
                  Seleccionar archivo
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ── Botones de accion ── */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-between">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => { setFormData(INITIAL_FORM); setCurrentStep(1); }}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px] text-red-400">close</span>
            Cancelar
          </button>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Anterior
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px] text-amber-500">save</span>
            Guardar Borrador
          </button>
          <button
            type="button"
            onClick={currentStep === totalSteps ? handleSubmit : handleContinue}
            disabled={isSaving}
            className="flex items-center gap-2.5 rounded-xl bg-sinfal-navy px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-sinfal-navy/20 ring-1 ring-inset ring-white/10 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg hover:shadow-sinfal-navy/30 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {currentStep === totalSteps ? (
              <>
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Completar Registro
              </>
            ) : (
              <>
                Continuar
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        open={showConfirm}
        type="success"
        title="Confirmar Registro"
        message="Estas seguro de que deseas completar este registro? Se enviara toda la informacion al sistema."
        confirmText="Si, Completar"
        cancelText="Cancelar"
        onConfirm={confirmSubmit}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}
