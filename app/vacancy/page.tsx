'use client'
import PageHeader from '../../components/PageHeader'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import apiService from '@/lib/api'
import Reveal from '../../components/Reveal'

interface Job {
  id: string | number
  title: string
  type: string
  deadline: string
  description?: string
}

export default function Vacancy() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await apiService.getJobs()
      const jobsList = Array.isArray(response.data) ? response.data : (response.data as any)?.data || []
      setJobs(jobsList)
    } catch (err) {
      console.error("Error fetching jobs:", err)
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Current Vacancies" />
      <main className="container mx-auto px-4 py-12">
        <Reveal variant="up" delay={0}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Join Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore exciting career opportunities at EF Engineering
            </p>
          </div>
        </Reveal>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {new Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <Reveal variant="up" delay={120}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 flex-1">{job.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ml-2 ${
                        job.type?.toLowerCase() === 'full-time' 
                          ? 'bg-green-100 text-green-800' 
                          : job.type?.toLowerCase() === 'part-time'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {job.type}
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-3 text-[#F2AF18]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <span className="text-sm text-gray-500 block">Application Deadline</span>
                          <span className="font-semibold text-gray-900">{formatDate(job.deadline)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-3 text-[#F2AF18]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <span className="text-sm text-gray-500 block">Department</span>
                          <span className="font-semibold text-gray-900">Engineering</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/vacancy/detail/${job.id}`}
                      className="inline-block w-full text-center px-6 py-3 bg-gradient-to-r from-[#123B8B] to-[#1a4ba3] hover:from-[#F2AF18] hover:to-[#f5c547] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                    >
                      View Details
                    </Link>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Vacancies Available</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We currently don't have any open positions. Please check back later for new opportunities.
              </p>
              <Link 
                href="/" 
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#123B8B] to-[#1a4ba3] hover:from-[#F2AF18] hover:to-[#f5c547] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                Back to Home
              </Link>
            </div>
          </Reveal>
        )}
      </main>
    </div>
  )
}

