import { useState, useEffect, useCallback } from 'react'
import { fetchNotes, createNote, updateNote, deleteNote } from '../services/notesService'
import { useToast } from '../context/ToastContext'

export function useNotes() {
  const [notes, setNotes]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const { addToast }          = useToast()

  // Load all notes once on mount
  const loadNotes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchNotes()
      setNotes(data)
    } catch (err) {
      setError(err.message)
      addToast({ message: 'Failed to load notes.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }, [addToast])

  useEffect(() => { loadNotes() }, [loadNotes])

  // Optimistic create
  const addNote = useCallback(async (payload) => {
    const tempId = `temp-${Date.now()}`
    const optimistic = { id: tempId, ...payload, created_at: new Date().toISOString() }
    setNotes(prev => [optimistic, ...prev])

    try {
      const saved = await createNote(payload)
      setNotes(prev => prev.map(n => n.id === tempId ? saved : n))
      addToast({ message: 'Note created!', type: 'success' })
    } catch (err) {
      setNotes(prev => prev.filter(n => n.id !== tempId))
      addToast({ message: err.message, type: 'error' })
    }
  }, [addToast])

  // Optimistic update
  const editNote = useCallback(async (id, payload) => {
    const prev = notes.find(n => n.id === id)
    setNotes(ns => ns.map(n => n.id === id ? { ...n, ...payload } : n))

    try {
      const updated = await updateNote(id, payload)
      setNotes(ns => ns.map(n => n.id === id ? updated : n))
      addToast({ message: 'Note updated!', type: 'success' })
    } catch (err) {
      setNotes(ns => ns.map(n => n.id === id ? prev : n))
      addToast({ message: err.message, type: 'error' })
    }
  }, [notes, addToast])

  // Optimistic delete
  const removeNote = useCallback(async (id) => {
    const backup = notes
    setNotes(prev => prev.filter(n => n.id !== id))

    try {
      await deleteNote(id)
      addToast({ message: 'Note deleted.', type: 'info' })
    } catch (err) {
      setNotes(backup)
      addToast({ message: err.message, type: 'error' })
    }
  }, [notes, addToast])

  return { notes, loading, error, addNote, editNote, removeNote, refresh: loadNotes }
}