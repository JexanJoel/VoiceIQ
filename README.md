<div align="center">

# 🎙️ VoiceIQ

</div>

VoiceIQ automatically transcribes Hinglish & Tanglish call recordings, validates SOP compliance, detects sentiment, and surfaces actionable insights - all in under 30 seconds.

<div align="center">

[![License](https://img.shields.io/badge/License-Apache_2.0-F59E0B?style=for-the-badge)](./LICENSE)
[![Live Demo](https://img.shields.io/badge/Live_Demo-6366F1?style=for-the-badge&logo=vercel&logoColor=white)](https://voice-iq-five.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-111827?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JexanJoel/VoiceIQ)

</div>
---

## ✨ Features

- 🗣️ **Hinglish & Tanglish STT** - Groq Whisper large-v3 transcription
- ✅ **SOP Compliance Validation** - AI-powered rule checking per call
- 😊 **Sentiment Analysis** - Detect caller mood and agent tone
- 💳 **Payment Preference Detection** - Auto-categorize payment intent
- 🚩 **Instant Call Flagging** - Flag calls below 70% compliance
- 📊 **Live Analytics Dashboard** - Charts, trends, and breakdowns

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Tech |
|---|---|
| Frontend | React + Vite + TypeScript |
| Backend | Node.js + Express |
| Database & Auth | Supabase (Postgres + Auth + Storage) |
| Speech-to-Text | Groq Whisper large-v3 |
| AI / NLP | Groq + Llama 3.3 70B |
| Charts | Recharts |

</div>

---

## 📁 Project Structure
```
src/
├── components/
│   ├── ui/          # Button, Card, Badge, Loader, EmptyState
│   ├── layout/      # Navbar, Sidebar, MobileSidebar, DashboardLayout
│   └── charts/      # ComplianceTrend, Sentiment, Language, Payment
├── pages/
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   └── dashboard/
│       ├── DashboardHome.tsx
│       ├── CallsPage.tsx
│       ├── CallDetailPage.tsx
│       └── FlaggedCallsPage.tsx
├── context/         # AuthContext
├── hooks/           # useAuth, useCalls
├── services/        # api.ts, supabase.ts
└── utils/           # helpers.ts
```

---

## 📄 License

<div align="center">

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](./LICENSE)

</div>

---

<div align="center">Built with ❤️ for HCL GUVI Intern Hiring Hackathon 2026</div>