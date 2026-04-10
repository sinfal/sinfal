import { useState } from "react";

export default function AyudaPage() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: 1,
      title: "Primeros Pasos",
      description: "Guía de inicio rápido para nuevos administradores.",
      icon: "rocket_launch",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 2,
      title: "Gestión de Afiliadas",
      description: "Todo sobre registros, bajas y actualizaciones.",
      icon: "apps",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: 3,
      title: "Seguridad y Accesos",
      description: "Contraseñas, roles y permisos institucionales.",
      icon: "shield",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      id: 4,
      title: "Reportes y Estadísticas",
      description: "Generación de informes y análisis de datos.",
      icon: "bar_chart",
      color: "bg-orange-100 text-orange-700",
    },
  ];

  const faqItems = [
    {
      id: 1,
      question: "¿Cómo recupero mi contraseña institucional?",
      answer:
        "Para recuperar tu contraseña, dirígete a la pantalla de login y haz clic en 'Olvidé mi contraseña'. Ingresa tu correo institucional y recibirás un enlace de reseteo en tu bandeja de entrada. Si no recibes el correo en 5 minutos, revisa tu carpeta de spam.",
    },
    {
      id: 2,
      question: "¿Cómo exportar un reporte a Excel?",
      answer:
        "Desde la sección Reportes, selecciona el reporte que deseas exportar y haz clic en el botón 'Descargar Excel' en la esquina superior derecha. El archivo se descargará con formato .xlsx listo para editar en Microsoft Excel u otro software compatible.",
    },
    {
      id: 3,
      question: "¿Qué documentos son obligatorios para el registro?",
      answer:
        "Los documentos obligatorios son: (1) Copia del DNI front y back, (2) Comprobante de domicilio, (3) Certificado médico, (4) Comprobante de afiliación previsional. Todos deben estar en PDF, JPG o HEIC con una resolución mínima de 300 DPI.",
    },
    {
      id: 4,
      question: "¿Cuál es el tiempo de respuesta de soporte técnico?",
      answer:
        "Nuestro equipo de soporte responde en un máximo de 24 horas hábiles. Para consultas urgentes, puedes usar el chat de soporte en vivo disponible de lunes a viernes de 8:00 a 17:00. Fuera de ese horario, tu ticket se procesará a la brevedad.",
    },
  ];

  const resources = [
    {
      id: 1,
      title: "Manual de Usuario (PDF)",
      description: "Descarga la guía completa del sistema SINFAL",
      icon: "description",
      link: "#",
    },
    {
      id: 2,
      title: "Video Tutoriales",
      description: "Aprende paso a paso con nuestros vídeos prácticos",
      icon: "video_library",
      link: "#",
    },
  ];

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleSubscribe = () => {
    if (email.trim()) {
      alert(`✅ Suscripción confirmada para: ${email}`);
      setEmail("");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-sinfal-navy mb-3">
            ¿En qué podemos ayudarte hoy?
          </h1>
          <p className="text-slate-600 mb-6">
            Encuentra respuestas rápidas y recursos útiles para tu gestión institucional.
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-3.5 text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Encuentra la ayuda que necesitas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 bg-sinfal-input text-sm placeholder-slate-500 focus:border-sinfal-navy focus:outline-none shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Categorías principales */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-xl border border-slate-200 bg-white p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className={`inline-flex items-center justify-center h-12 w-12 rounded-lg ${cat.color} mb-4`}>
              <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
            </div>
            <h3 className="font-semibold text-sinfal-navy mb-2">{cat.title}</h3>
            <p className="text-sm text-slate-600">{cat.description}</p>
          </div>
        ))}
      </div>

      {/* Preguntas Frecuentes y Recursos */}
      <div className="mb-12 grid gap-6 lg:grid-cols-3">
        {/* FAQ - 2 columnas */}
        <div className="lg:col-span-2">
          <h2 className="mb-6 text-2xl font-bold text-sinfal-navy flex items-center gap-2">
            <div className="h-px w-6 bg-emerald-600" />
            Preguntas Frecuentes
          </h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-slate-200 bg-white overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-medium text-slate-700 text-left">
                    {item.question}
                  </span>
                  <span
                    className={`material-symbols-outlined text-slate-600 transition-transform ${
                      expandedFAQ === item.id ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {expandedFAQ === item.id && (
                  <div className="border-t border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recursos y Soporte - 1 columna */}
        <div className="space-y-6">
          {/* Recursos Adicionales */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-sinfal-navy flex items-center gap-2">
              <span className="material-symbols-outlined">add_circle</span>
              Recursos Adicionales
            </h3>
            <div className="space-y-3">
              {resources.map((res) => (
                <a
                  key={res.id}
                  href={res.link}
                  className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 hover:bg-slate-50 transition-colors"
                >
                  <span className={`material-symbols-outlined text-emerald-600 mt-0.5`}>
                    {res.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-700 text-sm">
                      {res.title}
                    </p>
                    <p className="text-xs text-slate-500">{res.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Card de soporte técnico */}
          <div className="rounded-xl bg-gradient-to-br from-sinfal-navy to-sinfal-navy/90 text-white p-6 shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              <span className="material-symbols-outlined text-2xl">
                headset_mic
              </span>
              <div>
                <h4 className="font-bold text-lg">¿Aún necesitas ayuda?</h4>
                <p className="text-sm text-white/90">
                  Nuestro equipo de soporte técnico está listo para asistirte con problemas complejos.
                </p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-sm font-semibold transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                mail
              </span>
              Contactar Soporte
            </button>
          </div>

          {/* Estado del sistema */}
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              <p className="text-xs font-semibold uppercase text-slate-500">
                Estado del Sistema
              </p>
            </div>
            <p className="text-sm font-medium text-slate-700">
              Todos los sistemas operativos
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 p-8 text-center">
        <h3 className="text-xl font-bold text-sinfal-navy mb-2">
          Mantente Actualizado
        </h3>
        <p className="text-slate-600 mb-6">
          Suscríbete para recibir notificaciones sobre nuevas funcionalidades y actualizaciones críticas del sistema.
        </p>
        <div className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="tu@correo.institucional"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubscribe()}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm placeholder-slate-500 focus:border-sinfal-navy focus:outline-none"
          />
          <button
            onClick={handleSubscribe}
            className="rounded-lg bg-sinfal-navy hover:bg-opacity-90 text-white px-6 py-2 text-sm font-semibold transition-colors"
          >
            Suscribirse
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 border-t border-slate-200 pt-8 text-center text-xs text-slate-500">
        <p>© 2024 Portal Institucional - Dirección General de Gestión Corporativa</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:text-slate-700">
            Privacidad
          </a>
          <a href="#" className="hover:text-slate-700">
            Términos de Uso
          </a>
          <a href="#" className="hover:text-slate-700">
            Accesibilidad
          </a>
        </div>
      </div>
    </div>
  );
}
