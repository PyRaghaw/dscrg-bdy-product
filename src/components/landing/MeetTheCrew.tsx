'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Globe, Link, Mail, Users } from 'lucide-react';
import Image from 'next/image';
import ProfileCard from './ProfileCard';

const CREW_MEMBERS = [
  {
    id: 'srinjoyee',
    name: 'Srinjoyee',
    role: 'AI & Backend Engineer',
    status: 'Currently Building',
    statusColor: 'bg-green-500',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Srinjoyee&backgroundColor=e2d9fb',
    bio: 'Building the AI brains behind VAni. Passionate about health-tech and scalable systems.',
    built: ['Voice Assistant', 'Symptom Analysis', 'Medication Parsing', 'Cloud Infrastructure'],
    socials: { linkedin: '#', github: '#', email: 'mailto:#' },
  },
  {
    id: 'member2',
    name: 'Member Two',
    role: 'Frontend Engineer',
    status: 'Online',
    statusColor: 'bg-purple-500',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=e2d9fb',
    bio: 'Crafting beautiful, intuitive interfaces for patients and doctors.',
    built: ['Design System', 'Landing Page', 'Patient Dashboard', 'Animations'],
    socials: { linkedin: '#', github: '#', email: 'mailto:#' },
  },
  {
    id: 'member3',
    name: 'Member Three',
    role: 'UI/UX Designer',
    status: 'Online',
    statusColor: 'bg-purple-500',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna&backgroundColor=e2d9fb',
    bio: 'Focuses on empathy-driven design, making healthcare apps accessible to elderly users.',
    built: ['User Research', 'Wireframes', 'Interactive Prototypes', 'Brand Identity'],
    socials: { linkedin: '#', github: '#', email: 'mailto:#' },
  },
  {
    id: 'member4',
    name: 'Member Four',
    role: 'Product & Research',
    status: 'Offline',
    statusColor: 'bg-gray-400',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=e2d9fb',
    bio: 'Connecting user needs with technical feasibility. Leads clinical research alignment.',
    built: ['Product Strategy', 'Clinical Partnerships', 'Compliance (HIPAA)', 'User Testing'],
    socials: { linkedin: '#', github: '#', email: 'mailto:#' },
  },
];

export function MeetTheCrew() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  // Close panel on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSelectedMember(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Lock body scroll when panel is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const togglePanel = () => {
    if (isOpen) {
      setIsOpen(false);
      setSelectedMember(null);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      {/* 1. Desktop Triggers (Right Stacked Avatars) */}
      <div className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-[100] flex-col items-center gap-2 group">
        <button
          onClick={togglePanel}
          className={`flex flex-col items-center gap-1.5 p-2 bg-white/80 backdrop-blur-md border border-purple-100 rounded-full shadow-lg hover:shadow-xl hover:border-purple-300 transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none translate-x-10' : 'opacity-100 translate-x-0'}`}
        >
          <div className="flex flex-col -space-y-2 relative">
            {CREW_MEMBERS.slice(0, 3).map((member, i) => (
              <div key={member.id} className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-purple-50 shadow-sm" style={{ zIndex: 10 - i }}>
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="relative w-10 h-10 rounded-full border-2 border-white bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-700 shadow-sm z-0">
              +1
            </div>
          </div>
          <span className="text-xs font-semibold text-purple-800 tracking-wide mt-1">Crew</span>
        </button>
      </div>

      {/* 2. Tablet Trigger (Floating Circular Button) */}
      <div className="hidden md:flex lg:hidden fixed bottom-24 right-6 z-[100]">
        <button
          onClick={togglePanel}
          className={`w-14 h-14 bg-white/90 backdrop-blur-md border border-purple-200 rounded-full shadow-lg flex items-center justify-center text-purple-700 hover:bg-purple-50 hover:scale-105 transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}`}
        >
          <Users size={24} />
        </button>
      </div>

      {/* 3. Mobile Trigger (Pill Button at Bottom) */}
      <div className="flex md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
        <button
          onClick={togglePanel}
          className={`flex items-center gap-2 px-6 py-3 bg-white/95 backdrop-blur-md border border-purple-200 rounded-full shadow-lg text-purple-800 font-medium hover:bg-purple-50 transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none translate-y-10' : 'opacity-100 translate-y-0'}`}
        >
          <Users size={20} />
          Meet The Crew
        </button>
      </div>

      {/* The Expanded Panel/Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for Mobile/Tablet */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] lg:hidden"
            />

            <motion.div
              initial={{ x: '100%', y: 0, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed z-[101] bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl overflow-y-auto lg:overflow-visible
                bottom-0 left-0 right-0 h-[85vh] rounded-t-3xl md:h-auto md:max-h-[80vh] md:w-[400px] md:bottom-24 md:right-6 md:left-auto md:rounded-3xl
                lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:right-4 lg:w-[400px] lg:h-auto lg:max-h-[calc(100vh-2rem)] lg:rounded-3xl"
            >
              <div className="p-6 relative h-full flex flex-col">
                {/* Mobile Handle */}
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 md:hidden" />

                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 text-gray-500 transition-colors"
                >
                  <X size={20} />
                </button>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[#6D5DFC] to-[#8B7FFF] bg-clip-text text-transparent">
                    Meet The Crew
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">The builders behind VAni</p>
                </motion.div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                  {CREW_MEMBERS.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.1 }}
                    >
                      <div
                        onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                        className={`group cursor-pointer rounded-2xl p-3 flex items-center gap-4 transition-all duration-300 border ${
                          selectedMember === member.id
                            ? 'bg-purple-50/50 border-[#8B7FFF]/30 shadow-sm'
                            : 'bg-white/40 border-transparent hover:bg-white/60 hover:shadow-sm'
                        }`}
                      >
                        <div className="relative">
                          <div className="w-14 h-14 rounded-full border-2 border-white shadow-sm overflow-hidden bg-[#F4F2FF]">
                            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                          </div>
                          <div
                            className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${member.statusColor} animate-pulse`}
                            title={member.status}
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-[#6D5DFC] transition-colors">
                            {member.name}
                          </h3>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>

                        <ChevronRight
                          size={18}
                          className={`text-gray-400 transition-transform duration-300 ${
                            selectedMember === member.id ? 'rotate-90 text-[#8B7FFF]' : 'group-hover:translate-x-1'
                          }`}
                        />
                      </div>

                      {/* Level 3 Expanded Card */}
                      <AnimatePresence>
                        {selectedMember === member.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <ProfileCard member={member} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2d9fb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbb9f7;
        }
      `}} />
    </>
  );
}
