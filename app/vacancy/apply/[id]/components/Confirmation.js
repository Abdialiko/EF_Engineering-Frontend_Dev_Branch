'use client'
import Link from "next/link"

const Confirmation = ({ jobTitle }) => {
  return (
    <div className="confirmation-page text-center py-5">
      <div className="confirmation-icon text-success mb-4">
        <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="confirmation-title mb-3 text-2xl font-bold text-gray-900">Application Submitted Successfully!</h2>
      <p className="confirmation-message mb-4 text-gray-600">
        Thank you for applying for the position of <strong className="text-[#123B8B]">{jobTitle}</strong>. 
        We have received your application and will review it shortly.
      </p>
      <div className="confirmation-details mb-4 text-gray-600">
        <p className="mb-1">We will contact you via email or phone if your qualifications match our requirements.</p>
        <p className="mb-1">Please keep an eye on your email for further communication.</p>
      </div>
      <div className="confirmation-actions flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href="/vacancy" 
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#123B8B] to-[#1a4ba3] hover:from-[#F2AF18] hover:to-[#f5c547] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
        >
          View More Jobs
        </Link>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#123B8B] font-semibold rounded-lg border-2 border-[#123B8B] hover:bg-[#123B8B] hover:text-white transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default Confirmation
