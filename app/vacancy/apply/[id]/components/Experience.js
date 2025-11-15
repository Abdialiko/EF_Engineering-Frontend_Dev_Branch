'use client'
import { useState } from 'react'
import StepProgressBar from './StepProgressBar'

const Experience = ({ data, setData, step }) => {
  const [experience, setExperience] = useState({
    title: "",
    company: "",
    start_date: "",
    end_date: "",
    summary: "",
    is_current: false
  })
  const [localErrors, setLocalErrors] = useState({})

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    setExperience((previousExperience) => {
      return { ...previousExperience, [name]: newValue }
    })
    if(value){
      setLocalErrors({...localErrors, [name]: ""})
    }
  }

  const addExperience = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Add Experience clicked', experience)
    // Comprehensive validation
    const newErrors = {}
    if (!experience.title || !experience.title.trim()) {
      newErrors.title = "Position is required"
    } else if (experience.title.trim().length < 2) {
      newErrors.title = "Position must be at least 2 characters"
    } else if (experience.title.trim().length > 70) {
      newErrors.title = "Position must be 70 characters or less"
    }
    
    if (!experience.company || !experience.company.trim()) {
      newErrors.company = "Organization is required"
    } else if (experience.company.trim().length < 2) {
      newErrors.company = "Organization name must be at least 2 characters"
    } else if (experience.company.trim().length > 70) {
      newErrors.company = "Organization name must be 70 characters or less"
    }
    
    if (!experience.start_date) {
      newErrors.start_date = "Start date is required"
    } else {
      const start = new Date(experience.start_date)
      const today = new Date()
      if (start > today) {
        newErrors.start_date = "Start date cannot be in the future"
      }
    }
    
    // End date validation - only required if not current job
    if (!experience.is_current) {
      if (!experience.end_date) {
        newErrors.end_date = "End date is required (or check 'I currently work here')"
      } else {
        const end = new Date(experience.end_date)
        const today = new Date()
        if (end > today) {
          newErrors.end_date = "End date cannot be in the future"
        }
        
        // Check if end date is after start date
        if (experience.start_date) {
          const start = new Date(experience.start_date)
          if (end < start) {
            newErrors.end_date = "End date must be after start date"
          }
          
          // Check if employment duration is reasonable (at least 1 day)
          const diffTime = Math.abs(end.getTime() - start.getTime())
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          if (diffDays < 1) {
            newErrors.end_date = "Employment duration must be at least 1 day"
          }
        }
      }
    } else {
      // If current job, end_date should be empty or in the future
      if (experience.end_date) {
        const end = new Date(experience.end_date)
        const today = new Date()
        if (end <= today) {
          newErrors.end_date = "For current employment, end date should be in the future or left empty"
        }
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setLocalErrors(newErrors)
      return
    }
    
    // Add to the main data
    setData(prev => {
      const newData = {
        ...prev,
        experience: [...(prev.experience || []), { ...experience }]
      }
      console.log('Adding experience, new data:', newData)
      return newData
    })
    
    // Reset the form
    setExperience({
      title: "",
      company: "",
      start_date: "",
      end_date: "",
      summary: "",
      is_current: false
    })
    setLocalErrors({})
  }

  const removeExperience = (index) => {
    setData(prev => {
      const newExperience = [...(prev.experience || [])]
      newExperience.splice(index, 1)
      return { ...prev, experience: newExperience }
    })
  }

  return (
    <div className="experience-form">
      {/* Step progress bar inside the form card */}
      <div className="mb-4">
        <StepProgressBar step={step} />
      </div>
      
      <h4 className="mb-4">Work Experience</h4>
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Position *</label>
              <input
                type="text"
                className={`form-control ${localErrors.title ? 'is-invalid' : ''}`}
                name="title"
                value={experience.title || ""}
                onChange={changeHandler}
                placeholder="Enter position"
              />
              {localErrors.title && (
                <div className="invalid-feedback">{localErrors.title}</div>
              )}
            </div>
            
            <div className="col-md-6 mb-3">
              <label className="form-label">Organization *</label>
              <input
                type="text"
                className={`form-control ${localErrors.company ? 'is-invalid' : ''}`}
                name="company"
                value={experience.company || ""}
                onChange={changeHandler}
                placeholder="Enter organization name"
              />
              {localErrors.company && (
                <div className="invalid-feedback">{localErrors.company}</div>
              )}
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Start Date *</label>
              <input
                type="date"
                className={`form-control ${localErrors.start_date ? 'is-invalid' : ''}`}
                name="start_date"
                value={experience.start_date || ""}
                onChange={changeHandler}
              />
              {localErrors.start_date && (
                <div className="invalid-feedback">{localErrors.start_date}</div>
              )}
            </div>
            
            <div className="col-md-6 mb-3">
              <label className="form-label">End Date {!experience.is_current && '*'}</label>
              <input
                type="date"
                className={`form-control ${localErrors.end_date ? 'is-invalid' : ''}`}
                name="end_date"
                value={experience.end_date || ""}
                onChange={changeHandler}
                disabled={experience.is_current}
              />
              {localErrors.end_date && (
                <div className="invalid-feedback">{localErrors.end_date}</div>
              )}
              {experience.is_current && (
                <small className="form-text text-muted">Leave empty for current employment</small>
              )}
            </div>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Summary</label>
            <textarea
              className="form-control"
              name="summary"
              rows="3"
              value={experience.summary || ""}
              onChange={changeHandler}
              placeholder="Describe your responsibilities and achievements"
            ></textarea>
          </div>
          
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="is_current"
              name="is_current"
              checked={experience.is_current || false}
              onChange={(e) => {
                const checked = e.target.checked
                changeHandler(e)
                // Clear end_date if checking "current"
                if (checked) {
                  setExperience(prev => ({ ...prev, end_date: "" }))
                  setLocalErrors(prev => {
                    const newErrors = { ...prev }
                    delete newErrors.end_date
                    return newErrors
                  })
                }
              }}
            />
            <label className="form-check-label" htmlFor="is_current">
              I currently work here
            </label>
          </div>
          
          <div className="d-flex justify-content-end mt-3">
            <button
              type="button"
              className="add-btn"
              onClick={addExperience}
            >
              <i className="fas fa-plus me-2"></i>
              Add Experience
            </button>
          </div>
        </div>
      </div>
      
      {/* Display added experience entries */}
      {data.experience && data.experience.length > 0 && (
        <div className="added-entries">
          <h5 className="mb-3">Added Experience Information:</h5>
          {data.experience.map((exp, index) => (
            <div key={index} className="card mb-3 entry-card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h6 className="card-title">{exp.title} at {exp.company}</h6>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeExperience(index)}
                  >
                    <i className="fas fa-trash"></i> Remove
                  </button>
                </div>
                <p className="mb-1"><strong>Summary:</strong> {exp.summary || 'N/A'}</p>
                <p className="mb-0"><strong>Period:</strong> {exp.start_date} to {exp.end_date} {exp.is_current ? '(Current)' : ''}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <style jsx>{`
        .experience-form {
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
        
        .form-check-input:checked {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }
        
        .form-check-label {
          font-weight: 500;
          color: #495057;
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
        
        textarea.form-control {
          min-height: 100px;
          resize: vertical;
        }
        
        @media (max-width: 768px) {
          .experience-form {
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

export default Experience