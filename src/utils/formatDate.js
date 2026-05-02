import { format, formatDistanceToNow, isThisYear } from 'date-fns'

export function formatNoteDate(dateStr) {
  const date = new Date(dateStr)
  const distance = formatDistanceToNow(date, { addSuffix: true })

  // Show relative time if recent, otherwise absolute
  const diffMs = Date.now() - date.getTime()
  if (diffMs < 7 * 24 * 60 * 60 * 1000) return distance
  if (isThisYear(date)) return format(date, 'MMM d')
  return format(date, 'MMM d, yyyy')
}