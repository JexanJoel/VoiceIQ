import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCallById } from '../../services/api'
import Card from '../../components/ui/Card'
import Loader from '../../components/ui/Loader'
import Button from '../../components/ui/Button'
import { formatDate, formatDuration, getComplianceColor, getSentimentColor } from '../../utils/helpers'

const sectionTitle: React.CSSProperties = { fontSize: '14px', fontWeight: '700', color: '#374151', marginBottom: '12px' }

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>← Back</Button>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>{call.file_name}</h1>
          <p style={{ fontSize: '13px', color: '#9CA3AF' }}>{formatDate(call.created_at)} · {formatDuration(call.duration_seconds)}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
        {[
          { label: 'SOP Compliance', value: `${call.sop_compliance_percentage}%`, color: getComplianceColor(call.sop_compliance_percentage) },
          { label: 'Sentiment', value: call.sentiment, color: getSentimentColor(call.sentiment) },
          { label: 'Language', value: call.language?.toUpperCase() || '—', color: '#4F46E5' },
          { label: 'Payment Pref', value: call.payment_preference || '—', color: '#F59E0B' },
        ].map(s => (
          <Card key={s.label}>
            <div style={{ fontSize: '20px', fontWeight: '800', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {call.summary && (
        <Card>
          <h3 style={sectionTitle}>📝 Summary</h3>
          <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.7' }}>{call.summary}</p>
        </Card>
      )}

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

      {call.transcript && (
        <Card>
          <h3 style={sectionTitle}>🗣️ Transcript</h3>
          <p style={{
            fontSize: '14px', color: '#374151', lineHeight: '1.8',
            background: '#F9FAFB', padding: '16px', borderRadius: '8px',
            whiteSpace: 'pre-wrap', maxHeight: '300px', overflowY: 'auto'
          }}>{call.transcript}</p>
        </Card>
      )}
    </div>
  )
}