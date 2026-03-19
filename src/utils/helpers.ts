export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

export const formatDuration = (seconds: number) => {
  if (!seconds) return '—'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}m ${s}s`
}

export const getComplianceColor = (pct: number) => {
  if (pct >= 80) return '#10B981'
  if (pct >= 60) return '#F59E0B'
  return '#EF4444'
}

export const getSentimentColor = (sentiment: string) => {
  if (sentiment === 'positive') return '#10B981'
  if (sentiment === 'neutral') return '#F59E0B'
  return '#EF4444'
}

export const getComplianceBadge = (pct: number) => {
  if (pct >= 80) return 'success'
  if (pct >= 60) return 'warning'
  return 'danger'
}