'use client'
import React, { useEffect, useState, useRef } from "react";
import { FaPlay, FaUsers, FaRuler, FaCertificate } from "react-icons/fa";
import Reveal from './Reveal';
import { EngineeringGrid, FloatingShapes, MicroParticles, BlueprintLines } from './AnimatedBackgrounds';

const AboutSection = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.8) {
          setAnimate(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-br from-[#f8f8f8] via-white to-[#f0f7fa] py-20 md:py-28 overflow-hidden">
      {/* Animated Backgrounds */}
      <EngineeringGrid opacity={0.04} />
      <FloatingShapes />
      <MicroParticles count={15} />
      <BlueprintLines />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* LEFT SIDE - Images */}
          <Reveal variant="left" delay={0}>
          <div className="relative flex justify-start items-center">
            <div className="relative h-[560px] flex items-center">
              <img
                src="/images/about/3d4.jpg"
                alt="EF Architect and Engineering Consulting Project"
                  loading="eager"
                  className={`w-[380px] sm:w-[420px] md:w-[450px] h-[560px] object-cover shadow-2xl ml-[20px] transition-all duration-1000 ease-out hover:scale-105 ${
                  animate ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                }`}
              />
              <img
                src="/images/about/bonga.jpg"
                alt="EF Architect and Engineering Consulting Team"
                  loading="eager"
                  className={`absolute right-[-140px] top-[100px] w-[230px] sm:w-[250px] md:w-[270px] h-[300px] object-cover shadow-2xl transition-all duration-1000 ease-out hover:scale-105 ${
                  animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                }`}
              />
                <div className="absolute -bottom-4 right-[-100px] bg-gradient-to-br from-[#F2AF18] via-[#f5c547] to-[#F2AF18] px-8 py-6 flex items-center gap-4 rounded-lg shadow-xl hover:scale-110 transition-transform duration-300 animate-gradient-shift">
                <h3 className="text-white text-4xl font-extrabold">10</h3>
                <span className="text-white text-base font-medium leading-tight">
                  Years Experience
                </span>
              </div>
            </div>
          </div>
          </Reveal>

          {/* RIGHT SIDE - Text + Cards + Video */}
          <div className="flex flex-col justify-center h-full">
            <Reveal variant="up" delay={100}>
              <div className="flex items-center gap-3 mb-3">
                <FaCertificate className="text-[#2596BE] text-2xl animate-icon-bounce" />
                <p className="text-[#2596BE] font-semibold uppercase tracking-wider mb-0">
              About Us
            </p>
              </div>
            </Reveal>

            <Reveal variant="up" delay={200}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 title-underline">
              Architectural & Engineering Experts
            </h2>
            </Reveal>

            <Reveal variant="up" delay={300}>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg desc-highlight">
              EF Architect and Engineering Consulting delivers innovative architectural 
                and engineering solutions with precision, expertise, and commitment to excellence.
            </p>
            </Reveal>

            {/* Info Cards + Video */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Info Cards */}
              <div className="flex-1 space-y-6">
                <Reveal variant="up" delay={400}>
                  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 interactive-card group border-l-4 border-[#2596BE]">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-[#2596BE] to-[#3ba8d0] p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <FaUsers className="text-white text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">
                    Certified Professionals
                  </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Licensed architects and engineers with recognized certifications and extensive industry experience.
                  </p>
                </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal variant="up" delay={500}>
                  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 interactive-card group border-l-4 border-[#F2AF18]">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-[#F2AF18] to-[#f5c547] p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <FaRuler className="text-white text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">
                    Quality Services
                  </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
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
                      loading="eager"
                    className="w-full h-[260px] object-cover"
                  />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-[#2596BE]/80 to-transparent flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-gradient-to-br from-[#F2AF18] to-[#f5c547] w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-xl hover:scale-110 transition-transform animate-icon-pulse">
                      <FaPlay className="text-white text-sm ml-1" />
                    </div>
                    <div className="text-sm font-semibold text-center leading-tight">
                      Watch Our <br /> Projects
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-[#2596BE]/70 to-transparent flex flex-col items-center justify-center text-white group-hover:opacity-0 transition-opacity duration-300">
                      <div className="bg-gradient-to-br from-[#F2AF18] to-[#f5c547] w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-xl">
                        <FaPlay className="text-white text-sm ml-1" />
                      </div>
                      <div className="text-sm font-semibold text-center leading-tight">
                        Watch Our <br /> Projects
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Discover Button */}
            <Reveal variant="up" delay={700}>
              <div className="mt-8">
                <button className="group relative bg-gradient-to-r from-[#2596BE] to-[#3ba8d0] hover:from-[#F2AF18] hover:to-[#f5c547] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-3 hover:shadow-2xl hover:scale-105 overflow-hidden">
                  <span className="relative z-10">DISCOVER MORE</span>
                  <span className="relative z-10 text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F2AF18] to-[#f5c547] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
