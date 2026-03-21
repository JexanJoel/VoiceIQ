import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FEATURES = [
  { icon: '🗣️', title: 'Hinglish & Tanglish STT', desc: 'Groq Whisper large-v3 transcribes mixed-language Indian call recordings with high accuracy — no manual effort.' },
  { icon: '✅', title: 'SOP Compliance Validation', desc: 'Every call is scored against your SOPs automatically. Violations are flagged with exact rule references.' },
  { icon: '😊', title: 'Sentiment Analysis', desc: 'Detect caller mood and agent tone across every interaction. Spot negative patterns before they escalate.' },
  { icon: '💳', title: 'Payment Preference Detection', desc: 'Automatically categorize whether customers prefer cash, UPI, card, or other payment methods.' },
  { icon: '🚩', title: 'Instant Call Flagging', desc: 'Calls below 70% SOP compliance are automatically flagged for manager review — zero manual listening.' },
  { icon: '📊', title: 'Live Analytics Dashboard', desc: 'Real-time charts on compliance trends, sentiment distribution, language breakdown, and top violations.' },
]

const STEPS = [
  { n: '01', icon: '📤', title: 'Upload Recording', desc: 'Drop any MP3, WAV or M4A. Hinglish & Tanglish both supported out of the box.' },
  { n: '02', icon: '🤖', title: 'AI Transcription', desc: 'Groq Whisper transcribes in seconds with automatic language detection.' },
  { n: '03', icon: '✅', title: 'SOP Analysis', desc: 'Llama 3.3 70B validates the transcript, scores compliance, and detects violations.' },
  { n: '04', icon: '📊', title: 'Dashboard Insights', desc: 'View sentiment, violations, payment preference, and full transcript in one place.' },
]

const STATS = [
  { v: '< 30s', l: 'Per Recording' },
  { v: '2', l: 'Languages' },
  { v: '6', l: 'SOP Checks' },
  { v: '100%', l: 'AI Automated' },
]

const TECH = ['Groq Whisper', 'Llama 3.3 70B', 'Supabase', 'React + Vite', 'Node.js + Express', 'TypeScript']
const WITHOUT = ['Manual listening takes hours', 'Compliance errors go undetected', 'No Hinglish/Tanglish support', 'Inconsistent SOP enforcement', 'No data-driven insights']
const WITH = ['Full analysis in under 30 seconds', 'Every violation automatically flagged', 'Native Hinglish & Tanglish support', 'Consistent AI-powered SOP scoring', 'Real-time dashboard & trend reports']
const GITHUB_URL = 'https://github.com/JexanJoel/VoiceIQ'

const GH = (size = 13) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

export default function LandingPage() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", overflowX: 'hidden', color: '#111827' }}>

      {/* ── Nav ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ height: '60px', display: 'flex', alignItems: 'center', padding: '0 clamp(16px,5vw,80px)', justifyContent: 'space-between' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #E11D48, #F43F5E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', boxShadow: '0 3px 10px rgba(225,29,72,0.25)' }}>🎙️</div>
            <span style={{ fontWeight: '800', fontSize: '17px', background: 'linear-gradient(135deg, #E11D48, #F43F5E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VoiceIQ</span>
            <span style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0', borderRadius: '99px', fontSize: '10px', fontWeight: '700', padding: '2px 8px' }}>Open Source</span>
          </div>

          {/* Desktop nav */}
          <div className="nav-desktop" style={{ gap: '8px', alignItems: 'center' }}>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '7px 14px', fontSize: '12px', fontWeight: '600', color: '#374151', textDecoration: 'none', background: 'none' }}>
              {GH(13)} GitHub
            </a>
            <button onClick={() => navigate('/login')} style={{ background: 'none', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '7px 16px', fontSize: '13px', fontWeight: '600', color: '#374151', cursor: 'pointer', fontFamily: 'inherit' }}>Sign In</button>
            <button onClick={() => navigate('/signup')} style={{ background: 'linear-gradient(135deg, #E11D48, #F43F5E)', border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '13px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 3px 10px rgba(225,29,72,0.25)' }}>Get Started →</button>
          </div>

          {/* Hamburger */}
          <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)} style={{
            width: '36px', height: '36px', borderRadius: '8px',
            border: '1px solid #E5E7EB', background: '#fff', cursor: 'pointer',
            fontSize: '18px', color: '#374151', fontFamily: 'inherit',
            alignItems: 'center', justifyContent: 'center', padding: 0, lineHeight: 1
          }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="mobile-menu" style={{ flexDirection: 'column', gap: '8px', padding: '12px 16px 16px', borderTop: '1px solid #F3F4F6', background: '#fff' }}>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '11px 12px', borderRadius: '8px', background: '#F9FAFB', fontSize: '13px', fontWeight: '600', color: '#374151', textDecoration: 'none', border: '1px solid #E5E7EB' }}>
              {GH(14)} View on GitHub
            </a>
            <button onClick={() => { navigate('/login'); setMenuOpen(false) }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '11px 12px', borderRadius: '8px', background: '#F9FAFB', border: '1px solid #E5E7EB', fontSize: '13px', fontWeight: '600', color: '#374151', cursor: 'pointer', fontFamily: 'inherit' }}>
              Sign In
            </button>
            <button onClick={() => { navigate('/signup'); setMenuOpen(false) }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '11px 12px', borderRadius: '8px', background: 'linear-gradient(135deg, #E11D48, #F43F5E)', border: 'none', fontSize: '13px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>
              Get Started →
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: 'clamp(60px,10vw,110px) clamp(16px,5vw,80px) clamp(50px,8vw,90px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(225,29,72,0.06), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#FFF1F2', border: '1px solid #FECDD3', color: '#E11D48', padding: '4px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: '700' }}>🇮🇳 Built for Indian Call Centers</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#16A34A', padding: '4px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: '700' }}>⭐ Open Source — Apache 2.0</div>
          </div>
          <h1 style={{ fontSize: 'clamp(30px,5vw,54px)', fontWeight: '800', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '18px', color: '#0F172A' }}>
            Turn Every Call Into{' '}
            <span style={{ background: 'linear-gradient(135deg, #E11D48, #FB7185)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Compliance Intelligence</span>
          </h1>
          <p style={{ fontSize: 'clamp(13px,1.5vw,16px)', color: '#6B7280', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 32px' }}>
            Automatically transcribe Hinglish & Tanglish calls, validate SOP compliance, detect sentiment, and surface insights — all in under 30 seconds.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '14px' }}>
            <button onClick={() => navigate('/signup')} style={{ background: 'linear-gradient(135deg, #E11D48, #F43F5E)', color: '#fff', border: 'none', borderRadius: '10px', padding: 'clamp(10px,1.5vw,13px) clamp(18px,3vw,28px)', fontSize: 'clamp(13px,1.3vw,14px)', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 20px rgba(225,29,72,0.28)', whiteSpace: 'nowrap' }}>
              Start Free →
            </button>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fff', color: '#374151', border: '1px solid #E5E7EB', borderRadius: '10px', padding: 'clamp(10px,1.5vw,13px) clamp(18px,3vw,24px)', fontSize: 'clamp(13px,1.3vw,14px)', fontWeight: '600', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              {GH(15)} View on GitHub
            </a>
          </div>
          <p style={{ fontSize: '12px', color: '#9CA3AF' }}>Free forever · Open source · Apache 2.0 License</p>
        </div>

        {/* Dashboard mockup */}
        <div style={{ maxWidth: '680px', margin: 'clamp(40px,6vw,56px) auto 0', position: 'relative', zIndex: 1 }}>
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(225,29,72,0.05)', overflow: 'hidden' }}>
            <div style={{ background: '#F9FAFB', borderBottom: '1px solid #F3F4F6', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {['#F87171','#FBBF24','#34D399'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
              <div style={{ flex: 1, height: '6px', background: '#E5E7EB', borderRadius: '4px', marginLeft: '8px', maxWidth: '160px' }} />
              <div style={{ marginLeft: 'auto', fontSize: '10px', color: '#9CA3AF', fontWeight: '600' }}>VoiceIQ Dashboard</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: '#F3F4F6' }}>
              {[{ l: 'Total Calls', v: '1,284', c: '#E11D48' }, { l: 'Avg Compliance', v: '87%', c: '#059669' }, { l: 'Flagged', v: '23', c: '#D97706' }].map(s => (
                <div key={s.l} style={{ background: '#fff', padding: '14px 18px' }}>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: s.c }}>{s.v}</div>
                  <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '14px 18px' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', color: '#374151', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recent Calls</div>
              {[
                { name: 'call_recording_001.mp3', compliance: 94, sentiment: 'positive', lang: 'HI', flag: false },
                { name: 'call_recording_002.wav', compliance: 58, sentiment: 'negative', lang: 'TA', flag: true },
                { name: 'call_recording_003.mp3', compliance: 88, sentiment: 'neutral', lang: 'HI', flag: false },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? '1px solid #F9FAFB' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px', minWidth: 0 }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: c.flag ? '#FEF2F2' : '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>{c.flag ? '🚩' : '📞'}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '12px', fontWeight: '600', color: '#1F2937', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                      <div style={{ fontSize: '10px', color: '#9CA3AF' }}>{c.lang} · {c.sentiment}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '99px', background: c.compliance >= 80 ? '#DCFCE7' : '#FEF9C3', color: c.compliance >= 80 ? '#166534' : '#854D0E', flexShrink: 0 }}>{c.compliance}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{ background: '#0F172A', padding: 'clamp(28px,4vw,44px) clamp(16px,5vw,80px)' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: '24px', textAlign: 'center' }}>
          {STATS.map(s => (
            <div key={s.v}>
              <div style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: '800', color: '#FB7185' }}>{s.v}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '3px', fontWeight: '500' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: 'clamp(56px,8vw,90px) clamp(16px,5vw,80px)', background: '#FAFAFA' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={pill}>FEATURES</div>
            <h2 style={sectionH2}>Everything you need to monitor call quality</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '14px' }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #F3F4F6', borderRadius: '14px', padding: '22px', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = '#FECDD3'; el.style.boxShadow = '0 8px 24px rgba(225,29,72,0.07)'; el.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = '#F3F4F6'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FFF1F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '12px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>{f.title}</h3>
                <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section style={{ padding: 'clamp(56px,8vw,90px) clamp(16px,5vw,80px)', background: '#fff' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={pill}>HOW IT WORKS</div>
            <h2 style={sectionH2}>From upload to insight in under 30 seconds</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '12px' }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', background: '#FAFAFA', border: '1px solid #F3F4F6', borderRadius: '13px', padding: '18px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'linear-gradient(135deg, #E11D48, #F43F5E)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(225,29,72,0.2)' }}>
                  <span style={{ fontSize: '7px', color: 'rgba(255,255,255,0.6)', fontWeight: '700' }}>{s.n}</span>
                  <span style={{ fontSize: '15px', lineHeight: 1 }}>{s.icon}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '5px' }}>{s.title}</h3>
                  <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section style={{ padding: 'clamp(56px,8vw,90px) clamp(16px,5vw,80px)', background: '#FAFAFA' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={pill}>WHY VOICEIQ</div>
            <h2 style={sectionH2}>Manual reviews vs VoiceIQ</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '12px' }}>
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '14px', padding: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <div style={{ width: '26px', height: '26px', background: '#FEE2E2', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#EF4444' }}>✗</div>
                <span style={{ fontWeight: '700', fontSize: '13px', color: '#991B1B' }}>Without VoiceIQ</span>
              </div>
              {WITHOUT.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ color: '#F87171', flexShrink: 0, fontWeight: '700', fontSize: '12px', marginTop: '1px' }}>✗</span>
                  <span style={{ fontSize: '13px', color: '#7F1D1D', lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '14px', padding: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <div style={{ width: '26px', height: '26px', background: '#DCFCE7', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#22C55E' }}>✓</div>
                <span style={{ fontWeight: '700', fontSize: '13px', color: '#166534' }}>With VoiceIQ</span>
              </div>
              {WITH.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ color: '#22C55E', flexShrink: 0, fontWeight: '700', fontSize: '12px', marginTop: '1px' }}>✓</span>
                  <span style={{ fontSize: '13px', color: '#14532D', lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section style={{ padding: 'clamp(40px,5vw,60px) clamp(16px,5vw,80px)', background: '#fff' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: '700', color: '#9CA3AF', letterSpacing: '1.5px', marginBottom: '16px' }}>POWERED BY</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
            {TECH.map(t => (
              <div key={t} style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', padding: '6px 14px', borderRadius: '99px', fontSize: '12px', fontWeight: '600', color: '#374151' }}>{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: 'clamp(56px,8vw,90px) clamp(16px,5vw,80px)', background: '#fff', borderTop: '1px solid #F3F4F6' }}>
        <div style={{ maxWidth: '540px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '14px' }}>🚀</div>
          <h2 style={{ fontSize: 'clamp(18px,3vw,30px)', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.5px', marginBottom: '12px', whiteSpace: 'nowrap' }}>
            Ready to automate your call compliance?
          </h2>
          <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '28px', lineHeight: 1.7 }}>
            Upload your first recording and get full compliance insights in seconds.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'nowrap' }}>
            <button onClick={() => navigate('/signup')} style={{ background: 'linear-gradient(135deg, #E11D48, #F43F5E)', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 20px rgba(225,29,72,0.28)', whiteSpace: 'nowrap' }}>
              Get Started Free →
            </button>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fff', color: '#374151', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '12px 20px', fontSize: '13px', fontWeight: '600', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              {GH(14)} View on GitHub
            </a>
          </div>
          <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '12px' }}>Free forever · Open source · Apache 2.0 License</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid #F3F4F6', background: '#FAFAFA', padding: '20px clamp(16px,5vw,80px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🎙️</span>
            <span style={{ fontWeight: '800', fontSize: '14px', background: 'linear-gradient(135deg, #E11D48, #F43F5E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VoiceIQ</span>
            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>· Open Source</span>
          </div>
          <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>© 2026 VoiceIQ · HCL GUVI Intern Hiring Hackathon</p>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#6B7280', fontWeight: '600', textDecoration: 'none' }}>
            {GH(13)} GitHub
          </a>
        </div>
      </footer>

      <style>{`
        .nav-desktop { display: flex; }
        .hamburger-btn { display: none; }
        .mobile-menu { display: none; }

        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .mobile-menu { display: flex !important; }
        }
      `}</style>
    </div>
  )
}

const pill: React.CSSProperties = {
  display: 'inline-block', background: '#FFF1F2', color: '#E11D48',
  border: '1px solid #FECDD3', padding: '4px 12px', borderRadius: '99px',
  fontSize: '11px', fontWeight: '700', marginBottom: '12px', letterSpacing: '0.5px'
}

const sectionH2: React.CSSProperties = {
  fontSize: 'clamp(20px,3.2vw,34px)', fontWeight: '800',
  color: '#0F172A', letterSpacing: '-0.5px', margin: 0
}