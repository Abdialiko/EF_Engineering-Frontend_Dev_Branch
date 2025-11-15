'use client'
import PageHeader from '../../../../components/PageHeader'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import apiService from '@/lib/api'
import PersonalInfo from './components/PersonalInfoNew'
import EducationalInfo from './components/EducationalInfo'
import Experience from './components/Experience'
import Certificates from './components/Certificates'
import Documents from './components/Documents'
import validateDocuments from './utils/validateDocuments'
import validateEducationalInfo from './utils/validateEducationalInfo'
import validateExperience from './utils/validateExperience'
import validateCertificates from './utils/validateCertificates'
import validatePersonalInfo from './utils/validatePersonalInfo'
import './styles/colors.css'

interface Job {
  id: string | number
  title: string
  type: string
  deadline: string
  description: string
}

interface FormData {
  jobId: string
  personalInfo: {
    firstName: string
    middleName: string
    lastName: string
    birthDate: string
    email: string
    phone: string
    city: string
    subCity: string
    woreda: string
  }
  educationalInfo: any[]
  experience: any[]
  certificates: any[]
  documents: {
    resume: File | null
    coverLetter: File | null
  }
}

export default function JobApplication() {
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'preparing' | 'uploading' | 'processing' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState<FormData>({
    jobId: '',
    personalInfo: {
      firstName: '',
      middleName: '',
      lastName: '',
      birthDate: '',
      email: '',
      phone: '',
      city: '',
      subCity: '',
      woreda: ''
    },
    educationalInfo: [],
    experience: [],
    certificates: [],
    documents: {
      resume: null,
      coverLetter: null
    }
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const params = useParams()
  const { id } = params

  const fetchJob = async () => {
    try {
      setLoading(true)
      const response = await apiService.getJobById(id as string)
      setJob(response.data)
      setFormData(prev => ({ ...prev, jobId: String(id) }))
    } catch (err) {
      console.error("Error fetching job details:", err)
      setJob(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchJob()
    }
  }, [id])

  const nextHandler = () => {
    let errorValues: Record<string, string> = {}
    
    if(step === 1){
      // Validate Personal Info
      errorValues = validatePersonalInfo(formData.personalInfo)
      if(Object.keys(errorValues).length === 0){
        setStep((step) => step + 1)
        setErrors({}) // Clear errors when moving forward
      }
      else{
        setErrors(errorValues)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    else if(step === 5){
      // Validate Documents before allowing submission
      const documentErrors = validateDocuments(formData.documents)
      if(Object.keys(documentErrors).length === 0){
        // Documents are valid, but don't move to next step - user should click Submit
        setErrors({})
        // Actually, step 5 is the last step, so this shouldn't be called
        // But if it is, we've validated
      }
      else{
        setErrors(documentErrors)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    else{
      // Steps 2, 3, 4 - optional sections, can proceed
      setStep((step) => step + 1)
      setErrors({}) // Clear errors when moving forward
    }
  }

  const submitApplication = async () => {
    setSubmitting(true)
    setErrors({}) // Clear previous errors
    
    try {
      // Comprehensive validation before submission
      const validationErrors: Record<string, string> = {}
      
      // Validate Personal Info (already validated in step 1, but double-check)
      const personalInfoErrors = validatePersonalInfo(formData.personalInfo)
      if (Object.keys(personalInfoErrors).length > 0) {
        Object.assign(validationErrors, personalInfoErrors)
      }
      
      // Validate Documents - REQUIRED
      const documentErrors = validateDocuments(formData.documents)
      if (Object.keys(documentErrors).length > 0) {
        Object.assign(validationErrors, documentErrors)
        // Set a general error message
        validationErrors.notify = Object.values(documentErrors)[0] || 'Please check your document uploads'
      }
      
      // Validate Educational Info (optional but if entries exist, they must be valid)
      if (formData.educationalInfo && formData.educationalInfo.length > 0) {
        const eduErrors = validateEducationalInfo(formData.educationalInfo)
        const hasEduErrors = eduErrors.some(err => Object.keys(err).length > 0)
        if (hasEduErrors) {
          validationErrors.notify = validationErrors.notify || 'Please check your educational information'
        }
      }
      
      // Validate Experience (optional but if entries exist, they must be valid)
      if (formData.experience && formData.experience.length > 0) {
        const expErrors = validateExperience(formData.experience)
        const hasExpErrors = expErrors.some(err => Object.keys(err).length > 0)
        if (hasExpErrors) {
          validationErrors.notify = validationErrors.notify || 'Please check your work experience information'
        }
      }
      
      // Validate Certificates (optional but if entries exist, they must be valid)
      if (formData.certificates && formData.certificates.length > 0) {
        const certErrors = validateCertificates(formData.certificates)
        const hasCertErrors = certErrors.some(err => Object.keys(err).length > 0)
        if (hasCertErrors) {
          validationErrors.notify = validationErrors.notify || 'Please check your certificate information'
        }
      }
      
      // If there are validation errors, stop submission
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setSubmitting(false)
        return
      }
      
      // Validate required documents
      if (!formData.documents.resume) {
        throw new Error('Please upload your CV/Resume before submitting')
      }

      const formDataToSend = new FormData()
      
      // Personal Info - matching API field names
      formDataToSend.append('f_name', formData.personalInfo.firstName || '')
      formDataToSend.append('m_name', formData.personalInfo.middleName || '')
      formDataToSend.append('l_name', formData.personalInfo.lastName || '')
      formDataToSend.append('birth_date', formData.personalInfo.birthDate || '')
      formDataToSend.append('email', formData.personalInfo.email || '')
      formDataToSend.append('phone_no', formData.personalInfo.phone || '')
      formDataToSend.append('city', formData.personalInfo.city || '')
      formDataToSend.append('sub_city', formData.personalInfo.subCity || '')
      formDataToSend.append('woreda', formData.personalInfo.woreda || '')
      formDataToSend.append('job_id', formData.jobId || '')
      
      // Educational Info - Match old Vacan format: JSON string with comma in key name
      if (formData.educationalInfo && formData.educationalInfo.length > 0) {
        formData.educationalInfo.forEach((data, i) => {
          if (typeof data === 'object') {
            // Old Vacan code uses: education[${i}], with JSON.stringify
            formDataToSend.append(`education[${i}],`, JSON.stringify(data))
          }
        })
      }
      
      // Experience - Match old Vacan format: JSON string with comma in key name
      if (formData.experience && formData.experience.length > 0) {
        formData.experience.forEach((data, i) => {
          if (typeof data === 'object') {
            // Old Vacan code uses: experience[${i}], with JSON.stringify
            formDataToSend.append(`experience[${i}],`, JSON.stringify(data))
          }
        })
      }
      
      // Certificates - Match old Vacan format: JSON string with comma in key name
      if (formData.certificates && formData.certificates.length > 0) {
        formData.certificates.forEach((data, i) => {
          if (typeof data === 'object') {
            // Old Vacan code uses: certificate[${i}], with JSON.stringify
            formDataToSend.append(`certificate[${i}],`, JSON.stringify(data))
          }
        })
      }
      
      // Documents - ensure files are properly attached
      if (formData.documents.resume) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Adding CV file:', formData.documents.resume.name, formData.documents.resume.size, 'bytes')
        }
        formDataToSend.append('cv', formData.documents.resume, formData.documents.resume.name)
      }
      if (formData.documents.coverLetter) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Adding supporting document:', formData.documents.coverLetter.name, formData.documents.coverLetter.size, 'bytes')
        }
        formDataToSend.append('supporting_doc', formData.documents.coverLetter, formData.documents.coverLetter.name)
      }
      
      // Optimized: Reduced logging for better performance
      if (process.env.NODE_ENV === 'development') {
        console.log('Submitting application with job_id:', formData.jobId)
      }
      
      // Update status for better UX
      setSubmissionStatus('uploading')
      setUploadProgress(50) // Show progress during upload
      
      const response = await apiService.submitJobApplication(formDataToSend, formData.jobId)
      
      setUploadProgress(90)
      setSubmissionStatus('processing')
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Application response:', response)
      }
      
      // More robust success detection
      const responseData = response?.data || {}
      const isSuccess = 
        responseData?.success === true ||
        (response as any)?.success === true ||
        (responseData?.success !== false && (response as any)?.success !== false && !responseData?.error && !(response as any)?.error) ||
        (response as any)?.status === 'success' ||
        responseData?.status === 'success'
      
      if (isSuccess) {
        setUploadProgress(100)
        setSubmissionStatus('success')
        if (process.env.NODE_ENV === 'development') {
          console.log('Application submitted successfully!')
        }
        
        // Small delay for visual feedback before showing success
        setTimeout(() => {
          setSubmitted(true)
          setStep(6)
        }, 300)
        // Clear form data after successful submission
        setFormData({
          jobId: '',
          personalInfo: {
            firstName: '',
            middleName: '',
            lastName: '',
            birthDate: '',
            email: '',
            phone: '',
            city: '',
            subCity: '',
            woreda: ''
          },
          educationalInfo: [],
          experience: [],
          certificates: [],
          documents: {
            resume: null,
            coverLetter: null
          }
        })
      } else {
        const responseData = response?.data || {}
        const errorMsg = responseData?.message || (response as any)?.message || responseData?.error || (response as any)?.error || 'Application submission failed'
        throw new Error(errorMsg)
      }
    } catch (err: any) {
      setSubmissionStatus('error')
      setUploadProgress(0)
      if (process.env.NODE_ENV === 'development') {
        console.error("Error submitting application:", err)
      }
      let errorMessage = err?.message || err?.toString() || "Sorry, Failed to send your application. Try again"
      
      // Extract detailed error information if available
      const errorText = errorMessage
      let displayMessage = errorMessage
      
      // Check if it's a detailed error with endpoint information
      if (errorText.includes('All') && errorText.includes('endpoints failed')) {
        // This is the detailed error from API service
        // Extract the key information for user
        displayMessage = `Unable to submit application. The server endpoint is not configured.\n\n` +
          `This usually means:\n` +
          `• The backend API endpoint for job applications needs to be set up\n` +
          `• The endpoint should accept POST requests with FormData\n` +
          `• Please contact your backend developer to configure the endpoint\n\n` +
          `Technical details are available in the browser console.`
      } else if (errorMessage.includes('Network error') || 
                 errorMessage.includes('Unable to connect') ||
                 errorMessage.includes('ERR_NETWORK') ||
                 errorMessage.includes('ECONNREFUSED') ||
                 errorMessage.includes('timeout')) {
        // Network errors (no response from server)
        if (errorMessage.includes('CORS error') || errorMessage.includes('cross-origin')) {
          displayMessage = "Server configuration issue: CORS (Cross-Origin Resource Sharing) is blocking the request.\n\n" +
            "This needs to be fixed on the server side. Please contact your backend developer to:\n" +
            "• Configure CORS headers to allow requests from this domain\n" +
            "• Ensure the API endpoint accepts POST requests\n" +
            "• Verify the endpoint URL is correct"
        } else {
          displayMessage = "Unable to connect to the server. Please check your internet connection and try again.\n\n" +
            "If the problem persists, this could be due to:\n" +
            "• Network connectivity issues\n" +
            "• CORS policy blocking the request\n" +
            "• The API endpoint may need to be configured\n\n" +
            "Please check the browser console for more details."
        }
      } else if (errorMessage.includes('CORS') || errorMessage.includes('CORS policy') || errorMessage.includes('cross-origin')) {
        displayMessage = "Server configuration issue: CORS (Cross-Origin Resource Sharing) is blocking the request.\n\n" +
          "This needs to be fixed on the server side. Please contact your backend developer to:\n" +
          "• Configure CORS headers to allow requests from this domain\n" +
          "• Ensure the API endpoint accepts POST requests\n" +
          "• Verify the endpoint URL is correct"
      } else if (errorMessage.includes('404') || errorMessage.includes('not found') || errorMessage.includes('Not Found')) {
        displayMessage = "The application endpoint was not found on the server.\n\n" +
          "This means the backend API doesn't have a route configured for submitting job applications.\n" +
          "Please contact your backend developer to set up the endpoint."
      } else if (errorMessage.includes('405') || errorMessage.includes('Method Not Allowed')) {
        displayMessage = "The server endpoint exists but doesn't accept POST requests.\n\n" +
          "The backend needs to be configured to accept POST requests for job applications.\n" +
          "Please contact your backend developer."
      }
      
      setErrors(prevErrors => {
        return {...prevErrors, notify: displayMessage}
      })
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setSubmitting(false)
    }
  }

  const getPage = () => {
    switch (step) {
      case 1:
        return <PersonalInfo data={formData} setData={setFormData} errors={errors} jobInfo={job} step={step} />
      case 2:
        return <EducationalInfo data={formData} setData={setFormData} step={step} />
      case 3:
        return <Experience data={formData} setData={setFormData} step={step} />
      case 4:
        return <Certificates data={formData} setData={setFormData} step={step} />
      case 5:
        return <Documents data={formData} setData={setFormData} errors={errors} setErrors={setErrors} step={step} />
      case 6:
        return null
      default:
        return <PersonalInfo data={formData} setData={setFormData} errors={errors} jobInfo={job} step={step} />
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader title="Application Submitted" />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-4">Application Submitted Successfully!</h2>
              <p className="text-lg text-green-700 mb-6">
                Your application has been successfully completed. We will contact you soon. Thank you for applying!
              </p>
              <Link 
                href="/vacancy"
                className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Back to Vacancies
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title={job?.title || "Job Application"} />
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#F2AF18]"></div>
            <p className="mt-4 text-gray-600">Loading job details...</p>
          </div>
        ) : job ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 md:p-8">
              {getPage()}
              {errors.notify && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 whitespace-pre-line">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <strong className="block mb-1">Error:</strong>
                      <div className="text-sm">{errors.notify}</div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                {step > 1 && (
                  <button
                    onClick={() => setStep((step) => step - 1)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300 border border-gray-300"
                  >
                    Back
                  </button>
                )}
                {step < 5 ? (
                  <button
                    onClick={nextHandler}
                    className="px-6 py-3 bg-gradient-to-r from-[#123B8B] to-[#1a4ba3] hover:from-[#F2AF18] hover:to-[#f5c547] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg ml-auto"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      // Validate documents before submitting
                      const documentErrors = validateDocuments(formData.documents)
                      if (Object.keys(documentErrors).length > 0) {
                        setErrors(documentErrors)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                        return
                      }
                      // If validation passes, submit
                      await submitApplication()
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-[#123B8B] to-[#1a4ba3] hover:from-[#F2AF18] hover:to-[#f5c547] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg ml-auto disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:from-[#123B8B] disabled:hover:to-[#1a4ba3]"
                    disabled={submitting || !formData.documents.resume}
                  >
                    {submitting ? (
                      <span className="flex items-center">
                        Submitting
                        <svg className="animate-spin ml-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                )}
              </div>
            </div>
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
              The requested job could not be found.
            </p>
            <Link 
              href="/vacancy" 
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#123B8B] to-[#1a4ba3] hover:from-[#F2AF18] hover:to-[#f5c547] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              Back to Jobs
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

