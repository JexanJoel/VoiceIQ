import axios from 'axios'
import { supabase } from './supabase'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }
  return config
})

export const uploadCall = (formData: FormData) => api.post('/api/calls/upload', formData)
export const getAllCalls = () => api.get('/api/calls')
export const getCallById = (id: string) => api.get(`/api/calls/${id}`)
export const getFlaggedCalls = () => api.get('/api/calls/flagged')

export const getTranscript = (callId: string) => api.get(`/api/transcripts/${callId}`)
export const searchTranscripts = (q: string) => api.get(`/api/transcripts/search?q=${q}`)

export const getDashboardStats = () => api.get('/api/analytics/stats')
export const getComplianceTrend = () => api.get('/api/analytics/trend')
export const getTopViolations = () => api.get('/api/analytics/violations')

export default api