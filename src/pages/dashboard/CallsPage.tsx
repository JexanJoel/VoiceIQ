import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCalls } from '../../hooks/useCalls'
import { uploadCall } from '../../services/api'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Loader from '../../components/ui/Loader'
import EmptyState from '../../components/ui/EmptyState'
import { formatDate, formatDuration, getComplianceBadge } from '../../utils/helpers'

export default function CallsPage() {
  const { calls, loading, refetch } = useCalls()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError('')
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('audio', file)
      await uploadCall(fd)
      await refetch()
    } catch (err) {
      setUploadError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#111827' }}>All Calls</h1>
          <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '2px' }}>{calls.length} calls processed</p>
        </div>
        <div>
          <input ref={fileRef} type="file" accept="audio/*" onChange={handleUpload} style={{ display: 'none' }} />
          <Button loading={uploading} onClick={() => fileRef.current?.click()}>
            {uploading ? 'Processing...' : '+ Upload Call'}
          </Button>
        </div>
      </div>

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
                    background: '#EEF2FF', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '18px', flexShrink: 0
                  }}>📞</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {call.file_name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
                      {formatDate(call.created_at)} · {formatDuration(call.duration_seconds)} · {call.language?.toUpperCase() || '—'}
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
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}