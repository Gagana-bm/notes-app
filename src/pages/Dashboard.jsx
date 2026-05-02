import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import NoteGrid from '../components/NoteGrid'
import NoteEditor from '../components/NoteEditor'
import Button from '../components/ui/Button'
import { useNotes } from '../hooks/useNotes'

export default function Dashboard() {
  const { notes, loading, addNote, editNote, removeNote } = useNotes()
  const [search,      setSearch]      = useState('')
  const [editorOpen,  setEditorOpen]  = useState(false)
  const [activeNote,  setActiveNote]  = useState(null) // null = create mode

  // Client-side filtering — fast, no extra DB calls
  const filteredNotes = useMemo(() => {
    if (!search.trim()) return notes
    const q = search.toLowerCase()
    return notes.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q)
    )
  }, [notes, search])

  function openCreate() { setActiveNote(null); setEditorOpen(true) }
  function openEdit(note) { setActiveNote(note); setEditorOpen(true) }

  async function handleSave(payload) {
    if (activeNote) {
      await editNote(activeNote.id, payload)
    } else {
      await addNote(payload)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl font-bold text-slate-100">My Notes</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <SearchBar value={search} onChange={setSearch} />
            <Button icon={Plus} onClick={openCreate} className="shrink-0">
              New Note
            </Button>
          </div>
        </div>

        {/* Note grid */}
        <NoteGrid
          notes={filteredNotes}
          loading={loading}
          searchQuery={search}
          onEdit={openEdit}
          onDelete={removeNote}
        />
      </main>

      {/* Create / Edit modal */}
      <NoteEditor
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSave={handleSave}
        note={activeNote}
      />
    </div>
  )
}