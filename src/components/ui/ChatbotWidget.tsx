'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Sparkles } from 'lucide-react';
import { RobotMeddy } from '../landing/RobotMeddy';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  action?: {
    label: string;
    href: string;
  };
}

type Language = 'en' | 'hi' | 'bn';

const PRESETS_DICT = {
  en: [
    { label: '🤖 About VANI', query: 'What is VANI and how does it work?' },
    { label: '🌟 Features List', query: 'What are the main features of the VANI app?' },
    { label: '📲 Download App', query: 'How can I download the VANI app?' },
    { label: '💊 Drug Interaction', query: 'How does the Drug Interaction Checker work?' }
  ],
  hi: [
    { label: '🤖 VANI के बारे में', query: 'VANI क्या है और कैसे काम करता है?' },
    { label: '🌟 फीचर्स लिस्ट', query: 'VANI ऐप के मुख्य फीचर्स क्या हैं?' },
    { label: '📲 ऐप डाउनलोड करें', query: 'मैं VANI ऐप कैसे डाउनलोड कर सकता हूँ?' },
    { label: '💊 दवाइयों का टकराव', query: 'ड्रग इंटरेक्शन चेकर कैसे काम करता है?' }
  ],
  bn: [
    { label: '🤖 VANI সম্পর্কে', query: 'VANI কি এবং এটি কিভাবে কাজ করে?' },
    { label: '🌟 ফিচার সমূহ', query: 'VANI অ্যাপের প্রধান ফিচারগুলি কি কি?' },
    { label: '📲 অ্যাপ ডাউনলোড', query: 'আমি কিভাবে VANI অ্যাপ ডাউনলোড করতে পারি?' },
    { label: '💊 ওষুধের বিক্রিয়া', query: 'ড্রগ ইন্টারঅ্যাকশন চেকার কীভাবে কাজ করে?' }
  ]
};

const WELCOME_DICT = {
  en: "Hello! I'm Mr. Meddy, your AI recovery companion. 🌟 I'm here to help you navigate your post-discharge instructions, check for dangerous drug-to-drug interactions, or guide you through quick first-aid. What can I do for you today?",
  hi: "नमस्ते! मैं मिस्टर मेडी हूँ, आपका AI रिकवरी साथी। 🌟 मैं यहाँ आपकी डिस्चार्ज गाइड, दवाइयों के टकराव, या प्राथमिक चिकित्सा में मदद करने के लिए हूँ। आज मैं आपकी क्या मदद कर सकता हूँ?",
  bn: "নমস্কার! আমি মিস্টার মেডি, আপনার AI রিকভারি সঙ্গী। 🌟 আমি আপনার ডিসচার্জ নির্দেশাবলী বুঝতে, ওষুধের ক্ষতিকারক বিক্রিয়া চেক করতে বা প্রাথমিক চিকিৎসায় সাহায্য করতে প্রস্তুত। আজ আপনাকে কীভাবে সাহায্য করতে পারি?"
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: WELCOME_DICT['en']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const threadEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen, isTyping]);

  const handleLanguageChange = (lang: Language) => {
    if (lang === language) return;
    setLanguage(lang);
    
    // If the only message is the welcome message, swap it dynamically
    if (messages.length === 1 && messages[0].id === 'welcome') {
      setMessages([
        {
          id: 'welcome',
          sender: 'bot',
          text: WELCOME_DICT[lang]
        }
      ]);
      return;
    }

    // Otherwise, append a localized switch notification
    const alerts = {
      en: "Language switched to English 🌐",
      hi: "भाषा बदलकर हिन्दी कर दी गई है 🌐",
      bn: "ভাষা পরিবর্তন করে বাংলা করা হয়েছে 🌐"
    };

    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: 'bot',
        text: alerts[lang]
      }
    ]);
  };

  const processResponse = (userInput: string) => {
    setIsTyping(true);
    const query = userInput.toLowerCase().trim();
    let responseText = '';
    let responseAction: { label: string; href: string } | undefined = undefined;

    // ── ENGLISH RESPONSES ──
    if (language === 'en') {
      if (query === 'hi' || query === 'hello' || query === 'hey' || query === 'yo' || query.startsWith('greetings')) {
        responseText = "Hello! I'm Mr. Meddy, your friendly AI companion for VANI. 🌟 I'm here to tell you all about our app, help you understand its features, or answer any recovery questions. How are you feeling today?";
      } else if (query.includes('who are you') || query.includes('your name') || query.includes('who is this')) {
        responseText = "I'm Mr. Meddy, VANI's built-in AI health companion! 🤖 I help you navigate your post-discharge instructions, track your daily recovery streaks, and keep you safe from dangerous drug combinations.";
      } else if (query.includes('how are you') || query.includes('how is it going') || query.includes('how\'s it going')) {
        responseText = "I'm doing fantastic, thanks for asking! 🤖 Just here in your corner, ready to help you explore VANI or assist with your recovery details. How are you doing today?";
      } else if (query.includes('about') || query.includes('what is vani') || query.includes('what is this') || query.includes('purpose') || query.includes('how does it work')) {
        responseText = "VANI is an AI-powered post-discharge care platform. We turn confusing hospital paperwork into a clear, monitored recovery plan. We offer: \n• **AI Document Summaries** to clarify instructions.\n• **Drug Interaction Analysis** to avoid prescribing clashes.\n• **Live Vitals Monitoring** to detect health risks.\n• **Hold-to-SOS Ambulance Dispatch** for emergencies.\n• **Streaks and XP** with me (Mr. Meddy!) to make consistency rewarding.";
        responseAction = { label: "📲 Download VANI App", href: "#download" };
      } else if (query.includes('feature') || query.includes('capability') || query.includes('what can you do') || query.includes('help me with')) {
        responseText = "Here's what I can guide you through on this page:\n\n1. **Smart OCR Scanner** 📸 (Auto-extract dosage timings from photos of summaries)\n2. **Drug Interaction Checker** 💊 (Cross-reference prescriptions instantly in our chemistry beaker simulator)\n3. **Tactile SOS button** 🚨 (Press & hold for 2s to dispatch a live GPS-tracked ambulance)\n4. **Live Risk Monitor** 📈 (Alert family & physicians of vital changes)\n5. **Streaks & Level Ups** 🔥 (Gamify your daily recovery metrics)\n\nTo experience all features in full, download VANI now!";
        responseAction = { label: "📲 Download VANI App", href: "#download" };
      } else if (query.includes('download') || query.includes('get the app') || query.includes('install')) {
        responseText = "📲 Downloading the VANI app is simple! Click the button below to get instant access and start your free recovery journey. No setup fees or credit cards required.";
        responseAction = { label: "📲 Download VANI App", href: "#download" };
      } else if (query.includes('interaction') || query.includes('beaker') || query.includes('chemistry') || query.includes('aspirin') || query.includes('warfarin') || query.includes('ibuprofen') || query.includes('mixer')) {
        responseText = "💊 **Drug Interaction Checker:**\nVANI automatically scans your prescriptions against clinical safety databases. If you combine conflicting drugs (such as Aspirin and Warfarin, or Aspirin and Ibuprofen), the interactive lab mixer beaker on our landing page flashes red and bubbles violently to signal bleeding risks. You can try this interactively in the Mixer simulator!";
        responseAction = { label: "📲 Download VANI App", href: "#download" };
      } else if (query.includes('sos') || query.includes('ambulance') || query.includes('emergency') || query.includes('dispatch') || query.includes('gps') || query.includes('map')) {
        responseText = "🚨 **Emergency Hub SOS:**\nIf a patient experiences severe symptoms, they can press and hold the SOS button on our console card for 2 seconds. This triggers immediate dispatch and launches a real-time GPS tracking route map powered by Leaflet, showing the exact ETA of the approaching ambulance.";
        responseAction = { label: "📲 Download VANI App", href: "#download" };
      } else if (query.includes('ocr') || query.includes('scan') || query.includes('paperwork') || query.includes('prescription')) {
        responseText = "📸 **Smart OCR Scanner:**\nSimply scan your prescription sheet or discharge paperwork. VANI uses multi-modal AI models to extract medications, dosages, frequency rules, and follow-up clinical visits automatically. It then populates your calendar reminders.";
        responseAction = { label: "📲 Download VANI App", href: "#download" };
      } else if (query.includes('risk') || query.includes('vital') || query.includes('symptom')) {
        responseText = "📈 **Live Risk Monitor:**\nThis feature tracks vital trends (heart rate, blood pressure) and matches them to your recovery profile. If an anomaly is spotted, VANI notifies your care circle and medical team ahead of time.";
        responseAction = { label: "📲 Download VANI App", href: "#download" };
      } else if (query.includes('thank') || query.includes('thanks') || query.includes('great') || query.includes('awesome') || query.includes('cool')) {
        responseText = "You're very welcome! 😊 I'm always happy to explain how VANI protects patients and accelerates recovery. Let me know if you need anything else!";
      } else {
        responseText = `Hmm, I'm not 100% sure about "${userInput}", but I'd love to help! 

As your VANI recovery companion, I can tell you all about our key features:
• **AI Document Scanner** 📸
• **Drug Interaction Beaker** 💊
• **Ambulance Live SOS Dispatch** 🚨
• **Gamified Streaks & Levels** 🔥

Try selecting one of the preset quick chips below, or ask me something like "What is VANI?" or "How do I download the app?"`;
      }
    } 
    // ── HINDI RESPONSES ──
    else if (language === 'hi') {
      if (query === 'hi' || query === 'hello' || query === 'hey' || query === 'नमस्ते' || query === 'नमस्कार') {
        responseText = "नमस्ते! मैं मिस्टर मेडी हूँ, VANI के लिए आपका AI साथी। 🌟 मैं यहाँ आपको हमारे ऐप के बारे में बताने, फीचर्स समझाने या रिकवरी के सवालों के जवाब देने के लिए हूँ। आज आप कैसा महसूस कर रहे हैं?";
      } else if (query.includes('कौन हो') || query.includes('नाम') || query.includes('तुम कौन')) {
        responseText = "मैं मिस्टर मेडी हूँ, VANI का इन-बिल्ट AI रिकवरी कोच! 🤖 मैं आपकी डिस्चार्ज गाइड समझने, दवाइयों के टाइमिंग रिमाइंडर सेट करने और खतरनाक ड्रग रिएक्शन से बचाने में मदद करता हूँ।";
      } else if (query.includes('कैसे हो') || query.includes('क्या हाल')) {
        responseText = "मैं बहुत बढ़िया हूँ, पूछने के लिए धन्यवाद! 🤖 आपके साथ हूँ, आपकी रिकवरी को आसान बनाने के लिए। आज आपका दिन कैसा चल रहा है?";
      } else if (query.includes('बारे में') || query.includes('काम क्या') || query.includes('वानी क्या') || query.includes('vani क्या')) {
        responseText = "VANI एक AI-संचालित पोस्ट-डिस्चार्ज केयर प्लेटफॉर्म है। हम अस्पताल के जटिल कागजी काम को एक सरल रिकवरी प्लान में बदलते हैं। हम प्रदान करते हैं:\n• **AI दस्तावेज सारांश** समझने में आसान निर्देश।\n• **ड्रग इंटरेक्शन चेकर** दवाइयों के टकराव से सुरक्षा।\n• **लाइव रिस्क मॉनिटर** लक्षणों और वाइटल्स पर नजर।\n• **SOS इमरजेंसी डिस्पैच** तत्काल मदद।\n• **मजेदार रिकवरी स्ट्रीक्स** दवाई खाने पर XP पॉइंट्स।";
        responseAction = { label: "📲 VANI ऐप डाउनलोड करें", href: "#download" };
      } else if (query.includes('फीचर्स') || query.includes('क्या कर सकते') || query.includes('मदद')) {
        responseText = "मैं इस पेज पर निम्नलिखित फीचर्स में आपका मार्गदर्शन कर सकता हूँ:\n\n1. **स्मार्ट OCR स्कैनर** 📸 (पर्चे का फोटो लेकर दवाई रिमाइंडर सेट करें)\n2. **ड्रग इंटरेक्शन चेकर** 💊 (केमिस्ट बीकर में दवाइयों के टकराव की लाइव जांच करें)\n3. **इमरजेंसी SOS बटन** 🚨 (2 सेकंड दबाकर तुरंत GPS-ट्रैक्ड एम्बुलेंस बुलाएं)\n4. **लाइव रिस्क मॉनिटर** 📈 (वाइटल्स में गड़बड़ी होने पर परिवार को सचेत करें)\n5. **रिकवरी स्ट्रीक्स** 🔥 (Earn XP points)\n\nसभी फीचर्स का लाइव अनुभव करने के लिए अभी VANI डाउनलोड करें!";
        responseAction = { label: "📲 VANI ऐप डाउनलोड करें", href: "#download" };
      } else if (query.includes('डाउनलोड') || query.includes('ऐप कैसे') || query.includes('इंस्टॉल')) {
        responseText = "📲 VANI ऐप डाउनलोड करना बहुत आसान है! हमारी वेबसाइट के सबसे ऊपर 'Download Free' या 'Get the App' बटन पर क्लिक करें। यह पूरी तरह से मुफ्त है और कोई क्रेडिट कार्ड नहीं चाहिए।";
        responseAction = { label: "📲 VANI ऐप डाउनलोड करें", href: "#download" };
      } else if (query.includes('टकराव') || query.includes('बीकर') || query.includes('केमिस्ट') || query.includes('असर') || query.includes('दवाई') || query.includes('aspirin') || query.includes('warfarin') || query.includes('ibuprofen')) {
        responseText = "💊 **ड्रग इंटरेक्शन चेकर:**\nVANI आपकी दवाइयों की जांच करता है। उदाहरण के लिए, एस्पिरिन (Aspirin) और वारफारिन (Warfarin) या इबुप्रोफेन को एक साथ लेने पर आंतरिक रक्तस्राव (internal bleeding) का गंभीर खतरा होता है। इसे आप वेबसाइट के केमिस्ट बीकर में टेस्ट कर सकते हैं!";
        responseAction = { label: "📲 VANI ऐप डाउनलोड करें", href: "#download" };
      } else if (query.includes('sos') || query.includes('एम्बुलेंस') || query.includes('इमरजेंसी') || query.includes('जीपीएस') || query.includes('नक्शा')) {
        responseText = "🚨 **इमरजेंसी SOS:**\nगंभीर स्थिति में हमारे एम्बुलेंस कार्ड पर मौजूद SOS बटन को 2 सेकंड तक दबाकर रखें। यह हमारी केयर टीम को सूचित करेगा और लाइव जीपीएस-ट्रैक्ड एम्बुलेंस रवाना कर देगा, जिसका रूट आप लाइव मैप पर देख सकते हैं।";
        responseAction = { label: "📲 VANI ऐप डाउनलोड करें", href: "#download" };
      } else if (query.includes('स्कैन') || query.includes('कैमरा') || query.includes('पर्चा') || query.includes('लिखा')) {
        responseText = "📸 **स्मार्ट OCR स्कैनर:**\nबस अपने डॉक्टर के पर्चे या डिस्चार्ज सारांश की फोटो खींचकर अपलोड करें। VANI का AI तुरंत दवाइयों के नाम, सही डोज और समय को निकाल लेता है और रिमाइंडर सेट कर देता है।";
        responseAction = { label: "📲 VANI ऐप डाउनलोड करें", href: "#download" };
      } else if (query.includes('धन्यवाद') || query.includes('शुक्रिया') || query.includes('बढ़िया') || query.includes('थैंक्स')) {
        responseText = "आपका बहुत-बहुत स्वागत है! 😊 VANI आपकी सेहत और सुरक्षा के लिए हमेशा तैयार है। कोई और सवाल हो तो जरूर पूछें!";
      } else {
        responseText = `मुझे "${userInput}" के बारे में पूरी जानकारी नहीं है, लेकिन मैं आपकी मदद करने की पूरी कोशिश करूँगा!

VANI रिकवरी साथी के रूप में, मैं आपको इनके बारे में बता सकता हूँ:
• **AI पर्चा स्कैनर** 📸
• **दवाइयों का टकराव बीकर** 💊
• **लाइव एम्बुलेंस SOS** 🚨
• **रिकवरी स्ट्रीक्स** 🔥

नीचे दिए गए किसी भी बटन को चुनें या मुझसे "VANI क्या है?" जैसा सवाल पूछें।`;
      }
    } 
    // ── BENGALI RESPONSES ──
    else {
      if (query === 'hi' || query === 'hello' || query === 'hey' || query === 'নমস্কার' || query === 'হ্যালো') {
        responseText = "নমস্কার! আমি মিস্টার মেডি, VANI-এর জন্য আপনার AI সঙ্গী। 🌟 আমি আপনাকে আমাদের অ্যাপের ফিচারগুলি বোঝাতে বা যেকোনো রিকভারি সংক্রান্ত প্রশ্নের উত্তর দিতে প্রস্তুত। আজ আপনার শরীর কেমন আছে?";
      } else if (query.includes('কে তুমি') || query.includes('তোমার নাম') || query.includes('তুমি কে')) {
        responseText = "আমি মিস্টার মেডি, VANI অ্যাপের বিল্ট-ইন AI স্বাস্থ্য সহকারী! 🤖 আমি আপনাকে ডিসচার্জ নির্দেশাবলী বুঝতে, ওষুধের সঠিক রিমাইন্ডার সেট করতে এবং ক্ষতিকারক ওষুধের বিক্রিয়া প্রতিরোধ করতে সাহায্য করি।";
      } else if (query.includes('কেমন আছ') || query.includes('কেমন আছো')) {
        responseText = "আমি খুব ভালো আছি, জিজ্ঞাসা করার জন্য ধন্যবাদ! 🤖 আপনার সুস্থতা নিশ্চিত করতে আমি সব সময় আপনার পাশে আছি। আজ আপনার দিনটি কেমন কাটছে?";
      } else if (query.includes('সম্পর্কে') || query.includes('ভানি কি') || query.includes('vani কি') || query.includes('কাজ কি')) {
        responseText = "VANI হল একটি AI-চালিত পোস্ট-ডিসচার্জ কেয়ার প্ল্যাটফর্ম। আমরা হাসপাতালের জটিল ডিসচার্জ পেপারকে একটি সহজ রিকভারি প্ল্যানে রূপান্তর করি। আমাদের ফিচারসমূহ:\n• **AI ডকুমেন্ট সামারি** সহজ বাংলায় নির্দেশাবলী।\n• **ওষুধের বিক্রিয়া বিশ্লেষণ** ক্ষতিকারক সংঘর্ষ থেকে রক্ষা।\n• **লাইভ ভাইটাল ট্র্যাকিং** শারীরিক অবস্থার রিয়েল-টাইম মনিটর।\n• **জরুরী SOS বোতাম** লাইভ এম্বুলেন্স কল ট্র্যাকিং।\n• **গেমড রিকভারি স্ট্রিক** নিয়ম মেনে ওষুধ খেয়ে XP পয়েন্ট অর্জন।";
        responseAction = { label: "📲 VANI অ্যাপ ডাউনলোড করুন", href: "#download" };
      } else if (query.includes('ফিচার') || query.includes('কি করতে পার') || query.includes('সাহায্য')) {
        responseText = "আমি আপনাকে ওয়েবসাইটের এই ফিচারগুলি বুঝতে সাহায্য করতে পারি:\n\n1. **স্মার্ট OCR স্ক্যানার** 📸 (প্রেসক্রিপশনের ছবি তুলে ওষুধের রিমাইন্ডার সেট করুন)\n2. **ওষুধের বিক্রিয়া পরীক্ষক** 💊 (কেমিস্ট বিকারে ওষুধের ক্ষতিকারক বিক্রিয়া লাইভ পরীক্ষা করুন)\n3. **জরুরী SOS বোতাম** 🚨 (২ সেকেন্ড চেপে এম্বুলেন্স ডাকুন ও লাইভ জিপিএস রুট ট্র্যাক করুন)\n4. **লাইভ রিস্ক মনিটর** 📈 (ভাইটালে অস্বাভাবিক পরিবর্তন হলে পরিবারকে সতর্ক করুন)\n5. **গেমড স্ট্রিকস** 🔥 (প্রতিদিন রিকভারি পয়েন্ট পান)\n\nফিচারগুলির সরাসরি অভিজ্ঞতা নিতে এখনই VANI ডাউনলোড করুন!";
        responseAction = { label: "📲 VANI অ্যাপ ডাউনলোড করুন", href: "#download" };
      } else if (query.includes('ডাউনলোড') || query.includes('অ্যাপ কিভাবে') || query.includes('ইন্সটল')) {
        responseText = "📲 VANI অ্যাপ ডাউনলোড করা খুবই সহজ! আমাদের ওয়েবসাইটের একদম ওপরে থাকা 'Download Free' অথবা 'Get the App' বোতামে ক্লিক করুন। এটি সম্পূর্ণ ফ্রি এবং কোনো ক্রেডিট কার্ডের প্রয়োজন নেই।";
        responseAction = { label: "📲 VANI অ্যাপ ডাউনলোড করুন", href: "#download" };
      } else if (query.includes('বিক্রিয়া') || query.includes('বিকার') || query.includes('ওষুধ') || query.includes('সংঘাত') || query.includes('aspirin') || query.includes('warfarin') || query.includes('ibuprofen')) {
        responseText = "💊 **ওষুধের বিক্রিয়া (Drug Interaction):**\nVANI আপনার ওষুধগুলি স্ক্যান করে সম্ভাব্য ক্ষতিকর সংঘাত চিহ্নিত করে। যেমন, অ্যাসপিরিন (Aspirin) এবং ওয়ারফারিন (Warfarin) বা আইবুপ্রোফেন একসাথে খেলে অভ্যন্তরীণ রক্তপাতের (bleeding) গুরুতর ঝুঁকি থাকে। এটি আপনি টেস্ট করতে পারেন কেমিস্ট বিকারে!";
        responseAction = { label: "📲 VANI অ্যাপ ডাউনলোড করুন", href: "#download" };
      } else if (query.includes('sos') || query.includes('এম্বুলেন্স') || query.includes('জরুরী') || query.includes('ম্যাপ') || query.includes('জিপিএস')) {
        responseText = "🚨 **জরুরী SOS:**\nশারীরিক অবস্থা গুরুতর হলে আমাদের এম্বুলেন্স মডিউলে থাকা SOS বোতামটি ২ সেকেন্ড চেপে রাখুন। এটি তাৎক্ষণিকভাবে এম্বুলেন্স ডিসপ্যাচ করবে এবং আপনি রিয়েল-টাইম জিপিএস ম্যাপে রুট ও ইটিএ দেখতে পাবেন।";
        responseAction = { label: "📲 VANI অ্যাপ ডাউনলোড করুন", href: "#download" };
      } else if (query.includes('স্ক্যান') || query.includes('ক্যামেরা') || query.includes('প্রেসক্রিপশন') || query.includes('কাগজ')) {
        responseText = "📸 **স্মার্ট OCR স্ক্যানার:**\nআপনার প্রেসক্রিপশন বা ডিসচার্জ সামারির একটি ছবি তুলে আপলোড করুন। VANI-এর মাল্টি-মোডাল AI ওষুধের নাম, সঠিক ডোজ এবং সময় নির্ধারণ করে স্বয়ংক্রিয়ভাবে রিমাইন্ডার সেট করে দেয়।";
        responseAction = { label: "📲 VANI অ্যাপ ডাউনলোড করুন", href: "#download" };
      } else if (query.includes('ধন্যবাদ') || query.includes('থ্যাংকস') || query.includes('ভালো') || query.includes('দারুণ')) {
        responseText = "আপনাকে অনেক ধন্যবাদ! 😊 VANI আপনার সুস্থতা ও সুরক্ষায় সর্বদা নিয়োজিত। কোনো জিজ্ঞাসা থাকলে নির্দ্বিধায় বলুন!";
      } else {
        responseText = `আমি "${userInput}" সম্পর্কে নিশ্চিত নই, তবে আমি সাহায্য করার জন্য সর্বাত্মক চেষ্টা করব!

VANI সঙ্গী হিসেবে, আমি আপনাকে এই বিষয়ে বলতে পারি:
• **AI প্রেসক্রিপশন স্ক্যানার** 📸
• **ওষুধের বিক্রিয়া বিকার** 💊
• **জরুরী এম্বুলেন্স SOS** 🚨
• **রিকভারি স্ট্রিক ও লেভেল** 🔥

নিচের যেকোনো অপশন বেছে নিন অথবা আমাকে জিজ্ঞেস করুন "VANI কি?"`;
      }
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'bot',
          text: responseText,
          action: responseAction
        }
      ]);
    }, 1100);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: 'user',
        text: userText
      }
    ]);
    setInputValue('');
    processResponse(userText);
  };

  const handlePresetClick = (queryText: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: 'user',
        text: queryText
      }
    ]);
    processResponse(queryText);
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-6 right-6 z-[99999] flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-brand to-indigo-600 shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-brand/20 hover:scale-105 active:scale-95 group focus:outline-none border-2 border-white/20"
            >
              {/* Pulsing ring indicator */}
              <span className="absolute inset-0 rounded-full bg-brand/30 animate-ping opacity-75 pointer-events-none" />
              
              {/* Mascot inside */}
              <div className="w-11 h-11 flex items-center justify-center overflow-hidden">
                <RobotMeddy size="sm" className="scale-110 translate-y-0.5" />
              </div>

              {/* Unread dot indicator */}
              {hasUnread && (
                <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500 text-[8px] text-white items-center justify-center font-bold font-mono">1</span>
                </span>
              )}

              {/* Tooltip */}
              <span className="absolute right-20 bg-slate-900 text-white text-[10px] font-black tracking-wider uppercase px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
                Chat with Mr. Meddy
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Chat window panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-[380px] max-w-[calc(100vw-32px)] h-[540px] max-h-[calc(100vh-100px)] rounded-[24px] shadow-2xl border border-slate-200 bg-white/95 backdrop-blur-md flex flex-col overflow-hidden z-[99999] text-slate-800"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-4 flex items-center justify-between border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-950 flex items-center justify-center border border-white/10 overflow-hidden shadow-inner shrink-0">
                    <RobotMeddy size="sm" className="scale-105 translate-y-0.5" />
                  </div>
                  <div className="text-left">
                    <div className="font-[family-name:var(--font-bricolage)] text-sm font-black tracking-wide flex items-center gap-1">
                      Mr. Meddy
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                    <span className="text-[10px] text-indigo-200/80 block">AI Companion · Online</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Language Selector Bar */}
              <div className="bg-slate-100 px-4 py-1.5 flex gap-2 justify-end text-[10px] font-bold border-b border-slate-200 shrink-0">
                <span className="text-slate-400 mr-auto flex items-center">🌐 Language:</span>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('en')}
                  className={cn("px-2 py-0.5 rounded cursor-pointer transition-colors", language === 'en' ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-200")}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('hi')}
                  className={cn("px-2 py-0.5 rounded cursor-pointer transition-colors", language === 'hi' ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-200")}
                >
                  हिन्दी
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('bn')}
                  className={cn("px-2 py-0.5 rounded cursor-pointer transition-colors", language === 'bn' ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-200")}
                >
                  বাংলা
                </button>
              </div>

              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scrollbar-thin scrollbar-thumb-slate-200">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex flex-col max-w-[85%] text-left",
                      msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-[18px] px-3.5 py-2.5 text-[12px] leading-relaxed shadow-sm",
                        msg.sender === 'user'
                          ? 'bg-brand text-white rounded-tr-none'
                          : 'bg-white border border-slate-200/80 text-slate-800 rounded-tl-none font-medium'
                      )}
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {msg.text}
                      {msg.action && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex">
                          <a
                            href={msg.action.href}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black uppercase tracking-widest text-[8px] px-3.5 py-1.5 rounded-lg transition-all duration-200 shadow-md shadow-emerald-600/10"
                          >
                            {msg.action.label}
                          </a>
                        </div>
                      )}
                    </div>
                    <span className="text-[8px] text-slate-400 mt-1 uppercase tracking-wider font-extrabold px-1">
                      {msg.sender === 'user' ? 'You' : 'Mr. Meddy'}
                    </span>
                  </div>
                ))}

                {/* Typing simulator */}
                {isTyping && (
                  <div className="flex flex-col items-start max-w-[85%]">
                    <div className="bg-white border border-slate-200/80 rounded-[18px] rounded-tl-none px-4 py-3 flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                <div ref={threadEndRef} />
              </div>

              {/* Presets / Quick Actions */}
              <div className="px-4 py-2 border-t border-slate-100 bg-white shrink-0">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-1.5 text-left">Quick Topics</span>
                <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none scroll-smooth -mx-4 px-4 mask-right">
                  {PRESETS_DICT[language].map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => handlePresetClick(chip.query)}
                      className="px-3 py-1.5 text-[10px] font-black tracking-wider uppercase bg-slate-100 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 rounded-full text-slate-700 whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input form */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about medications, wounds, follow-ups..."
                  className="flex-1 bg-slate-50 border border-slate-200 focus:border-brand focus:bg-white rounded-full px-4 py-2.5 text-[12px] outline-none transition-all placeholder-slate-400/80 font-medium"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 border",
                    inputValue.trim()
                      ? "bg-brand text-white border-brand hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                      : "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
                  )}
                >
                  <Send className="w-4 h-4 fill-current" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
