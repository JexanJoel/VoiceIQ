import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCalls } from '../../hooks/useCalls'
import { uploadCall, deleteCall, getAgents } from '../../services/api'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Loader from '../../components/ui/Loader'
import EmptyState from '../../components/ui/EmptyState'
import { formatDate, formatDuration, getComplianceBadge } from '../../utils/helpers'

type Agent = { id: string; name: string }

export default function CallsPage() {
  const { calls, loading, refetch } = useCalls()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [agents, setAgents] = useState<Agent[]>([])
  const [selectedAgent, setSelectedAgent] = useState<string>('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [pendingFile, setPendingFile] = useState<File | null>(null)

  useEffect(() => {
    getAgents().then(res => setAgents(res.data.data)).catch(() => {})
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPendingFile(file)
    setShowUploadModal(true)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleUpload = async () => {
    if (!pendingFile) return
    setUploadError('')
    setUploading(true)
    setShowUploadModal(false)
    try {
      const fd = new FormData()
      fd.append('audio', pendingFile)
      if (selectedAgent) fd.append('agent_id', selectedAgent)
      await uploadCall(fd)
      await refetch()
      setPendingFile(null)
      setSelectedAgent('')
    } catch {
      setUploadError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm('Delete this call recording?')) return
    setDeletingId(id)
    try {
      await deleteCall(id)
      await refetch()
    } catch {
      alert('Delete failed. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#111827' }}>All Calls</h1>
          <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '2px' }}>{calls.length} calls processed</p>
        </div>
        <div>
          <input ref={fileRef} type="file" accept="audio/*" onChange={handleFileSelect} style={{ display: 'none' }} />
          <Button loading={uploading} onClick={() => fileRef.current?.click()}>
            {uploading ? 'Processing...' : '+ Upload Call'}
          </Button>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && pendingFile && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 200, padding: '20px'
        }}>
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '28px',
            width: '100%', maxWidth: '420px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginBottom: '6px' }}>Upload Call</h2>
            <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '20px' }}>
              📎 {pendingFile.name}
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={lbl}>Assign to Agent <span style={{ color: '#9CA3AF', fontWeight: '400' }}>(optional)</span></label>
              {agents.length === 0 ? (
                <div style={{ padding: '10px 13px', borderRadius: '10px', border: '1px solid #E5E7EB', fontSize: '13px', color: '#9CA3AF', background: '#F9FAFB' }}>
                  No agents yet — <span
                    style={{ color: '#E11D48', cursor: 'pointer', fontWeight: '600' }}
                    onClick={() => { setShowUploadModal(false); navigate('/dashboard/agents') }}
                  >create one first</span>
                </div>
              ) : (
                <select
                  value={selectedAgent}
                  onChange={e => setSelectedAgent(e.target.value)}
                  style={sel}
                >
                  <option value="">Unknown Agent</option>
                  {agents.map(a => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Button full onClick={handleUpload}>Upload & Analyze →</Button>
              <Button full variant="ghost" onClick={() => { setShowUploadModal(false); setPendingFile(null); setSelectedAgent('') }}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {uploadError && (
        <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '10px 14px', borderRadius: '8px', fontSize: '13px' }}>
          {uploadError}
        </div>
      )}

      {loading ? <Loader center /> : calls.length === 0 ? (
        <EmptyState icon="📞" title="No calls yet" description="Upload your first call recording to get started" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {calls.map(call => (
            <Card key={call.id} onClick={() => navigate(`/dashboard/calls/${call.id}`)}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: '#FFF1F2', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '18px', flexShrink: 0
                  }}>📞</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {call.file_name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
                      {formatDate(call.created_at)} · {formatDuration(call.duration_seconds)} · {call.language?.toUpperCase() || '—'}
                      {call.agent_name && (
                        <span style={{ marginLeft: '6px', color: '#E11D48', fontWeight: '600' }}>
                          · 👤 {call.agent_name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <Badge variant={getComplianceBadge(call.sop_compliance_percentage) as any}>
                    {call.sop_compliance_percentage}% SOP
                  </Badge>
                  <Badge variant={call.sentiment === 'positive' ? 'success' : call.sentiment === 'negative' ? 'danger' : 'warning'}>
                    {call.sentiment}
                  </Badge>
                  <button
                    onClick={(e) => handleDelete(call.id, e)}
                    disabled={deletingId === call.id}
                    style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: '#FEF2F2', border: '1px solid #FECACA',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: deletingId === call.id ? 'not-allowed' : 'pointer',
                      fontSize: '14px', flexShrink: 0,
                      opacity: deletingId === call.id ? 0.5 : 1,
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={e => { if (deletingId !== call.id) e.currentTarget.style.background = '#FEE2E2' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#FEF2F2' }}
                  >
                    {deletingId === call.id ? '...' : '🗑️'}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

const lbl: React.CSSProperties = {
  display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px'
}
const sel: React.CSSProperties = {
  width: '100%', padding: '10px 13px', borderRadius: '10px',
  border: '1px solid #E5E7EB', fontSize: '13px', outline: 'none',
  background: '#fff', color: '#111827', fontFamily: "'Plus Jakarta Sans', sans-serif"
}