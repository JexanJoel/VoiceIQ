import { useNavigate } from 'react-router-dom'
import { useAnalytics } from '../../hooks/useCalls'
import Card from '../../components/ui/Card'
import Loader from '../../components/ui/Loader'
import ComplianceTrendChart from '../../components/charts/ComplianceTrendChart'
import SentimentChart from '../../components/charts/SentimentChart'
import LanguageBreakdownChart from '../../components/charts/LanguageBreakdownChart'
import PaymentPreferenceChart from '../../components/charts/PaymentPreferenceChart'

const StatCard = ({ icon, label, value, color }: { icon: string, label: string, value: string | number, color: string }) => (
  <Card>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: '22px', fontWeight: '800', color: '#111827' }}>{value}</div>
        <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: '500' }}>{label}</div>
      </div>
    </div>
  </Card>
)

const chartTitle: React.CSSProperties = { fontSize: '14px', fontWeight: '700', color: '#374151', marginBottom: '12px' }

export default function DashboardHome() {
  const navigate = useNavigate()
  const { stats, trend, violations, loading } = useAnalytics()
  if (loading) return <Loader center />

  const bestDay = stats?.best_day
  const worstDay = stats?.worst_day
  const topViolation = violations?.[0]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#111827' }}>Dashboard</h1>
        <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '2px' }}>Call center compliance overview</p>
      </div>

      {/* Main stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
        <StatCard icon="📞" label="Total Calls" value={stats?.total_calls ?? 0} color="#4F46E5" />
        <StatCard icon="🚩" label="Flagged Calls" value={stats?.flagged_calls ?? 0} color="#EF4444" />
        <StatCard icon="✅" label="Avg Compliance" value={`${stats?.avg_compliance_percentage ?? 0}%`} color="#10B981" />
      </div>

      {/* Best/Worst day + Most violated rule */}
      {(bestDay || worstDay || topViolation) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {bestDay && (
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '16px' }}>🏆</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#166534' }}>Best Day</span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#059669' }}>{bestDay.avg}% avg</div>
              <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>{bestDay.date} · {bestDay.count} call{bestDay.count !== 1 ? 's' : ''}</div>
              <button
                onClick={() => navigate(`/dashboard/calls?date=${bestDay.date}`)}
                style={{ marginTop: '8px', fontSize: '11px', color: '#059669', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
              >
                View calls →
              </button>
            </div>
          )}

          {worstDay && worstDay.date !== bestDay?.date && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '16px' }}>⚠️</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#991B1B' }}>Worst Day</span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#EF4444' }}>{worstDay.avg}% avg</div>
              <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>{worstDay.date} · {worstDay.count} call{worstDay.count !== 1 ? 's' : ''}</div>
              <button
                onClick={() => navigate(`/dashboard/calls?date=${worstDay.date}`)}
                style={{ marginTop: '8px', fontSize: '11px', color: '#EF4444', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
              >
                View calls →
              </button>
            </div>
          )}

          {topViolation && (
            <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '16px' }}>🔥</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#9A3412' }}>Most Violated Rule</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#EA580C', lineHeight: 1.4 }}>
                {typeof topViolation.violation === 'object' ? (topViolation.violation as any).text : topViolation.violation}
              </div>
              <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>
                Violated {topViolation.count}x across all calls
              </div>
            </div>
          )}
        </div>
      )}

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        <Card>
          <h3 style={chartTitle}>Compliance Trend (7 days) <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: '400' }}>· Click a point to view calls</span></h3>
          <ComplianceTrendChart data={trend} />
        </Card>
        <Card>
          <h3 style={chartTitle}>Sentiment Breakdown</h3>
          <SentimentChart data={stats?.sentiment_breakdown} />
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        <Card>
          <h3 style={chartTitle}>Language Breakdown</h3>
          <LanguageBreakdownChart data={stats?.language_breakdown} />
        </Card>
        <Card>
          <h3 style={chartTitle}>Payment Preferences</h3>
          <PaymentPreferenceChart data={stats?.payment_preference_breakdown} />
        </Card>
      </div>

      {violations?.length > 0 && (
        <Card>
          <h3 style={{ ...chartTitle, marginBottom: '16px' }}>Top SOP Violations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {violations.map((v: any, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#FEE2E2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', flexShrink: 0 }}>{i + 1}</div>
                <div style={{ flex: 1, fontSize: '13px', color: '#374151' }}>
                  {typeof v.violation === 'object' ? (v.violation as any).text : v.violation}
                </div>
                <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '2px 8px', borderRadius: '99px', fontSize: '12px', fontWeight: '700' }}>{v.count}x</div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}