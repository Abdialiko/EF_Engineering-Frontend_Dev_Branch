'use client';
import React from 'react';

// Engineering Grid Background
export const EngineeringGrid: React.FC<{ opacity?: number }> = ({ opacity = 0.03 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity }}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2596BE" strokeWidth="1" opacity="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#2596BE]/5 to-transparent animate-gradient-shift"></div>
    </div>
  );
};

// Motion Lines Background
export const MotionLines: React.FC<{ count?: number }> = ({ count = 5 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-[#2596BE] to-transparent animate-slide-in-right"
          style={{
            top: `${20 + i * 20}%`,
            left: '-100%',
            width: '200%',
            animation: `slide-in-right ${3 + i * 0.5}s linear infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
};

// Floating Geometric Shapes
export const FloatingShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-geometric-move"
          style={{
            width: `${40 + i * 10}px`,
            height: `${40 + i * 10}px`,
            left: `${10 + i * 15}%`,
            top: `${10 + i * 12}%`,
            border: `2px solid ${i % 2 === 0 ? '#2596BE' : '#F2AF18'}`,
            borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '0' : '20%',
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${8 + i * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

// Micro Particles
export const MicroParticles: React.FC<{ count?: number }> = ({ count = 20 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-[#2596BE] rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

// Blueprint Lines Animation
export const BlueprintLines: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="blueprint" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" fill="#2596BE" opacity="0.6"/>
            <line x1="0" y1="50" x2="100" y2="50" stroke="#2596BE" strokeWidth="0.5" opacity="0.4"/>
            <line x1="50" y1="0" x2="50" y2="100" stroke="#2596BE" strokeWidth="0.5" opacity="0.4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint)" />
      </svg>
    </div>
  );
};

// Rotating Gear Icon
export const RotatingGear: React.FC<{ size?: number; className?: string }> = ({ size = 60, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`animate-rotate-gear ${className}`}
      style={{ color: '#2596BE' }}
    >
      <path
        d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.4-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97L2.46 14.6c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"
        fill="currentColor"
      />
    </svg>
  );
};

// Animated Blueprint Icon
export const BlueprintIcon: React.FC<{ size?: number; className?: string }> = ({ size = 60, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`animate-icon-pulse ${className}`}
      style={{ color: '#2596BE' }}
    >
      <path
        d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{ animation: 'line-draw 2s ease-out forwards' }}
      />
      <path
        d="M8 12h8M8 16h8M8 8h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

// Building Structure Icon
export const BuildingIcon: React.FC<{ size?: number; className?: string }> = ({ size = 60, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`animate-float-slow ${className}`}
      style={{ color: '#2596BE' }}
    >
      <path
        d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 2.84L19 12h-2v6h-2v-6H9v6H7v-6H5l7-6.16z"
        fill="currentColor"
      />
      <rect x="9" y="14" width="2" height="4" fill="#F2AF18" />
      <rect x="13" y="14" width="2" height="4" fill="#F2AF18" />
    </svg>
  );
};

