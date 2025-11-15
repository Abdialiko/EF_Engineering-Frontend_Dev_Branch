"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCalendar, FaComment, FaArrowRight, FaNewspaper } from 'react-icons/fa';
import Reveal from './Reveal';
import { EngineeringGrid, FloatingShapes } from './AnimatedBackgrounds';

type NewsPhoto = { path: string };
type NewsItem = {
  id: number;
  title: string;
  created_at?: string;
  image?: string;
  photos?: NewsPhoto[];
  category?: string;
  short_description?: string;
  description?: string;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
};

const NewsSection = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://api.efengineering-architect.com/api/news', {
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
        });
        if (res.ok) {
          const data: NewsItem[] = await res.json();
          setItems(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error('Failed to fetch news', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const three = (items || []).slice(0, 3);

  const stripHtml = (html?: string) => {
    if (!html) return '';
    let text = html
      .replace(/<!--\[if [\s\S]*?<!\[endif\]-->/gi, '')
      .replace(/<!--[^>]*-->/g, '');
    text = text.replace(/<[^>]+>/g, ' ');
    text = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
    return text.replace(/\s+/g, ' ').trim();
  };

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-br from-white via-[#f8f8f8] to-[#f0f7fa] overflow-hidden">
      <EngineeringGrid opacity={0.03} />
      <FloatingShapes />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal variant="up" delay={0}>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FaNewspaper className="text-[#2596BE] text-xl animate-icon-bounce" />
                <p className="text-[#2596BE] tracking-[.2em] text-xs font-bold uppercase">News & Blog</p>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 uppercase title-underline inline-block">
                Latest News & Articles
              </h2>
            </div>
            <Link href="/news">
              <button className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-gradient-to-r from-[#2596BE] to-[#3ba8d0] hover:from-[#F2AF18] hover:to-[#f5c547] text-white px-6 py-3 font-semibold uppercase tracking-wide rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                View All News
                <FaArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loading && (
            <div className="col-span-3 text-center py-10 text-gray-500">
              <div className="spinner w-12 h-12 mx-auto"></div>
              <p className="mt-4">Loading news...</p>
            </div>
          )}

          {!loading && three.map((news, index) => {
            const imageSrc = news.photos && news.photos.length > 0 
              ? news.photos[0].path 
              : (news.image || '/images/hero/home.jpg');
            const raw = news.short_description || news.description || '';
            const excerpt = stripHtml(raw);

            return (
              <Reveal key={news.id} variant="up" delay={index * 100}>
                <div
                  className="bg-white shadow-lg rounded-xl overflow-hidden h-full flex flex-col group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 interactive-card"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative h-[220px] md:h-[240px] overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={news.title}
                      loading="eager"
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        hoveredIndex === index ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {news.category && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-[#F2AF18] to-[#f5c547] text-[#2596BE] px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                        {news.category}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-extrabold text-gray-900 leading-snug mb-4 group-hover:text-[#2596BE] transition-colors">
                      {news.title}
                    </h3>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <FaCalendar className="w-4 h-4" />
                        {formatDate(news.created_at)}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaComment className="w-4 h-4" />
                        19 Comments
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-6 mb-5 line-clamp-2 flex-grow">
                      {excerpt}
                    </p>
                    
                    <Link href={`/news/${news.id}`}>
                      <div className="inline-flex items-center gap-2 text-[#2596BE] hover:text-[#F2AF18] font-semibold uppercase text-sm group/link transition-all duration-300">
                        Read More
                        <FaArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                          hoveredIndex === index ? 'translate-x-2' : ''
                        }`} />
                      </div>
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
