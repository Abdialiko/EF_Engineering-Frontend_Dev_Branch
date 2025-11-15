'use client';
import React from 'react';
import Reveal from './Reveal';
import { FaArrowRight, FaEnvelope } from 'react-icons/fa';
import { EngineeringGrid, FloatingShapes } from './AnimatedBackgrounds';

const ContactSection = () => {
  return (
    <section id="contact" className="py-0 relative">
      {/* half background behind the section */}
      <div className="absolute inset-x-0 top-0" style={{height: '50%', background: '#f5f5f5', zIndex: 0}}></div>
      <div className="relative container mx-auto px-0 md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left - CTA panel */}
          <div className="relative bg-gradient-to-br from-[#05225c] via-[#0a3a8a] to-[#05225c] px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16 text-white overflow-hidden">
            <FloatingShapes />
            <div className="relative z-10">
              <Reveal delay={0} variant="up">
                <div className="flex items-center gap-3 mb-4">
                  <FaEnvelope className="text-[#e34b11] text-xl animate-icon-bounce" />
                  <div className="text-[12px] tracking-[.2em] font-semibold uppercase">Start Today!</div>
                </div>
              </Reveal>
              <Reveal delay={120} variant="up">
                <h2 className="text-[34px] md:text-[42px] font-extrabold leading-tight mb-5">Join Us Today</h2>
              </Reveal>
              <Reveal delay={240} variant="up">
                <p className="max-w-md text-white/90 mb-8 desc-highlight">
                  After more than twenty success in the wood products industry, the Bilder family founded.
                </p>
              </Reveal>
              <Reveal delay={360} variant="up">
                <a href="/contact" className="group inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[#e34b11] to-[#f05a2a] hover:from-[#05225c] hover:to-[#0a3a8a] text-white hover:text-white px-6 sm:px-8 py-3 sm:py-4 uppercase font-semibold tracking-wide transition-all duration-300 hover:shadow-2xl hover:scale-105 rounded-lg overflow-hidden text-sm sm:text-base">
                  <span className="relative z-10">Free Quote</span>
                  <FaArrowRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#05225c] to-[#0a3a8a] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </Reveal>
            </div>
          </div>

          {/* Right - Image side */}
          <div className="relative min-h-[340px] md:min-h-[460px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero/house.jpg" alt="contact visual" className="absolute inset-0 w-full h-full object-cover z-[1]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
