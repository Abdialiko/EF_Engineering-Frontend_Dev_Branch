'use client';
import Image from 'next/image';
import React from 'react';
import { FaShieldAlt, FaAward, FaUsers, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import Reveal from './Reveal';
import Link from 'next/link';
import { EngineeringGrid, FloatingShapes, MicroParticles } from './AnimatedBackgrounds';

const FeatureItem = ({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) => {
  return (
    <Reveal variant="up" delay={delay}>
      <div className="flex gap-4 py-6 border-t border-white/10 first:border-t-0 group hover:translate-x-3 transition-all duration-300 interactive-card">
        <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#F2AF18] to-[#f5c547] rounded-xl flex-shrink-0 group-hover:bg-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg animate-icon-pulse">
          <div className="text-[#2596BE] group-hover:text-[#2596BE]">
        {icon}
          </div>
      </div>
      <div className="flex-1">
          <h4 className="text-white text-xl font-extrabold tracking-wide mb-2 group-hover:text-[#F2AF18] transition-colors duration-300">
            {title}
          </h4>
          <p className="text-white/70 text-[15px] leading-6">
            {description}
          </p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaCheckCircle className="text-[#F2AF18] text-xl" />
        </div>
      </div>
    </Reveal>
  );
};

const WhyChooseUsSection = () => {
  return (
    <section className="relative py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden bg-gradient-to-br from-[#f8f8f8] via-white to-[#f0f7fa]">
      <EngineeringGrid opacity={0.03} />
      <FloatingShapes />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl lg:rounded-2xl shadow-2xl">
        {/* Left image */}
          <Reveal variant="left" delay={0}>
            <div className="relative min-h-[520px] h-full overflow-hidden group hover:scale-105 transition-transform duration-500">
          <Image
                src="/images/hero/1.jpg"
            alt="Construction site with engineers"
            fill
            priority
                loading="eager"
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2596BE]/30 via-[#2596BE]/10 to-transparent"></div>
              <div className="absolute inset-0 bg-[#F2AF18]/0 group-hover:bg-[#F2AF18]/10 transition-colors duration-300"></div>
        </div>
          </Reveal>

        {/* Right content */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-[#1e7a9a] px-6 md:px-10 lg:px-12 py-12 md:py-16 flex flex-col justify-center relative overflow-hidden">
            {/* Animated Backgrounds */}
            <MicroParticles count={20} />
            
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F2AF18] rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2596BE] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10">
          <Reveal variant="up" delay={0}>
                <div className="flex items-center gap-3 mb-3">
                  <FaCheckCircle className="text-[#F2AF18] text-xl animate-icon-bounce" />
                  <p className="text-[#F2AF18] text-sm uppercase tracking-wider font-semibold">
                    What's Reasons
                  </p>
                </div>
          </Reveal>
              
              <Reveal variant="up" delay={100}>
                <h2 className="text-white text-4xl md:text-5xl lg:text-6xl leading-tight font-extrabold mb-6">
                  Why <span className="text-[#F2AF18] relative inline-block">
                    Choose Us
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#F2AF18] to-[#f5c547] animate-line-expand"></span>
                  </span>
                </h2>
          </Reveal>
          
              <Reveal variant="up" delay={200}>
                <p className="text-white/80 mb-10 max-w-2xl text-base leading-7 desc-highlight">
                  At EF Engineering, we believe construction is more than just building — it's about
              creating spaces that inspire and endure. With years of expertise, a skilled team,
                  and a passion for precision, we deliver exceptional results.
            </p>
          </Reveal>

              <div className="space-y-2">
            <FeatureItem
                  icon={<FaShieldAlt className="w-8 h-8" />}
              title="Expert & Professional"
                  description="Our team consists of certified professionals with extensive experience in architectural design and engineering solutions."
                  delay={300}
            />

            <FeatureItem
                  icon={<FaAward className="w-8 h-8" />}
              title="High Quality Work"
                  description="We maintain the highest standards in every project, ensuring quality craftsmanship and attention to detail."
                  delay={400}
            />

            <FeatureItem
                  icon={<FaUsers className="w-8 h-8" />}
              title="Professional Approach"
                  description="We combine technical expertise with practical field experience to deliver comprehensive engineering solutions."
                  delay={500}
            />
          </div>

              <Reveal variant="up" delay={600}>
                <div className="mt-10">
                  <Link
              href="#contact"
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#F2AF18] to-[#f5c547] hover:from-[#2596BE] hover:to-[#3ba8d0] text-[#2596BE] hover:text-white px-8 py-4 font-bold uppercase tracking-wide rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
                    <span className="relative z-10">Learn More</span>
                    <FaArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2596BE] to-[#3ba8d0] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
