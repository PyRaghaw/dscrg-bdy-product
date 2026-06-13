'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';
import { PhoneFrame } from './ui/PhoneFrame';
import { Play, RotateCcw, ShieldAlert, Navigation } from 'lucide-react';

interface AmbulanceRoute {
  id: number;
  ticketId: string;
  patientName: string;
  startName: string;
  endName: string;
  coordinates: [number, number][];
}

const routesData: AmbulanceRoute[] = [
  {
    id: 0,
    ticketId: 'AMB-5683',
    patientName: 'Patient A (Cardiac Care)',
    startName: 'Howrah Station (Ambulance P)',
    endName: 'Victoria Memorial Gate (Patient A)',
    coordinates: [
      [22.5830, 88.3425], // Start: Howrah Railway Station Approach
      [22.5852, 88.3435], // Entering Howrah Bridge (Howrah Side)
      [22.5852, 88.3470], // Crossing Hooghly River (Mid-bridge)
      [22.5852, 88.3505], // Exiting Howrah Bridge (Kolkata Side)
      [22.5820, 88.3525], // Brabourne Road Flyover
      [22.5760, 88.3525], // Brabourne Road (Near Canning St)
      [22.5700, 88.3515], // Near Tea Board / B.B.D. Bagh Area
      [22.5660, 88.3480], // Turning into Esplanade Central (Red Road Entrance)
      [22.5560, 88.3450], // Red Road (Maidan Area)
      [22.5470, 88.3430], // Red Road South (Entering Hospital Rd)
      [22.5448, 88.3425], // Arrived: Victoria Memorial Gate (Patient Location)
    ],
  },
  {
    id: 1,
    ticketId: 'AMB-8142',
    patientName: 'Patient B (Respiratory Distress)',
    startName: 'Sealdah Station (Ambulance Q)',
    endName: 'Science City Gate (Patient B)',
    coordinates: [
      [22.5681, 88.3718], // Start: Sealdah Railway Station
      [22.5645, 88.3735], // AJC Bose Road Flyover entrance
      [22.5590, 88.3750], // Canal South Rd Crossing
      [22.5535, 88.3768], // AJC Bose Road Flyover Middle
      [22.5480, 88.3792], // Parama Island Flyover Entrance
      [22.5435, 88.3840], // Park Circus Connector
      [22.5410, 88.3890], // EM Bypass Junction
      [22.5390, 88.3930], // JBS Haldane Avenue
      [22.5393, 88.3970], // Near Science City Auditorium
      [22.5402, 88.3995], // Science City Entrance Gate
      [22.5412, 88.4002], // Arrived: Science City Main Center (Patient Location)
    ],
  },
  {
    id: 2,
    ticketId: 'AMB-2907',
    patientName: 'Patient C (Trauma Support)',
    startName: 'Ballygunge Phari (Ambulance R)',
    endName: 'Allen Park (Patient C)',
    coordinates: [
      [22.5312, 88.3695], // Start: Ballygunge Phari Junction
      [22.5315, 88.3630], // Gariahat Road (Broad Street)
      [22.5330, 88.3595], // Hazra Road Intersection
      [22.5370, 88.3580], // Lansdowne Road Crossing
      [22.5410, 88.3575], // Sarat Bose Road Crossing
      [22.5450, 88.3570], // Netaji Bhavan Area
      [22.5480, 88.3572], // Exide Crossing / AJC Bose Road
      [22.5510, 88.3540], // Cathedral Road (Near Maidan)
      [22.5525, 88.3585], // Park Street Crossing (Jawaharlal Nehru Road)
      [22.5505, 88.3645], // Park Street Middle Area
      [22.5492, 88.3685], // Arrived: Allen Park Gate (Patient Location)
    ],
  },
  {
    id: 3,
    ticketId: 'AMB-9025',
    patientName: 'Patient D (Critical Transport)',
    startName: 'Dum Dum Junction (Ambulance S)',
    endName: 'Sector V Wipro Crossing (Patient D)',
    coordinates: [
      [22.6135, 88.4020], // Start: Dum Dum / Jessore Road
      [22.6075, 88.4055], // Lake Town Crossing
      [22.6015, 88.4075], // EM Bypass Crossing (Ultadanga)
      [22.5950, 88.4085], // Hudco Crossing
      [22.5885, 88.4095], // Kankurgachi Area
      [22.5825, 88.4110], // Phoolbagan Crossing
      [22.5760, 88.4130], // Beliaghata Crossing
      [22.5740, 88.4180], // Salt Lake Bypass Entry
      [22.5730, 88.4245], // SDF Crossing (Sector V)
      [22.5725, 88.4310], // College More (Sector V)
      [22.5720, 88.4350], // Arrived: Wipro Crossing (Patient Location)
    ],
  }
];

const etaSteps = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

// Fisher-Yates shuffle helper
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function AmbulanceSection() {
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  const mapRef = useRef<any>(null);
  const ambulanceMarkerRef = useRef<any>(null);
  const activePathRef = useRef<any>(null);
  
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);
  const [status, setStatus] = useState<'idle' | 'en_route' | 'arrived'>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [eta, setEta] = useState(10);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Hold-to-SOS states and refs
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Shuffled route queue — cycles through all 4 routes before repeating
  const routeQueueRef = useRef<number[]>(shuffleArray([0, 1, 2, 3]));
  const queueIndexRef = useRef<number>(0);

  const activeRoute = routesData[activeRouteIndex];
  const routeCoords = activeRoute.coordinates;

  // 1. Load Leaflet CDN Assets
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ((window as any).L) {
      setLeafletLoaded(true);
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.async = true;
    script.onload = () => {
      setLeafletLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      // Keep loaded resources to prevent re-load flashes
    };
  }, []);

  // 2. Initialize Leaflet Map (runs on load and changes in routeIndex)
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    // Create Map
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
    });
    map.fitBounds(routeCoords, { padding: [30, 30] });
    
    mapRef.current = map;

    // Add CartoDB Light Tile Layer (looks much cleaner and more premium than default OSM style)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Custom Div Icons for Patient and Ambulance
    const patientIcon = L.divIcon({
      className: 'custom-leaflet-icon-patient',
      html: `
        <div class="relative flex items-center justify-center w-7 h-7 rounded-full bg-indigo-500 border border-white shadow-md">
          <div class="absolute inset-0 rounded-full bg-indigo-500/25 animate-ping"></div>
          <span class="text-[10px]">🏠</span>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const ambulanceIcon = L.divIcon({
      className: 'custom-leaflet-icon-ambulance',
      html: `
        <div class="relative flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 border-2 border-white shadow-lg">
          <div class="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping"></div>
          <span class="text-[11px] animate-pulse">🚑</span>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Add Patient Marker
    const patientCoord = routeCoords[routeCoords.length - 1];
    L.marker(patientCoord, { icon: patientIcon })
      .addTo(map)
      .bindPopup(`<b>${activeRoute.patientName}</b><br/>Destination: ${activeRoute.endName}`)
      .openPopup();

    // Add Ambulance Marker at Start position
    const startCoord = routeCoords[0];
    const ambulanceMarker = L.marker(startCoord, { icon: ambulanceIcon })
      .addTo(map)
      .bindPopup(`<b>Ambulance (AMB-Dispatch)</b><br/>Origin: ${activeRoute.startName}`);
    
    ambulanceMarkerRef.current = ambulanceMarker;

    // Draw Dotted Planned Route Line
    L.polyline(routeCoords, {
      color: '#5c60f5',
      dashArray: '5, 8',
      weight: 3.5,
      opacity: 0.75
    }).addTo(map);

    // Active path (already traveled)
    const activePath = L.polyline([startCoord], {
      color: '#10b981',
      weight: 4,
      opacity: 0.95
    }).addTo(map);
    
    activePathRef.current = activePath;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [leafletLoaded, activeRouteIndex]);

  // 3. Simulation Handlers
  const startSimulation = () => {
    if (status === 'en_route') return;
    
    const L = (window as any).L;
    if (!L) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    // Pick next route from shuffled queue
    const nextRouteId = routeQueueRef.current[queueIndexRef.current];
    queueIndexRef.current += 1;
    // Refill & re-shuffle once all 4 are used
    if (queueIndexRef.current >= routeQueueRef.current.length) {
      routeQueueRef.current = shuffleArray([0, 1, 2, 3]);
      queueIndexRef.current = 0;
    }
    setActiveRouteIndex(nextRouteId);

    // Use coords directly from the next route (not from stale closure)
    const nextCoords = routesData[nextRouteId].coordinates;

    let step = 0;
    setCurrentStep(step);
    setEta(etaSteps[step]);
    setStatus('en_route');

    // Update marker and active path to initial step coordinate immediately
    const startCoord = nextCoords[step];
    if (ambulanceMarkerRef.current) {
      ambulanceMarkerRef.current.setLatLng(startCoord);
      ambulanceMarkerRef.current.bindPopup('<b>Ambulance</b><br/>En Route...').openPopup();
    }
    if (activePathRef.current) {
      activePathRef.current.setLatLngs(nextCoords.slice(0, step + 1));
    }
    if (mapRef.current) {
      mapRef.current.fitBounds(nextCoords, { padding: [30, 30] });
    }

    intervalRef.current = setInterval(() => {
      step += 1;
      setCurrentStep(step);
      
      const newCoord = nextCoords[step];
      setEta(etaSteps[step]);

      // Move marker on map
      if (ambulanceMarkerRef.current) {
        ambulanceMarkerRef.current.setLatLng(newCoord);
        if (step === nextCoords.length - 1) {
          ambulanceMarkerRef.current.bindPopup('<b>Ambulance Arrived</b>').openPopup();
        } else {
          ambulanceMarkerRef.current.bindPopup('<b>Ambulance</b><br/>En Route...').openPopup();
        }
      }

      // Draw solid progress line
      if (activePathRef.current) {
        const pathCoords = nextCoords.slice(0, step + 1);
        activePathRef.current.setLatLngs(pathCoords);
      }

      // Keep map fitted to route
      if (mapRef.current) {
        mapRef.current.fitBounds(nextCoords, { padding: [30, 30] });
      }

      if (step >= nextCoords.length - 1) {
        setStatus('arrived');
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 1800);
  };

  const resetTracker = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    
    setIsHolding(false);
    setHoldProgress(0);
    setStatus('idle');
    setCurrentStep(0);
    setEta(10);

    const L = (window as any).L;
    if (!L) return;

    const startCoord = routeCoords[0];
    if (ambulanceMarkerRef.current) {
      ambulanceMarkerRef.current.setLatLng(startCoord);
      ambulanceMarkerRef.current.bindPopup(`<b>Ambulance (AMB-Dispatch)</b><br/>Status: Ready`);
    }

    if (activePathRef.current) {
      activePathRef.current.setLatLngs([startCoord]);
    }

    if (mapRef.current) {
      mapRef.current.fitBounds(routeCoords, { padding: [30, 30], animate: true });
    }
  };

  const startHold = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (status === 'en_route') return;
    setIsHolding(true);
    setHoldProgress(0);
    startTimeRef.current = Date.now();

    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    
    holdIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(100, (elapsed / 2000) * 100);
      setHoldProgress(progress);

      if (progress >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        setIsHolding(false);
        setHoldProgress(0);
        startSimulation();
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([100, 50, 100]);
        }
      }
    }, 25);
  };

  const endHold = () => {
    setIsHolding(false);
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    
    fadeIntervalRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        const next = prev - 8;
        if (next <= 0) {
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          return 0;
        }
        return next;
      });
    }, 15);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  return (
    <section
      id="live-tracking"
      className="relative py-[clamp(80px,10vw,130px)] px-5 md:px-12 overflow-hidden bg-white border-b border-slate-200"
    >
      <style>{`
        @keyframes sos-shake {
          0% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-2px, -2px) rotate(-0.5deg); }
          20% { transform: translate(2px, 1px) rotate(0.5deg); }
          30% { transform: translate(-1px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(0.5deg); }
          50% { transform: translate(-2px, 1px) rotate(-0.5deg); }
          60% { transform: translate(2px, -1px) rotate(0deg); }
          70% { transform: translate(-1px, -2px) rotate(0.5deg); }
          80% { transform: translate(1px, 2px) rotate(-0.5deg); }
          90% { transform: translate(-2px, -1px) rotate(0deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .sos-shake-active {
          animation: sos-shake 0.15s infinite;
        }
      `}</style>
      {/* Texture grid */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-[1260px] mx-auto z-10">
        
        {/* Title Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <SectionHeader
            eyebrow="Emergency Hub"
            centered
            title={
              <>
                Live tracking. Real-time
                <br />
                <span className="text-brand">ambulance dispatch.</span>
              </>
            }
            subtitle="Request emergency support and monitor the ambulance's live GPS route on an interactive map."
          />
        </Reveal>

        {/* Section Columns */}
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-center">
          
          {/* Left Side: Control Console */}
          <div className="flex flex-col gap-6">
            
            {/* Simulation Control Card */}
            <Reveal className="w-full" delay={0.08}>
              <div className="rounded-[28px] border border-slate-200 bg-[#fafaf9] p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldAlert className="w-5 h-5 text-brand" />
                  <span className="text-[12px] font-bold uppercase tracking-wider text-brand">Simulation Console</span>
                </div>

                <h3 className="font-[family-name:var(--font-bricolage)] text-[22px] font-black text-slate-900 leading-tight">
                  Trigger Simulation
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-500">
                  Press the button below to initiate an ambulance request, upload a real-time clinical report, and track the dispatched ambulance on Leaflet maps.
                </p>

                {/* Active Case Details (auto-updates with each EN ROUTE click) */}
                <div className="mt-6 text-[11px] bg-indigo-50/50 border border-indigo-100/50 rounded-xl p-3 text-slate-600">
                  <div className="font-extrabold text-indigo-950 uppercase tracking-wide text-[9px] mb-1">Active Case Details</div>
                  <div className="flex flex-col gap-0.5">
                    <div><span className="font-semibold text-indigo-900">Patient:</span> {activeRoute.patientName}</div>
                    <div><span className="font-semibold text-indigo-900">Dispatch:</span> {activeRoute.startName}</div>
                    <div><span className="font-semibold text-indigo-900">Destination:</span> {activeRoute.endName}</div>
                  </div>
                </div>

                {/* Emergency SOS Panic Trigger */}
                <div className="mt-6 flex flex-col items-center justify-center p-6 border-2 border-dashed border-red-200/60 rounded-2xl bg-red-50/20 relative overflow-hidden">
                  <div className="text-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-600 block mb-1">Tactile Panic Console</span>
                    <p className="text-[12px] text-slate-500">Press and hold the SOS button to alert dispatch</p>
                  </div>

                  <div className={cn("relative w-28 h-28 flex items-center justify-center transition-transform", isHolding && "sos-shake-active")}>
                    {/* Background glows */}
                    <div className={cn(
                      "absolute inset-0 rounded-full blur-xl transition-opacity duration-300",
                      isHolding ? "bg-red-500/40 opacity-100" : "bg-red-500/10 opacity-60"
                    )} />

                    {/* SVG progress ring */}
                    <svg className="absolute inset-0 -rotate-90 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                      {/* Track */}
                      <circle
                        cx="50"
                        cy="50"
                        r="44"
                        fill="transparent"
                        stroke="#fee2e2"
                        strokeWidth="5"
                      />
                      {/* Progress */}
                      <circle
                        cx="50"
                        cy="50"
                        r="44"
                        fill="transparent"
                        stroke="#e11d48"
                        strokeWidth="5"
                        strokeDasharray={2 * Math.PI * 44}
                        strokeDashoffset={2 * Math.PI * 44 * (1 - holdProgress / 100)}
                        strokeLinecap="round"
                        className="transition-all duration-75 ease-out"
                      />
                    </svg>

                    {/* The Button */}
                    <button
                      type="button"
                      onMouseDown={startHold}
                      onMouseUp={endHold}
                      onMouseLeave={endHold}
                      onTouchStart={startHold}
                      onTouchEnd={endHold}
                      onTouchCancel={endHold}
                      disabled={status === 'en_route'}
                      className={cn(
                        "w-20 h-20 rounded-full flex flex-col items-center justify-center select-none cursor-pointer transition-all duration-200 shadow-md",
                        status === 'en_route'
                          ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                          : isHolding
                            ? "bg-gradient-to-br from-red-600 to-rose-700 text-white scale-95 shadow-inner"
                            : "bg-gradient-to-br from-red-500 to-rose-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 active:scale-95"
                      )}
                    >
                      {status === 'en_route' ? (
                        <>
                          <span className="text-[10px] font-black tracking-widest text-emerald-600 animate-pulse">ACTIVE</span>
                          <span className="text-[8px] font-bold text-emerald-500/80">DISPATCHED</span>
                        </>
                      ) : isHolding ? (
                        <>
                          <span className="text-[18px] font-black font-sans leading-none tracking-tight">
                            {Math.max(0, (2000 - (holdProgress / 100) * 2000) / 1000).toFixed(1)}s
                          </span>
                          <span className="text-[8px] font-extrabold tracking-widest opacity-80 uppercase mt-0.5 animate-pulse">HOLDING</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[20px] font-black font-sans leading-none tracking-wider">SOS</span>
                          <span className="text-[8px] font-black tracking-wider uppercase mt-0.5">HOLD TO SEND</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Visual indication overlay */}
                  {isHolding && (
                    <div className="absolute inset-0 bg-red-600/5 pointer-events-none animate-pulse" />
                  )}
                </div>

                {/* Simulation controls */}
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={startSimulation}
                    disabled={status === 'en_route'}
                    className={cn(
                      "flex items-center gap-2.5 px-6 py-3.5 text-xs font-black uppercase tracking-wider rounded-2xl shadow-md transition-all duration-300 cursor-pointer active:scale-95",
                      status === 'en_route' 
                        ? 'bg-neutral-100 text-neutral-400 border border-neutral-200 shadow-none cursor-not-allowed'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/15'
                    )}
                  >
                    <Play className="w-4 h-4 fill-white" />
                    {status === 'arrived' ? 'Restart Trip' : status === 'en_route' ? 'En Route...' : 'Override Dispatch'}
                  </button>

                  <button
                    type="button"
                    onClick={resetTracker}
                    className="flex items-center gap-2 px-5 py-3.5 text-xs font-black uppercase tracking-wider rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:shadow-md cursor-pointer active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Tracker
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Live stats card */}
            <Reveal className="w-full" delay={0.16}>
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[var(--shadow-card)]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Live Dispatch Logs</span>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">Ticket ID</span>
                    <p className="mt-0.5 text-sm font-black text-slate-800 font-mono">{activeRoute.ticketId}</p>
                  </div>
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">ETA</span>
                    <p className="mt-0.5 text-sm font-black text-slate-800 font-mono">{eta > 0 ? `${eta} mins` : 'Arrived ✓'}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">Simulation Status</span>
                    <p className="mt-0.5 text-xs font-extrabold flex items-center gap-1.5 uppercase font-mono">
                      <span className={cn(
                        "w-2 h-2 rounded-full",
                        status === 'en_route' ? 'bg-amber-500 animate-ping' : status === 'arrived' ? 'bg-emerald-500' : 'bg-slate-400'
                      )} />
                      <span className={cn(
                        status === 'en_route' ? 'text-amber-600' : status === 'arrived' ? 'text-emerald-600' : 'text-slate-500'
                      )}>
                        {status === 'en_route' ? 'En Route' : status === 'arrived' ? 'Arrived' : 'Idle'}
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">GPS Coordinates</span>
                    <p className="mt-0.5 text-[11px] font-black text-slate-700 font-mono leading-tight">
                      {routeCoords[currentStep][0].toFixed(4)}° N, {routeCoords[currentStep][1].toFixed(4)}° E
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Right Side: Mockup Phone */}
          <Reveal className="flex justify-center" delay={0.24}>
            <PhoneFrame size="main" premium>
              {/* App Screen Mockup */}
              <div className="relative min-h-[500px] flex flex-col justify-between bg-[#fafaf9] pt-10 text-slate-900 h-full w-full">
                
                {/* Status Bar */}
                <div className="relative z-30 flex items-center justify-between px-5 pb-2 text-[10px] font-bold text-slate-500">
                  <span>10:15 AM</span>
                  <div className="flex items-center gap-1">
                    <span>LTE</span>
                    <div className="flex h-2 w-4 rounded-[3px] border border-slate-400 p-[1px]">
                      <span className="flex-1 rounded-[2px] bg-slate-500" />
                    </div>
                  </div>
                </div>

                {/* Mobile screen content */}
                <div className="flex-1 flex flex-col justify-between pb-6">
                  
                  {/* App Header */}
                  <div className="bg-gradient-to-r from-brand to-indigo-600 px-5 pb-4 pt-3 text-white rounded-b-[24px] shadow-sm">
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                        <Navigation className="h-3 w-3 text-white fill-white/10" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-[family-name:var(--font-bricolage)] text-[14px] font-black leading-tight font-sans">Live Tracking Center</h4>
                        <span className="block text-[8px] text-white/80">Real-Time Ambulance Dispatch</span>
                      </div>
                    </div>
                  </div>

                  {/* Map Card */}
                  <div className="flex-1 px-4 pt-4 flex flex-col gap-3">
                    <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm flex flex-col justify-between overflow-hidden">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-wider">
                          Case: {activeRoute.ticketId}
                        </span>
                        <div className="flex items-center gap-1 bg-brand-light text-brand px-2 py-0.5 rounded-full text-[7px] font-black">
                          <span className="h-1 w-1 rounded-full bg-brand animate-ping" />
                          GPS Live
                        </div>
                      </div>

                      {/* The Map */}
                      <div className="flex-1 min-h-[220px] rounded-xl border border-slate-100 bg-slate-50 overflow-hidden relative z-10">
                        {!leafletLoaded && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                            <div className="w-8 h-8 rounded-full border-4 border-indigo-200 border-t-brand animate-spin mb-2" />
                            <span className="text-[9px] font-black text-slate-400">Loading Map...</span>
                          </div>
                        )}
                        <div ref={mapContainerRef} className="w-full h-full" style={{ minHeight: '220px' }} />
                      </div>

                      {/* Map Footer status */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 text-left">
                        <span className="text-[7.5px] uppercase font-bold text-slate-400 block tracking-widest">Destination Coordinates</span>
                        <div className="flex items-center justify-between mt-0.5">
                          <p className="text-[10px] font-black text-slate-800 font-mono">
                            {routeCoords[routeCoords.length - 1][0].toFixed(4)}° N, {routeCoords[routeCoords.length - 1][1].toFixed(4)}° E
                          </p>
                          <p className="text-[9.5px] font-bold text-slate-500 font-mono">
                            ETA: <span className="text-brand font-black">{eta > 0 ? `${eta} mins` : 'Arrived'}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </PhoneFrame>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
