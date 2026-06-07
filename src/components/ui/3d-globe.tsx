"use client";

import { useEffect, useRef, useState } from "react";

export interface Marker {
  lat: number;
  lng: number;
  src?: string;
  label: string;
  detail?: string;
  color?: string;
}

export type GlobeMarker = Marker;

export interface GlobeConfig {
  atmosphereColor?: string;
  atmosphereIntensity?: number;
  bumpScale?: number;
  autoRotateSpeed?: number;
}

export interface Globe3DProps {
  markers?: Marker[];
  config?: GlobeConfig;
  className?: string;
  onMarkerClick?: (marker: Marker) => void;
  onMarkerHover?: (marker: Marker | null) => void;
}

type LandDot = {
  x: number;
  y: number;
  z: number;
  lat: number;
  lng: number;
  warmth: number;
};

const landMasses = [
  { lat: 49, lng: -108, rx: 54, ry: 27, tilt: -0.16 },
  { lat: 62, lng: -96, rx: 44, ry: 16, tilt: 0.08 },
  { lat: 21, lng: -101, rx: 22, ry: 10, tilt: -0.35 },
  { lat: -15, lng: -60, rx: 22, ry: 42, tilt: 0.28 },
  { lat: -40, lng: -68, rx: 11, ry: 22, tilt: -0.08 },
  { lat: 8, lng: 20, rx: 26, ry: 42, tilt: -0.12 },
  { lat: 52, lng: 14, rx: 29, ry: 14, tilt: -0.05 },
  { lat: 23, lng: 77, rx: 18, ry: 17, tilt: 0.24 },
  { lat: 48, lng: 82, rx: 55, ry: 27, tilt: 0.02 },
  { lat: 34, lng: 112, rx: 31, ry: 17, tilt: -0.1 },
  { lat: 1, lng: 112, rx: 21, ry: 12, tilt: 0.12 },
  { lat: -25, lng: 134, rx: 24, ry: 14, tilt: -0.1 },
  { lat: 72, lng: -42, rx: 22, ry: 9, tilt: 0.12 },
];

function wrappedDeltaLng(lng: number, center: number) {
  let delta = lng - center;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return delta;
}

function inRotatedEllipse(lat: number, lng: number, land: (typeof landMasses)[number]) {
  const x = wrappedDeltaLng(lng, land.lng) * Math.cos((land.lat * Math.PI) / 180);
  const y = lat - land.lat;
  const cos = Math.cos(land.tilt);
  const sin = Math.sin(land.tilt);
  const xr = x * cos - y * sin;
  const yr = x * sin + y * cos;
  return (xr * xr) / (land.rx * land.rx) + (yr * yr) / (land.ry * land.ry) < 1;
}

// Lightweight atlas approximation: layered continent ellipses plus deterministic edge noise.
function isLand(lat: number, lng: number) {
  const baseLand = landMasses.some((land) => inRotatedEllipse(lat, lng, land));
  if (!baseLand) return false;

  const coastalNoise =
    Math.sin(lat * 0.62 + lng * 0.18) * 0.38 +
    Math.cos(lat * 0.21 - lng * 0.46) * 0.32 +
    Math.sin((lat + lng) * 0.13) * 0.22;

  if (lat < 31 && lat > 12 && lng > -96 && lng < -74) return coastalNoise > 0.1;
  if (lat < 12 && lat > -5 && lng > -82 && lng < -55) return coastalNoise > -0.15;
  if (lat > 10 && lat < 25 && lng > 42 && lng < 60) return coastalNoise > -0.05;

  return coastalNoise > -0.62;
}

const projectPoint = (
  x: number,
  y: number,
  z: number,
  rotationX: number,
  rotationY: number,
  R: number,
) => {
  const cosY = Math.cos(rotationY);
  const sinY = Math.sin(rotationY);
  const x1 = x * cosY - z * sinY;
  const z1 = x * sinY + z * cosY;

  const cosX = Math.cos(rotationX);
  const sinX = Math.sin(rotationX);
  const y2 = y * cosX - z1 * sinX;
  const z2 = y * sinX + z1 * cosX;

  return {
    x: x1 * R,
    y: y2 * R,
    z: z2 * R,
  };
};

export function Globe3D({ markers = [], config = {}, className, onMarkerClick, onMarkerHover }: Globe3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [rotationX, setRotationX] = useState(0.3); // inclination
  const [rotationY, setRotationY] = useState(0); // rotation angle
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState<Marker | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const autoRotateSpeed = config.autoRotateSpeed !== undefined ? config.autoRotateSpeed : 0.3;
  const atmosphereColor = config.atmosphereColor || "#5c60f5";
  const atmosphereIntensity = config.atmosphereIntensity !== undefined ? config.atmosphereIntensity : 18;

  // Pre-generate land dots on the sphere
  const [mapLoaded, setMapLoaded] = useState(false);

  // Pre-generate land dots on the sphere
  const dotsRef = useRef<LandDot[]>([]);
  useEffect(() => {
    // 1. Generate fallback ellipse dots immediately
    const generateFallback = () => {
      const list: LandDot[] = [];
      const R = 1;
      for (let lat = -80; lat <= 82; lat += 2.2) {
        const radLat = (lat * Math.PI) / 180;
        const cosLat = Math.cos(radLat);
        const sinLat = Math.sin(radLat);

        const stepLng = 2.2 / Math.max(0.18, cosLat);
        for (let lng = -180; lng < 180; lng += stepLng) {
          if (isLand(lat, lng)) {
            const radLng = (lng * Math.PI) / 180;
            list.push({
              x: R * cosLat * Math.sin(radLng),
              y: R * sinLat,
              z: R * cosLat * Math.cos(radLng),
              lat,
              lng,
              warmth: Math.max(0, 1 - Math.abs(lat) / 72),
            });
          }
        }
      }
      dotsRef.current = list;
    };

    generateFallback();

    // 2. Load high-fidelity world map image to generate pixel-perfect land dots
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "https://cdn.jsdelivr.net/npm/cobe@0.1.2/public/world.png";
    
    img.onload = () => {
      try {
        const tempCanvas = document.createElement("canvas");
        const mapW = 240;
        const mapH = 120;
        tempCanvas.width = mapW;
        tempCanvas.height = mapH;
        const tempCtx = tempCanvas.getContext("2d");
        if (!tempCtx) return;
        
        tempCtx.drawImage(img, 0, 0, mapW, mapH);
        const imgData = tempCtx.getImageData(0, 0, mapW, mapH).data;

        const list: LandDot[] = [];
        const R = 1;
        
        // Loop through latitudes and longitudes
        for (let lat = -80; lat <= 82; lat += 2.0) {
          const radLat = (lat * Math.PI) / 180;
          const cosLat = Math.cos(radLat);
          const sinLat = Math.sin(radLat);
          
          // Uniform density spacing
          const stepLng = 2.0 / Math.max(0.18, cosLat);
          for (let lng = -180; lng < 180; lng += stepLng) {
            // Map sphere lat/lng back to the flat 2D projection
            const px = Math.floor(((lng + 180) / 360) * mapW);
            const py = Math.floor(((90 - lat) / 180) * mapH);
            
            if (px >= 0 && px < mapW && py >= 0 && py < mapH) {
              const idx = (py * mapW + px) * 4;
              const r = imgData[idx];
              const g = imgData[idx + 1];
              const b = imgData[idx + 2];
              const a = imgData[idx + 3];
              
              // In cobe's world.png, land is white/grey, oceans are transparent/black
              const brightness = (r + g + b) / 3;
              const isLandPixel = a > 50 && brightness > 40;
              
              if (isLandPixel) {
                const radLng = (lng * Math.PI) / 180;
                list.push({
                  x: R * cosLat * Math.sin(radLng),
                  y: R * sinLat,
                  z: R * cosLat * Math.cos(radLng),
                  lat,
                  lng,
                  warmth: Math.max(0, 1 - Math.abs(lat) / 72),
                });
              }
            }
          }
        }
        
        if (list.length > 0) {
          dotsRef.current = list;
          setMapLoaded(true);
        }
      } catch (err) {
        console.warn("Failed to generate high-fidelity globe from image, keeping ellipse fallback:", err);
      }
    };

    img.onerror = () => {
      console.warn("Failed to load world map image for globe, using ellipse fallback.");
    };
  }, []);

  // Drag interaction variables
  const dragStartRef = useRef({ x: 0, y: 0 });
  const rotationStartRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    rotationStartRef.current = { x: rotationX, y: rotationY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    
    // adjust rotation based on mouse movement
    setRotationY(rotationStartRef.current.y + deltaX * 0.005);
    setRotationX(Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotationStartRef.current.x - deltaY * 0.005)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Auto-rotation loop
  useEffect(() => {
    if (isDragging) return;
    let animationFrameId: number;
    const update = () => {
      setRotationY((prev) => prev + (autoRotateSpeed * 0.005));
      animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging, autoRotateSpeed]);


  // Main canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    if (canvas.width !== width * 2 || canvas.height !== height * 2) {
      canvas.width = width * 2;
      canvas.height = height * 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const R = Math.min(cx, cy) * 0.75; // Sphere visual radius

    // 1. Outer atmospheric glow ring
    const atmosphereGlow = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * (1.3 + atmosphereIntensity * 0.02));
    atmosphereGlow.addColorStop(0, `${atmosphereColor}55`);
    atmosphereGlow.addColorStop(0.4, `${atmosphereColor}22`);
    atmosphereGlow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = atmosphereGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, R * (1.3 + atmosphereIntensity * 0.02), 0, Math.PI * 2);
    ctx.fill();

    // 2. Ocean sphere with satellite-style depth
    const sphereBg = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.05, cx, cy, R);
    sphereBg.addColorStop(0, "#1f6b8f");
    sphereBg.addColorStop(0.34, "#0f3a5b");
    sphereBg.addColorStop(0.72, "#081a31");
    sphereBg.addColorStop(1, "#020611");
    ctx.fillStyle = sphereBg;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();

    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let started = false;
      for (let lng = -180; lng <= 180; lng += 3) {
        const latRad = (lat * Math.PI) / 180;
        const lngRad = (lng * Math.PI) / 180;
        const proj = projectPoint(
          Math.cos(latRad) * Math.sin(lngRad),
          Math.sin(latRad),
          Math.cos(latRad) * Math.cos(lngRad),
          rotationX,
          rotationY,
          R,
        );
        if (proj.z <= 0) {
          started = false;
          continue;
        }
        const sx = cx + proj.x;
        const sy = cy - proj.y;
        if (!started) {
          ctx.moveTo(sx, sy);
          started = true;
        } else {
          ctx.lineTo(sx, sy);
        }
      }
      ctx.strokeStyle = "rgba(186,230,253,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    for (let lng = -150; lng <= 180; lng += 30) {
      ctx.beginPath();
      let started = false;
      for (let lat = -78; lat <= 78; lat += 3) {
        const latRad = (lat * Math.PI) / 180;
        const lngRad = (lng * Math.PI) / 180;
        const proj = projectPoint(
          Math.cos(latRad) * Math.sin(lngRad),
          Math.sin(latRad),
          Math.cos(latRad) * Math.cos(lngRad),
          rotationX,
          rotationY,
          R,
        );
        if (proj.z <= 0) {
          started = false;
          continue;
        }
        const sx = cx + proj.x;
        const sy = cy - proj.y;
        if (!started) {
          ctx.moveTo(sx, sy);
          started = true;
        } else {
          ctx.lineTo(sx, sy);
        }
      }
      ctx.strokeStyle = "rgba(186,230,253,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // 3. Draw dotted continents with terrain-toned highlights
    dotsRef.current.forEach((dot) => {
      const proj = projectPoint(dot.x, dot.y, dot.z, rotationX, rotationY, R);

      if (proj.z > 0) {
        const sx = cx + proj.x;
        const sy = cy - proj.y;
        const depth = proj.z / R;
        const size = depth * 1.35 + 0.55;
        const opacity = depth * 0.54 + 0.28;
        const r = Math.round(94 + dot.warmth * 78 + depth * 34);
        const g = Math.round(143 + dot.warmth * 58 + depth * 42);
        const b = Math.round(107 + dot.warmth * 26 + depth * 18);

        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const sx = cx + proj.x;
        const sy = cy - proj.y;
        ctx.fillStyle = "rgba(125, 211, 252, 0.045)";
        ctx.beginPath();
        ctx.arc(sx, sy, 0.55, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    const cloudSweep = ctx.createLinearGradient(cx - R, cy - R * 0.8, cx + R, cy + R * 0.8);
    cloudSweep.addColorStop(0, "rgba(255,255,255,0)");
    cloudSweep.addColorStop(0.34, "rgba(255,255,255,0.07)");
    cloudSweep.addColorStop(0.58, "rgba(255,255,255,0.02)");
    cloudSweep.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = cloudSweep;
    ctx.beginPath();
    ctx.ellipse(cx, cy, R * 0.96, R * 0.42, -0.38, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 4. Edge darkening vignette to give the sphere solid depth
    const vignette = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R);
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(0.72, "rgba(0,0,0,0.16)");
    vignette.addColorStop(1, "rgba(0,0,0,0.64)");
    ctx.fillStyle = vignette;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();

  }, [rotationX, rotationY, atmosphereColor, atmosphereIntensity]);

  // Project markers to render as HTML overlays
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      setCanvasSize({ width: canvas.offsetWidth, height: canvas.offsetHeight });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const projectedMarkers = markers.map((marker, index) => {
    const latRad = (marker.lat * Math.PI) / 180;
    const lngRad = (marker.lng * Math.PI) / 180;
    
    // 3D coordinates on unit sphere
    const mx = Math.cos(latRad) * Math.sin(lngRad);
    const my = Math.sin(latRad);
    const mz = Math.cos(latRad) * Math.cos(lngRad);
    
    return {
      marker,
      index,
      proj: projectPoint(mx, my, mz, rotationX, rotationY, 1.0) // project on unit sphere
    };
  });

  return (
    <div 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className ?? ''}`}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block" 
        style={{ touchAction: "none" }}
      />

      {/* HTML Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {projectedMarkers.map(({ marker, index, proj }) => {
          // Calculate screen coordinates
          if (!canvasSize.width || !canvasSize.height) return null;

          const cx = canvasSize.width / 2;
          const cy = canvasSize.height / 2;
          const R = Math.min(cx, cy) * 0.75;
          
          const sx = cx + proj.x * R;
          const sy = cy - proj.y * R;

          // Only display if the marker is on the front side of the globe
          if (proj.z <= 0) return null;

          const isHovered = hoveredMarker === marker;

          return (
            <div 
              key={index}
              style={{
                position: "absolute",
                left: `${sx}px`,
                top: `${sy}px`,
                transform: "translate(-50%, -50%)",
                zIndex: isHovered ? 50 : 20,
              }}
              className="pointer-events-auto"
            >
              {/* Interactive target dot */}
              <div 
                className="relative flex items-center justify-center cursor-pointer group"
                onMouseEnter={() => {
                  setHoveredMarker(marker);
                  onMarkerHover?.(marker);
                }}
                onMouseLeave={() => {
                  setHoveredMarker(null);
                  onMarkerHover?.(null);
                }}
                onClick={() => onMarkerClick?.(marker)}
              >
                <div
                  className="absolute h-10 w-10 rounded-full opacity-25 blur-[1px] animate-ping pointer-events-none"
                  style={{ backgroundColor: marker.color ?? "#38bdf8" }}
                />
                <div
                  className="absolute h-6 w-6 rounded-full opacity-35 animate-pulse pointer-events-none"
                  style={{ backgroundColor: marker.color ?? "#38bdf8" }}
                />
                
                <div
                  className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-slate-950 shadow-[0_10px_26px_rgba(15,23,42,0.38)] ring-2 ring-white/15 transition-all duration-300 group-hover:scale-125"
                  style={{ boxShadow: `0 14px 28px rgba(15,23,42,0.38), 0 0 22px ${marker.color ?? "#38bdf8"}55` }}
                >
                  {marker.src ? (
                    <img 
                      src={marker.src} 
                      alt={marker.label} 
                      className="w-full h-full object-cover pointer-events-none" 
                    />
                  ) : (
                    <span className="text-white text-[13px] font-black font-mono">+</span>
                  )}
                </div>

                <div 
                  className={`absolute bottom-12 left-1/2 flex min-w-[180px] -translate-x-1/2 transform flex-col gap-1 rounded-2xl border border-white/10 bg-slate-950/90 px-3 py-2 text-white shadow-2xl backdrop-blur-xl transition-all duration-200 pointer-events-none ${
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                >
                  <span className="block whitespace-nowrap text-[11px] font-bold leading-none tracking-tight">
                    {marker.label}
                  </span>
                  <span className="text-[9px] leading-tight text-slate-300">
                    {marker.detail ?? "Live recovery touchpoint"}
                  </span>
                  <div className="absolute bottom-[-4px] left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-slate-950/90" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
