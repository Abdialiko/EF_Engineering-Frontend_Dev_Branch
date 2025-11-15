'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FaAward, FaUsers, FaBuilding, FaSmile } from 'react-icons/fa';
import Reveal from './Reveal';
import { EngineeringGrid, FloatingShapes, MicroParticles } from './AnimatedBackgrounds';

const StatsSection = () => {
  const stats = [
    { value: 10, label: 'Years of Experience', icon: FaAward, suffix: '+' },
    { value: 39, label: 'Experienced Specialists', icon: FaUsers, suffix: '+' },
    { value: 27, label: 'Successful Projects', icon: FaBuilding, suffix: '+' },
    { value: 210, label: 'Happy Customers', icon: FaSmile, suffix: '+' },
  ];

  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const ref = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const sectionTop = ref.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75 && !hasScrolled) {
          setHasScrolled(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  useEffect(() => {
    if (hasScrolled) {
      stats.forEach((stat, index) => {
        const duration = 2000;
        const steps = 60;
        const increment = duration / steps;
        const stepValue = stat.value / steps;

        let current = 0;
        const timer = setInterval(() => {
          current += stepValue;
          if (current >= stat.value) {
            setCounters(prev => {
              const newCounters = [...prev];
              newCounters[index] = stat.value;
              return newCounters;
            });
            clearInterval(timer);
          } else {
            setCounters(prev => {
              const newCounters = [...prev];
              newCounters[index] = Math.floor(current);
              return newCounters;
            });
          }
        }, increment);
      });
    }
  }, [hasScrolled]);

  return (
    <section ref={ref} className="relative bg-gradient-to-br from-[#2596BE] via-[#1e7a9a] to-[#2596BE] py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden">
      {/* Animated Backgrounds */}
      <EngineeringGrid opacity={0.05} />
      <FloatingShapes />
      <MicroParticles count={25} />

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F2AF18] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F2AF18] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2596BE] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Reveal key={index} variant="scale" delay={index * 100}>
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center border-2 border-white/20 hover:bg-white/20 transition-all duration-300 group relative overflow-hidden interactive-card hover:scale-105 hover:-translate-y-2">
                  {/* Accent glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F2AF18]/0 via-[#F2AF18]/0 to-[#F2AF18]/0 group-hover:from-[#F2AF18]/30 group-hover:via-[#F2AF18]/15 group-hover:to-[#F2AF18]/30 transition-all duration-500 rounded-2xl"></div>
                  
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#F2AF18] to-[#f5c547] rounded-full mb-6 relative z-10 shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-icon-pulse">
                    <Icon className="w-10 h-10 text-[#2596BE]" />
                  </div>
                  
                  {/* Counter */}
                  <div className={`text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-3 relative z-10 transition-all duration-500 ${
                    hasScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`} style={{ transitionDelay: `${index * 100}ms` }}>
                    {counters[index]}{stat.suffix}
              </div>

                  {/* Label */}
                  <div className="text-white/90 font-semibold uppercase tracking-wide text-sm md:text-base relative z-10">
                    {stat.label}
                </div>

                  {/* Decorative line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-[#F2AF18] to-[#f5c547] group-hover:w-20 transition-all duration-500 rounded-full"></div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
