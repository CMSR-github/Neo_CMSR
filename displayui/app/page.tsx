"use client";
import { velocity, acceleration, temperature, current, voltage, updateMetrics } from "./data";
import { useEffect, useState } from "react";

export default function Page() {
  const [tick, setTick] = useState(0); // trigger re-render

  // Update the variables every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updateMetrics();
      setTick(prev => prev + 1); // trigger re-render
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { title: "💨 VELOCITY 💨", value: velocity, unit: "m/s" },
    { title: "🚤 ACCELERATION 🚤", value: acceleration, unit: "m/s²" },
    { title: "🌡️ TEMPERATURE 🌡️", value: temperature, unit: "°C" },
    { title: "🔌 CURRENT 🔌", value: current, unit: "amps" },
    { title: "⚡ VOLTAGE ⚡", value: voltage, unit: "volts" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-300 via-fuchsia-400 to-purple-500 flex flex-col items-center py-14 px-6">

      {/* Floating Background Sparkles */}
      <Sparkles />

      {/* Floating Unicorns */}
      <Unicorns />

      {/* HEADER */}
      <div className="z-10 bg-gradient-to-r from-red-500 to-pink-600 border-[6px] border-red-900 rounded-3xl px-14 py-5 mb-16 shadow-2xl shadow-pink-600/50">
        <h1 className="text-white text-4xl md:text-5xl font-bold tracking-widest drop-shadow-lg">
          💎 OPTIMISLAYTION 💅
        </h1>
      </div>

      {/* TOP ROW */}
      <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-7xl mb-14">
        {metrics.slice(0, 3).map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* BOTTOM ROW */}
      <div className="z-10 grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        {metrics.slice(3).map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>
    </div>
  );
}

function MetricCard({ metric }) {
  return (
    <div className="relative bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-3xl p-10 flex flex-col items-center justify-center shadow-2xl shadow-purple-900/40 min-h-[260px] transform transition duration-300 hover:scale-105 hover:rotate-1">

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30 bg-white animate-pulse" />

      <div className="relative flex items-center gap-3 mb-6">
        <h2 className="text-white text-3xl md:text-2xl font-semibold tracking-wider drop-shadow-md">
          {metric.title}
        </h2>
      </div>

      <div className="relative text-white text-6xl md:text-7xl font-extrabold leading-none drop-shadow-xl">
        {metric.value}
      </div>

      <div className="relative text-white text-xl mt-3 opacity-90">
        {metric.unit}
      </div>
    </div>
  );
}

const sparkles = [];
function Sparkles() {
  const rows = 20;
  const cols = 25; // 20 × 25 = 500 sparkles
  if (sparkles.length == 0){
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        sparkles.push({
          top: (row + Math.random()) * (100 / rows),
          left: (col + Math.random()) * (100 / cols),
          delay: Math.random() * 3,
        });
      }
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map((sparkle, i) => (
        <div
          key={i}
          className="absolute text-white text-xl animate-pulse"
          style={{
            top: `${sparkle.top}%`,
            left: `${sparkle.left}%`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
}

function Unicorns() {
  const unicorns = [
    { top: "3%", left: "3%", size: "text-[150px]", flip: true },
    { bottom: "3%", right: "3%", size: "text-[150px]", flip: false },
    { top: "3%", right: "3%", size: "text-[150px]", flip: false },
    { bottom: "3%", left: "3%", size: "text-[150px]", flip: true }
  ];

  return (
    <>
      {unicorns.map((u, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: u.top,
            left: u.left,
            bottom: u.bottom,
            right: u.right,
            transform: u.flip ? "scaleX(-1)" : "none",
          }}
        >
          <div
            className={`${u.size} animate-bounce`}
            style={{
              filter: "drop-shadow(0 10px 20px rgba(255,0,255,0.6))",
            }}
          >
            🦄
          </div>
        </div>
      ))}
    </>
  );
}


