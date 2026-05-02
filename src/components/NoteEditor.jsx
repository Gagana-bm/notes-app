import { useState, useEffect } from 'react'
import Modal from './ui/Modal'
import Button from './ui/Button'
import Input from './ui/Input'

export default function NoteEditor({ isOpen, onClose, onSave, note = null }) {
  const [title,   setTitle]   = useState('')
  const [content, setContent] = useState('')
  const [errors,  setErrors]  = useState({})
  const [saving,  setSaving]  = useState(false)

  // Pre-fill when editing
  useEffect(() => {
    setTitle(note?.title ?? '')
    setContent(note?.content ?? '')
    setErrors({})
  }, [note, isOpen])

  function validate() {
    const e = {}
    if (!title.trim())   e.title   = 'Title is required'
    if (!content.trim()) e.content = 'Content is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSave() {
    if (!validate()) return
    setSaving(true)
    await onSave({ title, content })
    setSaving(false)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={note ? 'Edit Note' : 'New Note'}
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={saving}>Cancel</Button>
          <Button loading={saving} onClick={handleSave}>
            {note ? 'Save Changes' : 'Create Note'}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Title"
          placeholder="Note title…"
          value={title}
          onChange={e => setTitle(e.target.value)}
          error={errors.title}
          autoFocus
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Content</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your note…"
            rows={7}
            className={`
              w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5
              text-sm text-slate-100 placeholder:text-slate-500 resize-none
              focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50
              transition-all duration-150 ${errors.content ? 'border-red-500/50' : ''}
            `}
          />
          {errors.content && <p className="text-xs text-red-400">{errors.content}</p>}
        </div>
      </div>
    </Modal>
  )
}