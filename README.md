<div align="center">

# 🎙️ VoiceIQ

**AI-powered call center compliance platform for Indian call centers**

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-4F46E5?style=for-the-badge)](https://voice-iq-five.vercel.app/)
[![License](https://img.shields.io/badge/License-Apache_2.0-D22128?style=for-the-badge&logo=apache&logoColor=white)](./LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JexanJoel/VoiceIQ)
[![Open Source](https://img.shields.io/badge/Open_Source-16A34A?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://github.com/JexanJoel/VoiceIQ)

</div>

---

## 🇮🇳 The Problem

Indian call centers handle thousands of calls daily. Supervisors manually listen to recordings to check compliance — slow, inconsistent, expensive, and completely incompatible with Hinglish and Tanglish speech.

**VoiceIQ automates this entirely.** Upload a call recording → get a full compliance report in under 30 seconds. No manual listening. No missed violations. No bias.

---

## ✨ Features

#### 🗣️ Hinglish & Tanglish STT
Groq Whisper large-v3 transcribes mixed-language Indian call recordings with high accuracy — no manual effort.

#### ✅ SOP Compliance Validation
Every call is scored against your custom SOP rules. Violations are flagged with exact rule references, timestamps, and severity levels.

#### 😊 Sentiment Analysis
Detect caller mood and agent tone across every interaction. Spot negative patterns before they escalate.

#### 💳 Payment Preference Detection
Automatically categorize whether customers prefer cash, UPI, card, or other payment methods.

#### 🚩 Instant Call Flagging
Calls below 70% SOP compliance are automatically flagged for manager review — zero manual listening. Mark calls as reviewed to track progress.

#### 📊 Live Analytics Dashboard
Real-time charts on compliance trends, sentiment distribution, language breakdown, and top violations. Includes best/worst performing day and most violated rule.

#### 👤 Agent Performance Tracking
Leaderboard ranked by compliance %, with trend arrows (↑↓→), per-agent violations, sentiment trends, and full call history.

#### 📋 Custom SOP Rules Manager
Define your own compliance rules per category — greeting, identity, payment, closing, and more. Up to 10 rules. Shows violation count per rule.

#### 🎙️ Audio Player
Listen to the original call recording side by side with the AI transcript. Click any violation timestamp to jump directly to that moment in the audio.

#### 💡 AI Coaching Suggestions
Every violation includes a specific, actionable coaching tip — with example scripts the agent can use next time.

#### ⚠️ Violation Severity Levels
Each violation is classified as Critical, Major, or Minor — sorted by severity so the most important issues surface first.

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|:---:|:---:|
| **Frontend** | React 18 · Vite · TypeScript |
| **Backend** | Node.js · Express |
| **Supabase** | PostgreSQL · Auth · Storage · Google OAuth |
| **AI / STT** | Groq Whisper large-v3 · Llama 3.3 70B |
| **Charts** | Recharts |
| **Deploy** | Vercel · Render |

</div>

---

## ⚙️ How It Works
```
Upload audio file (MP3 / WAV / M4A)
        ↓
Saved to Supabase Storage (private bucket)
        ↓
Groq Whisper transcribes → auto-detects language + generates timestamped segments
        ↓
Custom SOP rules fetched from DB (or defaults used)
        ↓
Llama 3.3 70B analyzes timestamped transcript against SOP rules
        ↓
Returns: compliance %, violations (with timestamps + severity + coaching),
         sentiment, payment preference, passed checks, summary
        ↓
Results saved to DB → displayed on dashboard with audio player
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
├── vercel.json
└── package.json
```

---

## 🗃️ Database Schema
```
calls       — recordings, transcripts, compliance results, agent assignment, reviewed status
agents      — agent profiles per user account
sop_rules   — custom SOP rules per user (max 10)
```

All tables have Row Level Security (RLS) enabled via Supabase.

---

## 📊 Dashboard Pages

**Dashboard Home** — Stats overview, compliance trend chart (clickable), best/worst day, most violated rule

**All Calls** — Upload calls, assign agents, filter by date, view all recordings

**Call Detail** — Audio player with clickable violation timestamps, severity badges, coaching tips, transcript

**Flagged Calls** — Calls below 70% compliance, filter by reviewed/pending, mark as reviewed

**Agents** — Leaderboard with trend arrows, per-agent compliance, sentiment, top violation

**SOP Rules** — Create/edit/toggle rules, violation count per rule, default rules preview

---

## 🔐 Authentication

- Email and password with confirmation
- Google OAuth one-click sign in
- All routes protected via Supabase Auth
- JWT passed as Bearer token to backend on every request

---

## 📄 License

<div align="center">

[![License](https://img.shields.io/badge/License-Apache_2.0-D22128?style=for-the-badge&logo=apache&logoColor=white)](./LICENSE)

</div>

---

<div align="center">

Built with ❤️ for **HCL GUVI Intern Hiring Hackathon 2026** — Track 3: Call Center Compliance

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-4F46E5?style=for-the-badge)](https://voice-iq-five.vercel.app/)
[![Report Bug](https://img.shields.io/badge/🐛_Report_Bug-D22128?style=for-the-badge)](https://github.com/JexanJoel/VoiceIQ/issues)
[![Request Feature](https://img.shields.io/badge/✨_Request_Feature-16A34A?style=for-the-badge)](https://github.com/JexanJoel/VoiceIQ/issues)

</div>