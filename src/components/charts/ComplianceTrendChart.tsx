import { useNavigate } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Props {
  data: any[]
}

const CustomDot = (props: any) => {
  const { cx, cy, payload, onClick } = props
  return (
    <circle
      cx={cx} cy={cy} r={5}
      fill="#E11D48" stroke="#fff" strokeWidth={2}
      style={{ cursor: 'pointer' }}
      onClick={() => onClick(payload)}
    />
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid #F3F4F6', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <p style={{ fontWeight: '700', color: '#111827', margin: '0 0 4px' }}>{label}</p>
      <p style={{ color: '#E11D48', margin: '0 0 2px' }}>Compliance: <strong>{payload[0].value}%</strong></p>
      <p style={{ color: '#9CA3AF', margin: 0, fontSize: '11px' }}>{payload[0].payload.call_count} call{payload[0].payload.call_count !== 1 ? 's' : ''} · Click to view</p>
    </div>
  )
}

export default function ComplianceTrendChart({ data }: Props) {
  const navigate = useNavigate()

  const handleDotClick = (payload: any) => {
    if (payload?.date) {
      navigate(`/dashboard/calls?date=${payload.date}`)
    }
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="avg_compliance"
          stroke="#E11D48"
          strokeWidth={2.5}
          dot={<CustomDot onClick={handleDotClick} />}
          activeDot={{ r: 7, fill: '#E11D48', stroke: '#fff', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}