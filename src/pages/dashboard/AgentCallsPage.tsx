import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAgentCalls } from '../../services/api'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Loader from '../../components/ui/Loader'
import EmptyState from '../../components/ui/EmptyState'
import { formatDate, formatDuration, getComplianceBadge } from '../../utils/helpers'

export default function AgentCallsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [calls, setCalls] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAgentCalls(id!).then(res => setCalls(res.data.data)).finally(() => setLoading(false))
  }, [id])

  if (loading) return <Loader center />

  const agentName = calls[0]?.agent_name || 'Agent'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/agents')}>← Back</Button>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#111827' }}>👤 {agentName}</h1>
          <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '2px' }}>{calls.length} calls</p>
        </div>
      </div>

      {calls.length === 0 ? (
        <EmptyState icon="📞" title="No calls yet" description="No calls assigned to this agent yet" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {calls.map(call => (
            <Card key={call.id} onClick={() => navigate(`/dashboard/calls/${call.id}`)}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FFF1F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>📞</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {call.file_name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
                      {formatDate(call.created_at)} · {formatDuration(call.duration_seconds)} · {call.language?.toUpperCase() || '—'}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <Badge variant={getComplianceBadge(call.sop_compliance_percentage) as any}>
                    {call.sop_compliance_percentage}% SOP
                  </Badge>
                  <Badge variant={call.sentiment === 'positive' ? 'success' : call.sentiment === 'negative' ? 'danger' : 'warning'}>
                    {call.sentiment}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}