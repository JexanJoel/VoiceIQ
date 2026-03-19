interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
}

const variants: Record<string, React.CSSProperties> = {
  success: { background: '#D1FAE5', color: '#065F46' },
  warning: { background: '#FEF3C7', color: '#92400E' },
  danger: { background: '#FEE2E2', color: '#991B1B' },
  info: { background: '#EEF2FF', color: '#3730A3' },
  neutral: { background: '#F3F4F6', color: '#374151' },
}

export default function Badge({ children, variant = 'neutral' }: BadgeProps) {
  return (
    <span style={{
      ...variants[variant],
      padding: '3px 10px',
      borderRadius: '99px',
      fontSize: '12px',
      fontWeight: '600',
      display: 'inline-block'
    }}>
      {children}
    </span>
  )
}