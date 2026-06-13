# VANI | AI-Powered Recovery Companion

VANI is a premium, high-conversion product landing page built for a state-of-the-art healthcare AI application. It is designed to demonstrate how VANI bridges the critical post-discharge care gap by transforming confusing hospital instructions into interactive, patient-centric recovery plans.

---

## 🌟 Core Features

### 1. Smart OCR Prescription Scanner
* **Concept**: Point your camera at any handwritten or printed prescription to digitize it.
* **Technology**: Powered by a multi-model AI pipeline (NVIDIA Nemotron + Groq Llama 3) to extract medicine names, dosages, frequencies, and durations in under two seconds.

### 2. Interactive Drug Interaction Simulator
* **Concept**: A real-time sandbox widget allowing users to select and mix medications to check for drug-to-drug conflicts.
* **UX/UI**: Features a smooth chemistry beaker liquid animation and dynamic 3-tier severity tags (Severe, Moderate, Mild) alongside a custom dose-spacing advisor.

### 3. Smart SOS & Emergency Hub
* **Concept**: Multi-trigger emergency alert (Shake / Voice / Tap) that shares live GPS coordinates and an AI-generated clinical medical card with caregivers and emergency services.
* **Offline-Ready**: Equipped with offline local database fallbacks for immediate first-aid guidance.

### 4. Interactive 3D Care Network Globe
* **Concept**: A premium Three.js + React Three Fiber interactive globe visualizing VANI's active care network connecting patients, families, and healthcare staff.

### 5. Gamified Recovery Mascots
* **Concept**: Recovery mascot "Beary" evolves as patients adhere to their schedules, turning recovery into an engaging milestone-driven experience.

### 6. Multilingual Voice Chatbot Widget
* **Concept**: An AI recovery companion widget that supports voice/text conversations in 14+ languages (Hindi, Bengali, English, etc.) and features download hooks.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, TypeScript)
* **Styling**: Tailwind CSS & Modern PostCSS Utilities
* **3D Graphics**: Three.js, `@react-three/fiber`, and `@react-three/drei`
* **Animations**: GSAP (GreenSock) + ScrollTrigger, Framer Motion
* **Utilities**: clsx, tailwind-merge, lucide-react

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (version 18.x or later) installed on your system.

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/PyRaghaw/vani-prdct-page.git
cd vani-prdct-page
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production
To build the optimized static production bundle:
```bash
npm run build
npm run start
```

---

## 📁 Repository Structure

```
├── public/                 # Static assets (3D GLTF models, screenshots, custom icons)
│   └── screenshots/        # Feature showcase images and VANI logo
├── src/
│   ├── app/                # Next.js App Router (Layouts, pages, custom favicon)
│   ├── components/
│   │   ├── landing/        # Custom sections (Hero, Features, DrugInteraction, SOS)
│   │   ├── ui/             # Reusable interactive UI components (ThreeDGlobe, DotField, Chatbot)
│   │   └── SmoothScroll.tsx # Smooth scrolling integration
│   └── lib/
│       ├── landing-data.ts # Central landing copy, data stats, and metadata
│       └── utils.ts        # Helper functions (CN merge utilities)
├── tsconfig.json           # TypeScript configuration
└── next.config.ts          # Next.js bundler settings
```
