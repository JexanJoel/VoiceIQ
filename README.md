<div align="center">

<img src="https://img.shields.io/badge/🎙️-VoiceIQ-E11D48?style=for-the-badge" />

# VoiceIQ

**AI-powered call center compliance platform for Indian call centers**

Automatically transcribe Hinglish & Tanglish recordings, validate SOP compliance, track agent performance, and surface actionable insights — all in under 30 seconds.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-4F46E5?style=for-the-badge)](https://voice-iq-five.vercel.app/)
[![Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-D22128?style=for-the-badge&logo=apache&logoColor=white)](./LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JexanJoel/VoiceIQ)
[![Open Source](https://img.shields.io/badge/Open_Source-16A34A?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://github.com/JexanJoel/VoiceIQ)

</div>

---

## 🇮🇳 The Problem

Indian call centers handle thousands of calls daily. Supervisors manually listen to recordings to check compliance — a process that is slow, inconsistent, expensive, and completely incompatible with Hinglish and Tanglish speech.

**VoiceIQ automates this entirely.**

Upload a call recording → get a full compliance report in under 30 seconds. No manual listening. No missed violations. No bias.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗣️ **Hinglish & Tanglish STT** | Groq Whisper large-v3 transcribes mixed-language Indian call recordings with high accuracy |
| ✅ **SOP Compliance Validation** | Every call is scored against your custom SOP rules. Violations are flagged with exact rule references |
| 😊 **Sentiment Analysis** | Detect caller mood and agent tone across every interaction |
| 💳 **Payment Preference Detection** | Automatically categorize cash, UPI, card, or other payment preferences |
| 🚩 **Instant Call Flagging** | Calls below 70% SOP compliance are automatically flagged for manager review |
| 📊 **Live Analytics Dashboard** | Real-time charts on compliance trends, sentiment distribution, language breakdown, and top violations |
| 👤 **Agent Performance Tracking** | Leaderboard ranked by compliance %, track violations and sentiment per agent |
| 📋 **Custom SOP Rules Manager** | Define your own compliance rules per category — greeting, identity, payment, closing, and more |
| 🎙️ **Audio Player** | Listen to the call recording side by side with the AI transcript and analysis |

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + Vite + TypeScript |
| **Backend** | Node.js + Express (ESM) |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth (Email + Google OAuth) |
| **File Storage** | Supabase Storage (Private Bucket) |
| **Speech-to-Text** | Groq Whisper large-v3 |
| **AI / NLP** | Groq + Llama 3.3 70B |
| **Charts** | Recharts |
| **Frontend Deploy** | Vercel |
| **Backend Deploy** | Render |

</div>

---

## ⚙️ How It Works
```
User uploads audio file (MP3 / WAV / M4A)
           ↓
File saved to Supabase Storage (private bucket)
           ↓
Groq Whisper transcribes audio → auto-detects language
           ↓
User's custom SOP rules fetched from DB (or default 6 rules used)
           ↓
Groq Llama 3.3 70B analyzes transcript against SOP rules
           ↓
Returns: compliance %, violations, passed checks,
         sentiment, payment preference, summary
           ↓
Results saved to Supabase DB
           ↓
Dashboard displays full analysis with audio player
```

---

## 📁 Project Structure
```
voiceiq-frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # Button, Card, Badge, Loader, EmptyState
│   │   ├── layout/          # Navbar, Sidebar, MobileSidebar, DashboardLayout
│   │   └── charts/          # ComplianceTrend, Sentiment, Language, Payment
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   └── dashboard/
│   │       ├── DashboardHome.tsx
│   │       ├── CallsPage.tsx
│   │       ├── CallDetailPage.tsx
│   │       ├── FlaggedCallsPage.tsx
│   │       ├── AgentsPage.tsx
│   │       ├── AgentCallsPage.tsx
│   │       └── SOPRulesPage.tsx
│   ├── context/             # AuthContext
│   ├── hooks/               # useAuth, useCalls
│   ├── services/            # api.ts, supabase.ts
│   └── utils/               # helpers.ts
├── vercel.json              # SPA routing config
└── package.json
```

---

## 🗃️ Database Schema
```
calls           — audio recordings, transcripts, compliance results
agents          — agent profiles per user
sop_rules       — custom SOP rules per user (max 10)
```

All tables have Row Level Security (RLS) enabled via Supabase.

---

## 📊 Dashboard Pages

| Page | Description |
|---|---|
| **Dashboard Home** | Overview stats, compliance trend chart, sentiment distribution |
| **All Calls** | Upload calls, assign agents, view all recordings |
| **Call Detail** | Full transcript, audio player, SOP analysis, violations |
| **Flagged Calls** | Calls below 70% compliance for urgent review |
| **Agents** | Leaderboard ranked by compliance, per-agent call history |
| **SOP Rules** | Create, edit, toggle custom compliance rules |

---

## 🔐 Authentication

- Email + password with confirmation
- Google OAuth
- All routes protected via Supabase Auth
- JWT passed as Bearer token to backend on every request

---

## 📦 Backend Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/calls/upload` | Upload and process audio |
| GET | `/api/calls` | Get all calls |
| GET | `/api/calls/:id` | Get call by ID |
| GET | `/api/calls/:id/audio` | Get signed URL for audio playback |
| DELETE | `/api/calls/:id` | Delete call and storage file |
| GET | `/api/calls/flagged` | Get flagged calls |
| GET | `/api/agents` | Get all agents |
| POST | `/api/agents` | Create agent |
| DELETE | `/api/agents/:id` | Delete agent |
| GET | `/api/agents/stats` | Get agent leaderboard stats |
| GET | `/api/agents/:id/calls` | Get calls by agent |
| GET | `/api/sop` | Get user's SOP rules |
| POST | `/api/sop` | Create SOP rule |
| PUT | `/api/sop/:id` | Update SOP rule |
| DELETE | `/api/sop/:id` | Delete SOP rule |
| PATCH | `/api/sop/:id/toggle` | Toggle rule active/inactive |
| GET | `/api/analytics/stats` | Dashboard stats |
| GET | `/api/analytics/trend` | 7-day compliance trend |
| GET | `/api/analytics/violations` | Top violations |

---

## 🌐 Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://voice-iq-five.vercel.app |
| Backend | Render | Auto-deployed on push to main |
| Database | Supabase | Managed PostgreSQL |
| Storage | Supabase | Private bucket — `voiceiq-calls` |

---

## 📄 License

Licensed under the [Apache 2.0 License](./LICENSE).

---

<div align="center">

Built with ❤️ for **HCL GUVI Intern Hiring Hackathon 2026** — Track 3: Call Center Compliance

**[Live Demo](https://voice-iq-five.vercel.app/) · [Report Bug](https://github.com/JexanJoel/VoiceIQ/issues) · [Request Feature](https://github.com/JexanJoel/VoiceIQ/issues)**

</div>