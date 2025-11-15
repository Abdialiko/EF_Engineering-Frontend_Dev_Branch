"use client";
import React, { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { FaHandshake, FaEnvelope, FaCog } from 'react-icons/fa';
import Link from 'next/link';
import { EngineeringGrid, MotionLines, RotatingGear } from './AnimatedBackgrounds';

type Client = {
  id: number | string;
  name?: string;
  title?: string;
  logo?: string;
  logo_url?: string;
  category?: string;
};

const formatImageUrl = (imagePath?: string) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/api/')) return `https://api.efengineering-architect.com${imagePath}`;
  if (imagePath.startsWith('/')) return `https://api.efengineering-architect.com${imagePath}`;
  return `https://api.efengineering-architect.com/api/${imagePath}`;
};

const ClientsSection = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const autoScrollId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://api.efengineering-architect.com/api/clients', { cache: 'no-store' });
        if (res.ok) {
          const data: Client[] = await res.json();
          const onlyClients = (data || []).filter((c) => (c.category || '').toLowerCase() === 'client');
          setClients(onlyClients.length ? onlyClients : data || []);
        }
      } catch (e) {
        console.error('Failed fetching clients', e);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollId.current = setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const next = el.scrollLeft + 2;
      el.scrollLeft = next >= el.scrollWidth - el.clientWidth ? 0 : next;
    }, 20);
  };

  const stopAutoScroll = () => {
    if (autoScrollId.current) {
      clearInterval(autoScrollId.current);
      autoScrollId.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll;
  }, [clients.length]);

  const updateActiveOnScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const centerX = el.getBoundingClientRect().left + el.clientWidth / 2;
    const children = Array.from(el.querySelectorAll('[data-client-item="1"]')) as HTMLElement[];
    let minDist = Number.MAX_VALUE;
    let idx = 0;
    children.forEach((child, i) => {
      const rect = child.getBoundingClientRect();
      const childCenter = rect.left + rect.width / 2;
      const dist = Math.abs(centerX - childCenter);
      if (dist < minDist) {
        minDist = dist;
        idx = i;
      }
    });
    setActiveIdx(idx);
  };

  const scrollByAmount = (amount: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const items = clients.length ? clients : [];

  const relatedContent = [
    {
      title: "Become a Partner",
      description: "Join our network of trusted partners",
      icon: <FaHandshake className="text-white text-2xl animate-icon-rotate" />,
      link: "/partner",
      color: "from-[#e34b11] to-[#f05a2a]"
    },
    {
      title: "Contact Us",
      description: "Get in touch with our team",
      icon: <FaEnvelope className="text-white text-2xl animate-icon-bounce" />,
      link: "/contact",
      color: "from-[#e34b11] to-[#f05a2a]"
    }
  ];

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-white via-[#f5f5f5] to-[#f0f0f0] overflow-hidden">
      <EngineeringGrid opacity={0.03} />
      <MotionLines count={4} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-full">
        <Reveal variant="up" delay={0}>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <RotatingGear size={50} />
              <p className="text-[#05225c] uppercase tracking-wider font-bold text-xs sm:text-sm border border-[#05225c] px-3 sm:px-4 py-1 sm:py-2 rounded-full">
                Our Clients
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 title-underline inline-block">
              Trusted Partners
            </h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto mt-4 desc-highlight">
              We're proud to work with leading organizations and deliver exceptional results that exceed expectations.
            </p>
          </div>
        </Reveal>

        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => scrollByAmount(-300)} 
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white shadow-lg hover:bg-[#05225c] hover:text-white transition-all duration-300 hover-glow rounded-full group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">‹</span>
            </button>
            <button 
              onClick={() => scrollByAmount(300)} 
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gradient-to-r from-[#05225c] to-[#0a3a8a] text-white shadow-lg hover:from-[#e34b11] hover:to-[#f05a2a] transition-all duration-300 hover-glow rounded-full group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">»</span>
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          onScroll={updateActiveOnScroll}
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
          className="relative overflow-x-auto scrollbar-hide"
        >
          <div className="flex items-center gap-12 md:gap-16 py-8">
            {(loading ? Array.from({ length: 12 }) : items).map((item: any, idx: number) => {
              const src = item ? formatImageUrl(item.logo_url || item.logo) : '';
              const name = item ? (item.name || item.title || 'Client') : 'Client';
              const isActive = idx === activeIdx;
              return (
                <Reveal key={item?.id ?? idx} delay={idx * 50} variant="up">
                  <div 
                    data-client-item="1" 
                    className={`flex-none transition-all duration-500 ${
                      isActive ? 'scale-110 opacity-100' : 'scale-90 opacity-40 grayscale'
                    }`}
                  >
                    <div className="h-[80px] w-[160px] md:w-[200px] flex items-center justify-center bg-white rounded-lg shadow-md hover:shadow-xl p-4 hover-tilt transition-all duration-300 border border-gray-100 hover:border-[#e34b11]/30 interactive-card">
                      {src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={src} 
                          alt={name}
                          decoding="async"
                          fetchPriority="low"
                          sizes="(max-width: 768px) 160px, 200px"
                          className="max-h-[60px] w-auto object-contain filter transition-all duration-300"
                          onError={(e:any)=>{(e.target as HTMLImageElement).src='/images/logo/newlogo.png'}} 
                        />
                      ) : (
                        <div className="text-gray-400 text-sm">{name}</div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Related Content Cards */}
        <Reveal variant="up" delay={600}>
          <div className="mt-16 md:mt-20">
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 text-center title-underline inline-block">
              Get Involved
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {relatedContent.map((item, index) => (
                <Link key={index} href={item.link}>
                  <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden interactive-card border border-gray-100 hover:border-[#e34b11]/30">
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} transition-all duration-500`}></div>
                    <div className="p-6 relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                        {item.icon}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#e34b11] transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 text-[#05225c] font-semibold text-xs sm:text-sm uppercase tracking-wide group-hover:gap-4 transition-all duration-300">
                        Explore
                        <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                      </div>
                    </div>
                    <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.color} transition-all duration-500 w-0 group-hover:w-full`}></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ClientsSection;
