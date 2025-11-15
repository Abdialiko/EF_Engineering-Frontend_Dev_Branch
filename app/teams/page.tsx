"use client"
import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import Reveal from '../../components/Reveal'
import Link from 'next/link'

export default function Teams() {
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch('https://api.efengineering-architect.com/api/teams', { cache: 'no-store' })
        const data = await res.json()
        setTeams((Array.isArray(data) ? data : data?.data) || [])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const photo = (t: any) => t.photo || t.image || t.image_url || '/assets/img/team/team-v2-img1.jpg'

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Our Team" />
      <main className="container mx-auto px-4 py-12">
        <Reveal variant="up" delay={0}>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Our Team</h1>
          <p className="text-gray-600">Meet the professionals behind our success.</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            new Array(6).fill(0).map((_,i)=>(<div key={i} className="h-72 bg-white border border-gray-200 animate-pulse" />))
          ) : teams.length ? (
            teams.map((t: any, i: number) => (
              <Reveal key={t.id} variant="up" delay={i * 80}>
                <Link href={`/teams/${t.id}`} className="bg-white border border-gray-200 flex flex-col">
                  <div className="h-56 bg-gray-200 overflow-hidden">
                    <img src={photo(t)} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-extrabold text-gray-900">{t.name}</h3>
                    <p className="text-gray-600 text-sm">{t.role || t.position}</p>
                  </div>
                </Link>
              </Reveal>
            ))
          ) : (
            <Reveal variant="up">
              <div className="text-gray-600">No team members available.</div>
            </Reveal>
          )}
        </div>
      </main>
    </div>
  )
}


