'use client'
import PageHeader from '../../../../components/PageHeader'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import apiService from '@/lib/api'
import Reveal from '../../../../components/Reveal'

interface Job {
  id: string | number
  title: string
  type: string
  deadline: string
  description: string
}

export default function VacancyDetail() {
  const [jobDetail, setJobDetail] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const id = params?.id as string

  const fetchJobDetail = async () => {
    try {
      setLoading(true)
      const response = await apiService.getJobById(id)
      setJobDetail(response.data)
    } catch (err) {
      console.error("Error fetching job details:", err)
      setJobDetail(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchJobDetail()
    }
  }, [id])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title={jobDetail?.title || "Vacancy Detail"} />
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#F2AF18]"></div>
            <p className="mt-4 text-gray-600">Loading job details...</p>
          </div>
        ) : jobDetail ? (
          <div className="max-w-4xl mx-auto">
            <Reveal variant="up" delay={0}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{jobDetail.title}</h1>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold uppercase ${
                        jobDetail.type?.toLowerCase() === 'full-time' 
                          ? 'bg-green-100 text-green-800' 
                          : jobDetail.type?.toLowerCase() === 'part-time'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {jobDetail.type}
                      </span>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-[#F2AF18]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-semibold">Deadline: {formatDate(jobDetail.deadline)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <Reveal variant="up" delay={120}>
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">Job Description</h2>
                      <div
                        className="prose max-w-none text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: jobDetail.description }}
                      />
                    </div>
                  </Reveal>

                  {/* Action section */}
                  <Reveal variant="up" delay={240}>
                    <div className="bg-gradient-to-br from-[#F2AF18]/10 via-[#f5c547]/10 to-[#123B8B]/10 rounded-lg p-6 text-center border border-[#F2AF18]/20">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Take the Next Step in Your Career?</h3>
                      <p className="text-gray-600 mb-6">
                        Join our team of professionals and make a meaningful impact in the engineering industry.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                          href={`/vacancy/apply/${jobDetail.id}`}
                          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#123B8B] to-[#1a4ba3] hover:from-[#F2AF18] hover:to-[#f5c547] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Apply Now
                        </Link>
                        <Link
                          href="/vacancy"
                          className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors duration-300"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          Back to List
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </Reveal>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-3">Job Not Found</h4>
            <p className="text-gray-600 mb-6">
              The requested job details could not be found.
            </p>
            <Link 
              href="/vacancy" 
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#123B8B] to-[#1a4ba3] hover:from-[#F2AF18] hover:to-[#f5c547] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              Back to Vacancies
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

