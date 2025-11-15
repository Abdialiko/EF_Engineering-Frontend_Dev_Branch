'use client';
import React, { useState, useEffect } from 'react';
import apiCall from '../url';
import { FaArrowLeft, FaArrowRight, FaBuilding } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import Reveal from './Reveal';
import { EngineeringGrid, MotionLines, BlueprintLines, BuildingIcon } from './AnimatedBackgrounds';

interface Project {
  id: number;
  title: string;
  category?: string;
  year?: string | number;
  description?: string;
  short_description?: string;
  image_url?: string;
  image?: string;
  photos?: Array<string | { path?: string; url?: string; src?: string }>;
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const getProjectImageUrl = (project: Project) => {
    if (project.photos && project.photos.length > 0) {
      const first = project.photos[0];
      if (typeof first === 'string') return first;
      return first?.path || first?.url || first?.src || '';
    }
    return project.image_url || project.image || '/placeholder.jpg';
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await apiCall.get<Project[]>('projects');
        if (response.status === 200 && Array.isArray(response.data)) {
          setProjects(response.data);
        } else setError(true);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const scrollContainer = (dir: 'left' | 'right') => {
    const container = document.getElementById('projects-scroll');
    if (container) {
      container.scrollBy({
        left: dir === 'left' ? -400 : 400,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return (
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#f8f8f8] via-white to-[#f0f7fa] overflow-hidden">
        <EngineeringGrid opacity={0.03} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <p className="text-lg text-gray-500">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error || projects.length === 0) {
    return (
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#f8f8f8] via-white to-[#f0f7fa] overflow-hidden">
        <EngineeringGrid opacity={0.03} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <p className="text-lg text-gray-500">No projects found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#f8f8f8] via-white to-[#f0f7fa] overflow-hidden">
      {/* Animated Backgrounds */}
      <EngineeringGrid opacity={0.04} />
      <MotionLines count={5} />
      <BlueprintLines />

      {/* Header */}
      <Reveal variant="up" delay={0}>
        <div className="text-center mb-12 md:mb-16 relative z-10">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <BuildingIcon size={40} className="sm:w-[50px] sm:h-[50px]" />
            <p className="uppercase text-xs sm:text-sm text-[#05225c] font-bold tracking-[0.3em] border border-[#05225c] px-3 sm:px-4 py-1 sm:py-2 rounded-full">
              OUR PROJECT
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-3 sm:mb-4 title-underline inline-block px-4">
            BUILDING LANDMARKS THAT INSPIRE
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mt-4 sm:mt-6 desc-highlight px-4">
            Showcasing our portfolio of innovative engineering and architectural achievements
          </p>
      </div>
      </Reveal>

      {/* Left Controls */}
      <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 flex-col items-center space-y-6 lg:space-y-8 pl-2 lg:pl-4 z-20">
        <button
          onClick={() => scrollContainer('left')}
          className="p-2 sm:p-3 bg-white rounded-full shadow-lg hover:bg-[#05225c] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
        >
          <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-[-2px] transition-transform duration-300" />
        </button>
        <div className="rotate-[-90deg] tracking-widest text-[#05225c] text-xs font-bold">
          07 / {projects.length.toString().padStart(2, '0')}
        </div>
        <p className="rotate-[-90deg] text-[10px] tracking-[0.2em] uppercase text-gray-400">
          All Projects
        </p>
        <button
          onClick={() => scrollContainer('right')}
          className="p-2 sm:p-3 bg-gradient-to-br from-[#05225c] to-[#0a3a8a] text-white rounded-full shadow-lg hover:from-[#e34b11] hover:to-[#f05a2a] transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
        >
          <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-[2px] transition-transform duration-300" />
        </button>
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden flex justify-center gap-4 mb-6 relative z-20">
        <button
          onClick={() => scrollContainer('left')}
          className="p-3 bg-white rounded-full shadow-lg hover:bg-[#05225c] hover:text-white transition-all duration-300 hover:scale-110 group"
        >
          <FaArrowLeft className="w-5 h-5 group-hover:translate-x-[-2px] transition-transform duration-300" />
        </button>
        <button
          onClick={() => scrollContainer('right')}
          className="p-3 bg-gradient-to-br from-[#05225c] to-[#0a3a8a] text-white rounded-full shadow-lg hover:from-[#e34b11] hover:to-[#f05a2a] transition-all duration-300 hover:scale-110 group"
        >
          <FaArrowRight className="w-5 h-5 group-hover:translate-x-[2px] transition-transform duration-300" />
        </button>
      </div>

      {/* Scrollable Project List */}
      <div
        id="projects-scroll"
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pl-4 sm:pl-8 md:pl-20 lg:pl-32 pr-4 sm:pr-8 md:pr-20 transition-all"
      >
        {projects.slice(0, 7).map((project, index) => (
          <Reveal key={project.id} delay={index * 100} variant="up">
          <div
            onMouseEnter={() => setActive(project.id)}
            onMouseLeave={() => setActive(null)}
              className={`relative flex-shrink-0 cursor-pointer transition-all duration-700 ease-in-out rounded-xl overflow-hidden group ${
                active === project.id
                  ? 'w-[90vw] sm:w-[500px] md:w-[600px] lg:w-[700px] shadow-2xl'
                  : 'w-[180px] sm:w-[200px] md:w-[220px] lg:w-[250px] shadow-lg'
              }`}
          >
            {/* Project Image */}
            <img
                src={getProjectImageUrl(project)}
                alt={project.title || 'Project'}
                decoding="async"
                fetchPriority={index < 2 ? "high" : "low"}
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 500px, (max-width: 1024px) 600px, 700px"
                className={`w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover transition-transform duration-700 will-change-transform ${
                  active === project.id ? 'scale-110' : 'scale-100'
                }`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.jpg';
              }}
            />

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${
                active === project.id ? 'opacity-100' : 'opacity-60'
              }`}></div>

            {/* Hover Overlay */}
            {active === project.id && (
              <>
                  {/* Top-right icon */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white p-2 sm:p-3 rounded-full shadow-xl hover:bg-gradient-to-br hover:from-[#e34b11] hover:to-[#f05a2a] hover:text-white transition-all duration-300 hover:scale-110 group/icon animate-icon-bounce">
                    <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover/icon:rotate-45 transition-transform duration-300" />
                  </div>

                  {/* Bottom white info card */}
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-sm p-4 sm:p-6 pr-6 sm:pr-10 shadow-2xl rounded-lg max-w-[85%] sm:max-w-md animate-slide-in-left">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                      {project.title || 'Untitled Project'}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                      {project.category || 'development'} – {project.year || '2024'}
                    </p>
                    <div className="w-10 sm:w-12 h-1 bg-gradient-to-r from-[#05225c] to-[#e34b11] rounded-full"></div>
                  </div>
                </>
              )}

              {/* Inactive State Info */}
              {active !== project.id && (
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-sm font-semibold truncate drop-shadow-lg">
                    {project.title || 'Untitled Project'}
                  </h3>
                </div>
            )}
          </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
