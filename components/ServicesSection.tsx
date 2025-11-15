'use client';
import React, { useState, useEffect, useCallback } from "react";
import { FaUniversity, FaProjectDiagram, FaTools, FaCog, FaBuilding, FaHammer, FaPaintBrush } from "react-icons/fa";
import apiCall from '../url';
import Link from 'next/link';
import Reveal from './Reveal';
import { EngineeringGrid, MotionLines, FloatingShapes, RotatingGear } from './AnimatedBackgrounds';

const ServicesSection = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getServiceImageUrl = useCallback((service: any) => {
    if (service.image_url) return service.image_url;
    if (service.image) return service.image;
    if (service.photo) return service.photo;
    if (service.photos?.length) return service.photos[0];
    if (service.image_urls?.length) return service.image_urls[0];
    return '/images/services/default.jpg';
  }, []);

  const getServiceIcon = useCallback((service: any) => {
    const title = (service.title || "").toLowerCase();
    const iconClass = "text-white text-xl sm:text-2xl md:text-[28px] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6";

    if (title.includes("design") && title.includes("interior")) return <FaPaintBrush className={iconClass} />;
    if (title.includes("design")) return <FaProjectDiagram className={iconClass} />;
    if (title.includes("construction") || title.includes("contracting")) return <FaHammer className={iconClass} />;
    if (title.includes("renovation")) return <FaTools className={iconClass} />;
    if (title.includes("architecture") || title.includes("building")) return <FaBuilding className={iconClass} />;
    if (title.includes("engineering")) return <FaCog className={iconClass} />;
    return <FaUniversity className={iconClass} />;
  }, []);

  const createThreeLineDescription = (description: string) => {
    if (!description) return "Professional service tailored to your specific needs.";
    const stripped = description.replace(/<[^>]*>/g, '');
    return stripped.length <= 100 ? stripped : stripped.substring(0, 100) + '...';
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await apiCall.get("services");
        if (response.status === 200) {
          setServices(response.data as any[]);
        } else {
          setError(true);
        }
      } catch (err: any) {
        console.error("Error fetching services:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="relative bg-gradient-to-br from-white via-[#f8f8f8] to-[#f0f7fa] py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
        <EngineeringGrid opacity={0.03} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#05225c] uppercase tracking-wide font-semibold mb-2 text-sm sm:text-base">Our Services</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 title-underline inline-block">Explore Our Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden text-center animate-pulse">
                <div className="w-full h-[250px] sm:h-[280px] md:h-[300px] bg-gray-300"></div>
                <div className="pt-8 sm:pt-10 pb-6 sm:pb-8 px-4 sm:px-6">
                  <div className="h-5 sm:h-6 bg-gray-300 rounded mb-3 sm:mb-4"></div>
                  <div className="h-3 sm:h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-8 sm:h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || services.length === 0) {
    return (
      <section className="relative bg-gradient-to-br from-white via-[#f8f8f8] to-[#f0f7fa] py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
        <EngineeringGrid opacity={0.03} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal variant="up" delay={0}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <RotatingGear size={40} />
              <p className="text-[#05225c] uppercase tracking-wide font-semibold text-sm sm:text-base">Our Services</p>
            </div>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 title-underline inline-block">Explore Our Services</h2>
          </Reveal>
          <Reveal variant="up" delay={200}>
            <p className="text-gray-600 text-base sm:text-lg desc-highlight">No services available at the moment. Please check back later.</p>
          </Reveal>
        </div>
      </section>
    );
  }

  const displayedServices = services.slice(0, 6);

  return (
    <section className="relative bg-gradient-to-br from-white via-[#f8f8f8] to-[#f0f7fa] py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
      {/* Animated Backgrounds */}
      <EngineeringGrid opacity={0.04} />
      <MotionLines count={6} />
      <FloatingShapes />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal variant="up" delay={0}>
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <RotatingGear size={40} className="sm:w-[50px] sm:h-[50px]" />
              <p className="text-[#05225c] uppercase tracking-wider font-bold text-xs sm:text-sm border border-[#05225c] px-3 sm:px-4 py-1 sm:py-2 rounded-full">
                Our Services
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-3 sm:mb-4 title-underline inline-block">
              Explore Our Services
            </h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mt-4 sm:mt-6 desc-highlight px-4">
              Comprehensive engineering and architectural solutions tailored to your project needs
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {displayedServices.map((service: any, i: number) => (
            <Reveal key={service.id} delay={i * 100} variant="up">
              <div className="group bg-white rounded-xl shadow-lg overflow-hidden text-center transition-all duration-300 flex flex-col h-full mx-auto max-w-sm interactive-card hover:shadow-2xl">
                <div className="relative w-full h-[250px] sm:h-[280px] md:h-[300px] overflow-hidden">
                  <img
                    src={getServiceImageUrl(service)}
                    alt={service.title}
                    decoding="async"
                    fetchPriority={i < 3 ? "high" : "low"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 -mt-10 sm:-mt-12 mb-2 flex justify-center">
                    <div className="bg-gradient-to-br from-[#05225c] to-[#0a3a8a] group-hover:from-[#e34b11] group-hover:to-[#f05a2a] w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shadow-2xl rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 animate-icon-pulse">
                      {getServiceIcon(service)}
                    </div>
                  </div>
                </div>

                <div className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6 flex flex-col justify-between gap-y-4 sm:gap-y-6 flex-grow">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#05225c] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                      {createThreeLineDescription(service.description)}
                    </p>
                  </div>
                  <Link 
                    href={`/services/${service.id}`}
                    className="group/btn relative text-xs sm:text-sm font-semibold uppercase tracking-wide text-white bg-gradient-to-r from-[#05225c] to-[#0a3a8a] hover:from-[#e34b11] hover:to-[#f05a2a] transition-all duration-300 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:shadow-xl overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      READ MORE
                      <span className="group-hover/btn:translate-x-1 transition-transform duration-300">+</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#e34b11] to-[#f05a2a] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
