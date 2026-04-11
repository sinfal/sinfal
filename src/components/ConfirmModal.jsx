export default function ConfirmModal({ open, title, message, onConfirm, onCancel, confirmText = "Confirmar", cancelText = "Cancelar", type = "info" }) {
  if (!open) return null;

  const iconColor = {
    warning: "text-amber-600",
    error: "text-red-600",
    success: "text-emerald-600",
    info: "text-blue-600",
  };

  const icons = {
    warning: "warning",
    error: "error_outline",
    success: "check_circle",
    info: "info",
  };

  const confirmBtn = {
    warning: "bg-amber-600 hover:bg-amber-700",
    error: "bg-red-600 hover:bg-red-700",
    success: "bg-emerald-600 hover:bg-emerald-700",
    info: "bg-blue-600 hover:bg-blue-700",
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-in zoom-in duration-200">
        <div className="flex items-start gap-4 mb-4">
          <span className={`material-symbols-outlined text-[32px] ${iconColor[type]}`}>
            {icons[type]}
          </span>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-sinfal-navy">{title}</h3>
            <p className="text-sm text-slate-600 mt-1">{message}</p>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${confirmBtn[type]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
