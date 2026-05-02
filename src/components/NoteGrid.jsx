import NoteCard from './NoteCard'
import { Spinner } from './ui/Spinner'
import { NotebookPen } from 'lucide-react'

// Skeleton loader for notes
function NoteSkeleton() {
  return (
    <div className="glass rounded-2xl p-5 flex flex-col gap-3 animate-pulse">
      <div className="h-4 bg-white/5 rounded-lg w-3/4" />
      <div className="space-y-2">
        <div className="h-3 bg-white/5 rounded w-full" />
        <div className="h-3 bg-white/5 rounded w-5/6" />
        <div className="h-3 bg-white/5 rounded w-4/6" />
      </div>
      <div className="h-2.5 bg-white/5 rounded w-1/4 mt-2" />
    </div>
  )
}

export default function NoteGrid({ notes, loading, searchQuery, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => <NoteSkeleton key={i} />)}
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center">
          <NotebookPen size={28} className="text-brand-400" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-300">
            {searchQuery ? 'No notes found' : 'No notes yet'}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {searchQuery
              ? `No notes match "${searchQuery}"`
              : 'Click "New Note" to create your first one'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {notes.map(note => (
        <NoteCard key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}