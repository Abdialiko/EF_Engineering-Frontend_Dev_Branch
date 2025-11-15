interface CertificateEntry {
  title?: string
  issuer?: string
  date?: string
  summary?: string
  name?: string
  issuingOrganization?: string
  issueDate?: string
  expirationDate?: string
}

interface ValidationErrors {
  [key: string]: string
}

const validateCertificates = (certificateEntries: CertificateEntry[]): ValidationErrors[] => {
  const errors: ValidationErrors[] = []

  // Certificates are optional, so empty array is valid
  if (!certificateEntries || certificateEntries.length === 0) {
    return errors
  }

  certificateEntries.forEach((entry, index) => {
    const entryErrors: ValidationErrors = {}

    // Handle both field name variations
    const title = entry.title || entry.name || ''
    const issuer = entry.issuer || entry.issuingOrganization || ''
    const issueDate = entry.date || entry.issueDate || ''
    const expirationDate = entry.expirationDate || ''

    // Certificate Title validation
    if (!title || !title.trim()) {
      entryErrors.title = 'Certificate title is required'
    } else if (title.trim().length < 2) {
      entryErrors.title = 'Certificate title must be at least 2 characters'
    } else if (title.trim().length > 100) {
      entryErrors.title = 'Certificate title must be 100 characters or less'
    }

    // Issuer validation
    if (!issuer || !issuer.trim()) {
      entryErrors.issuer = 'Issuing organization is required'
    } else if (issuer.trim().length < 2) {
      entryErrors.issuer = 'Issuing organization must be at least 2 characters'
    } else if (issuer.trim().length > 70) {
      entryErrors.issuer = 'Issuing organization must be 70 characters or less'
    }

    // Issue Date validation
    if (!issueDate) {
      entryErrors.date = 'Issue date is required'
    } else {
      const issue = new Date(issueDate)
      const today = new Date()
      if (issue > today) {
        entryErrors.date = 'Issue date cannot be in the future'
      }
      
      // Check if issue date is not too far in the past (e.g., more than 100 years)
      const yearsAgo = today.getFullYear() - issue.getFullYear()
      if (yearsAgo > 100) {
        entryErrors.date = 'Issue date seems too far in the past. Please verify.'
      }
    }

    // Expiration Date validation (optional but if provided, must be valid)
    if (expirationDate) {
      const expiry = new Date(expirationDate)
      const today = new Date()
      
      if (issueDate) {
        const issue = new Date(issueDate)
        if (expiry <= issue) {
          entryErrors.expirationDate = 'Expiration date must be after issue date'
        }
      }
      
      // Expiration date can be in the future (that's normal for certificates)
      if (expiry < today) {
        // This is just a warning, not an error - expired certificates are still valid entries
      }
    }

    // Summary validation (optional but if provided, validate length)
    if (entry.summary && entry.summary.trim().length > 500) {
      entryErrors.summary = 'Summary must be 500 characters or less'
    }

    errors[index] = entryErrors
  })

  return errors
}

export default validateCertificates

