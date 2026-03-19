import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#9CA3AF']

interface Props {
  data: Record<string, number> | null
}

export default function PaymentPreferenceChart({ data }: Props) {
  if (!data) return null
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} paddingAngle={3} dataKey="value">
          {chartData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: '10px', fontSize: '13px' }} />
        <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: '13px' }} />
      </PieChart>
    </ResponsiveContainer>
  )
}