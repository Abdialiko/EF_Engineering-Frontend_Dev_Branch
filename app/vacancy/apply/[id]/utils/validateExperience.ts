interface ExperienceEntry {
  title?: string
  company?: string
  start_date?: string
  end_date?: string
  summary?: string
  is_current?: boolean
  position?: string
  companyName?: string
  startDate?: string
  endDate?: string
}

interface ValidationErrors {
  [key: string]: string
}

const validateExperience = (experienceEntries: ExperienceEntry[]): ValidationErrors[] => {
  const errors: ValidationErrors[] = []

  // Experience is optional, so empty array is valid
  if (!experienceEntries || experienceEntries.length === 0) {
    return errors
  }

  experienceEntries.forEach((entry, index) => {
    const entryErrors: ValidationErrors = {}

    // Handle both field name variations
    const position = entry.title || entry.position || ''
    const company = entry.company || entry.companyName || ''
    const startDate = entry.start_date || entry.startDate || ''
    const endDate = entry.end_date || entry.endDate || ''
    const isCurrent = entry.is_current || false

    // Position validation
    if (!position || !position.trim()) {
      entryErrors.title = 'Position/Job title is required'
    } else if (position.trim().length < 2) {
      entryErrors.title = 'Position must be at least 2 characters'
    } else if (position.trim().length > 70) {
      entryErrors.title = 'Position must be 70 characters or less'
    }

    // Company validation
    if (!company || !company.trim()) {
      entryErrors.company = 'Organization/Company name is required'
    } else if (company.trim().length < 2) {
      entryErrors.company = 'Company name must be at least 2 characters'
    } else if (company.trim().length > 70) {
      entryErrors.company = 'Company name must be 70 characters or less'
    }

    // Start Date validation
    if (!startDate) {
      entryErrors.start_date = 'Start date is required'
    } else {
      const start = new Date(startDate)
      const today = new Date()
      if (start > today) {
        entryErrors.start_date = 'Start date cannot be in the future'
      }
    }

    // End Date validation
    if (!isCurrent) {
      if (!endDate) {
        entryErrors.end_date = 'End date is required (or check "I currently work here")'
      } else {
        const end = new Date(endDate)
        const today = new Date()
        if (end > today) {
          entryErrors.end_date = 'End date cannot be in the future'
        }
        
        // Check if end date is after start date
        if (startDate) {
          const start = new Date(startDate)
          if (end < start) {
            entryErrors.end_date = 'End date must be after start date'
          }
          
          // Check if employment duration is reasonable (at least 1 day)
          const diffTime = Math.abs(end.getTime() - start.getTime())
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          if (diffDays < 1) {
            entryErrors.end_date = 'Employment duration must be at least 1 day'
          }
        }
      }
    } else {
      // If current job, end date should not be set or should be in the future
      if (endDate) {
        const end = new Date(endDate)
        const today = new Date()
        if (end <= today) {
          entryErrors.end_date = 'For current employment, end date should be in the future or left empty'
        }
      }
    }

    // Summary validation (optional but if provided, validate length)
    if (entry.summary && entry.summary.trim().length > 1000) {
      entryErrors.summary = 'Summary must be 1000 characters or less'
    }

    errors[index] = entryErrors
  })

  return errors
}

export default validateExperience

