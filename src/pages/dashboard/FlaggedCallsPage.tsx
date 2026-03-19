import { useNavigate } from 'react-router-dom'
import { useFlaggedCalls } from '../../hooks/useCalls'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Loader from '../../components/ui/Loader'
import EmptyState from '../../components/ui/EmptyState'
import { formatDate, formatDuration, getComplianceBadge } from '../../utils/helpers'

export default function FlaggedCallsPage() {
  const { calls, loading } = useFlaggedCalls()
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#111827' }}>🚩 Flagged Calls</h1>
        <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '2px' }}>
          Calls with SOP compliance below 70%
        </p>
      </div>

      {loading ? <Loader center /> : calls.length === 0 ? (
        <EmptyState icon="🎉" title="No flagged calls!" description="All calls are meeting SOP compliance standards" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {calls.map(call => (
            <Card key={call.id} onClick={() => navigate(`/dashboard/calls/${call.id}`)}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: '#FEE2E2', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '18px', flexShrink: 0
                  }}>🚩</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {call.file_name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
                      {formatDate(call.created_at)} · {formatDuration(call.duration_seconds)}
                    </div>
                    {call.violations?.length > 0 && (
                      <div style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }}>
                        {call.violations.length} violation{call.violations.length > 1 ? 's' : ''} found
                      </div>
                    )}
                  </div>
                </div>
                <Badge variant={getComplianceBadge(call.sop_compliance_percentage) as any}>
                  {call.sop_compliance_percentage}% SOP
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}