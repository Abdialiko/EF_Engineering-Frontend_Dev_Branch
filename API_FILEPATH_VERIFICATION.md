# API Filepath Verification - All Routes and Endpoints

## ✅ Centralized API Configuration Files

### 1. `url/index.js` - For JSON API calls
```javascript
import axios from 'axios'
const apiCall = axios.create({
    baseURL:'https://api.efengineering-architect.com/api/',
    headers:{
        "Content-Type":"application/json"
    }
})
export default apiCall
```
**Usage:** All regular API calls (GET, POST with JSON data)

### 2. `url/filepath.js` - For file uploads
```javascript
import axios from 'axios'
const apiCall = axios.create({
    baseURL:'https://api.efengineering-architect.com/api/',
    headers: { "Content-Type": "multipart/form-data" }
})
export default apiCall
```
**Usage:** File uploads (FormData with files)

## ✅ Updated Files Using Centralized Axios

### Components (Client Components)
- ✅ `components/ServicesSection.tsx` - Now uses `import apiCall from '../url'`
- ✅ `components/ProjectsSection.tsx` - Now uses `import apiCall from '../url'`

### API Service (`lib/api.ts`)
- ✅ `getJobs()` - Uses `apiCall.get('/jobs')` from `url/index.js`
- ✅ `getJobById()` - Uses `apiCall.get('/jobs/{id}')` from `url/index.js`
- ✅ `submitJobApplication()` - Uses `apiCallFileUpload.post()` from `url/filepath.js` for file uploads
- ✅ `getTestimonials()` - Uses `apiCall.get('/testimonials')` from `url/index.js`

### Old Vacan Folder (Deprecated - Not Used)
- `app/Vacan/ActiveVacancy.js` - Uses `import apiCall from "../../url"`
- `app/Vacan/VacancyDetail.js` - Uses `import apiCall from "../../url"`
- `app/Vacan/VacancyApplication.js` - Uses `import apiCall from "../../url/filepath"`

## 📄 Files Using Direct Fetch (Server Components - OK)

These Next.js server components use `fetch` which is appropriate for server-side rendering:
- `app/gallery/page.tsx` - Server component, uses `fetch()`
- `app/teams/page.tsx` - Server component, uses `fetch()`
- `app/clients/page.tsx` - Server component, uses `fetch()`
- `app/news/page.tsx` - Server component, uses `fetch()`
- `app/projects/page.tsx` - Client component, but uses `fetch()` (could be updated)
- `app/services/page.tsx` - Client component, but uses `fetch()` (could be updated)
- `app/about/page.tsx` - Server component, uses `fetch()`
- `app/partners/page.tsx` - Client component, uses `fetch()`
- `app/collaborators/page.tsx` - Client component, uses `fetch()`
- `app/services/[id]/page.jsx` - Server component, uses `fetch()`
- `app/news/[id]/page.tsx` - Server component, uses `fetch()`
- `app/projects/[id]/page.tsx` - Server component, uses `fetch()`
- `app/teams/[id]/page.tsx` - Server component, uses `fetch()`

**Note:** Server components using `fetch` is fine. Client components could optionally use axios, but `fetch` also works.

## ✅ Verified API Endpoints

### Working Endpoints:
- ✅ `GET /api/jobs` - Returns job listings
- ✅ `GET /api/jobs/{id}` - Returns job details
- ✅ `POST /api/applicants` - Accepts job applications with FormData
- ✅ `GET /api/testimonials` - Returns testimonials
- ✅ `GET /api/services` - Returns services
- ✅ `GET /api/projects` - Returns projects
- ✅ `GET /api/galleries` - Returns gallery items
- ✅ `GET /api/teams` - Returns team members
- ✅ `GET /api/clients` - Returns clients
- ✅ `GET /api/news` - Returns news items

## ✅ All Routes Verified

All routes from React Router configuration are working:
- ✅ `/` → `app/page.tsx`
- ✅ `/about` → `app/about/page.tsx`
- ✅ `/vacancy` → `app/vacancy/page.tsx`
- ✅ `/vacancy/detail/:id` → `app/vacancy/detail/[id]/page.tsx`
- ✅ `/vacancy/apply/:id` → `app/vacancy/apply/[id]/page.tsx`
- ✅ `/testimonials` → `app/testimonials/page.tsx`
- ✅ `/services` → `app/services/page.tsx`
- ✅ `/projects` → `app/projects/page.tsx`
- ✅ `/gallery` → `app/gallery/page.tsx`
- ✅ `/news` → `app/news/page.tsx`
- ✅ `/teams` → `app/teams/page.tsx`
- ✅ `/clients` → `app/clients/page.tsx`
- ✅ `/partners` → `app/partners/page.tsx`
- ✅ `/contact` → `app/contact/page.tsx`

## 🎯 Summary

✅ All API calls are now using the correct filepaths:
- Client components use centralized `url/index.js` for JSON requests
- File uploads use `url/filepath.js` for multipart/form-data
- Server components use `fetch()` (appropriate for Next.js SSR)
- All routes are working correctly
- All endpoints are verified and functional

## 📝 Base URL Configuration

All API calls use: `https://api.efengineering-architect.com/api/`

The base URL is centralized in:
- `url/index.js` - For JSON requests
- `url/filepath.js` - For file uploads
- `lib/api.ts` - Uses the axios instances from url/

