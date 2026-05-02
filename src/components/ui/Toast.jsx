import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react'
import { useToast } from '../../context/ToastContext'

const config = {
  success: { icon: CheckCircle, classes: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' },
  error:   { icon: XCircle,     classes: 'bg-red-500/10 border-red-500/30 text-red-400' },
  info:    { icon: Info,         classes: 'bg-blue-500/10 border-blue-500/30 text-blue-400' },
  warning: { icon: AlertCircle, classes: 'bg-amber-500/10 border-amber-500/30 text-amber-400' },
}

export default function Toast() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => {
        const { icon: Icon, classes } = config[toast.type] || config.info
        return (
          <div
            key={toast.id}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium
              shadow-xl pointer-events-auto animate-slide-up ${classes}
            `}
          >
            <Icon size={16} className="shrink-0" />
            <span className="text-slate-100">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-1 opacity-60 hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}