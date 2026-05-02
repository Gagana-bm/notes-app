import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NotebookPen } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function Signup() {
  const { signUp } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [loading,  setLoading]  = useState(false)
  const [errors,   setErrors]   = useState({})

  async function handleSubmit(e) {
    e.preventDefault()
    const e2 = {}
    if (!email)                       e2.email    = 'Email is required'
    if (password.length < 6)          e2.password = 'Password must be at least 6 characters'
    if (password !== confirm)         e2.confirm  = 'Passwords do not match'
    if (Object.keys(e2).length) { setErrors(e2); return }

    setLoading(true)
    const { error } = await signUp(email, password)
    setLoading(false)

    if (error) {
      addToast({ message: error.message, type: 'error' })
    } else {
      addToast({ message: 'Account created! You can now sign in.', type: 'success' })
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-sm relative">
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-brand-600 rounded-2xl flex items-center justify-center shadow-xl shadow-brand-500/30">
            <NotebookPen size={20} className="text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-slate-100">Create account</h1>
            <p className="text-sm text-slate-500 mt-1">Start your NoteVault today</p>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={errors.email}
              autoFocus
            />
            <Input
              label="Password"
              type="password"
              placeholder="Min. 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={errors.password}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              error={errors.confirm}
            />
            <Button type="submit" loading={loading} className="mt-2 w-full py-3">
              Create Account
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}