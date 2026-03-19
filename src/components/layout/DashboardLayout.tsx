import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import MobileSidebar from './MobileSidebar'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <Navbar />
      {!isMobile && <Sidebar />}
      <main style={{
        marginLeft: isMobile ? 0 : '220px',
        marginTop: '60px',
        padding: isMobile ? '20px 16px 80px' : '28px 28px',
        minHeight: 'calc(100vh - 60px)',
        animation: 'fadeIn 0.3s ease'
      }}>
        <Outlet />
      </main>
      {isMobile && <MobileSidebar />}
    </div>
  )
}