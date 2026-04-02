<div align="center">

# 🎙️ VoiceIQ

**AI-powered call center compliance platform for Indian call centers**

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-4F46E5?style=for-the-badge)](https://voice-iq-five.vercel.app/)
[![License](https://img.shields.io/badge/License-Apache_2.0-D22128?style=for-the-badge&logo=apache&logoColor=white)](./LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JexanJoel/VoiceIQ)
[![Backend Repo](https://img.shields.io/badge/Backend_Repo-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JexanJoel/VoiceIQ-backend)
[![Open Source](https://img.shields.io/badge/Open_Source-16A34A?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://github.com/JexanJoel/VoiceIQ)

</div>

---

## 🇮🇳 The Problem

Indian call centers handle thousands of calls daily. Supervisors manually listen to recordings to check compliance — slow, inconsistent, expensive, and completely incompatible with Hinglish and Tanglish speech.

**VoiceIQ automates this entirely.** Upload a call recording → get a full compliance report in under 30 seconds. No manual listening. No missed violations. No bias.

---

## ✨ Features

#### 🗣️ Hinglish & Tanglish STT
Groq Whisper large-v3 transcribes mixed-language Indian call recordings with high accuracy - no manual effort.

#### ✅ SOP Compliance Validation
Every call is scored against your custom SOP rules. Violations are flagged with exact rule references, timestamps, and severity levels.

#### 😊 Sentiment Analysis
Detect caller mood and agent tone across every interaction. Spot negative patterns before they escalate.

#### 💳 Payment Preference Detection
Automatically categorize whether customers prefer EMI, Full Payment, Partial Payment, or Down Payment.

#### 🚩 Instant Call Flagging
Calls below 70% SOP compliance are automatically flagged for manager review — zero manual listening. Mark calls as reviewed to track progress.

#### 📊 Live Analytics Dashboard
Real-time charts on compliance trends, sentiment distribution, language breakdown, and payment preferences. Includes best/worst performing day and most violated rule.

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
| **Backend** | Node.js · Express (ESM) |
| **Database** | Supabase (PostgreSQL · Auth · Storage) |
| **AI / STT** | Groq Whisper large-v3 · Llama 3.3 70B |
| **Charts** | Recharts |
| **Deploy** | Vercel (frontend) · Render (backend) |

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

**Dashboard Home** — Stats overview, compliance trend chart, best/worst day, most violated rule

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

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/JexanJoel/VoiceIQ.git
cd VoiceIQ
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set environment variables
```bash
cp .env.example .env
```
Fill in your `.env`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=https://your-render-backend-url.onrender.com
```

### 4. Run locally
```bash
npm run dev
```

---

## 🔗 Backend Repository

The backend API (Node.js + Express + Groq) is in a separate repository:

👉 **[VoiceIQ Backend](https://github.com/JexanJoel/VoiceIQ-backend)**

The backend exposes `POST /api/call-analytics` — the hackathon evaluation endpoint that accepts Base64 MP3 audio and returns structured compliance JSON.

---

## 🤖 AI Tools Used

| Tool | Usage |
|---|---|
| **Groq Whisper large-v3** | Speech-to-text transcription of Hinglish/Tanglish audio |
| **Groq Llama 3.3 70B Versatile** | SOP compliance analysis, payment classification, sentiment, keyword extraction |
| **Claude (Anthropic)** | Development assistance — code generation, prompt engineering, architecture guidance |

---

## ⚠️ Known Limitations

- Audio files above ~25MB may hit Whisper API limits
- Very noisy recordings reduce transcription accuracy
- Frontend requires an active backend on Render (free tier may cold-start on first request — allow ~30s)

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
[![Backend Repo](https://img.shields.io/badge/Backend_Repo-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JexanJoel/VoiceIQ-backend)
[![Report Bug](https://img.shields.io/badge/🐛_Report_Bug-D22128?style=for-the-badge)](https://github.com/JexanJoel/VoiceIQ/issues)

</div>