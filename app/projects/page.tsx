"use client"
import PageHeader from '../../components/PageHeader'
import Reveal from '../../components/Reveal'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const getImageUrl = (p: any) => {
  if (!p) return '/images/hero/home.jpg'
  if (Array.isArray(p.photos) && p.photos.length) return p.photos[0]?.path || p.photos[0]
  if (p.image_url) return p.image_url
  if (p.image) return p.image
  return '/images/hero/home.jpg'
}

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'on-progress'>('all')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const [cRes, pRes] = await Promise.all([
          fetch('https://api.efengineering-architect.com/api/categories', { cache: 'no-store' }),
          fetch('https://api.efengineering-architect.com/api/projects', { cache: 'no-store' }),
        ])
        const cJson = await cRes.json()
        const pJson = await pRes.json()
        setCategories([{ id: 'all', name: 'All' }, ...((Array.isArray(cJson) ? cJson : cJson?.data) || [])])
        setProjects((Array.isArray(pJson) ? pJson : pJson?.data) || [])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = projects.filter((p) => {
    const byCat = activeCategory === 'all' || String(p.category_id) === String(activeCategory)
    const byStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && (p.is_completed == '1' || p.is_completed === true || p.progress == '100')) ||
      (statusFilter === 'on-progress' && (p.is_completed == '0' || p.is_completed === false) && p.progress != '100')
    return byCat && byStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Our Projects" />
      <main className="container mx-auto px-4 py-12">
        <Reveal variant="up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Our Projects</h1>
              <p className="text-gray-600 mt-2">Discover completed and in-progress works across categories.</p>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full">
              <button onClick={() => setStatusFilter('all')} className={`px-4 py-2 rounded-full text-sm font-semibold ${statusFilter==='all'?'bg-orange-500 text-white':'text-gray-700'}`}>All</button>
              <button onClick={() => setStatusFilter('completed')} className={`px-4 py-2 rounded-full text-sm font-semibold ${statusFilter==='completed'?'bg-orange-500 text-white':'text-gray-700'}`}>Completed</button>
              <button onClick={() => setStatusFilter('on-progress')} className={`px-4 py-2 rounded-full text-sm font-semibold ${statusFilter==='on-progress'?'bg-orange-500 text-white':'text-gray-700'}`}>On Progress</button>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <Reveal variant="left" delay={0}>
              <div className="bg-white border border-gray-200 p-4 sticky top-6">
                <h3 className="text-sm uppercase tracking-[.2em] text-gray-500 mb-3">Project Categories</h3>
                <div className="flex flex-col gap-2">
                  {categories.map((c: any, i: number) => (
                    <button key={String(c.id)} onClick={() => setActiveCategory(String(c.id))} className={`text-left px-3 py-2 rounded ${String(c.id)===String(activeCategory)?'bg-orange-500 text-white':'hover:bg-gray-100'}`}>
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </aside>
          <section className="md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {new Array(6).fill(0).map((_,i)=>(<div key={i} className="h-72 bg-gray-200 animate-pulse" />))}
              </div>
            ) : filtered.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p: any, i: number) => (
                  <Reveal key={p.id} variant="up" delay={i * 80}>
                    <Link href={`/projects/${p.id}`} className="group block overflow-hidden bg-white border border-gray-200 relative h-72">
                      <img src={getImageUrl(p)} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <span className="text-xs font-semibold uppercase text-orange-400">{p.category || 'Project'}</span>
                        <h3 className="text-lg font-extrabold leading-snug">{p.title}</h3>
                        {p.progress !== undefined && (
                          <div className="mt-2 w-full h-3 bg-white/20 rounded">
                            <div className="h-3 bg-green-500 rounded" style={{ width: `${p.progress}%` }} />
                          </div>
                        )}
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal variant="up">
                <div className="text-center text-gray-600">No projects found.</div>
              </Reveal>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}