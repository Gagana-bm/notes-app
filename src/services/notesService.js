import { supabase } from './supabaseClient'

/**
 * Fetch all notes for the authenticated user, newest first.
 */
export async function fetchNotes() {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Create a new note.
 */
export async function createNote({ title, content }) {
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('notes')
    .insert({ title: title.trim(), content: content.trim(), user_id: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Update an existing note by id.
 */
export async function updateNote(id, { title, content }) {
  const { data, error } = await supabase
    .from('notes')
    .update({ title: title.trim(), content: content.trim() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Permanently delete a note by id.
 */
export async function deleteNote(id) {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)

  if (error) throw error
}