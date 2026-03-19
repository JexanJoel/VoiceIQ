interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'google' | 'linkedin'
  size?: 'sm' | 'lg'
  full?: boolean
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  style?: React.CSSProperties
}

const styles: Record<string, React.CSSProperties> = {
  base: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: '8px', padding: '10px 20px', borderRadius: '10px', fontWeight: '600',
    fontSize: '14px', border: 'none', transition: 'all 0.2s ease',
    cursor: 'pointer', whiteSpace: 'nowrap', letterSpacing: '-0.01em'
  },
  primary: {
    background: 'linear-gradient(135deg, #E11D48, #F43F5E)',
    color: '#fff', boxShadow: '0 4px 14px rgba(225,29,72,0.3)'
  },
  secondary: { background: '#FFF1F2', color: '#E11D48' },
  danger: { background: '#FEE2E2', color: '#DC2626' },
  ghost: { background: 'transparent', color: '#57534E', border: '1px solid #E7E5E4' },
  google: { background: '#fff', color: '#1C1917', border: '1px solid #E7E5E4', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  linkedin: { background: '#0A66C2', color: '#fff', boxShadow: '0 4px 12px rgba(10,102,194,0.25)' },
  sm: { padding: '7px 14px', fontSize: '13px' },
  lg: { padding: '13px 28px', fontSize: '15px' },
  full: { width: '100%' },
}

export default function Button({ children, variant = 'primary', size, full, loading, disabled, onClick, type = 'button', style }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        ...styles.base,
        ...styles[variant],
        ...(size && styles[size]),
        ...(full && styles.full),
        opacity: (disabled || loading) ? 0.6 : 1,
        ...style
      }}
    >
      {loading ? (
        <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.35)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      ) : children}
    </button>
  )
}