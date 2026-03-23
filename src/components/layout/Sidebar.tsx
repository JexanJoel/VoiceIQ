import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/dashboard/calls', icon: '📞', label: 'All Calls' },
  { to: '/dashboard/flagged', icon: '🚩', label: 'Flagged Calls' },
  { to: '/dashboard/agents', icon: '👤', label: 'Agents' },
  { to: '/dashboard/sop-rules', icon: '📋', label: 'SOP Rules' },
]

export default function Sidebar() {
  return (
    <aside style={{
      position: 'fixed', top: '60px', left: 0, bottom: 0, width: '220px',
      background: '#fff', borderRight: '1px solid #FFE4E6',
      padding: '16px 10px', overflowY: 'auto',
      display: 'flex', flexDirection: 'column', gap: '3px'
    }}>
      {links.map(link => (
        <NavLink key={link.to} to={link.to} end={link.to === '/dashboard'}
          style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 12px', borderRadius: '10px',
            fontWeight: '600', fontSize: '14px',
            background: isActive ? '#FFF1F2' : 'transparent',
            color: isActive ? '#E11D48' : '#78716C',
            transition: 'all 0.15s ease',
            borderLeft: isActive ? '3px solid #E11D48' : '3px solid transparent'
          })}
        >
          <span>{link.icon}</span>
          <span>{link.label}</span>
        </NavLink>
      ))}
    </aside>
  )
}