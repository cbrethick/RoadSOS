# 🚨 RoadSOS — AI Emergency Dispatch Portal

**RoadSOS** is a premium, high-performance emergency response portal designed to provide instant assistance during road incidents. Powered by **Gemini 2.0 Flash AI**, the platform acts as a digital dispatcher, triaging emergencies, providing safety protocols, and connecting users with the nearest medical, police, and towing services.

![RoadSOS Banner](https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=1200)

## 🌟 Key Features

### 🤖 AI Tactical Dispatcher
- **Real-time Incident Analysis**: Uses Gemini AI to understand the severity of an accident and suggest immediate next steps.
- **Intent-Based Triage**: Automatically detects the need for hospitals, ambulances, or police based on natural language input.
- **24/7 Availability**: Instant responses when every second counts.

### 🏥 Emergency Service Suite
- **Accident Emergency**: Step-by-step critical actions to secure the scene and prevent further harm.
- **Ambulance Finder**: Dynamic lookup of the nearest emergency medical units.
- **Hospital Directory**: Curated list of trauma centres and multi-specialty hospitals with distance tracking.
- **Police & Security**: Quick access to local precincts for incident reporting.
- **Towing & Puncture**: Roadside assistance for vehicle breakdowns and flat tyres.

### 🛡️ Tactical UI/UX
- **Premium Dark Mode**: High-contrast interface optimized for low-light roadside visibility.
- **Live Incident Map**: Real-time tactical visualization of local emergency resources.
- **One-Tap SOS**: Direct dialling for national emergency numbers (112, 108, 100, 1073).

## 🛠️ Technology Stack

- **Core**: React 19 + TypeScript
- **Bundler**: Vite 4 (Optimized for Node 18 compatibility)
- **Styling**: Tailwind CSS 3.4
- **AI Engine**: Google Gemini 2.0 Flash API
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- NPM or Yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/cbrethick/RoadSOS.git
   cd RoadSOS
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

The project is optimized for **Vercel** deployment:

1. Connect this repository to your Vercel account.
2. Set the Framework Preset to **Vite**.
3. Add the `GEMINI_API_KEY` to the environment variables in the Vercel dashboard.
4. Deploy!

## 📜 License
Confidential // Restricted Access — Developed for RoadSOS Emergency Dispatch Services.

---
**RoadSOS** — *Because every second matters.*
