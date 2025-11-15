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
          <div className="flex items-center justify-center gap-3 mb-4">
            <BuildingIcon size={50} />
            <p className="uppercase text-xs text-[#2596BE] font-bold tracking-[0.3em] border border-[#2596BE] px-4 py-2 rounded-full">
          OUR PROJECT
        </p>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4 title-underline inline-block">
          BUILDING LANDMARKS THAT INSPIRE
        </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-6 desc-highlight">
            Showcasing our portfolio of innovative engineering and architectural achievements
          </p>
      </div>
      </Reveal>

      {/* Left Controls */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-8 pl-4 z-20">
        <button
          onClick={() => scrollContainer('left')}
          className="p-3 bg-white rounded-full shadow-lg hover:bg-[#2596BE] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
        >
          <FaArrowLeft className="w-5 h-5 group-hover:translate-x-[-2px] transition-transform duration-300" />
        </button>
        <div className="rotate-[-90deg] tracking-widest text-[#2596BE] text-xs font-bold">
          07 / {projects.length.toString().padStart(2, '0')}
        </div>
        <p className="rotate-[-90deg] text-[10px] tracking-[0.2em] uppercase text-gray-400">
          All Projects
        </p>
        <button
          onClick={() => scrollContainer('right')}
          className="p-3 bg-gradient-to-br from-[#2596BE] to-[#3ba8d0] text-white rounded-full shadow-lg hover:from-[#F2AF18] hover:to-[#f5c547] transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
        >
          <FaArrowRight className="w-5 h-5 group-hover:translate-x-[2px] transition-transform duration-300" />
        </button>
      </div>

      {/* Scrollable Project List */}
      <div
        id="projects-scroll"
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pl-8 md:pl-20 lg:pl-32 pr-8 md:pr-20 transition-all"
      >
        {projects.slice(0, 7).map((project, index) => (
          <Reveal key={project.id} delay={index * 100} variant="up">
          <div
            onMouseEnter={() => setActive(project.id)}
            onMouseLeave={() => setActive(null)}
              className={`relative flex-shrink-0 cursor-pointer transition-all duration-700 ease-in-out rounded-xl overflow-hidden group ${
              active === project.id
                  ? 'w-[600px] md:w-[700px] shadow-2xl'
                  : 'w-[200px] md:w-[250px] shadow-lg'
            }`}
          >
            {/* Project Image */}
            <img
              src={getProjectImageUrl(project)}
              alt={project.title || 'Project'}
                loading="eager"
              className={`w-full h-[500px] object-cover transition-transform duration-700 ${
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
                  <div className="absolute top-6 right-6 bg-white p-3 rounded-full shadow-xl hover:bg-gradient-to-br hover:from-[#F2AF18] hover:to-[#f5c547] hover:text-white transition-all duration-300 hover:scale-110 group/icon">
                    <FiExternalLink className="w-5 h-5 group-hover/icon:rotate-45 transition-transform duration-300" />
                </div>

                {/* Bottom white info card */}
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-6 pr-10 shadow-2xl rounded-lg max-w-md animate-slide-in-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title || 'Untitled Project'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {project.category || 'development'} – {project.year || '2024'}
                    </p>
                    <div className="w-12 h-1 bg-gradient-to-r from-[#2596BE] to-[#F2AF18] rounded-full"></div>
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
