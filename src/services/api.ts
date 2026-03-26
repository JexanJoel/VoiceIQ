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

// Calls
export const uploadCall = (formData: FormData) => api.post('/api/calls/upload', formData)
export const getAllCalls = () => api.get('/api/calls')
export const getCallById = (id: string) => api.get(`/api/calls/${id}`)
export const getFlaggedCalls = () => api.get('/api/calls/flagged')
export const deleteCall = (id: string) => api.delete(`/api/calls/${id}`)
export const getAudioUrl = (id: string) => api.get(`/api/calls/${id}/audio`)
export const reviewCall = (id: string) => api.patch(`/api/calls/${id}/review`)

// Transcripts
export const getTranscript = (callId: string) => api.get(`/api/transcripts/${callId}`)
export const searchTranscripts = (q: string) => api.get(`/api/transcripts/search?q=${q}`)

// Analytics
export const getDashboardStats = () => api.get('/api/analytics/stats')
export const getComplianceTrend = () => api.get('/api/analytics/trend')
export const getTopViolations = () => api.get('/api/analytics/violations')
export const getViolationsByRule = () => api.get('/api/analytics/violations-by-rule')

// SOP Rules
export const getSopRules = () => api.get('/api/sop')
export const createSopRule = (data: { rule_text: string; category: string }) => api.post('/api/sop', data)
export const updateSopRule = (id: string, data: { rule_text: string; category: string; is_active: boolean }) => api.put(`/api/sop/${id}`, data)
export const deleteSopRule = (id: string) => api.delete(`/api/sop/${id}`)
export const toggleSopRule = (id: string) => api.patch(`/api/sop/${id}/toggle`)

// Agents
export const getAgents = () => api.get('/api/agents')
export const createAgent = (name: string) => api.post('/api/agents', { name })
export const deleteAgent = (id: string) => api.delete(`/api/agents/${id}`)
export const getAgentStats = () => api.get('/api/agents/stats')
export const getAgentCalls = (id: string) => api.get(`/api/agents/${id}/calls`)

export default api