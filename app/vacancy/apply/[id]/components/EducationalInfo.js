'use client'
import React, { useState, useEffect } from 'react'
import StepProgressBar from './StepProgressBar'

const EducationalInfo = ({ data, setData, step }) => {
  const [educationInfo, setEducationInfo] = useState({
    study_field: "",
    company: "",
    degree_type: "",
    cgpa: "",
    start_date: "",
    end_date: "",
  })
  const [localErrors, setLocalErrors] = useState({})

  // Debug: Log when component receives new data
  useEffect(() => {
    console.log('EducationalInfo - Current data.educationalInfo:', data?.educationalInfo)
    console.log('EducationalInfo - Full data object:', data)
  }, [data?.educationalInfo])

  const changeHandler = (e) => {
    const { name, value } = e.target
    setEducationInfo((previousInfo) => {
      return { ...previousInfo, [name]: value }
    })
    if(value){
      setLocalErrors({...localErrors, [name]: ""})
    }
  }

  const addEducationInfo = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    console.log('=== Add Education Function Called ===')
    console.log('Current educationInfo state:', educationInfo)
    console.log('Current data.educationalInfo:', data?.educationalInfo)
    
    // Comprehensive validation
    const newErrors = {}
    
    if (!educationInfo.study_field || !educationInfo.study_field.trim()) {
      newErrors.study_field = "Field of study is required"
    } else if (educationInfo.study_field.trim().length < 2) {
      newErrors.study_field = "Field of study must be at least 2 characters"
    } else if (educationInfo.study_field.trim().length > 70) {
      newErrors.study_field = "Field of study must be 70 characters or less"
    }
    
    if (!educationInfo.company || !educationInfo.company.trim()) {
      newErrors.company = "Institution name is required"
    } else if (educationInfo.company.trim().length < 2) {
      newErrors.company = "Institution name must be at least 2 characters"
    } else if (educationInfo.company.trim().length > 70) {
      newErrors.company = "Institution name must be 70 characters or less"
    }
    
    if (!educationInfo.degree_type || !educationInfo.degree_type.trim()) {
      newErrors.degree_type = "Qualification is required"
    } else if (educationInfo.degree_type.trim().length < 2) {
      newErrors.degree_type = "Qualification must be at least 2 characters"
    } else if (educationInfo.degree_type.trim().length > 50) {
      newErrors.degree_type = "Qualification must be 50 characters or less"
    }
    
    if (!educationInfo.start_date) {
      newErrors.start_date = "Start date is required"
    } else {
      const start = new Date(educationInfo.start_date)
      const today = new Date()
      if (start > today) {
        newErrors.start_date = "Start date cannot be in the future"
      }
    }
    
    if (!educationInfo.end_date) {
      newErrors.end_date = "End date is required"
    } else {
      const end = new Date(educationInfo.end_date)
      const today = new Date()
      if (end > today) {
        newErrors.end_date = "End date cannot be in the future"
      }
      
      // Check if end date is after start date
      if (educationInfo.start_date) {
        const start = new Date(educationInfo.start_date)
        if (end < start) {
          newErrors.end_date = "End date must be after start date"
        }
      }
    }
    
    // CGPA validation (optional but if provided, must be valid)
    if (educationInfo.cgpa && educationInfo.cgpa.trim()) {
      const cgpaValue = parseFloat(educationInfo.cgpa)
      if (isNaN(cgpaValue)) {
        newErrors.cgpa = "CGPA must be a valid number"
      } else if (cgpaValue < 0 || cgpaValue > 4.0) {
        newErrors.cgpa = "CGPA must be between 0 and 4.0"
      }
    }
    
    console.log('Validation errors:', newErrors)
    
    if (Object.keys(newErrors).length > 0) {
      console.log('Validation failed, setting errors and returning')
      setLocalErrors(newErrors)
      return
    }
    
    console.log('Validation passed, proceeding to add education')
    
    // Add to the main data
    console.log('Before setData - current data:', data)
    console.log('Education info to add:', educationInfo)
    
    // Create a copy of the education info to add
    const educationToAdd = {
      study_field: educationInfo.study_field,
      company: educationInfo.company,
      degree_type: educationInfo.degree_type,
      cgpa: educationInfo.cgpa,
      start_date: educationInfo.start_date,
      end_date: educationInfo.end_date,
    }
    
    setData(prev => {
      const currentEdu = Array.isArray(prev.educationalInfo) ? prev.educationalInfo : []
      console.log('Current educationalInfo array:', currentEdu)
      const newEdu = [...currentEdu, educationToAdd]
      console.log('New educationalInfo array after adding:', newEdu)
      
      const newData = {
        ...prev,
        educationalInfo: newEdu
      }
      console.log('After setData - full new data:', newData)
      return newData
    })
    
    // Reset the form
    setEducationInfo({
      study_field: "",
      company: "",
      degree_type: "",
      cgpa: "",
      start_date: "",
      end_date: "",
    })
    setLocalErrors({})
    
    console.log('Education added successfully! Form reset.')
  }

  const removeEducation = (index) => {
    setData(prev => {
      const newEducationalInfo = [...(prev.educationalInfo || [])]
      newEducationalInfo.splice(index, 1)
      return { ...prev, educationalInfo: newEducationalInfo }
    })
  }

  return (
    <div className="educational-info-form">
      {/* Step progress bar inside the form card */}
      <div className="mb-4">
        <StepProgressBar step={step} />
      </div>
      
      <h4 className="mb-4">Educational Background</h4>
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Field of Study *</label>
              <input
                type="text"
                className={`form-control ${localErrors.study_field ? 'is-invalid' : ''}`}
                name="study_field"
                value={educationInfo.study_field || ""}
                onChange={changeHandler}
                placeholder="Enter field of study"
              />
              {localErrors.study_field && (
                <div className="invalid-feedback">{localErrors.study_field}</div>
              )}
            </div>
            
            <div className="col-md-6 mb-3">
              <label className="form-label">Name of Institution *</label>
              <input
                type="text"
                className={`form-control ${localErrors.company ? 'is-invalid' : ''}`}
                name="company"
                value={educationInfo.company || ""}
                onChange={changeHandler}
                placeholder="Enter institution name"
              />
              {localErrors.company && (
                <div className="invalid-feedback">{localErrors.company}</div>
              )}
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Qualification *</label>
              <input
                type="text"
                className={`form-control ${localErrors.degree_type ? 'is-invalid' : ''}`}
                name="degree_type"
                value={educationInfo.degree_type || ""}
                onChange={changeHandler}
                placeholder="Enter qualification"
              />
              {localErrors.degree_type && (
                <div className="invalid-feedback">{localErrors.degree_type}</div>
              )}
            </div>
            
            <div className="col-md-6 mb-3">
              <label className="form-label">Final Grade</label>
              <input
                type="number"
                className="form-control"
                name="cgpa"
                value={educationInfo.cgpa || ""}
                onChange={changeHandler}
                placeholder="Enter final grade"
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Start Date *</label>
              <input
                type="date"
                className={`form-control ${localErrors.start_date ? 'is-invalid' : ''}`}
                name="start_date"
                value={educationInfo.start_date || ""}
                onChange={changeHandler}
              />
              {localErrors.start_date && (
                <div className="invalid-feedback">{localErrors.start_date}</div>
              )}
            </div>
            
            <div className="col-md-6 mb-3">
              <label className="form-label">End Date *</label>
              <input
                type="date"
                className={`form-control ${localErrors.end_date ? 'is-invalid' : ''}`}
                name="end_date"
                value={educationInfo.end_date || ""}
                onChange={changeHandler}
              />
              {localErrors.end_date && (
                <div className="invalid-feedback">{localErrors.end_date}</div>
              )}
            </div>
          </div>
          
          <div className="d-flex justify-content-end mt-3">
            <button
              type="button"
              className="add-btn"
              onClick={(e) => {
                console.log('=== BUTTON CLICKED ===', e)
                console.log('Event type:', e.type)
                console.log('Event target:', e.target)
                addEducationInfo(e)
              }}
              onMouseDown={(e) => {
                console.log('Button mouse down')
              }}
              style={{ 
                cursor: 'pointer', 
                zIndex: 10,
                position: 'relative',
                pointerEvents: 'auto'
              }}
            >
              <i className="fas fa-plus me-2"></i>
              Add Education
            </button>
          </div>
        </div>
      </div>
      
      {/* Display added educational entries */}
      {data && data.educationalInfo && Array.isArray(data.educationalInfo) && data.educationalInfo.length > 0 && (
        <div className="added-entries">
          <h5 className="mb-3">Added Educational Information ({data.educationalInfo.length}):</h5>
          {data.educationalInfo.map((edu, index) => (
            <div key={index} className="card mb-3 entry-card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h6 className="card-title">{edu.study_field} at {edu.company}</h6>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeEducation(index)}
                  >
                    <i className="fas fa-trash"></i> Remove
                  </button>
                </div>
                <p className="mb-1"><strong>Qualification:</strong> {edu.degree_type}</p>
                <p className="mb-1"><strong>Grade:</strong> {edu.cgpa || 'N/A'}</p>
                <p className="mb-0"><strong>Period:</strong> {edu.start_date} to {edu.end_date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#f0f0f0', fontSize: '0.8rem' }}>
          <strong>Debug:</strong> educationalInfo array length: {data?.educationalInfo?.length || 0}
          <pre style={{ marginTop: '0.5rem', fontSize: '0.7rem' }}>
            {JSON.stringify(data?.educationalInfo || [], null, 2)}
          </pre>
        </div>
      )}
      
      <style jsx>{`
        .educational-info-form {
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
          .educational-info-form {
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

export default EducationalInfo