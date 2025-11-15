"use client"
import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import Reveal from '../../components/Reveal'

export default function Clients() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch('https://api.efengineering-architect.com/api/clients', { cache: 'no-store' })
        const data = await res.json()
        setClients((Array.isArray(data) ? data : data?.data) || [])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Our Clients" />
      <main className="container mx-auto px-4 py-12">
        <Reveal variant="up" delay={0}>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Our Clients</h1>
          <p className="text-gray-700">We have worked with a diverse range of clients across industries.</p>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
          {loading ? (
            new Array(10).fill(0).map((_,i)=>(<div key={i} className="h-20 bg-white border border-gray-200 animate-pulse" />))
          ) : clients.length ? (
            clients.map((c: any, i: number) => (
              <Reveal key={c.id || i} variant="up" delay={i * 50}>
                <div className="bg-white border border-gray-200 p-4 flex items-center justify-center">
                  <img src={c.logo || c.image || c.photo || '/assets/img/brand/brand-v1-img1.png'} alt={c.name || 'Client'} className="h-12 object-contain" />
                </div>
              </Reveal>
            ))
          ) : (
            <Reveal variant="up">
              <div className="text-gray-600">No clients to display.</div>
            </Reveal>
          )}
        </div>
      </main>
    </div>
  )
}