'use client'
import React, { useEffect, useState, useRef } from "react";
import { FaPlay, FaUsers, FaRuler, FaCertificate } from "react-icons/fa";
import Reveal from './Reveal';
import { EngineeringGrid, FloatingShapes, MicroParticles, BlueprintLines } from './AnimatedBackgrounds';

const AboutSection = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-br from-[#f8f8f8] via-white to-[#f0f7fa] py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
      {/* Animated Backgrounds */}
      <EngineeringGrid opacity={0.04} />
      <FloatingShapes />
      <MicroParticles count={15} />
      <BlueprintLines />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {/* LEFT SIDE - Images */}
          <Reveal variant="left" delay={0}>
            <div className="relative flex justify-center lg:justify-start items-center">
              <div className="relative h-[400px] sm:h-[480px] md:h-[520px] lg:h-[560px] flex items-center w-full max-w-full">
                <img
                  src="/images/about/3d4.jpg"
                  alt="EF Architect and Engineering Consulting Project"
                  decoding="async"
                  fetchPriority="high"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 380px, 450px"
                  className={`w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[450px] h-[400px] sm:h-[480px] md:h-[520px] lg:h-[560px] object-cover shadow-2xl ml-0 lg:ml-[20px] transition-all duration-1000 ease-out hover:scale-105 rounded-lg will-change-transform ${
                    animate ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                  }`}
                />
                <img
                  src="/images/about/bonga.jpg"
                  alt="EF Architect and Engineering Consulting Team"
                  decoding="async"
                  fetchPriority="low"
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 230px, 270px"
                  className={`absolute right-0 lg:right-[-140px] top-[60px] sm:top-[80px] md:top-[100px] w-[180px] sm:w-[200px] md:w-[230px] lg:w-[270px] h-[220px] sm:h-[260px] md:h-[280px] lg:h-[300px] object-cover shadow-2xl transition-all duration-1000 ease-out hover:scale-105 rounded-lg will-change-transform ${
                    animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                  }`}
                />
                <div className="absolute -bottom-4 right-0 lg:right-[-100px] bg-gradient-to-br from-[#e34b11] via-[#f05a2a] to-[#e34b11] px-6 sm:px-8 py-4 sm:py-6 flex items-center gap-3 sm:gap-4 rounded-lg shadow-xl hover:scale-110 transition-transform duration-300 animate-gradient-shift">
                  <h3 className="text-white text-3xl sm:text-4xl font-extrabold">10</h3>
                  <span className="text-white text-sm sm:text-base font-medium leading-tight">
                    Years Experience
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT SIDE - Text + Cards + Video */}
          <div className="flex flex-col justify-center h-full mt-8 lg:mt-0">
            <Reveal variant="up" delay={100}>
              <div className="flex items-center gap-3 mb-3">
                <FaCertificate className="text-[#05225c] text-xl sm:text-2xl animate-icon-bounce group-hover:scale-110 transition-transform duration-300" />
                <p className="text-[#05225c] font-semibold uppercase tracking-wider mb-0 text-sm sm:text-base">
                  About Us
                </p>
              </div>
            </Reveal>

            <Reveal variant="up" delay={200}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6 title-underline">
                Architectural & Engineering Experts
              </h2>
            </Reveal>

            <Reveal variant="up" delay={300}>
              <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg desc-highlight">
                EF Architect and Engineering Consulting delivers innovative architectural 
                and engineering solutions with precision, expertise, and commitment to excellence.
              </p>
            </Reveal>

            {/* Info Cards + Video */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
              {/* Info Cards */}
              <div className="flex-1 space-y-4 sm:space-y-6 w-full sm:w-auto">
                <Reveal variant="up" delay={400}>
                  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 interactive-card group border-l-4 border-[#05225c]">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-gradient-to-br from-[#05225c] to-[#0a3a8a] p-2 sm:p-3 rounded-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 animate-icon-pulse flex-shrink-0">
                        <FaUsers className="text-white text-lg sm:text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">
                          Certified Professionals
                        </h4>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          Licensed architects and engineers with recognized certifications and extensive industry experience.
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal variant="up" delay={500}>
                  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 interactive-card group border-l-4 border-[#e34b11]">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-gradient-to-br from-[#e34b11] to-[#f05a2a] p-2 sm:p-3 rounded-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 animate-icon-pulse flex-shrink-0">
                        <FaRuler className="text-white text-lg sm:text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">
                          Quality Services
                        </h4>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          Comprehensive architectural design and structural engineering solutions tailored to your needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Video Thumbnail */}
              <Reveal variant="up" delay={600}>
                <div className="w-full sm:w-[200px]">
                  <div className="relative shadow-2xl rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300">
                    <img
                      src="/images/about/commertial_complex_meto.jpg"
                      alt="EF Architect and Engineering Consulting Projects"
                      decoding="async"
                      fetchPriority="low"
                      sizes="(max-width: 640px) 100vw, 200px"
                      className="w-full h-[200px] sm:h-[240px] md:h-[260px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-[#05225c]/80 to-transparent flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-gradient-to-br from-[#e34b11] to-[#f05a2a] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3 shadow-xl hover:scale-110 transition-transform animate-icon-pulse">
                        <FaPlay className="text-white text-xs sm:text-sm ml-1" />
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-center leading-tight">
                        Watch Our <br /> Projects
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-[#05225c]/70 to-transparent flex flex-col items-center justify-center text-white group-hover:opacity-0 transition-opacity duration-300">
                      <div className="bg-gradient-to-br from-[#e34b11] to-[#f05a2a] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3 shadow-xl">
                        <FaPlay className="text-white text-xs sm:text-sm ml-1" />
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-center leading-tight">
                        Watch Our <br /> Projects
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Discover Button */}
            <Reveal variant="up" delay={700}>
              <div className="mt-6 sm:mt-8">
                <button className="group relative bg-gradient-to-r from-[#05225c] to-[#0a3a8a] hover:from-[#e34b11] hover:to-[#f05a2a] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2 sm:gap-3 hover:shadow-2xl hover:scale-105 overflow-hidden text-sm sm:text-base">
                  <span className="relative z-10">DISCOVER MORE</span>
                  <span className="relative z-10 text-lg sm:text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#e34b11] to-[#f05a2a] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
