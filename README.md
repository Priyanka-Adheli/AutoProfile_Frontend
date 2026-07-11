# AutoProfile — Frontend

The web client for **AutoProfile**, an AI-assisted resume builder. Built with Vite + React 19, Redux Toolkit, Tailwind CSS 4, and React Router 7. It talks to the AutoProfile backend over Axios with cookie-based auth.

---

## Tech Stack

- **Vite 7** — dev server / build tool
- **React 19** + **React Router DOM 7**
- **Redux Toolkit** + **react-redux** — auth state
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **Axios** — HTTP client (`withCredentials: true`)
- **lucide-react** — icon set
- **react-hot-toast** — toast notifications
- **react-pdftotext** — client-side PDF text extraction for resume upload
- **ESLint 9** — flat config with React Hooks + React Refresh plugins

---

## Project Structure

```
AutoProfile_Frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── app/
│   │   ├── features/
│   │   │   └── authSlice.js        # user + loading state
│   │   └── store.js                # Redux store
│   ├── assets/
│   │   ├── assets.js
│   │   ├── dummy_profile.png
│   │   ├── logo.svg
│   │   └── templates/              # resume template components
│   │       ├── ClassicTemplate.jsx
│   │       ├── MinimalTemplate.jsx
│   │       ├── MinimalImageTemplate.jsx
│   │       └── ModernTemplate.jsx
│   ├── components/
│   │   ├── home/                   # landing page sections
│   │   │   ├── Banners.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Testimonial.jsx
│   │   │   ├── CallToAction.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Title.jsx
│   │   ├── PersonalInfoForm.jsx
│   │   ├── ProfessionalSummaryForm.jsx
│   │   ├── ExperienceForm.jsx
│   │   ├── EducationForm.jsx
│   │   ├── ProjectForm.jsx
│   │   ├── SkillsForm.jsx
│   │   ├── TemplateSelector.jsx
│   │   ├── ColorPicker.jsx
│   │   ├── ResumePreview.jsx
│   │   ├── Navbar.jsx
│   │   └── Loader.jsx
│   ├── configs/
│   │   └── axiosClient.js          # axios instance, reads VITE_BASE_URL
│   ├── pages/
│   │   ├── Home.jsx                # public landing
│   │   ├── Login.jsx               # login / register
│   │   ├── Layout.jsx              # authed shell (Navbar + Outlet)
│   │   ├── Dashboard.jsx           # list / create resumes
│   │   ├── ResumeBuilder.jsx       # section-by-section editor
│   │   └── Preview.jsx             # public share view
│   ├── App.jsx                     # routes + initial user fetch
│   ├── main.jsx                    # Provider + BrowserRouter bootstrap
│   ├── App.css
│   └── index.css
├── index.html
├── vite.config.js
├── vercel.json                     # SPA rewrite to /index.html
├── eslint.config.js
└── package.json
```

---

## Routes

| Path                       | Component        | Notes                              |
| -------------------------- | ---------------- | ---------------------------------- |
| `/`                        | `Home`           | Public landing page                |
| `/login`                   | `Login`          | Login / register                   |
| `/app`                     | `Layout` → `Dashboard` | Resume dashboard             |
| `/app/builder/:resumeId`   | `ResumeBuilder`  | Full editor for a resume           |
| `/view/:resumeId`          | `Preview`        | Shareable preview view             |

Auth state hydrates on app load via `GET /users/data` (see `src/App.jsx`). The response populates the Redux `auth` slice.

---

## Resume Builder

The builder (`src/pages/ResumeBuilder.jsx`) drives a single `resumeData` object through the following sections:

- Personal Info
- Professional Summary
- Experience
- Education
- Projects
- Skills

Users can switch between the four templates (`classic`, `minimal`, `minimal-image`, `modern`), pick an accent color, toggle a public/shareable flag, and preview the resume live via `ResumePreview.jsx`.

---

## Getting Started

### Prerequisites

- Node.js 18+ (Vite 7 requirement)
- A running instance of the AutoProfile backend

### Install

```bash
npm install
```

### Environment

Create a `.env` file at the project root:

```env
VITE_BASE_URL=http://localhost:3000/api
```

`VITE_BASE_URL` is consumed by `src/configs/axiosClient.js` as the Axios `baseURL`. All requests are sent with `withCredentials: true`, so the backend must set CORS to allow this origin with credentials.

### Scripts

| Command           | What it does                     |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start the Vite dev server        |
| `npm run build`   | Production build to `dist/`      |
| `npm run preview` | Preview the production build     |
| `npm run lint`    | Run ESLint over the project      |

---

## Deployment

Deployed on **Vercel**. `vercel.json` rewrites all paths to `/index.html` so client-side routes (`/app/builder/:id`, `/view/:id`, etc.) resolve correctly on refresh.

Set `VITE_BASE_URL` in the Vercel project's environment variables before deploying.

---

## Backend Contract

The frontend expects the backend to expose (at minimum):

- `GET  /users/data` — returns `{ user }` for the authenticated session
- `GET  /resumes/get/:resumeId` — returns `{ resume }`
- Resume create / update / delete endpoints used by the dashboard and builder

Authentication is cookie-based (HTTP-only). No token is stored in `localStorage`.
