'use client'
import { useState, useEffect } from 'react'
import StepProgressBar from './StepProgressBar'
import validateDocuments from '../utils/validateDocuments'

interface DocumentsProps {
  data: {
    documents: {
      resume: File | null
      coverLetter: File | null
    }
  }
  setData: (updater: (prev: any) => any) => void
  errors: Record<string, string>
  setErrors: (updater: (prev: Record<string, string>) => Record<string, string>) => void
  step: number
}

const Documents: React.FC<DocumentsProps> = ({ data, setData, errors, setErrors, step }) => {
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({})
  const [fileValidationErrors, setFileValidationErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Validate documents when they change
    if (data.documents.resume || data.documents.coverLetter) {
      const validationErrors = validateDocuments(data.documents)
      setFileValidationErrors(validationErrors)
      
      // Update main errors if there are validation issues
      if (Object.keys(validationErrors).length > 0) {
        const firstError = Object.values(validationErrors)[0]
        setErrors((prevErrors) => ({
          ...prevErrors,
          notify: firstError || ''
        }))
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors }
          delete newErrors.notify
          return newErrors
        })
      }
    }
  }, [data.documents, setErrors])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    const file = files && files[0] ? files[0] : null
    
    if (!file) {
      // Clear the file if user removes it
      setData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [name]: null
        }
      }))
      setFileValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
      return
    }
    
    // Validate file type
    const allowedTypes = ['application/pdf']
    const fileExtension = file.name.toLowerCase().split('.').pop()
    
    if (!allowedTypes.includes(file.type) && fileExtension !== 'pdf') {
      const errorMsg = `Invalid file type. Only PDF files are allowed. You selected: ${file.name} (${file.type || 'unknown type'})`
      setFileValidationErrors(prev => ({ ...prev, [name]: errorMsg }))
      setErrors(prevErrors => ({ ...prevErrors, notify: errorMsg }))
      // Clear the file input
      e.target.value = ''
      return
    }
    
    // Validate file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024 // 10MB
    if (file.size > MAX_SIZE) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2)
      const errorMsg = `File size too large. Maximum size is 10MB. Your file "${file.name}" is ${sizeInMB}MB`
      setFileValidationErrors(prev => ({ ...prev, [name]: errorMsg }))
      setErrors(prevErrors => ({ ...prevErrors, notify: errorMsg }))
      // Clear the file input
      e.target.value = ''
      return
    }
    
    // Check if file is empty
    if (file.size === 0) {
      const errorMsg = `The file "${file.name}" appears to be empty. Please upload a valid PDF file.`
      setFileValidationErrors(prev => ({ ...prev, [name]: errorMsg }))
      setErrors(prevErrors => ({ ...prevErrors, notify: errorMsg }))
      e.target.value = ''
      return
    }
    
    // File is valid, add it
    setData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [name]: file
      }
    }))
    
    // Clear errors for this field
    setFileValidationErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[name]
      return newErrors
    })
    
    // Clear general error if this was the issue
    if (errors.notify && errors.notify.includes(file.name)) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors }
        delete newErrors.notify
        return newErrors
      })
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  return (
    <div className="documents-form">
      {/* Step progress bar inside the form card */}
      <div className="mb-4">
        <StepProgressBar step={step} />
      </div>
      
      <div className="instruction-text pb-5">
        <h5 className="mb-2">Upload Required Documents</h5>
        <p className="mb-0">
          Upload your CV/Resume and any supporting documents in PDF format. 
          Maximum file size is 10MB per file.
        </p>
      </div>
      
      <div className="d-md-flex">
        <div className="mb-3 me-md-4 flex-fill">
          <label className="form-label">
            Upload your CV/Resume in PDF format <span className="text-danger">*</span>
          </label>
          <input
            type="file"
            className={`form-control ${fileValidationErrors.resume ? 'is-invalid' : data.documents.resume ? 'is-valid' : ''}`}
            accept="application/pdf,.pdf"
            name="resume"
            onChange={changeHandler}
            required
          />
          {fileValidationErrors.resume && (
            <div className="invalid-feedback d-block">{fileValidationErrors.resume}</div>
          )}
          {data.documents.resume && !fileValidationErrors.resume && (
            <div className="valid-feedback d-block mt-2">
              <div className="d-flex align-items-center text-success">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>
                  <strong>{data.documents.resume.name}</strong> ({formatFileSize(data.documents.resume.size)})
                </span>
              </div>
            </div>
          )}
          {!data.documents.resume && (
            <small className="form-text text-muted">
              Required: PDF file, maximum 10MB
            </small>
          )}
        </div>
        
        <div className="mb-3 me-3 flex-fill">
          <label className="form-label">
            Upload Certificate and Supporting Documents in PDF format (Optional)
          </label>
          <input
            type="file"
            className={`form-control ${fileValidationErrors.coverLetter ? 'is-invalid' : data.documents.coverLetter ? 'is-valid' : ''}`}
            accept="application/pdf,.pdf"
            name="coverLetter"
            onChange={changeHandler}
          />
          {fileValidationErrors.coverLetter && (
            <div className="invalid-feedback d-block">{fileValidationErrors.coverLetter}</div>
          )}
          {data.documents.coverLetter && !fileValidationErrors.coverLetter && (
            <div className="valid-feedback d-block mt-2">
              <div className="d-flex align-items-center text-success">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>
                  <strong>{data.documents.coverLetter.name}</strong> ({formatFileSize(data.documents.coverLetter.size)})
                </span>
              </div>
            </div>
          )}
          {!data.documents.coverLetter && (
            <small className="form-text text-muted">
              Optional: PDF file, maximum 10MB
            </small>
          )}
        </div>
      </div>
      
      {errors.notify && (
        <div className="error-message py-4 text-center">
          <div className="d-flex align-items-center justify-content-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errors.notify}</span>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .documents-form {
          background: #fff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 2rem;
          border: 1px solid #f0f0f0;
        }
        
        .instruction-text {
          text-align: center;
          padding: 1.5rem;
          background: linear-gradient(120deg, #e9f7fe 0%, #f0f8ff 100%);
          border-radius: 8px;
          margin-bottom: 2rem;
          color: #495057;
          font-weight: 500;
          border-left: 4px solid var(--primary-color);
        }
        
        .instruction-text h5 {
          color: var(--primary-color);
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .form-label {
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }
        
        .form-control {
          border: 2px solid #e1e5eb;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          transition: all 0.3s ease;
          font-size: 1rem;
          height: auto;
        }
        
        .form-control:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(18, 59, 139, 0.1);
          outline: none;
        }
        
        .form-control.is-invalid {
          border-color: #dc3545 !important;
        }
        
        .form-control.is-valid {
          border-color: #28a745 !important;
        }
        
        .invalid-feedback {
          color: #dc3545;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          font-weight: 500;
        }
        
        .valid-feedback {
          color: #28a745;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          font-weight: 500;
        }
        
        .error-message {
          color: #dc3545;
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          border-radius: 8px;
          padding: 1rem;
          margin-top: 1rem;
          font-weight: 500;
        }
        
        .form-text {
          display: block;
          margin-top: 0.25rem;
          font-size: 0.875rem;
          color: #6c757d;
        }
        
        .text-danger {
          color: #dc3545;
        }
        
        .text-success {
          color: #28a745;
        }
        
        .text-muted {
          color: #6c757d;
        }
        
        @media (max-width: 768px) {
          .documents-form {
            padding: 1.5rem;
          }
          
          .d-md-flex {
            flex-direction: column;
          }
          
          .me-md-4 {
            margin-right: 0 !important;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Documents

