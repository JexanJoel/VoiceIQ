import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'

export default function Navbar() {
  const { signOut } = useAuth()
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(255,250,248,0.88)', backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #FFE4E6',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', height: '60px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'linear-gradient(135deg, #E11D48, #F43F5E)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px',
          boxShadow: '0 3px 10px rgba(225,29,72,0.28)'
        }}>🎙️</div>
        <span style={{
          fontWeight: '800', fontSize: '17px',
          background: 'linear-gradient(135deg, #E11D48, #F43F5E)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>VoiceIQ</span>
      </div>
      <Button variant="ghost" size="sm" onClick={signOut}>Sign Out</Button>
    </nav>
  )
}