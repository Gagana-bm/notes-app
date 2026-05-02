import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-sm">
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search notes…"
        className="
          w-full bg-white/5 border border-white/10 rounded-xl
          pl-9 pr-9 py-2.5 text-sm text-slate-100 placeholder:text-slate-500
          focus:outline-none focus:ring-2 focus:ring-brand-500/40
          transition-all duration-150
        "
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}