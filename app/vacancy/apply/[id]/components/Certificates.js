'use client'
import { useState } from 'react'
import StepProgressBar from './StepProgressBar'

const Certificates = ({ data, setData, step }) => {
  const [certificate, setCertificate] = useState({
    title: "",
    issuer: "",
    date: "",
    summary: ""
  })
  const [localErrors, setLocalErrors] = useState({})

  const changeHandler = (e) => {
    const { name, value } = e.target
    setCertificate(previousData => {
      return { ...previousData, [name]: value }
    })
    if(value){
      setLocalErrors({...localErrors, [name]: ""})
    }
  }

  const addCertificate = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Add Certificate clicked', certificate)
    // Comprehensive validation
    const newErrors = {}
    
    if (!certificate.title || !certificate.title.trim()) {
      newErrors.title = "Certificate title is required"
    } else if (certificate.title.trim().length < 2) {
      newErrors.title = "Certificate title must be at least 2 characters"
    } else if (certificate.title.trim().length > 100) {
      newErrors.title = "Certificate title must be 100 characters or less"
    }
    
    if (!certificate.issuer || !certificate.issuer.trim()) {
      newErrors.issuer = "Issuing organization is required"
    } else if (certificate.issuer.trim().length < 2) {
      newErrors.issuer = "Issuing organization must be at least 2 characters"
    } else if (certificate.issuer.trim().length > 70) {
      newErrors.issuer = "Issuing organization must be 70 characters or less"
    }
    
    if (!certificate.date) {
      newErrors.date = "Issue date is required"
    } else {
      const issue = new Date(certificate.date)
      const today = new Date()
      if (issue > today) {
        newErrors.date = "Issue date cannot be in the future"
      }
      
      // Check if issue date is not too far in the past
      const yearsAgo = today.getFullYear() - issue.getFullYear()
      if (yearsAgo > 100) {
        newErrors.date = "Issue date seems too far in the past. Please verify."
      }
    }
    
    // Summary validation (optional but if provided, validate length)
    if (certificate.summary && certificate.summary.trim().length > 500) {
      newErrors.summary = "Summary must be 500 characters or less"
    }
    
    if (Object.keys(newErrors).length > 0) {
      setLocalErrors(newErrors)
      return
    }
    
    // Add to the main data
    setData(prev => {
      const newData = {
        ...prev,
        certificates: [...(prev.certificates || []), { ...certificate }]
      }
      console.log('Adding certificate, new data:', newData)
      return newData
    })
    
    // Reset the form
    setCertificate({
      title: "",
      issuer: "",
      date: "",
      summary: ""
    })
    setLocalErrors({})
  }

  const removeCertificate = (index) => {
    setData(prev => {
      const newCertificates = [...(prev.certificates || [])]
      newCertificates.splice(index, 1)
      return { ...prev, certificates: newCertificates }
    })
  }

  return (
    <div className="certificates-form">
      {/* Step progress bar inside the form card */}
      <div className="mb-4">
        <StepProgressBar step={step} />
      </div>
      
      <h4 className="mb-4">Professional Certificates</h4>
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Certificate Title *</label>
              <input
                type="text"
                className={`form-control ${localErrors.title ? 'is-invalid' : ''}`}
                name="title"
                value={certificate.title || ""}
                onChange={changeHandler}
                placeholder="Enter certificate title"
              />
              {localErrors.title && (
                <div className="invalid-feedback">{localErrors.title}</div>
              )}
            </div>
            
            <div className="col-md-6 mb-3">
              <label className="form-label">Issued by *</label>
              <input
                type="text"
                className={`form-control ${localErrors.issuer ? 'is-invalid' : ''}`}
                name="issuer"
                value={certificate.issuer || ""}
                onChange={changeHandler}
                placeholder="Enter issuer name"
              />
              {localErrors.issuer && (
                <div className="invalid-feedback">{localErrors.issuer}</div>
              )}
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Issue Date *</label>
              <input
                type="date"
                className={`form-control ${localErrors.date ? 'is-invalid' : ''}`}
                name="date"
                value={certificate.date || ""}
                onChange={changeHandler}
              />
              {localErrors.date && (
                <div className="invalid-feedback">{localErrors.date}</div>
              )}
            </div>
            
            <div className="col-md-6 mb-3">
              <label className="form-label">Summary</label>
              <input
                type="text"
                className="form-control"
                name="summary"
                value={certificate.summary || ""}
                onChange={changeHandler}
                placeholder="Enter certificate summary"
              />
            </div>
          </div>
          
          <div className="d-flex justify-content-end mt-3">
            <button
              type="button"
              className="add-btn"
              onClick={addCertificate}
            >
              <i className="fas fa-plus me-2"></i>
              Add Certificate
            </button>
          </div>
        </div>
      </div>
      
      {/* Display added certificate entries */}
      {data.certificates && data.certificates.length > 0 && (
        <div className="added-entries">
          <h5 className="mb-3">Added Certificates:</h5>
          {data.certificates.map((cert, index) => (
            <div key={index} className="card mb-3 entry-card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h6 className="card-title">{cert.title}</h6>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeCertificate(index)}
                  >
                    <i className="fas fa-trash"></i> Remove
                  </button>
                </div>
                <p className="mb-1"><strong>Issuer:</strong> {cert.issuer}</p>
                <p className="mb-1"><strong>Issue Date:</strong> {cert.date}</p>
                <p className="mb-0"><strong>Summary:</strong> {cert.summary || 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <style jsx>{`
        .certificates-form {
          background: #fff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 2rem;
          border: 1px solid #f0f0f0;
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
        
        .form-control::placeholder {
          color: #adb5bd;
        }
        
        .is-invalid {
          border-color: #dc3545 !important;
        }
        
        .invalid-feedback {
          color: #dc3545;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          font-weight: 500;
        }
        
        .add-btn {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-light) 100%);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(18, 59, 139, 0.3);
        }
        
        .entry-card {
          border-radius: 10px;
          border: 1px solid #e9ecef;
          transition: all 0.3s ease;
        }
        
        .entry-card:hover {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          border-color: #dee2e6;
        }
        
        .remove-btn {
          background: #fff;
          color: #dc3545;
          border: 1px solid #dc3545;
          border-radius: 6px;
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }
        
        .remove-btn:hover {
          background: #dc3545;
          color: white;
        }
        
        .card-title {
          color: var(--primary-color);
          font-weight: 700;
        }
        
        .card-body {
          padding: 1.5rem;
        }
        
        @media (max-width: 768px) {
          .certificates-form {
            padding: 1.5rem;
          }
          
          .col-md-6 {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Certificates