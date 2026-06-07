/* ═══════════════════════════════════════════════════════
   ALL LANDING PAGE CONTENT
   Written for a $50M-funded healthcare AI startup.
   Copy philosophy: benefit-first, confident, minimal jargon.
═══════════════════════════════════════════════════════ */

export const SCREENSHOTS = {
  heroMain:  "/screenshots/home-dashboard.jpg",
  heroLeft:  "/screenshots/medicines.jpg",
  heroRight: "/screenshots/schedule.jpg",
  scan:      "/screenshots/scan.jpg",
  schedule:  "/screenshots/medicines.jpg",
  monitor:   "/screenshots/recovery-plan.jpg",
  recover:   "/screenshots/symptoms.jpg",
  chat:      "/screenshots/chat.jpg",
} as const;

/* ── Stats strip ──────────────────────────────────────── */
export const PROOF_STATS = [
  { value: "50%",  label: "of patients can't recall discharge instructions by the time they reach home" },
  { value: "25%",  label: "of readmissions within 30 days are entirely preventable" },
  { value: "$290B",label: "lost annually to medication non-adherence in the US alone" },
  { value: "98%",  label: "prescription-scan accuracy using our multi-model AI pipeline" },
] as const;

/* ── Trusted-at logos (text form) ─────────────────────── */
export const PARTNER_LOGOS = [
  "Apollo Hospitals",
  "Fortis Healthcare",
  "AIIMS",
  "Manipal Hospitals",
  "Max Healthcare",
  "Narayana Health",
] as const;

/* ── Problem cards ────────────────────────────────────── */
export const PROBLEM_CARDS = [
  {
    stat: "50%",
    icon: "🧠",
    title: "Patients forget everything",
    desc: "Half of all patients cannot accurately recall their doctor's discharge instructions by the time they get home. Medical jargon, the stress of leaving, and information overload make it nearly impossible.",
  },
  {
    stat: "25%",
    icon: "🏥",
    title: "Readmissions are preventable",
    desc: "One in four patients is readmitted within 30 days — not because their condition worsened, but because of missed doses, skipped follow-ups, and zero post-discharge support.",
  },
  {
    stat: "$290B",
    icon: "💊",
    title: "Non-adherence is a crisis",
    desc: "Patients not following their medication plan correctly costs the US healthcare system $290 billion every year. This is not a rounding error. It is a systemic failure we are here to fix.",
  },
] as const;

/* ── How-it-works story scenes ─────────────────────────── */
export const STORY_STEPS = [
  {
    number: "1",
    label: "Scan",
    title: "Photograph your prescription.\nWe handle the rest.",
    description:
      "Point your camera at any handwritten or printed prescription. Our AI reads every medicine, dosage, and timing — in seconds. No typing required.",
    bullets: [
      "Works with handwritten & printed prescriptions",
      "Extracts medicine name, dosage, frequency, duration",
      "Works offline with a local fallback model",
      "Review and confirm before anything is saved",
    ],
    screenshot: "/screenshots/scan.jpg",
    flip: false,
  },
  {
    number: "2",
    label: "Schedule",
    title: 'No more decoding "OD" or "TDS".',
    description:
      "Medical frequency codes are automatically converted into a clear daily schedule based on your personal morning, afternoon, and night times.",
    bullets: [
      "OD, BD, TDS, QID decoded automatically",
      "Smart push reminders at the right time of day",
      "Weekly adherence chart and progress ring",
      "Swipe to mark as taken, snooze, or skip",
    ],
    screenshot: "/screenshots/medicines.jpg",
    flip: true,
  },
  {
    number: "3",
    label: "Monitor",
    title: "Your family stays in the loop — always.",
    description:
      "Caregivers and family members get a live dashboard showing exactly how recovery is going. If a dose is missed or a symptom logged, the right person is alerted instantly.",
    bullets: [
      "Real-time risk scoring for every patient",
      "Push notifications to family on missed doses",
      "AI-generated audio shift briefings for nurses",
      "One-tap SOS with location and medical card",
    ],
    screenshot: "/screenshots/recovery-plan.jpg",
    flip: false,
  },
  {
    number: "4",
    label: "Recover",
    title: "Recovery that actually feels rewarding.",
    description:
      "Every dose earns XP. Every streak builds momentum. Beary — your AI recovery mascot — celebrates every milestone alongside you.",
    bullets: [
      "XP, levels, streaks, and daily challenges",
      "Beary mascot evolves as your health improves",
      "Milestone celebrations and sound effects",
      "Adherence score and full recovery timeline",
    ],
    screenshot: "/screenshots/symptoms.jpg",
    flip: true,
  },
] as const;

/* ── Feature grid ─────────────────────────────────────── */
export const FEATURES = [
  {
    icon: "📷",
    iconBg: "bg-brand-light",
    title: "Smart OCR Scanner",
    desc: "NVIDIA Nemotron + Groq Llama 3.3 digitize any prescription — handwritten or printed — with 98% accuracy. No typing needed.",
    tag: "AI-Powered",
  },
  {
    icon: "⏰",
    iconBg: "bg-sage-100",
    title: "Auto Scheduling",
    desc: "Medical frequency codes like OD, TDS, and BD convert to exact, personalised daily reminders. Zero guesswork, ever.",
    tag: "Smart Reminders",
  },
  {
    icon: "🧠",
    iconBg: "bg-amber-50",
    title: "Jargon Translator",
    desc: "Claude 3.5 Sonnet converts dense medical discharge documents into clear, simple language that anyone can understand.",
    tag: "Plain Language",
  },
  {
    icon: "🚨",
    iconBg: "bg-rose-500/10",
    title: "Live Risk Monitor",
    desc: "Caregivers see a live risk score per patient. Missed doses and symptom flags trigger instant push notifications.",
    tag: "Real-Time",
  },
  {
    icon: "🐻",
    iconBg: "bg-brand-light",
    title: "Gamified Recovery",
    desc: "Earn XP, build streaks, and watch Beary evolve alongside your recovery. Healthy habits feel genuinely rewarding.",
    tag: "Engagement",
  },
  {
    icon: "🆘",
    iconBg: "bg-blue-50",
    title: "One-Tap SOS",
    desc: "A single tap sends your GPS location and digital medical card to all emergency contacts. For when every second matters.",
    tag: "Safety",
  },
] as const;

/* ── AI models ────────────────────────────────────────── */
export const AI_MODELS = [
  "NVIDIA Nemotron",
  "Groq Llama 3.3 70B",
  "Claude 3.5 Sonnet",
  "Google Gemini",
  "ElevenLabs TTS",
  "docTR · TrOCR",
] as const;

export const AI_CARDS = [
  {
    icon: "📝",
    title: "Prescription Parsing",
    desc: "NVIDIA Nemotron extracts raw text; Groq structures it into dosage, frequency, and timing data in under two seconds.",
  },
  {
    icon: "💬",
    title: "Plain Language Translation",
    desc: "Claude 3.5 Sonnet converts dense discharge documents into language any patient or family member can immediately act on.",
  },
  {
    icon: "🎙️",
    title: "AI Audio Shift Briefings",
    desc: "ElevenLabs generates spoken patient summaries for nurses — a complete voice briefing ready at the start of every shift.",
  },
  {
    icon: "📊",
    title: "Real-Time Risk Scoring",
    desc: "Risk scores computed live from adherence patterns, symptom logs, and recovery trajectory. Flagged before it becomes a crisis.",
  },
] as const;

/* ── Beary milestones ─────────────────────────────────── */
export const MILESTONES = [
  { icon: "💊", title: "First Dose Taken",   sub: "Your recovery journey begins",          xp: "+10 XP"  },
  { icon: "🔥", title: "7-Day Streak",        sub: "Consistency is your superpower",        xp: "+50 XP"  },
  { icon: "⭐", title: "Perfect Week",        sub: "100% adherence — Beary evolves!",        xp: "+100 XP" },
  { icon: "🏆", title: "Recovery Complete",   sub: "You made it. Beary is fully grown.",    xp: "+500 XP" },
] as const;

/* ── Roles ─────────────────────────────────────────────── */
export const ROLES = [
  {
    avatar: "🧑‍⚕️",
    avatarBg: "bg-brand-light",
    tag: "For Patients",
    name: "Patients",
    headline: "Your complete recovery companion.",
    desc: "Post-surgery or chronic illness patients recovering at home — with AI support, smart reminders, and Beary always one tap away.",
    perks: [
      "Smart dose reminders at the right time",
      "Scan any prescription instantly",
      "AI health chat assistant 24/7",
      "Gamified progress with Beary",
      "One-tap SOS emergency alert",
    ],
  },
  {
    avatar: "👨‍👩‍👧",
    avatarBg: "bg-blue-50",
    tag: "For Family",
    name: "Family & Caregivers",
    headline: "Peace of mind from anywhere.",
    desc: "Remote family members who need real-time visibility into a loved one's recovery — without calling every hour to check in.",
    perks: [
      "Live adherence dashboard",
      "Instant push alerts for missed doses",
      "View full medication schedule",
      "Real-time risk score monitoring",
      "Symptom log access",
    ],
  },
  {
    avatar: "👩‍⚕️",
    avatarBg: "bg-amber-50",
    tag: "For Healthcare Staff",
    name: "Clinical Teams",
    headline: "Discharge plans that actually work.",
    desc: "Nurses and doctors creating discharge plans and monitoring patient adherence across their entire care panel — at scale.",
    perks: [
      "Create discharge plans via QR code",
      "Multi-patient risk overview",
      "AI audio shift briefings",
      "Adherence trend analytics",
      "Instant push notifications",
    ],
  },
] as const;

/* ── Testimonials ─────────────────────────────────────── */
export const TESTIMONIALS = [
  {
    quote:
      "After my knee surgery I was overwhelmed by my discharge papers. Discharge Buddy scanned my prescription in seconds and gave me a clear daily schedule. I never missed a single dose.",
    initials: "RP",
    name: "Rahul P.",
    role: "Post-surgery patient, Delhi",
    stars: 5,
  },
  {
    quote:
      "My mother lives alone and I'm 400 km away. The real-time alerts mean I know the moment she misses a dose. It has given our whole family peace of mind we didn't think was possible.",
    initials: "SM",
    name: "Sanya M.",
    role: "Family caregiver, Mumbai",
    stars: 5,
  },
  {
    quote:
      "The AI shift briefing is incredible. I listen to the patient summary every morning. It is like having a personal assistant who read every chart overnight and synthesised it perfectly.",
    initials: "DN",
    name: "Dr. Nandita R.",
    role: "Physician, Apollo Hospitals",
    stars: 5,
  },
] as const;

/* ── Hero chips ───────────────────────────────────────── */
export const HERO_CHIPS = [
  { dotColor: "#22c55e", label: "Dose Taken ✓",   sub: "Amoxicillin · 8:30 AM",  position: "chip-tl" as const, delay: "0s"   },
  { dotColor: "#5c60f5", label: "Risk: Low 🟢",   sub: "Caregiver notified",       position: "chip-tr" as const, delay: "0.8s" },
  { dotColor: "#f59e0b", label: "+50 XP 🔥",      sub: "7-day streak!",            position: "chip-bl" as const, delay: "1.5s" },
  { dotColor: "#6366f1", label: "Beary says hi 🐻",sub: "Level 4 unlocked",        position: "chip-br" as const, delay: "0.3s" },
] as const;
