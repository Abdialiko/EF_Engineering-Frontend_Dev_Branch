interface PersonalInfo {
  firstName: string
  middleName: string
  lastName: string
  birthDate: string
  email: string
  phone: string
  city: string
  subCity?: string
  woreda?: string
}

interface ValidationErrors {
  [key: string]: string
}

const validatePersonalInfo = (values: PersonalInfo): ValidationErrors => {
  const errors: ValidationErrors = {}
  const phoneRegex = /^\d{10}$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // First Name validation
  if (!values.firstName || !values.firstName.trim()) {
    errors.firstName = 'First name is required'
  } else if (values.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters'
  } else if (values.firstName.trim().length > 20) {
    errors.firstName = 'First name must be 20 characters or less'
  } else if (!/^[a-zA-Z\s]+$/.test(values.firstName.trim())) {
    errors.firstName = 'First name can only contain letters and spaces'
  }

  // Middle Name validation
  if (!values.middleName || !values.middleName.trim()) {
    errors.middleName = 'Middle name is required'
  } else if (values.middleName.trim().length < 2) {
    errors.middleName = 'Middle name must be at least 2 characters'
  } else if (values.middleName.trim().length > 20) {
    errors.middleName = 'Middle name must be 20 characters or less'
  } else if (!/^[a-zA-Z\s]+$/.test(values.middleName.trim())) {
    errors.middleName = 'Middle name can only contain letters and spaces'
  }

  // Last Name validation
  if (!values.lastName || !values.lastName.trim()) {
    errors.lastName = 'Last name is required'
  } else if (values.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters'
  } else if (values.lastName.trim().length > 20) {
    errors.lastName = 'Last name must be 20 characters or less'
  } else if (!/^[a-zA-Z\s]+$/.test(values.lastName.trim())) {
    errors.lastName = 'Last name can only contain letters and spaces'
  }

  // Birth Date validation
  if (!values.birthDate) {
    errors.birthDate = 'Date of birth is required'
  } else {
    const birthDate = new Date(values.birthDate)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (birthDate > today) {
      errors.birthDate = 'Date of birth cannot be in the future'
    } else if (age < 18 || (age === 18 && monthDiff < 0)) {
      errors.birthDate = 'You must be at least 18 years old'
    } else if (age > 100) {
      errors.birthDate = 'Please enter a valid date of birth'
    }
  }

  // Email validation
  if (!values.email || !values.email.trim()) {
    errors.email = 'Email address is required'
  } else if (!emailRegex.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address'
  } else if (values.email.trim().length > 100) {
    errors.email = 'Email address is too long'
  }

  // Phone validation
  if (!values.phone || !values.phone.trim()) {
    errors.phone = 'Phone number is required'
  } else {
    const phoneDigits = values.phone.replace(/\D/g, '')
    if (phoneDigits.length !== 10) {
      errors.phone = 'Phone number must be exactly 10 digits'
    } else if (!phoneRegex.test(phoneDigits)) {
      errors.phone = 'Invalid phone number format'
    }
  }

  // City validation
  if (!values.city || !values.city.trim()) {
    errors.city = 'City is required'
  } else if (values.city.trim().length < 2) {
    errors.city = 'City name must be at least 2 characters'
  } else if (values.city.trim().length > 50) {
    errors.city = 'City name must be 50 characters or less'
  }

  return errors
}

export default validatePersonalInfo

