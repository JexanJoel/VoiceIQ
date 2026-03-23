import { useState, useEffect } from 'react'
import { getSopRules, createSopRule, deleteSopRule, toggleSopRule, updateSopRule } from '../../services/api'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Loader from '../../components/ui/Loader'

const MAX_RULES = 10

const CATEGORIES = [
  { value: 'greeting', label: '👋 Greeting', color: 'info' },
  { value: 'identity', label: '🪪 Identity', color: 'info' },
  { value: 'language', label: '🗣️ Language', color: 'info' },
  { value: 'problem_confirmation', label: '🔍 Problem Confirmation', color: 'warning' },
  { value: 'payment', label: '💳 Payment', color: 'warning' },
  { value: 'closing', label: '👍 Closing', color: 'success' },
  { value: 'custom', label: '⚙️ Custom', color: 'neutral' },
] as const

const DEFAULT_RULES = [
  { category: 'greeting', rule_text: 'Agent must greet the customer within the first 10 seconds' },
  { category: 'identity', rule_text: 'Agent must verify customer identity (name + account number)' },
  { category: 'language', rule_text: 'Agent must not use abusive or unprofessional language' },
  { category: 'problem_confirmation', rule_text: 'Agent must confirm the issue before providing a solution' },
  { category: 'payment', rule_text: 'Agent must ask for payment preference if payment is involved' },
  { category: 'closing', rule_text: 'Agent must end the call with a closing statement' },
]

type Rule = {
  id: string
  rule_text: string
  category: string
  is_active: boolean
  created_at: string
}

type EditState = {
  id: string
  rule_text: string
  category: string
} | null

export default function SOPRulesPage() {
  const [rules, setRules] = useState<Rule[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [newRule, setNewRule] = useState({ rule_text: '', category: 'greeting' })
  const [edit, setEdit] = useState<EditState>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fetchRules = async () => {
    try {
      const res = await getSopRules()
      setRules(res.data.data)
    } catch {
      setError('Failed to load rules')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRules() }, [])

  const handleAdd = async () => {
    if (!newRule.rule_text.trim()) return setError('Rule text is required')
    if (rules.length >= MAX_RULES) return setError(`Maximum ${MAX_RULES} rules allowed`)
    setSaving(true)
    setError('')
    try {
      await createSopRule(newRule)
      setNewRule({ rule_text: '', category: 'greeting' })
      setAdding(false)
      await fetchRules()
    } catch {
      setError('Failed to create rule')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this rule?')) return
    try {
      await deleteSopRule(id)
      await fetchRules()
    } catch {
      setError('Failed to delete rule')
    }
  }

  const handleToggle = async (id: string) => {
    try {
      await toggleSopRule(id)
      await fetchRules()
    } catch {
      setError('Failed to toggle rule')
    }
  }

  const handleUpdate = async () => {
    if (!edit || !edit.rule_text.trim()) return
    setSaving(true)
    try {
      const rule = rules.find(r => r.id === edit.id)
      await updateSopRule(edit.id, {
        rule_text: edit.rule_text,
        category: edit.category,
        is_active: rule?.is_active ?? true
      })
      setEdit(null)
      await fetchRules()
    } catch {
      setError('Failed to update rule')
    } finally {
      setSaving(false)
    }
  }

  const handleUseDefaults = async () => {
    setSaving(true)
    setError('')
    try {
      for (const r of DEFAULT_RULES) {
        await createSopRule(r)
      }
      await fetchRules()
    } catch {
      setError('Failed to load defaults')
    } finally {
      setSaving(false)
    }
  }

  const getCategoryInfo = (val: string) =>
    CATEGORIES.find(c => c.value === val) || CATEGORIES[CATEGORIES.length - 1]

  if (loading) return <Loader center />

  const hasCustomRules = rules.length > 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#111827' }}>📋 SOP Rules</h1>
          <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '2px' }}>
            {hasCustomRules ? `${rules.length}/${MAX_RULES} custom rules` : 'Using default rules'} · Applied to every call analysis
          </p>
        </div>
        {rules.length < MAX_RULES && (
          <Button size="sm" onClick={() => { setAdding(true); setError('') }}>
            + Add Rule
          </Button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '10px 14px', borderRadius: '8px', fontSize: '13px' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Add Rule Form */}
      {adding && (
        <Card>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', marginBottom: '14px' }}>New SOP Rule</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Category</label>
              <select
                value={newRule.category}
                onChange={e => setNewRule(p => ({ ...p, category: e.target.value }))}
                style={inputStyle}
              >
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Rule Description</label>
              <textarea
                placeholder="e.g. Agent must introduce themselves by name within the first 15 seconds"
                value={newRule.rule_text}
                onChange={e => setNewRule(p => ({ ...p, rule_text: e.target.value }))}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button loading={saving} onClick={handleAdd}>Save Rule</Button>
              <Button variant="ghost" onClick={() => { setAdding(false); setError('') }}>Cancel</Button>
            </div>
          </div>
        </Card>
      )}

      {/* ── No custom rules — show defaults as preview ── */}
      {!hasCustomRules && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Banner */}
          <div style={{
            background: '#FFFBEB', border: '1px solid #FDE68A',
            borderRadius: '12px', padding: '16px 18px',
            display: 'flex', alignItems: 'flex-start', gap: '12px'
          }}>
            <span style={{ fontSize: '20px', flexShrink: 0 }}>⚡</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#92400E', margin: '0 0 4px' }}>
                You're currently using the 6 default rules
              </p>
              <p style={{ fontSize: '13px', color: '#78716C', margin: '0 0 12px', lineHeight: 1.6 }}>
                These are applied to every call you analyze. You can use them as-is, customize them, or start fresh with your own rules.
              </p>
              <Button size="sm" loading={saving} onClick={handleUseDefaults}>
                ✓ Use these as my rules
              </Button>
            </div>
          </div>

          {/* Default rules preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {DEFAULT_RULES.map((rule, i) => {
              const cat = getCategoryInfo(rule.category)
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '12px',
                  background: '#FAFAFA', border: '1px dashed #E5E7EB',
                  borderRadius: '12px', padding: '14px 16px',
                  opacity: 0.75
                }}>
                  <div style={{
                    width: '26px', height: '26px', borderRadius: '7px', flexShrink: 0,
                    background: '#F3F4F6', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: '#9CA3AF'
                  }}>{i + 1}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <Badge variant={cat.color as any}>{cat.label}</Badge>
                      <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '600', background: '#F3F4F6', padding: '2px 7px', borderRadius: '99px' }}>DEFAULT</span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                      {rule.rule_text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <p style={{ fontSize: '12px', color: '#9CA3AF', textAlign: 'center' }}>
            Click "+ Add Rule" to start building your own custom ruleset
          </p>
        </div>
      )}

      {/* ── Has custom rules — show them ── */}
      {hasCustomRules && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {rules.map((rule, i) => (
            <Card key={rule.id}>
              {edit?.id === rule.id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <select
                    value={edit.category}
                    onChange={e => setEdit(p => p ? { ...p, category: e.target.value } : p)}
                    style={inputStyle}
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                  <textarea
                    value={edit.rule_text}
                    onChange={e => setEdit(p => p ? { ...p, rule_text: e.target.value } : p)}
                    rows={2}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button size="sm" loading={saving} onClick={handleUpdate}>Save</Button>
                    <Button size="sm" variant="ghost" onClick={() => setEdit(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1, minWidth: 0 }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '7px', flexShrink: 0,
                      background: rule.is_active ? '#FFF1F2' : '#F3F4F6',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: '800',
                      color: rule.is_active ? '#E11D48' : '#9CA3AF'
                    }}>{i + 1}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                        <Badge variant={getCategoryInfo(rule.category).color as any}>
                          {getCategoryInfo(rule.category).label}
                        </Badge>
                        {!rule.is_active && <Badge variant="neutral">Inactive</Badge>}
                      </div>
                      <p style={{
                        fontSize: '13px', color: rule.is_active ? '#374151' : '#9CA3AF',
                        lineHeight: 1.6, margin: 0,
                        textDecoration: rule.is_active ? 'none' : 'line-through'
                      }}>{rule.rule_text}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                    <button onClick={() => handleToggle(rule.id)} style={{
                      width: '30px', height: '30px', borderRadius: '7px',
                      background: rule.is_active ? '#F0FDF4' : '#F3F4F6',
                      border: `1px solid ${rule.is_active ? '#BBF7D0' : '#E5E7EB'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', fontSize: '13px'
                    }} title={rule.is_active ? 'Disable' : 'Enable'}>
                      {rule.is_active ? '✓' : '○'}
                    </button>
                    <button onClick={() => setEdit({ id: rule.id, rule_text: rule.rule_text, category: rule.category })} style={{
                      width: '30px', height: '30px', borderRadius: '7px',
                      background: '#F9FAFB', border: '1px solid #E5E7EB',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', fontSize: '13px'
                    }}>✏️</button>
                    <button onClick={() => handleDelete(rule.id)} style={{
                      width: '30px', height: '30px', borderRadius: '7px',
                      background: '#FEF2F2', border: '1px solid #FECACA',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', fontSize: '13px'
                    }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#FEE2E2')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#FEF2F2')}
                    >🗑️</button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Max rules warning */}
      {rules.length >= MAX_RULES && (
        <div style={{ background: '#FEF9C3', border: '1px solid #FDE68A', borderRadius: '10px', padding: '12px 16px' }}>
          <p style={{ fontSize: '13px', color: '#92400E', margin: 0 }}>
            ⚠️ Maximum {MAX_RULES} rules reached. Delete a rule to add a new one.
          </p>
        </div>
      )}
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px'
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 13px', borderRadius: '10px',
  border: '1px solid #E5E7EB', fontSize: '13px', outline: 'none',
  background: '#fff', color: '#111827', fontFamily: "'Plus Jakarta Sans', sans-serif"
}