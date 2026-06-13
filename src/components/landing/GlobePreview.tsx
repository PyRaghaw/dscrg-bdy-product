"use client";
import { Globe3D, GlobeMarker } from "@/components/ui/ThreeDGlobe";

const sampleMarkers: GlobeMarker[] = [
  {
    lat: 40.7128,
    lng: -74.006,
    src: "https://assets.aceternity.com/avatars/1.webp",
    label: "New York",
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "London",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Tokyo",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: "https://assets.aceternity.com/avatars/4.webp",
    label: "Sydney",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    src: "https://assets.aceternity.com/avatars/5.webp",
    label: "Paris",
  },
  {
    lat: 28.6139,
    lng: 77.209,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "New Delhi",
  },
  {
    lat: 55.7558,
    lng: 37.6173,
    src: "https://assets.aceternity.com/avatars/7.webp",
    label: "Moscow",
  },
  {
    lat: -22.9068,
    lng: -43.1729,
    src: "https://assets.aceternity.com/avatars/8.webp",
    label: "Rio de Janeiro",
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    src: "https://assets.aceternity.com/avatars/9.webp",
    label: "Shanghai",
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    src: "https://assets.aceternity.com/avatars/10.webp",
    label: "Dubai",
  },
  {
    lat: -34.6037,
    lng: -58.3816,
    src: "https://assets.aceternity.com/avatars/11.webp",
    label: "Buenos Aires",
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Singapore",
  },
  {
    lat: 37.5665,
    lng: 126.978,
    src: "https://assets.aceternity.com/avatars/13.webp",
    label: "Seoul",
  },
];

export function GlobePreview() {
  return (
    <div className="relative mx-auto flex flex-col md:block h-auto md:h-[400px] w-full max-w-7xl overflow-hidden rounded-2xl shadow-2xl pb-8 md:pb-0"
      style={{ background: "linear-gradient(135deg, #0f0f14 0%, #13111f 50%, #0c0e1a 100%)" }}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 80% at 10% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)"
        }}
      />

      <div className="relative z-20 p-8 md:p-14 w-full md:w-1/2 flex flex-col justify-center">
        <span className="inline-flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-5">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          VAni · Care Network
        </span>

        <h2 className="mb-5 max-w-xl text-3xl font-extrabold tracking-tight text-white md:text-5xl lg:text-[3.25rem] leading-[1.1]">
          Your care team,{" "}
          <span style={{ background: "linear-gradient(90deg, #818cf8, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            always in sync.
          </span>
        </h2>

        <p className="max-w-sm text-neutral-400 text-base md:text-lg leading-relaxed mb-8">
          Patients, families, and doctors stay connected from discharge to full recovery, ensuring no missed alerts or confusion.
        </p>

        <div className="flex gap-3 flex-wrap relative z-30">
          <a
            href="#download"
            className="flex cursor-pointer items-center justify-center rounded-lg px-5 py-2.5 font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #6366f1, #7c3aed)" }}
          >
            Get Early Access
          </a>
          <a
            href="#story"
            className="flex cursor-pointer items-center justify-center rounded-lg bg-white/10 border border-white/20 px-5 py-2.5 font-semibold text-white/90 transition-all duration-200 hover:bg-white/15 active:scale-[0.98] backdrop-blur-sm"
          >
            See how it works →
          </a>
        </div>
      </div>

      {/* Globe container */}
      <div className="relative md:absolute mx-auto md:mx-0 mt-6 md:mt-0 right-0 bottom-0 md:-right-40 md:-bottom-60 z-10 w-[20rem] h-[20rem] sm:w-[24rem] sm:h-[24rem] md:w-[42rem] md:h-[42rem]">
        <Globe3D
          className="h-full w-full"
          markers={sampleMarkers}
          config={{
            atmosphereColor: "#818cf8",
            atmosphereIntensity: 20,
            bumpScale: 5,
            autoRotateSpeed: 0.4,
          }}
          onMarkerClick={(marker) => {
            console.log("Clicked marker:", marker.label);
          }}
          onMarkerHover={(marker) => {
            if (marker) {
              console.log("Hovering:", marker.label);
            }
          }}
        />
      </div>
    </div>
  );
}
