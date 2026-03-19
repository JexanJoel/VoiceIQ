interface EmptyStateProps {
  icon?: string
  title: string
  description: string
}

export default function EmptyState({ icon = '📭', title, description }: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '60px 20px', textAlign: 'center'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>{icon}</div>
      <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1F2937', marginBottom: '6px' }}>{title}</h3>
      <p style={{ fontSize: '14px', color: '#6B7280', maxWidth: '300px' }}>{description}</p>
    </div>
  )
}