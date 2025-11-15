"use client"
import PageHeader from '../../components/PageHeader'
import Reveal from '../../components/Reveal'
import { useEffect, useState } from 'react'

const counters = [
  { label: 'Years of Experience', value: 10 },
  { label: 'Specialists', value: 39 },
  { label: 'Successful Projects', value: 27 },
  { label: 'Happy Clients', value: 210 },
]

export default function About() {
  const [nums, setNums] = useState<number[]>(counters.map(() => 0))
  const [started, setStarted] = useState(false)
  const [team, setTeam] = useState<any[]>([])
  const [teamLoading, setTeamLoading] = useState<boolean>(false)

  useEffect(() => {
    const el = document.getElementById('about-stats')
    if (!el) return
    const ob = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          setStarted(true)
          const duration = 1500
          const steps = 60
          const tick = duration / steps
          counters.forEach((c, i) => {
            let cur = 0
            const inc = c.value / steps
            const t = setInterval(() => {
              cur += inc
              setNums((prev) => {
                const next = [...prev]
                next[i] = Math.min(Math.round(cur), c.value)
                return next
              })
              if (cur >= c.value) clearInterval(t)
            }, tick)
          })
        }
      })
    }, { threshold: 0.25 })
    ob.observe(el)
    return () => ob.disconnect()
  }, [started])

  // Fetch team members from old website API
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setTeamLoading(true)
        const res = await fetch('https://api.efengineering-architect.com/api/teams')
        if (!res.ok) throw new Error('Failed to load team')
        const data = await res.json()
        setTeam(Array.isArray(data) ? data : data?.data || [])
      } catch (e) {
        console.error(e)
      } finally {
        setTeamLoading(false)
      }
    }
    fetchTeam()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="About Us" />
      <main className="container mx-auto px-4 py-16">
        {/* Intro (match reference: images left, copy right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center mb-20">
          {/* Imagery collage */}
          <Reveal variant="left">
            <div className="relative h-[300px] sm:h-[360px] md:h-[420px] lg:h-[440px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hero/home.jpg" alt="Team discussing plans" className="absolute inset-0 w-[72%] sm:w-[68%] h-[70%] sm:h-[78%] object-cover border-4 border-white shadow-lg" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hero/house.jpg" alt="Site meeting" className="absolute top-20 sm:top-24 right-0 w-[60%] sm:w-[58%] h-[64%] sm:h-[70%] object-cover border-4 border-white shadow-lg" />
              <div className="absolute bottom-0 left-0 bg-white shadow-md p-4 w-[60%]">
                <div className="text-sm font-semibold text-gray-900">Minimizing Liabilities, Maximizing Outcomes.</div>
                <div className="mt-1 text-xs text-gray-600">Play Video ⟶</div>
              </div>
            </div>
          </Reveal>

          {/* Right copy */}
          <Reveal variant="up">
            <div>
              <p className="text-orange-500 tracking-[.25em] uppercase text-xs font-semibold mb-3">About Us</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                Navigating The Complexities Of Engineering
                <br />
                So You Don't Have To.
              </h2>
              <p className="text-gray-700 leading-7 mb-6 max-w-xl">
                We are a multidisciplinary engineering and construction partner focused on clarity, safety, and
                measurable results. From feasibility to handover, we coordinate the details so your project moves
                forward with confidence.
              </p>
              <p className="text-gray-700 leading-7 mb-8 max-w-xl">
                Our teams blend deep technical expertise with practical field experience—delivering compliant
                designs, accurate documentation, and site execution that protects your budget and timeline.
              </p>
              <div className="flex items-center gap-4">
                <a href="/contact" className="inline-flex items-center gap-2 bg-[#141414] hover:bg-orange-500 text-white px-6 py-4 font-semibold uppercase tracking-wide transition-colors">Talk to us <span>→</span></a>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 text-white flex items-center justify-center">☎</div>
                  <div className="text-lg font-extrabold text-gray-900">+251 91 234 5678</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* WHY US - dark band */}
        <section className="relative mb-20 overflow-hidden">
          <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero/bonga.jpg" alt="background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0f1a1a]/85" />
          </div>
          <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
            <Reveal variant="up">
              <div>
                <p className="text-orange-400 tracking-[.25em] uppercase text-xs font-semibold mb-2">Why Us?</p>
                <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4">
                  Strategic Consulting For Project Success.
                </h3>
                <p className="text-white/80 mb-6 max-w-xl">
                  We combine data‑driven planning with disciplined delivery to reduce risk and unlock value at
                  every stage of your project.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-white/90 text-sm">
                  {[
                    'Planning for the Future',
                    'Time Savings',
                    'Peace of Mind',
                    'Maximize Savings',
                    'Expertise',
                    'Accuracy',
                  ].map((b) => (
                    <div key={b} className="flex items-start gap-2"><span className="mt-1 inline-block w-2 h-2 bg-orange-400"></span><span>{b}</span></div>
                  ))}
              </div>
            </div>
          </Reveal>
            <Reveal variant="right">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hero/3d4.jpg" alt="team" className="w-full h-[240px] sm:h-[320px] md:h-[360px] object-cover border-4 border-white/10" />
          </Reveal>
        </div>
        </section>

        {/* Stats */}
        <section id="about-stats" className="bg-white py-10 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {counters.map((c, i) => (
              <Reveal variant="up" delay={i * 100} key={c.label}>
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-transparent" style={{ WebkitTextStroke: '2px black' }}>{nums[i]}+</div>
                  <div className="uppercase tracking-wide text-gray-600 mt-2 text-sm">{c.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Company Vision - images left, copy right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center mb-20">
          <Reveal variant="left">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hero/bonga.jpg" alt="workshop" className="w-full h-36 sm:h-44 md:h-48 object-cover" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hero/home.jpg" alt="presentation" className="w-full h-36 sm:h-44 md:h-48 object-cover" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hero/3d4.jpg" alt="teamwork" className="w-full h-32 sm:h-36 md:h-40 object-cover col-span-2" />
            </div>
          </Reveal>
          <Reveal variant="up">
            <div>
              <p className="text-orange-500 tracking-[.25em] uppercase text-xs font-semibold mb-3">Company's Vision</p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">Your Project Success Is Our Top Priority.</h3>
              <p className="text-gray-700 mb-6 max-w-xl">We equip clients with clear options and reliable numbers so decisions are easy and execution is smooth.</p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="px-3 py-2 bg-orange-500 text-white font-bold">01</div>
                  <div>
                    <div className="font-extrabold text-gray-900">Empower Our Clients With Knowledge</div>
                    <div className="text-gray-700">Straightforward reports, constructible drawings, and proactive guidance at every step.</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="px-3 py-2 bg-[#141414] text-white font-bold">02</div>
                  <div>
                    <div className="font-extrabold text-gray-900">Engineering For Businesses Of All Sizes</div>
                    <div className="text-gray-700">From small renovations to multi‑site programs—we scale our team to suit your needs.</div>
                  </div>
                </div>
              </div>
              </div>
            </Reveal>
        </div>

        {/* Team (match provided UI) */}
        <section className="mb-16">
        <Reveal variant="up">
            <p className="text-center text-orange-500 tracking-[.25em] uppercase text-xs font-semibold mb-2">Our Team</p>
            <h3 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8">Our Expert Engineering Team</h3>
        </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {(teamLoading ? new Array(3).fill(null) : (team || []).slice(0,3)).map((member, idx) => (
              <Reveal variant="up" delay={idx*100} key={member?.id ?? idx}>
                <div className="bg-white shadow-sm relative overflow-hidden rounded-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member?.photo || '/images/hero/3d4.jpg'}
                    alt={member ? `${member.f_name ?? ''} ${member.m_name ?? ''} ${member.l_name ?? ''}`.trim() : 'Team Member'}
                    className="w-full h-[260px] sm:h-[300px] md:h-[340px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-[#141414] text-white">
                    <div className="flex items-center justify-between px-5 py-4">
                      <div className="text-left">
                        <div className="font-extrabold leading-none">{member ? `${member.f_name ?? ''} ${member.m_name ?? ''} ${member.l_name ?? ''}`.trim() : 'Loading…'}</div>
                        <div className="text-xs text-white/70 mt-1">{member?.profession || 'Project Manager'}</div>
                      </div>
                      <a href={member?.linkedin || '#'} className="text-orange-400 hover:text-white shrink-0" aria-label="share">
                        {/* simple share/link icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M13 5.828V9a1 1 0 1 1-2 0V5.828L8.414 8.414a1 1 0 1 1-1.414-1.414l4.293-4.293a1 1 0 0 1 1.414 0l4.293 4.293a1 1 0 1 1-1.414 1.414L13 5.828z"/><path d="M5 13a1 1 0 0 1 1 1v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3a1 1 0 1 1 2 0v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z"/></svg>
                      </a>
                    </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        </section>

        {/* Keep the CTA consistent with home theme */}

        <Reveal variant="up">
          <section className="relative overflow-hidden rounded-md">
            {/* Background image with overlay */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero/home.jpg" alt="Contact background" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="text-sm uppercase tracking-[.25em] text-orange-400 mb-2">Get in touch</div>
                <div className="text-2xl sm:text-3xl font-extrabold">Your Partner For Comprehensive Engineering Solutions</div>
                <p className="text-white/80 mt-2 max-w-2xl">Tell us about your goals—our team will propose the safest, most cost‑effective path to deliver them.</p>
              </div>
              <a href="/contact" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-white hover:text-black text-white px-6 py-3 font-semibold uppercase tracking-wide transition-colors">Call or Message →</a>
          </div>
          </section>
        </Reveal>
      </main>
    </div>
  )
}