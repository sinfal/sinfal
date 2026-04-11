import { useToast } from "@/context/ToastContext.jsx";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const bgColor = {
    success: "bg-emerald-50 border-emerald-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-amber-50 border-amber-200",
    info: "bg-blue-50 border-blue-200",
  };

  const textColor = {
    success: "text-emerald-900",
    error: "text-red-900",
    warning: "text-amber-900",
    info: "text-blue-900",
  };

  const iconColor = {
    success: "text-emerald-600",
    error: "text-red-600",
    warning: "text-amber-600",
    info: "text-blue-600",
  };

  const icons = {
    success: "check_circle",
    error: "error",
    warning: "warning",
    info: "info",
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`animate-in slide-in-from-right-full duration-300 flex items-start gap-3 rounded-lg border p-4 ${bgColor[toast.type]}`}
        >
          <span
            className={`material-symbols-outlined flex-shrink-0 text-[20px] ${iconColor[toast.type]}`}
          >
            {icons[toast.type]}
          </span>
          <p className={`text-sm font-medium flex-1 ${textColor[toast.type]}`}>
            {toast.message}
          </p>
          <button
            onClick={() => removeToast(toast.id)}
            className={`flex-shrink-0 text-xl hover:opacity-60 ${textColor[toast.type]}`}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
