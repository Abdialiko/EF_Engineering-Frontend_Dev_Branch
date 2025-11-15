'use client';
import React, { useState, useEffect, useCallback } from "react";
import { FaUniversity, FaProjectDiagram, FaTools, FaCog } from "react-icons/fa";
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
    const iconClass = "text-white text-[28px]";

    if (title.includes("design") && title.includes("interior")) return <FaProjectDiagram className={iconClass} />;
    if (title.includes("design")) return <FaProjectDiagram className={iconClass} />;
    if (title.includes("construction") || title.includes("contracting")) return <FaUniversity className={iconClass} />;
    if (title.includes("renovation")) return <FaTools className={iconClass} />;
    if (title.includes("architecture") || title.includes("building")) return <FaUniversity className={iconClass} />;
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
      <section className="relative bg-gradient-to-br from-white via-[#f8f8f8] to-[#f0f7fa] py-20 md:py-28 overflow-hidden">
        <EngineeringGrid opacity={0.03} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <p className="text-[#2596BE] uppercase tracking-wide font-semibold mb-2">Our Services</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 title-underline inline-block">Explore Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden text-center animate-pulse">
                <div className="w-full h-[300px] bg-gray-300"></div>
                <div className="pt-10 pb-8 px-6">
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
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
      <section className="relative bg-gradient-to-br from-white via-[#f8f8f8] to-[#f0f7fa] py-20 md:py-28 overflow-hidden">
        <EngineeringGrid opacity={0.03} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal variant="up" delay={0}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <RotatingGear size={40} />
              <p className="text-[#2596BE] uppercase tracking-wide font-semibold">Our Services</p>
            </div>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 title-underline inline-block">Explore Our Services</h2>
          </Reveal>
          <Reveal variant="up" delay={200}>
            <p className="text-gray-600 text-lg desc-highlight">No services available at the moment. Please check back later.</p>
          </Reveal>
        </div>
      </section>
    );
  }

  const displayedServices = services.slice(0, 6);

  return (
    <section className="relative bg-gradient-to-br from-white via-[#f8f8f8] to-[#f0f7fa] py-20 md:py-28 overflow-hidden">
      {/* Animated Backgrounds */}
      <EngineeringGrid opacity={0.04} />
      <MotionLines count={6} />
      <FloatingShapes />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal variant="up" delay={0}>
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <RotatingGear size={50} />
              <p className="text-[#2596BE] uppercase tracking-wider font-bold text-sm border border-[#2596BE] px-4 py-2 rounded-full">
                Our Services
              </p>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 title-underline inline-block">
              Explore Our Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-6 desc-highlight">
              Comprehensive engineering and architectural solutions tailored to your project needs
            </p>
        </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedServices.map((service: any, i: number) => (
            <Reveal key={service.id} delay={i * 100} variant="up">
              <div className="group bg-white rounded-xl shadow-lg overflow-hidden text-center transition-all duration-300 flex flex-col h-full mx-auto max-w-sm interactive-card hover:shadow-2xl">
                <div className="relative w-full h-[300px] overflow-hidden">
                <img
                  src={getServiceImageUrl(service)}
                  alt={service.title}
                    loading="eager"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 -mt-12 mb-2 flex justify-center">
                    <div className="bg-gradient-to-br from-[#2596BE] to-[#3ba8d0] group-hover:from-[#F2AF18] group-hover:to-[#f5c547] w-20 h-20 flex items-center justify-center shadow-2xl rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 animate-icon-pulse">
                    {getServiceIcon(service)}
                  </div>
                </div>
              </div>

                <div className="pt-8 pb-8 px-6 flex flex-col justify-between gap-y-6 flex-grow">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2596BE] transition-colors duration-300">
                      {service.title}
                    </h3>
                  <p className="text-gray-600 text-base leading-relaxed line-clamp-3">
                    {createThreeLineDescription(service.description)}
                  </p>
                </div>
                <Link 
                  href={`/services/${service.id}`}
                    className="group/btn relative text-sm font-semibold uppercase tracking-wide text-white bg-gradient-to-r from-[#2596BE] to-[#3ba8d0] hover:from-[#F2AF18] hover:to-[#f5c547] transition-all duration-300 px-6 py-3 rounded-lg hover:shadow-xl overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      READ MORE
                      <span className="group-hover/btn:translate-x-1 transition-transform duration-300">+</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F2AF18] to-[#f5c547] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
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
