'use client'
import React from "react"

const StepProgressBar = ({ step, totalSteps = 5 }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1)
  const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100

  return (
    <div className="step-progress-container mb-5">
      <div className="d-flex justify-content-between position-relative mb-4">
        {/* Progress line background */}
        <div className="progress-line"></div>
        
        {/* Progress line filled */}
        <div 
          className="progress-line-filled"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        
        {steps.map((stepNum) => (
          <div 
            key={stepNum}
            className="step-wrapper"
          >
            <div 
              className={`step-circle ${step >= stepNum ? 'completed' : ''}`}
            >
              {stepNum}
            </div>
            <div 
              className="step-label"
            >
              {stepNum === 1 && 'Personal'}
              {stepNum === 2 && 'Education'}
              {stepNum === 3 && 'Experience'}
              {stepNum === 4 && 'Certificates'}
              {stepNum === 5 && 'Documents'}
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .step-progress-container {
          position: relative;
          padding: 1rem 0;
        }
        
        .progress-line {
          position: absolute;
          top: 22px;
          left: 0;
          right: 0;
          height: 4px;
          background-color: #e0e0e0;
          z-index: 1;
          border-radius: 2px;
        }
        
        .progress-line-filled {
          position: absolute;
          top: 22px;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color) 0%, var(--primary-color-light) 100%);
          z-index: 2;
          transition: width 0.5s ease;
          border-radius: 2px;
        }
        
        .step-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 3;
          position: relative;
        }
        
        .step-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #fff;
          border: 3px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #999;
          transition: all 0.3s ease;
          margin-bottom: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        .step-circle.completed {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-light) 100%);
          border-color: var(--primary-color);
          color: #fff;
          transform: scale(1.1);
          box-shadow: 0 4px 10px rgba(18, 59, 139, 0.3);
        }
        
        .step-label {
          font-size: 14px;
          font-weight: 600;
          color: #666;
          text-align: center;
          white-space: nowrap;
          margin-top: 5px;
        }
        
        .step-circle.completed + .step-label {
          color: var(--primary-color);
          font-weight: 700;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .step-circle {
            width: 30px;
            height: 30px;
            font-size: 14px;
          }
          
          .step-label {
            font-size: 12px;
          }
          
          .progress-line, .progress-line-filled {
            top: 17px;
          }
        }
      `}</style>
    </div>
  )
}

export default StepProgressBar