import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard', icon: '📊', label: 'Home' },
  { to: '/dashboard/calls', icon: '📞', label: 'Calls' },
  { to: '/dashboard/flagged', icon: '🚩', label: 'Flagged' },
]

export default function MobileSidebar() {
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: '#fff', borderTop: '1px solid #FFE4E6',
      display: 'flex', justifyContent: 'space-around',
      padding: '8px 0 max(8px, env(safe-area-inset-bottom))',
    }}>
      {links.map(link => (
        <NavLink key={link.to} to={link.to} end={link.to === '/dashboard'}
          style={({ isActive }) => ({
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '3px', padding: '4px 16px', borderRadius: '8px',
            color: isActive ? '#E11D48' : '#A8A29E',
            fontSize: '11px', fontWeight: '600'
          })}
        >
          <span style={{ fontSize: '20px' }}>{link.icon}</span>
          <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}