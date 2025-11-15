'use client'
import PageHeader from '../../components/PageHeader'
import Reveal from '../../components/Reveal'
import { useState, useEffect } from 'react'
import apiService from '@/lib/api'
import Link from 'next/link'

interface Testimonial {
  id: string | number
  name: string
  position?: string
  role?: string
  company?: string
  testimonial?: string
  description?: string
  content?: string
  image?: string
  photo?: string
  image_url?: string
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true)
        const response = await apiService.getTestimonials()
        const testimonialsList = Array.isArray(response.data) ? response.data : (response.data as any)?.data || []
        setTestimonials(testimonialsList)
      } catch (err) {
        console.error("Error fetching testimonials:", err)
        setTestimonials([])
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  const getTestimonialImage = (testimonial: Testimonial) => {
    if (testimonial.image_url) return testimonial.image_url
    if (testimonial.image) return testimonial.image
    if (testimonial.photo) return testimonial.photo
    return '/images/hero/home.jpg' // Default image
  }

  const getTestimonialText = (testimonial: Testimonial) => {
    return testimonial.testimonial || testimonial.description || testimonial.content || ''
  }

  const getTestimonialPosition = (testimonial: Testimonial) => {
    return testimonial.position || testimonial.role || 'Client'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Testimonials" />
      <main className="container mx-auto px-4 py-12">
        <Reveal variant="up" delay={0}>
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">What Our Clients Say</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Read testimonials from our satisfied clients and partners
            </p>
          </div>
        </Reveal>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {new Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <Reveal variant="up" delay={120}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id || index} 
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col"
                >
                  <div className="flex items-start mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                      <img 
                        src={getTestimonialImage(testimonial)} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/hero/home.jpg'
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{getTestimonialPosition(testimonial)}</p>
                      {testimonial.company && (
                        <p className="text-xs text-gray-500 mt-1">{testimonial.company}</p>
                      )}
                    </div>
                    <div className="text-orange-500 text-2xl">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <p className="text-gray-700 leading-relaxed line-clamp-4">
                      {getTestimonialText(testimonial)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ) : (
          <Reveal variant="up" delay={120}>
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Testimonials Available</h3>
              <p className="text-gray-600 mb-6">
                We don't have any testimonials to display at the moment. Please check back later.
              </p>
              <Link 
                href="/" 
                className="inline-block px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-300"
              >
                Back to Home
              </Link>
            </div>
          </Reveal>
        )}

        {/* CTA Section */}
        <Reveal variant="up" delay={240}>
          <section className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'url(/images/pageheader.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
            </div>
            <div className="relative z-10 container mx-auto px-4 py-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                We are Always Ready to Help You<br />
                & Answer Your Questions
              </h2>
              <Link
                href="/contact"
                className="inline-block mt-6 px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              >
                CONTACT US
              </Link>
            </div>
          </section>
        </Reveal>
      </main>
    </div>
  )
}

