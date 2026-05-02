import { useState } from 'react'
import { Pencil, Trash2, MoreVertical } from 'lucide-react'
import { formatNoteDate } from '../utils/formatDate'
import Button from './ui/Button'
import Modal from './ui/Modal'

export default function NoteCard({ note, onEdit, onDelete }) {
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [confirmDel, setConfirmDel] = useState(false)

  return (
    <>
      <article
        className="
          glass card-hover rounded-2xl p-5 flex flex-col gap-3
          cursor-pointer group animate-fade-in
        "
        onClick={() => onEdit(note)}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-100 line-clamp-1 flex-1">
            {note.title}
          </h3>

          {/* Actions menu */}
          <div className="relative" onClick={e => e.stopPropagation()}>
            <Button
              variant="ghost"
              className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setMenuOpen(v => !v)}
            >
              <MoreVertical size={15} />
            </Button>

            {menuOpen && (
              <div
                className="absolute right-0 top-7 z-10 w-36 bg-slate-800 border border-white/10 rounded-xl shadow-xl overflow-hidden animate-fade-in"
                onMouseLeave={() => setMenuOpen(false)}
              >
                <button
                  onClick={() => { setMenuOpen(false); onEdit(note) }}
                  className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => { setMenuOpen(false); setConfirmDel(true) }}
                  className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content preview */}
        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed flex-1">
          {note.content}
        </p>

        {/* Date */}
        <p className="text-[11px] text-slate-600 font-medium mt-auto">
          {formatNoteDate(note.created_at)}
        </p>
      </article>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={confirmDel}
        onClose={() => setConfirmDel(false)}
        title="Delete Note"
        footer={
          <>
            <Button variant="outline" onClick={() => setConfirmDel(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => { onDelete(note.id); setConfirmDel(false) }}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-400">
          Are you sure you want to delete <span className="text-slate-200 font-medium">"{note.title}"</span>?
          This action cannot be undone.
        </p>
      </Modal>
    </>
  )
}