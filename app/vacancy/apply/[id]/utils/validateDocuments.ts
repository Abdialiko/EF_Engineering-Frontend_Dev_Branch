interface Documents {
  resume: File | null
  coverLetter: File | null
}

interface ValidationErrors {
  [key: string]: string
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_FILE_TYPES = ['application/pdf']

const validateDocuments = (documents: Documents): ValidationErrors => {
  const errors: ValidationErrors = {}

  // Resume/CV validation - REQUIRED
  if (!documents.resume) {
    errors.resume = 'CV/Resume is required. Please upload a PDF file.'
  } else {
    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(documents.resume.type)) {
      errors.resume = `Invalid file type. Only PDF files are allowed. You uploaded: ${documents.resume.type || 'unknown type'}`
    }
    
    // Check file size
    if (documents.resume.size > MAX_FILE_SIZE) {
      const sizeInMB = (documents.resume.size / (1024 * 1024)).toFixed(2)
      errors.resume = `File size too large. Maximum size is 10MB. Your file is ${sizeInMB}MB`
    }
    
    // Check if file is empty
    if (documents.resume.size === 0) {
      errors.resume = 'The uploaded file appears to be empty. Please upload a valid PDF file.'
    }
    
    // Check file name
    if (!documents.resume.name || documents.resume.name.trim() === '') {
      errors.resume = 'File name is required'
    } else if (!documents.resume.name.toLowerCase().endsWith('.pdf')) {
      errors.resume = 'File must have a .pdf extension'
    }
  }

  // Cover Letter validation - OPTIONAL but if provided, must be valid
  if (documents.coverLetter) {
    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(documents.coverLetter.type)) {
      errors.coverLetter = `Invalid file type for supporting document. Only PDF files are allowed. You uploaded: ${documents.coverLetter.type || 'unknown type'}`
    }
    
    // Check file size
    if (documents.coverLetter.size > MAX_FILE_SIZE) {
      const sizeInMB = (documents.coverLetter.size / (1024 * 1024)).toFixed(2)
      errors.coverLetter = `Supporting document file size too large. Maximum size is 10MB. Your file is ${sizeInMB}MB`
    }
    
    // Check if file is empty
    if (documents.coverLetter.size === 0) {
      errors.coverLetter = 'The uploaded supporting document appears to be empty. Please upload a valid PDF file.'
    }
    
    // Check file name
    if (!documents.coverLetter.name || documents.coverLetter.name.trim() === '') {
      errors.coverLetter = 'Supporting document file name is required'
    } else if (!documents.coverLetter.name.toLowerCase().endsWith('.pdf')) {
      errors.coverLetter = 'Supporting document must have a .pdf extension'
    }
  }

  return errors
}

export default validateDocuments

