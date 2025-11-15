"use client"
import PageHeader from '../../components/PageHeader'
import Reveal from '../../components/Reveal'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })

export default function News() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch('https://api.efengineering-architect.com/api/news', { cache: 'no-store' })
        const data = await res.json()
        setItems((Array.isArray(data) ? data : data?.data) || [])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Latest News" />
      <main className="container mx-auto px-4 py-12">
        <Reveal variant="up" delay={0}>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Latest News</h1>
          <p className="text-gray-600 mt-2">Stay updated with the latest news and events from EF Engineering.</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            new Array(6).fill(0).map((_,i)=>(<div key={i} className="h-72 bg-white border border-gray-200 animate-pulse" />))
          ) : items.length ? (
            items.map((n: any, i: number) => (
              <Reveal key={n.id} variant="up" delay={i * 80}>
                <div className="bg-white border border-gray-200 flex flex-col">
                  <div className="h-56 bg-gray-200 overflow-hidden">
                    <img src={n.photos?.[0]?.path || n.image || `/assets/img/blog/blog-v1-img${(i%6)+1}.jpg`} alt={n.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{n.category || 'News'}</span>
                      <span>{n.created_at ? fmt(n.created_at) : ''}</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-gray-900 leading-snug">{n.title}</h3>
                    <p className="text-gray-600 text-sm">{(n.short_desc || (n.description||'').replace(/<[^>]*>/g,'')).slice(0,120)}...</p>
                    <Link href={`/news/${n.id}`} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-orange-600">READ MORE</Link>
                  </div>
                </div>
              </Reveal>
            ))
          ) : (
            <Reveal variant="up">
              <div className="text-gray-600">No news available.</div>
            </Reveal>
          )}
        </div>
      </main>
    </div>
  )
}