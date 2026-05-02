import { LogOut, NotebookPen, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from './ui/Button'

export default function Navbar() {
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
            <NotebookPen size={14} className="text-white" />
          </div>
          <span className="font-semibold text-slate-100 text-sm">NoteVault</span>
        </div>

        {/* User info + logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <User size={13} />
            <span className="max-w-[180px] truncate">{user?.email}</span>
          </div>
          <Button variant="ghost" icon={LogOut} onClick={signOut} className="text-xs">
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </div>
    </header>
  )
}