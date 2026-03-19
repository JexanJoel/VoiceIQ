interface LoaderProps {
  size?: number
  center?: boolean
}

export default function Loader({ size = 32, center }: LoaderProps) {
  return (
    <div style={center ? { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px' } : {}}>
      <div style={{
        width: size, height: size,
        border: `3px solid #EEF2FF`,
        borderTop: `3px solid #4F46E5`,
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite'
      }} />
    </div>
  )
}