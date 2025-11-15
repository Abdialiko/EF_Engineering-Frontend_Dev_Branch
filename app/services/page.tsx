'use client'
import PageHeader from '../../components/PageHeader'
import Reveal from '../../components/Reveal'
import { useEffect, useMemo, useState } from 'react'
import { FaProjectDiagram } from 'react-icons/fa'

export default function Services() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const getServiceImageUrl = (service: any) => {
    if (!service) return '/images/hero/home.jpg'
    if (service.image_url) return service.image_url
    if (service.image) return service.image
    if (service.photo) return service.photo
    if (Array.isArray(service.photos) && service.photos.length > 0) return service.photos[0]
    if (Array.isArray(service.image_urls) && service.image_urls.length > 0) return service.image_urls[0]
    return '/images/hero/home.jpg'
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const res = await fetch('https://api.efengineering-architect.com/api/services')
        if (!res.ok) throw new Error('Failed to load services')
        const data = await res.json()
        setServices(Array.isArray(data) ? data : data?.data || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Services" />
      <main className="container mx-auto px-4 py-16">
        {/* Page intro like reference */}
        <Reveal variant="up">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">Our services</h1>
            <p className="text-gray-600 mt-3">We plan, design, and manage projects with a focus on safety, quality, and cost certainty.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a href="/contact" className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 font-semibold">Get a quote</a>
              <a href="#grid" className="inline-flex items-center justify-center border border-gray-300 hover:border-gray-900 px-5 py-3 font-semibold">Learn more</a>
            </div>
          </div>
        </Reveal>

        {/* Services grid styled like the OLD website: image cards with overlay content */}
        <div id="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {(loading ? new Array(6).fill({}) : (services.length ? services : [])).map((svc: any, i: number) => {
            const title = svc?.title || svc?.name || 'SERVICE'
            return (
              <Reveal variant="up" delay={i*80} key={(svc?.id ?? i) + '-' + title}>
                <a href={`/services/${svc?.id ?? ''}`} className="block group focus:outline-none">
                  <div className="relative h-[220px] bg-gray-200 overflow-hidden border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={getServiceImageUrl(svc)} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="relative z-10 h-full flex flex-col items-start justify-start p-5">
                      {/* Icon replacing the placeholder box */}
                      <FaProjectDiagram className="text-white text-2xl mb-2" />
                      <h2 className="text-white text-base font-extrabold tracking-wide">{String(title).toUpperCase()}</h2>
                      <div className="mt-auto">
                        <span className="inline-flex items-center gap-2 text-white text-xs font-semibold uppercase">
                          Read more
                          <span className="inline-flex items-center justify-center w-5 h-5 border border-white">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </Reveal>
            )
          })}
        </div>

        {/* Ready to get in touch CTA with provided image (layout like reference) */}
        <Reveal variant="up">
          <section className="relative mt-20 rounded-md bg-white border border-gray-200 overflow-hidden">
            {/* Right anchored real image */}
            <div className="pointer-events-none absolute right-0 bottom-0 top-auto w-[65%] md:w-[50%] lg:w-[45%]" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/getTouch.jpg" alt="Get in touch" className="w-full h-auto object-cover" />
            </div>
            {/* Subtle gradient to fade image into background */}
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white via-white/70 to-transparent" aria-hidden />

            <div className="relative z-10 px-6 py-10 md:px-12 md:py-14">
              <div className="max-w-2xl">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Ready to pull the trigger? Get a quote today.</h3>
                <p className="text-gray-700 mt-2">Tell us about your project and we’ll respond with a clear plan, timeline, and budget options.</p>
                <div className="mt-6 flex items-center gap-3">
                  <a href="/contact" className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 font-semibold">Get a quote</a>
                  <a href="#grid" className="inline-flex items-center justify-center border border-gray-900 px-5 py-3 font-semibold bg-white hover:bg-gray-50">Our services</a>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </main>
    </div>
  )
}