import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCallById, getAudioUrl } from '../../services/api'
import Card from '../../components/ui/Card'
import Loader from '../../components/ui/Loader'
import Button from '../../components/ui/Button'
import { formatDate, formatDuration, getComplianceColor, getSentimentColor } from '../../utils/helpers'

const sectionTitle: React.CSSProperties = {
  fontSize: '14px', fontWeight: '700', color: '#374151', marginBottom: '12px'
}

function AudioPlayer({ callId }: { callId: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [speed, setSpeed] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]

  useEffect(() => {
    getAudioUrl(callId)
      .then(res => setAudioUrl(res.data.data.url))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [callId])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) { audio.pause(); setIsPlaying(false) }
    else { audio.play(); setIsPlaying(true) }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value)
    if (audioRef.current) { audioRef.current.currentTime = t; setCurrentTime(t) }
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    if (audioRef.current) { audioRef.current.volume = v; setVolume(v) }
  }

  const handleSpeed = (s: number) => {
    if (audioRef.current) { audioRef.current.playbackRate = s; setSpeed(s) }
  }

  const handleEnded = () => setIsPlaying(false)

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  if (loading) return (
    <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ width: '16px', height: '16px', border: '2px solid #E11D48', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <span style={{ fontSize: '13px', color: '#9CA3AF' }}>Loading audio...</span>
    </div>
  )

  if (error || !audioUrl) return (
    <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', padding: '16px' }}>
      <p style={{ fontSize: '13px', color: '#991B1B' }}>⚠️ Could not load audio file.</p>
    </div>
  )

  return (
    <div style={{ background: 'linear-gradient(135deg, #FFF1F2, #FFF8F9)', border: '1px solid #FFE4E6', borderRadius: '14px', padding: '20px' }}>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #E11D48, #F43F5E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>🎙️</div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>Call Recording</div>
          <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Click play to listen</div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: '12px' }}>
        <input
          type="range" min={0} max={duration || 0} step={0.1} value={currentTime}
          onChange={handleSeek}
          style={{ width: '100%', height: '4px', accentColor: '#E11D48', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{fmt(currentTime)}</span>
          <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{fmt(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>

        {/* Play/Pause */}
        <button onClick={togglePlay} style={{
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #E11D48, #F43F5E)',
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', flexShrink: 0,
          boxShadow: '0 4px 12px rgba(225,29,72,0.3)'
        }}>
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          )}
        </button>

        {/* Volume */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, minWidth: '100px' }}>
          <span style={{ fontSize: '14px' }}>{volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}</span>
          <input
            type="range" min={0} max={1} step={0.05} value={volume}
            onChange={handleVolume}
            style={{ flex: 1, height: '4px', accentColor: '#E11D48', cursor: 'pointer' }}
          />
        </div>

        {/* Speed */}
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {speeds.map(s => (
            <button key={s} onClick={() => handleSpeed(s)} style={{
              padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700',
              border: speed === s ? '1.5px solid #E11D48' : '1.5px solid #FFE4E6',
              background: speed === s ? '#FFF1F2' : '#fff',
              color: speed === s ? '#E11D48' : '#9CA3AF',
              cursor: 'pointer', fontFamily: 'inherit'
            }}>{s}x</button>
          ))}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function CallDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [call, setCall] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCallById(id!).then(res => setCall(res.data.data)).finally(() => setLoading(false))
  }, [id])

  if (loading) return <Loader center />
  if (!call) return <div>Call not found</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>← Back</Button>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>{call.file_name}</h1>
          <p style={{ fontSize: '13px', color: '#9CA3AF' }}>{formatDate(call.created_at)} · {formatDuration(call.duration_seconds)}</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
        {[
          { label: 'SOP Compliance', value: `${call.sop_compliance_percentage}%`, color: getComplianceColor(call.sop_compliance_percentage) },
          { label: 'Sentiment', value: call.sentiment, color: getSentimentColor(call.sentiment) },
          { label: 'Language', value: call.language?.toUpperCase() || '—', color: '#E11D48' },
          { label: 'Payment Pref', value: call.payment_preference || '—', color: '#F59E0B' },
        ].map(s => (
          <Card key={s.label}>
            <div style={{ fontSize: '18px', fontWeight: '800', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Audio + Transcript side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>

        {/* Left — Audio Player + Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Card>
            <h3 style={sectionTitle}>🎙️ Audio Player</h3>
            <AudioPlayer callId={id!} />
          </Card>

          {call.summary && (
            <Card>
              <h3 style={sectionTitle}>📝 Summary</h3>
              <p style={{ fontSize: '13px', color: '#374151', lineHeight: '1.7' }}>{call.summary}</p>
            </Card>
          )}
        </div>

        {/* Right — Transcript */}
        {call.transcript && (
          <Card style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={sectionTitle}>🗣️ Transcript</h3>
            <div style={{
              fontSize: '13px', color: '#374151', lineHeight: '1.8',
              background: '#F9FAFB', padding: '14px', borderRadius: '8px',
              whiteSpace: 'pre-wrap', overflowY: 'auto', flex: 1,
              maxHeight: '400px'
            }}>{call.transcript}</div>
          </Card>
        )}
      </div>

      {/* SOP Checks */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        <Card>
          <h3 style={{ ...sectionTitle, color: '#065F46' }}>✅ Passed Checks</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {call.passed_checks?.length > 0 ? call.passed_checks.map((c: string, i: number) => (
              <div key={i} style={{ fontSize: '13px', color: '#374151', display: 'flex', gap: '8px' }}>
                <span style={{ color: '#10B981', flexShrink: 0 }}>✓</span>{c}
              </div>
            )) : <p style={{ fontSize: '13px', color: '#9CA3AF' }}>None</p>}
          </div>
        </Card>
        <Card>
          <h3 style={{ ...sectionTitle, color: '#991B1B' }}>❌ Violations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {call.violations?.length > 0 ? call.violations.map((v: string, i: number) => (
              <div key={i} style={{ fontSize: '13px', color: '#374151', display: 'flex', gap: '8px' }}>
                <span style={{ color: '#EF4444', flexShrink: 0 }}>✗</span>{v}
              </div>
            )) : <p style={{ fontSize: '13px', color: '#9CA3AF' }}>No violations 🎉</p>}
          </div>
        </Card>
      </div>
    </div>
  )
}