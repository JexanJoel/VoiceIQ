import { useState, useEffect } from 'react'
import { getAllCalls, getFlaggedCalls, getDashboardStats, getComplianceTrend, getTopViolations } from '../services/api'

export const useCalls = () => {
  const [calls, setCalls] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCalls = async () => {
    try {
      setLoading(true)
      const res = await getAllCalls()
      setCalls(res.data.data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCalls() }, [])
  return { calls, loading, error, refetch: fetchCalls }
}

export const useFlaggedCalls = () => {
  const [calls, setCalls] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFlaggedCalls()
      .then(res => setCalls(res.data.data))
      .finally(() => setLoading(false))
  }, [])

  return { calls, loading }
}

export const useAnalytics = () => {
  const [stats, setStats] = useState<any>(null)
  const [trend, setTrend] = useState<any[]>([])
  const [violations, setViolations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getDashboardStats(),
      getComplianceTrend(),
      getTopViolations()
    ]).then(([s, t, v]) => {
      setStats(s.data.data)
      setTrend(t.data.data)
      setViolations(v.data.data)
    }).finally(() => setLoading(false))
  }, [])

  return { stats, trend, violations, loading }
}