interface EducationalEntry {
  study_field?: string
  company?: string
  degree_type?: string
  cgpa?: string
  start_date?: string
  end_date?: string
  institution?: string
  level?: string
  fieldOfStudy?: string
  startDate?: string
  endDate?: string
}

interface ValidationErrors {
  [key: string]: string
}

const validateEducationalInfo = (educationEntries: EducationalEntry[]): ValidationErrors[] => {
  const errors: ValidationErrors[] = []

  // If there are no education entries, that's valid (optional section)
  if (!educationEntries || educationEntries.length === 0) {
    return errors
  }

  educationEntries.forEach((entry, index) => {
    const entryErrors: ValidationErrors = {}

    // Handle both field name variations (study_field vs fieldOfStudy, etc.)
    const studyField = entry.study_field || entry.fieldOfStudy || ''
    const institution = entry.company || entry.institution || ''
    const degreeType = entry.degree_type || entry.level || ''
    const startDate = entry.start_date || entry.startDate || ''
    const endDate = entry.end_date || entry.endDate || ''
    const cgpa = entry.cgpa || ''

    // Field of Study validation
    if (!studyField || !studyField.trim()) {
      entryErrors.study_field = 'Field of study is required'
    } else if (studyField.trim().length < 2) {
      entryErrors.study_field = 'Field of study must be at least 2 characters'
    } else if (studyField.trim().length > 70) {
      entryErrors.study_field = 'Field of study must be 70 characters or less'
    }

    // Institution validation
    if (!institution || !institution.trim()) {
      entryErrors.company = 'Institution name is required'
    } else if (institution.trim().length < 2) {
      entryErrors.company = 'Institution name must be at least 2 characters'
    } else if (institution.trim().length > 70) {
      entryErrors.company = 'Institution name must be 70 characters or less'
    }

    // Degree/Qualification validation
    if (!degreeType || !degreeType.trim()) {
      entryErrors.degree_type = 'Qualification/Degree type is required'
    } else if (degreeType.trim().length < 2) {
      entryErrors.degree_type = 'Qualification must be at least 2 characters'
    } else if (degreeType.trim().length > 50) {
      entryErrors.degree_type = 'Qualification must be 50 characters or less'
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
    if (!endDate) {
      entryErrors.end_date = 'End date is required'
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
      }
    }

    // CGPA validation (optional but if provided, must be valid)
    if (cgpa && cgpa.trim()) {
      const cgpaValue = parseFloat(cgpa)
      if (isNaN(cgpaValue)) {
        entryErrors.cgpa = 'CGPA must be a valid number'
      } else if (cgpaValue < 0 || cgpaValue > 4.0) {
        entryErrors.cgpa = 'CGPA must be between 0 and 4.0'
      }
    }

    errors[index] = entryErrors
  })

  return errors
}

export default validateEducationalInfo

