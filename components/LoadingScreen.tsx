"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const intervals = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => setStage(2), 2500),
    ];
    return () => intervals.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative w-full max-w-lg mx-auto p-8 flex flex-col items-center">
        {/* Animation Container */}
        <div className="h-48 w-full relative mb-8">

          {/* Path Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-gray-200"></div>

          {/* Plane Animation */}
          <div className="absolute top-1/2 left-0 w-full -translate-y-6">
            <div className="w-12 h-12 relative animate-fly-across">
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-gray-900 w-full h-full transform rotate-45">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
              {/* Trail */}
              <div className="absolute top-1/2 right-full w-20 h-0.5 bg-gradient-to-l from-gray-400 to-transparent"></div>
            </div>
          </div>

          {/* Cloud Animations */}
          <div className="absolute top-10 left-1/4 animate-float-slow opacity-20">
            <svg className="w-16 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
          </div>
          <div className="absolute bottom-10 right-1/4 animate-float-slower opacity-20">
            <svg className="w-12 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
          </div>

        </div>

        {/* Text Animation */}
        <div className="text-center space-y-2 relative z-10">
          <h3 className="text-2xl font-bold text-gray-900 transition-all duration-500">
            {stage === 0 && "Calculated Date... Maps ready"}
            {stage === 1 && "Finding your place in the world..."}
            {stage === 2 && "Almost there..."}
          </h3>
          <div className="flex justify-center gap-1">
            <span className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
            <span className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
            <span className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fly-across {
          0% { transform: translateX(0%) translateY(0) rotate(5deg); opacity: 0; }
          10% { opacity: 1; }
          30% { transform: translateX(30vw) translateY(-15px) rotate(8deg); }
          50% { transform: translateX(50vw) translateY(0) rotate(5deg); }
          70% { transform: translateX(70vw) translateY(15px) rotate(0deg); }
          90% { opacity: 1; }
          100% { transform: translateX(100vw) translateY(0) rotate(-5deg); opacity: 0; }
        }
        .animate-fly-across {
          animation: fly-across 4s ease-in-out infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slow 6s ease-in-out infinite reverse;
        }
      `}</style>
    </div>
  );
}
