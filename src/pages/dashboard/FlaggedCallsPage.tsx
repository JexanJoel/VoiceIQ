import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFlaggedCalls, reviewCall } from '../../services/api'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Loader from '../../components/ui/Loader'
import EmptyState from '../../components/ui/EmptyState'
import { formatDate, formatDuration, getComplianceBadge } from '../../utils/helpers'

export default function FlaggedCallsPage() {
  const navigate = useNavigate()
  const [calls, setCalls] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [reviewingId, setReviewingId] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed'>('all')

  const fetchCalls = async () => {
    try {
      const res = await getFlaggedCalls()
      setCalls(res.data.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCalls() }, [])

  const handleReview = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setReviewingId(id)
    try {
      await reviewCall(id)
      await fetchCalls()
    } finally {
      setReviewingId(null)
    }
  }

  const filteredCalls = calls.filter(c => {
    if (filter === 'reviewed') return !!c.reviewed_at
    if (filter === 'pending') return !c.reviewed_at
    return true
  })

  const reviewedCount = calls.filter(c => !!c.reviewed_at).length
  const pendingCount = calls.filter(c => !c.reviewed_at).length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#111827' }}>🚩 Flagged Calls</h1>
        <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '2px' }}>
          Calls with SOP compliance below 70%
        </p>
      </div>

      {/* Stats row */}
      {!loading && calls.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
          {[
            { label: 'Total Flagged', value: calls.length, color: '#EF4444', bg: '#FEF2F2' },
            { label: 'Pending Review', value: pendingCount, color: '#D97706', bg: '#FEF9C3' },
            { label: 'Reviewed', value: reviewedCount, color: '#059669', bg: '#DCFCE7' },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: '10px', padding: '12px 16px' }}>
              <div style={{ fontSize: '20px', fontWeight: '800', color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Filter tabs */}
      {!loading && calls.length > 0 && (
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['all', 'pending', 'reviewed'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700',
              border: filter === f ? '1.5px solid #E11D48' : '1.5px solid #E5E7EB',
              background: filter === f ? '#FFF1F2' : '#fff',
              color: filter === f ? '#E11D48' : '#6B7280',
              cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize'
            }}>
              {f === 'all' ? `All (${calls.length})` : f === 'pending' ? `Pending (${pendingCount})` : `Reviewed (${reviewedCount})`}
            </button>
          ))}
        </div>
      )}

      {loading ? <Loader center /> : filteredCalls.length === 0 ? (
        <EmptyState
          icon={calls.length === 0 ? '🎉' : '✅'}
          title={calls.length === 0 ? 'No flagged calls!' : `No ${filter} calls`}
          description={calls.length === 0 ? 'All calls are meeting SOP compliance standards' : `Switch filter to see other calls`}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredCalls.map(call => (
            <Card key={call.id} onClick={() => navigate(`/dashboard/calls/${call.id}`)}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: call.reviewed_at ? '#DCFCE7' : '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                    {call.reviewed_at ? '✅' : '🚩'}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <div style={{ fontWeight: '700', fontSize: '14px', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {call.file_name}
                      </div>
                      {call.reviewed_at && (
                        <span style={{ fontSize: '10px', fontWeight: '700', color: '#059669', background: '#DCFCE7', padding: '2px 7px', borderRadius: '99px', whiteSpace: 'nowrap' }}>
                          ✓ Reviewed
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
                      {formatDate(call.created_at)} · {formatDuration(call.duration_seconds)}
                      {call.agent_name && call.agent_name !== 'Unknown Agent' && (
                        <span style={{ marginLeft: '6px', color: '#E11D48', fontWeight: '600' }}>· 👤 {call.agent_name}</span>
                      )}
                    </div>
                    {call.violations?.length > 0 && (
                      <div style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }}>
                        {call.violations.length} violation{call.violations.length > 1 ? 's' : ''} found
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <Badge variant={getComplianceBadge(call.sop_compliance_percentage) as any}>
                    {call.sop_compliance_percentage}% SOP
                  </Badge>
                  <button
                    onClick={(e) => handleReview(call.id, e)}
                    disabled={reviewingId === call.id}
                    style={{
                      padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700',
                      border: call.reviewed_at ? '1.5px solid #BBF7D0' : '1.5px solid #E5E7EB',
                      background: call.reviewed_at ? '#DCFCE7' : '#F9FAFB',
                      color: call.reviewed_at ? '#059669' : '#6B7280',
                      cursor: reviewingId === call.id ? 'not-allowed' : 'pointer',
                      fontFamily: 'inherit', opacity: reviewingId === call.id ? 0.5 : 1,
                      transition: 'all 0.15s ease', whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={e => { if (!call.reviewed_at) e.currentTarget.style.borderColor = '#E11D48' }}
                    onMouseLeave={e => { if (!call.reviewed_at) e.currentTarget.style.borderColor = '#E5E7EB' }}
                  >
                    {reviewingId === call.id ? '...' : call.reviewed_at ? '✓ Reviewed' : 'Mark Reviewed'}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}