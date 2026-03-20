import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ArrowLeft = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
)

const G_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

const features = [
  { icon: '🎙️', text: 'AI-powered call transcription' },
  { icon: '✅', text: 'Automatic SOP compliance validation' },
  { icon: '📊', text: 'Real-time analytics dashboard' },
  { icon: '🚩', text: 'Instant non-compliant call flagging' },
]

export default function LoginPage() {
  const { signIn, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!email || !password) return setError('Enter your email and password')
    setError('')
    setLoading(true)
    const { error: err } = await signIn(email, password)
    setLoading(false)
    if (err) return setError(err.message)
    navigate('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Left Panel */}
      <div className="auth-left" style={{
        display: 'none', width: '45%', flexDirection: 'column',
        minHeight: '100vh', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(160deg, #9F1239 0%, #BE123C 40%, #E11D48 75%, #F43F5E 100%)'
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '360px', height: '360px', background: 'rgba(251,113,133,0.15)', borderRadius: '50%', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '280px', height: '280px', background: 'rgba(159,18,57,0.2)', borderRadius: '50%', filter: 'blur(60px)' }} />

        {/* Logo */}
        <div style={{ position: 'relative', zIndex: 1, padding: '40px 40px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🎙️</div>
            <span style={{ color: '#fff', fontWeight: '800', fontSize: '18px' }}>VoiceIQ</span>
          </div>
        </div>

        {/* Center */}
        <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
          <div style={{ width: '100%', maxWidth: '280px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#fff', lineHeight: '1.2', marginBottom: '24px' }}>
              Debug calls, ensure compliance.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '10px 14px', color: '#fff', fontSize: '13px', fontWeight: '500', textAlign: 'left' }}>
                  <span style={{ flexShrink: 0 }}>{f.icon}</span>{f.text}
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '24px' }}>
              {[{ v: '< 30s', l: 'Processing' }, { v: '2 langs', l: 'Supported' }, { v: '100%', l: 'AI driven' }].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>{s.v}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontFamily: 'monospace' }}>call_001.mp3 · Hindi</span>
                <span style={{ background: 'rgba(16,185,129,0.2)', color: '#6EE7B7', fontSize: '10px', padding: '2px 8px', borderRadius: '99px', border: '1px solid rgba(16,185,129,0.2)' }}>94% SOP ✓</span>
              </div>
              <div style={{ color: '#6EE7B7', fontSize: '11px', fontFamily: 'monospace' }}>Sentiment: Positive 😊</div>
              <div style={{ color: 'rgba(251,113,133,0.8)', fontSize: '11px', marginTop: '4px' }}>AI confidence: 97%</div>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, padding: '0 40px 40px' }}>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px' }}>© 2026 VoiceIQ · HCL GUVI Hackathon</p>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px clamp(24px,6vw,80px)', background: '#F9FAFB', position: 'relative', minHeight: '100vh' }}>

        <div className="back-desktop" style={{ position: 'absolute', top: '32px', left: '32px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#9CA3AF', fontWeight: '500', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#374151'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#9CA3AF'}>
            <ArrowLeft /> Back to home
          </Link>
        </div>

        <div style={{ width: '100%', maxWidth: '360px' }}>

          <div className="back-mobile" style={{ display: 'none', marginBottom: '24px' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#9CA3AF', fontWeight: '500', textDecoration: 'none' }}>
              <ArrowLeft /> Back to home
            </Link>
          </div>

          <div className="mobile-logo" style={{ display: 'none', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #E11D48, #F43F5E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🎙️</div>
            <span style={{ fontWeight: '800', fontSize: '17px', background: 'linear-gradient(135deg, #E11D48, #F43F5E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VoiceIQ</span>
          </div>

          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: '32px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>Welcome back</h1>
              <p style={{ fontSize: '13px', color: '#9CA3AF' }}>Sign in to your account</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Google OAuth */}
              <button onClick={signInWithGoogle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '2px solid #E5E7EB', background: '#fff', borderRadius: '10px', padding: '11px', fontSize: '13px', fontWeight: '600', color: '#374151', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s ease' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = '#FECDD3'; el.style.background = '#FFF1F2' }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#E5E7EB'; el.style.background = '#fff' }}>
                {G_ICON} Continue with Google
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ flex: 1, height: '1px', background: '#F3F4F6' }} />
                <span style={{ fontSize: '11px', color: '#D1D5DB', fontWeight: '600' }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: '#F3F4F6' }} />
              </div>

              {error && (
                <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '9px 12px', borderRadius: '8px', fontSize: '12px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                  ⚠️ {error}
                </div>
              )}

              <input type="email" placeholder="Email address" value={email}
                onChange={e => setEmail(e.target.value)} style={inputSt}
                onFocus={e => { e.target.style.borderColor = '#E11D48'; e.target.style.boxShadow = '0 0 0 3px rgba(225,29,72,0.08)' }}
                onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }} />

              <div>
                <input type="password" placeholder="Password" value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()} style={inputSt}
                  onFocus={e => { e.target.style.borderColor = '#E11D48'; e.target.style.boxShadow = '0 0 0 3px rgba(225,29,72,0.08)' }}
                  onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#E11D48', fontWeight: '600', cursor: 'pointer' }}>Forgot password?</span>
                </div>
              </div>

              <button onClick={handleLogin} disabled={loading || !email || !password} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: loading || !email || !password ? '#FDA4AF' : 'linear-gradient(135deg, #E11D48, #F43F5E)',
                color: '#fff', border: 'none', borderRadius: '10px', padding: '12px',
                fontSize: '14px', fontWeight: '700', cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease', fontFamily: 'inherit'
              }}>
                {loading ? <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> : 'Sign in'}
              </button>
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px', color: '#9CA3AF' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#E11D48', fontWeight: '700', textDecoration: 'none' }}>Create one free</Link>
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) { .auth-left { display: flex !important; } .mobile-logo { display: none !important; } .back-mobile { display: none !important; } }
        @media (max-width: 1023px) { .back-desktop { display: none !important; } .back-mobile { display: block !important; } .mobile-logo { display: flex !important; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

const inputSt: React.CSSProperties = {
  width: '100%', padding: '10px 13px', borderRadius: '10px',
  border: '2px solid #E5E7EB', fontSize: '13px', outline: 'none',
  transition: 'all 0.2s ease', background: '#fff', color: '#111827',
  fontFamily: "'Plus Jakarta Sans', sans-serif"
}