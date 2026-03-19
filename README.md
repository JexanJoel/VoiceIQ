# 🎙️ VoiceIQ

> AI-powered call center compliance platform built for Indian call centers.

VoiceIQ automatically transcribes Hinglish & Tanglish call recordings, validates SOP compliance, detects sentiment, and surfaces actionable insights — all in under 30 seconds.

Built for the **HCL GUVI Intern Hiring Hackathon 2026 — Track 3: Call Center Compliance**

![License](https://img.shields.io/badge/license-Apache%202.0-blue)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Open Source](https://img.shields.io/badge/open%20source-yes-orange)

---

## ✨ Features

- 🗣️ **Hinglish & Tanglish STT** — Groq Whisper large-v3 transcription
- ✅ **SOP Compliance Validation** — AI-powered rule checking per call
- 😊 **Sentiment Analysis** — Detect caller mood and agent tone
- 💳 **Payment Preference Detection** — Auto-categorize payment intent
- 🚩 **Instant Call Flagging** — Flag calls below 70% compliance
- 📊 **Live Analytics Dashboard** — Charts, trends, and breakdowns

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite + TypeScript |
| Backend | Node.js + Express |
| Database & Auth | Supabase (Postgres + Auth + Storage) |
| Speech-to-Text | Groq Whisper large-v3 |
| AI / NLP | Groq + Llama 3.3 70B |
| Charts | Recharts |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Groq API key

### Installation
```bash
# Clone the repo
git clone https://github.com/JexanJoel/VoiceIQ.git
cd VoiceIQ

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your Supabase URL and anon key

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Environment Variables
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

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

## 🔗 Related

- [VoiceIQ Backend](https://github.com/JexanJoel/VoiceIQ-Backend) — Private repo (Node.js + Express + Supabase + Groq)

---

## 📄 License

Licensed under the [Apache License 2.0](./LICENSE)

---

<p align="center">Built with ❤️ for HCL GUVI Intern Hiring Hackathon 2026</p>