import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAgents, createAgent, deleteAgent, getAgentStats } from '../../services/api'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Loader from '../../components/ui/Loader'
import EmptyState from '../../components/ui/EmptyState'
import { getComplianceColor } from '../../utils/helpers'

type Agent = { id: string; name: string; created_at: string }
type AgentStat = {
  agent_id: string
  agent_name: string
  total_calls: number
  avg_compliance: number
  dominant_sentiment: string
  top_violation: string | null
}

const medals = ['🥇', '🥈', '🥉']

const sentimentColor = (s: string) => {
  if (s === 'positive') return { bg: '#DCFCE7', color: '#166534' }
  if (s === 'negative') return { bg: '#FEE2E2', color: '#991B1B' }
  return { bg: '#FEF9C3', color: '#854D0E' }
}

export default function AgentsPage() {
  const navigate = useNavigate()
  const [agents, setAgents] = useState<Agent[]>([])
  const [stats, setStats] = useState<AgentStat[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fetchAll = async () => {
    try {
      const [agentsRes, statsRes] = await Promise.all([getAgents(), getAgentStats()])
      setAgents(agentsRes.data.data)
      setStats(statsRes.data.data)
    } catch {
      setError('Failed to load agents')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const handleCreate = async () => {
    if (!newName.trim()) return setError('Agent name is required')
    setSaving(true)
    setError('')
    try {
      await createAgent(newName.trim())
      setNewName('')
      setAdding(false)
      await fetchAll()
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create agent')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete agent "${name}"? Their calls will show as Unknown Agent.`)) return
    try {
      await deleteAgent(id)
      await fetchAll()
    } catch {
      setError('Failed to delete agent')
    }
  }

  if (loading) return <Loader center />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#111827' }}>👤 Agents</h1>
          <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '2px' }}>
            {agents.length} agents · Ranked by compliance
          </p>
        </div>
        <Button size="sm" onClick={() => { setAdding(true); setError('') }}>
          + Add Agent
        </Button>
      </div>

      {error && (
        <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '10px 14px', borderRadius: '8px', fontSize: '13px' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Add Agent Form */}
      {adding && (
        <Card>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', marginBottom: '14px' }}>New Agent</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Agent name e.g. Priya Sharma"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
              style={{
                flex: 1, minWidth: '200px', padding: '10px 13px', borderRadius: '10px',
                border: '1px solid #E5E7EB', fontSize: '13px', outline: 'none',
                fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#111827'
              }}
              onFocus={e => e.target.style.borderColor = '#E11D48'}
              onBlur={e => e.target.style.borderColor = '#E5E7EB'}
              autoFocus
            />
            <Button loading={saving} onClick={handleCreate}>Save</Button>
            <Button variant="ghost" onClick={() => { setAdding(false); setNewName(''); setError('') }}>Cancel</Button>
          </div>
        </Card>
      )}

      {/* Leaderboard */}
      {stats.length === 0 ? (
        <EmptyState
          icon="👤"
          title="No agent data yet"
          description="Add agents and assign them to calls to see performance stats"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {stats.map((stat, i) => {
            const isUnknown = !stat.agent_id
            const sColor = sentimentColor(stat.dominant_sentiment)
            const compColor = getComplianceColor(stat.avg_compliance)

            return (
              <Card
                key={stat.agent_id || 'unknown'}
                onClick={!isUnknown ? () => navigate(`/dashboard/agents/${stat.agent_id}`) : undefined}
                style={{ cursor: isUnknown ? 'default' : 'pointer' }}
              >
                {/* Top row — rank + name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
                    background: i < 3 ? '#FFF1F2' : '#F9FAFB',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: i < 3 ? '20px' : '13px',
                    fontWeight: '800', color: '#9CA3AF'
                  }}>
                    {i < 3 ? medals[i] : `#${i + 1}`}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: '#111827' }}>
                      {stat.agent_name}
                      {isUnknown && (
                        <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: '400', marginLeft: '6px' }}>
                          (unassigned)
                        </span>
                      )}
                    </div>
                    {stat.top_violation && (
                      <div style={{ fontSize: '11px', color: '#9CA3AF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '2px' }}>
                        ⚠️ {stat.top_violation}
                      </div>
                    )}
                  </div>
                  {!isUnknown && (
                    <span style={{ fontSize: '12px', color: '#E11D48', fontWeight: '600', flexShrink: 0 }}>View →</span>
                  )}
                </div>

                {/* Bottom row — stats */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '10px', borderTop: '1px solid #F9FAFB' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#111827' }}>{stat.total_calls}</div>
                    <div style={{ fontSize: '10px', color: '#9CA3AF' }}>Calls</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: compColor }}>{stat.avg_compliance}%</div>
                    <div style={{ fontSize: '10px', color: '#9CA3AF' }}>Avg SOP</div>
                  </div>
                  <div style={{
                    padding: '4px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: '700',
                    background: sColor.bg, color: sColor.color
                  }}>
                    {stat.dominant_sentiment}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Agent management */}
      {agents.length > 0 && (
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>Manage Agents</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {agents.map(agent => (
              <div key={agent.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', borderRadius: '10px',
                background: '#FAFAFA', border: '1px solid #F3F4F6'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#FFF1F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>👤</div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{agent.name}</span>
                </div>
                <button
                  onClick={() => handleDelete(agent.id, agent.name)}
                  style={{
                    width: '30px', height: '30px', borderRadius: '7px',
                    background: '#FEF2F2', border: '1px solid #FECACA',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', fontSize: '13px'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#FEE2E2')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#FEF2F2')}
                >🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}