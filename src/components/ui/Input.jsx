export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        className={`
          w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5
          text-sm text-slate-100 placeholder:text-slate-500
          focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50
          transition-all duration-150 ${error ? 'border-red-500/50' : ''} ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}