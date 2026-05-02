import { Spinner } from './Spinner'

const variants = {
  primary: 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-500/20',
  ghost:   'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white',
  danger:  'bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20',
  outline: 'border border-white/10 hover:bg-white/5 text-slate-300 hover:text-white',
}

export default function Button({
  children, variant = 'primary', loading = false,
  className = '', icon: Icon, ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg
        text-sm font-medium transition-all duration-150 disabled:opacity-50
        disabled:cursor-not-allowed focus:outline-none focus:ring-2
        focus:ring-brand-500/40 ${variants[variant]} ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : Icon && <Icon size={16} />}
      {children}
    </button>
  )
}