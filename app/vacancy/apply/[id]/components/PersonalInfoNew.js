'use client'
import { useState, useEffect } from 'react'
import StepProgressBar from './StepProgressBar'

const PersonalInfo = ({ data, setData, errors, jobInfo, step }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }))
  }

  return (
    <div className="personal-info-form">
      {/* Step progress bar inside the form card */}
      <div className="mb-4">
        <StepProgressBar step={step} />
      </div>
      
      {jobInfo && (
        <div className="alert alert-info mb-4">
          <h5 className="alert-heading">Applying for:</h5>
          <p className="mb-0 fw-bold">{jobInfo.title}</p>
        </div>
      )}
      
      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="firstName" className="form-label">First Name *</label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
            id="firstName"
            name="firstName"
            value={data.personalInfo.firstName || ''}
            onChange={handleChange}
            placeholder="Enter first name"
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>
        
        <div className="col-md-4 mb-3">
          <label htmlFor="middleName" className="form-label">Middle Name *</label>
          <input
            type="text"
            className={`form-control ${errors.middleName ? 'is-invalid' : ''}`}
            id="middleName"
            name="middleName"
            value={data.personalInfo.middleName || ''}
            onChange={handleChange}
            placeholder="Enter middle name"
          />
          {errors.middleName && <div className="invalid-feedback">{errors.middleName}</div>}
        </div>
        
        <div className="col-md-4 mb-3">
          <label htmlFor="lastName" className="form-label">Last Name *</label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
            id="lastName"
            name="lastName"
            value={data.personalInfo.lastName || ''}
            onChange={handleChange}
            placeholder="Enter last name"
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="birthDate" className="form-label">Date of Birth *</label>
          <input
            type="date"
            className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
            id="birthDate"
            name="birthDate"
            value={data.personalInfo.birthDate || ''}
            onChange={handleChange}
          />
          {errors.birthDate && <div className="invalid-feedback">{errors.birthDate}</div>}
        </div>
        
        <div className="col-md-6 mb-3">
          <label htmlFor="email" className="form-label">Email Address *</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={data.personalInfo.email || ''}
            onChange={handleChange}
            placeholder="Enter email address"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="phone" className="form-label">Phone Number *</label>
          <input
            type="tel"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            id="phone"
            name="phone"
            value={data.personalInfo.phone || ''}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>
        
        <div className="col-md-6 mb-3">
          <label htmlFor="city" className="form-label">City *</label>
          <input
            type="text"
            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
            id="city"
            name="city"
            value={data.personalInfo.city || ''}
            onChange={handleChange}
            placeholder="Enter city"
          />
          {errors.city && <div className="invalid-feedback">{errors.city}</div>}
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="subCity" className="form-label">Sub-city</label>
          <input
            type="text"
            className="form-control"
            id="subCity"
            name="subCity"
            value={data.personalInfo.subCity || ''}
            onChange={handleChange}
            placeholder="Enter sub-city"
          />
        </div>
        
        <div className="col-md-4 mb-3">
          <label htmlFor="woreda" className="form-label">Woreda</label>
          <input
            type="text"
            className="form-control"
            id="woreda"
            name="woreda"
            value={data.personalInfo.woreda || ''}
            onChange={handleChange}
            placeholder="Enter woreda"
          />
        </div>
      </div>
      
      <style jsx>{`
        .personal-info-form {
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
        
        .alert {
          border-radius: 8px;
          border: none;
          background: linear-gradient(120deg, #e9f7fe 0%, #f0f8ff 100%);
          border-left: 4px solid var(--primary-color);
        }
        
        .alert-heading {
          color: var(--primary-color);
          font-weight: 700;
        }
        
        .fw-bold {
          font-weight: 600 !important;
        }
        
        @media (max-width: 768px) {
          .personal-info-form {
            padding: 1.5rem;
          }
          
          .col-md-4, .col-md-6 {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default PersonalInfo