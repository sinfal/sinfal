export default function LoadingSpinner({ text = "Cargando...", fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div>
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 shadow-lg">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-4 border-emerald-100 rounded-full" />
              <div className="absolute inset-0 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-sm font-medium text-slate-700">{text}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 border-3 border-emerald-100 rounded-full" />
        <div className="absolute inset-0 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-xs font-medium text-slate-600">{text}</p>
    </div>
  );
}
