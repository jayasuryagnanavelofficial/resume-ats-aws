# ResumeLens ATS 🎯

> **A deterministic Applicant Tracking System (ATS) evaluation engine and candidate dashboard.**
> Built as a College Cloud Technology Capstone Project, engineered with an isolated service architecture ready for future AWS deployment.

---

## 📌 Project Overview

**ResumeLens ATS** is designed to demystify how automated recruiting platforms screen applicant resumes. In competitive technical hiring pipelines, over 70% of resumes are filtered out before reaching a human recruiter due to missing keywords, non-standard section formatting, or low quantifiable metrics.

ResumeLens solves this problem by providing:
- **Deterministic 100-Point ATS Scoring**: Transparent, reproducible evaluation across 8 critical pillars without random fluctuations.
- **Targeted Keyword Gap Analysis**: Real-time extraction of required skills and certifications from any Job Description.
- **Section-by-Section Health Audit**: Clear pass/warning/fail indicators for Contact Information, Professional Summary, Skills, Work Experience, Education, Projects, Keywords, and Formatting.
- **Prioritized Improvement Roadmap**: High, medium, and low priority recommendations to maximize interview callbacks.
- **Instant Client-Side Parsing**: Parses PDF and TXT resumes directly in the browser with pre-loaded sample candidate profiles for instant testing.
- **Role-Based Workspaces**: Candidate Dashboard for personal score tracking and Admin Portal for aggregate telemetry and user management.

---

## 🛠 Technology Stack

### Frontend & Application Layer
- **React 18** – Functional component-driven UI architecture with custom hooks
- **Vite 6** – High-performance development server and optimized rollup bundler
- **Tailwind CSS 3** – Utility-first SaaS design system with custom brand palette
- **React Router DOM 6** – Declarative client-side routing with protected route boundaries
- **Lucide React** – Clean, modern iconography
- **PDF.js (`pdfjs-dist`)** – In-browser PDF document parsing and text extraction

### Architecture & Data Layer (Stage 1 - Local)
- **Isolated Service Architecture**: `authService.js`, `storageService.js`, and `atsService.js` are decoupled from React components.
- **Mock Local Storage**: Browser `localStorage` simulation of persistent sessions and analysis histories.
- **Zero Cloud Credentials**: Completely clean client codebase with no hardcoded secrets or AWS keys.

---

## 📊 Deterministic ATS Scoring Formula

The scoring engine adheres strictly to a deterministic 100-point rubric:

| Evaluation Pillar | Max Points | Evaluation Criteria |
| :--- | :---: | :--- |
| **Contact Information** | **5** | Professional email address, phone number, location, and LinkedIn/GitHub profile links |
| **Professional Summary** | **10** | Clear section header, concise length (30-120 words), and strong action verbs |
| **Technical Skills** | **20** | Section presence and technical skill density matched against 150+ technology terms |
| **Work Experience** | **20** | Chronological dates, recognizable job titles, and quantified achievements (%, $, numbers) |
| **Education Credentials** | **10** | Degree classification (B.S., M.S., B.Tech), accredited university, and graduation year |
| **Projects Portfolio** | **10** | Dedicated projects section demonstrating concrete tools, cloud services, and live links |
| **Target Keywords Match** | **15** | Mathematical overlap ratio against keywords extracted from the target Job Description |
| **Formatting & Readability** | **10** | Single-column structure, standard bullet points, clean ASCII encoding, optimal word count |
| **Total Score** | **100** | **&ge;80: ATS Ready • 65–79: Competitive • &lt;65: Revision Recommended** |

---

## 🚀 Application Flow & User Journeys

```
               ┌───────────────────────────────┐
               │    Landing Page (Overview)    │
               │   - Hero: Test Before Recruiter│
               │   - 100-Point ATS Rubric      │
               │   - How It Works & Features   │
               └──────────────┬────────────────┘
                              │
               ┌──────────────┴────────────────┐
               │
        ┌──────▼──────┐                 ┌──────▼──────┐
        │  Sign In /  │                 │ ATS Scanner │
        │  Register   │                 │  /analyzer  │
        └──────┬──────┘                 └──────┬──────┘
               │                               │
        ┌──────▼───────────────────────────────▼──────┐
        │ User Workspace (/dashboard)                 │
        │ - Latest ATS score gauge & average metrics  │
        │ - Previous resume analysis history          │
        │ - Actionable improvement suggestions        │
        └──────────────────────┬──────────────────────┘
                               │
                        ┌──────▼──────┐
                        │ Admin Portal│ (Role: admin)
                        │   /admin    │
                        │ - User list │
                        │ - Global runs│
                        │ - Blueprint │
                        └─────────────┘
```

1. **Candidate Assessment Flow (`/analyzer`)**:
   - The user uploads a resume PDF (or clicks a 1-click sample profile like *Alex Morgan - Senior SWE*).
   - The user pastes a job description (or selects a sample JD like *Senior Full-Stack Engineer*).
   - The engine deterministically parses both documents and renders the circular score gauge, keyword match percentage, detected skills, missing keywords, section breakdown, and prioritized action items.
   - The user can optionally save the analysis to their profile history.

2. **Authentication & Session Flow (`/login`, `/register`)**:
   - Clean mock authentication with session persistence.
   - Convenient 1-click **Quick Demo Autofill** buttons on the login page for evaluators:
     - **Candidate Demo**: `user@resumelens.com` / `password123`
     - **Admin Reviewer**: `admin@resumelens.com` / `admin123`

3. **Candidate Dashboard Flow (`/dashboard`)**:
   - Protected route displaying historical ATS score trajectory, total analyses, and average score.
   - Interactive history table with modal inspection of previous evaluations.

4. **Admin Dashboard Flow (`/admin`)**:
   - Protected route for administrators.
   - Displays platform-wide KPIs (total users, total scans, average score, readiness distribution).
   - Searchable directory of registered users and global analysis telemetry.
   - Interactive AWS Architecture Blueprint preview.

---

## ☁️ Planned AWS Cloud Architecture (Stage 2 Roadmap)

This project has been architecturally prepared for deployment onto Amazon Web Services:

```
                                  AWS CLOUD
   ┌─────────────────────────────────────────────────────────────────────────┐
   │                                                                         │
   │   [ Route 53 + CloudFront CDN ] ───► [ Amazon S3: Static Web Hosting ]  │
   │                                              (React + Vite Single Page) │
   │                                                                         │
   │   [ Amazon Cognito User Pools ] ───► JWT Authentication & RBAC          │
   │                                         (Replaces authService.js)       │
   │                                                                         │
   │   [ Amazon S3 Resumes Bucket ]  ───► Presigned Upload URLs              │
   │                                         (Replaces storageService.js)    │
   │                                                                         │
   │   [ API Gateway (REST API) ]    ───► [ AWS Lambda ATS Engine ]          │
   │                                         ├── Amazon Textract (OCR)       │
   │                                         └── Amazon DynamoDB / RDS       │
   │                                                                         │
   └─────────────────────────────────────────────────────────────────────────┘
```

### Modular Replacement Mapping
- **`src/services/authService.js`** $\rightarrow$ Integrates with **Amazon Cognito User Pools** (`InitiateAuthCommand`, `SignUpCommand`, `GlobalSignOutCommand`).
- **`src/services/storageService.js`** $\rightarrow$ Integrates with **Amazon S3** (using presigned URLs for secure PDF upload) and **Amazon DynamoDB** for persistence of analysis JSON records.
- **`src/services/atsService.js`** $\rightarrow$ Transferred to an **AWS Lambda** serverless microservice behind **Amazon API Gateway**, with **Amazon Textract** added for OCR on scanned image-based PDFs.

---

## 💻 Local Setup & Development

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### Installation

1. **Clone or open the project directory**:
   ```bash
   cd resume-ats-aws
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```
   Generates optimized static output in `dist/`.

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 📂 Project Directory Structure

```
resume-ats-aws/
├── public/
│   └── favicon.svg              # Clean SVG application icon
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── ProtectedRoute.jsx   # Client-side route protection & role verification
│   │   ├── layout/
│   │   │   ├── Navbar.jsx           # Responsive navigation with auth state & mobile drawer
│   │   │   └── Footer.jsx           # Project footer with architecture roadmap
│   │   └── ui/
│   │       ├── Badge.jsx            # Multi-variant status pill badge
│   │       ├── Button.jsx           # Accessible button with variants & loading state
│   │       ├── Card.jsx             # SaaS card with header & border styling
│   │       ├── Modal.jsx            # Accessible dialog with ESC listener & backdrop
│   │       ├── ProgressBar.jsx      # Animated linear progress bar
│   │       └── ScoreGauge.jsx       # SVG circular ATS score gauge (0-100)
│   ├── context/
│   │   └── AuthContext.jsx          # Application authentication provider & state hook
│   ├── data/
│   │   └── sampleData.js            # Seed users, pre-packaged resumes & job descriptions
│   ├── pages/
│   │   ├── AdminDashboardPage.jsx   # Platform administration, telemetry & AWS blueprint
│   │   ├── AnalyzerPage.jsx         # 100-point ATS scanner, PDF extractor & audit view
│   │   ├── DashboardPage.jsx        # Candidate workspace, scores & historical audits
│   │   ├── LandingPage.jsx          # Public SaaS homepage, hero & scoring rubric
│   │   ├── LoginPage.jsx            # Sign-in form with evaluator demo autofill
│   │   └── RegisterPage.jsx         # New candidate account registration
│   ├── services/
│   │   ├── atsService.js            # Deterministic 100-point ATS engine
│   │   ├── authService.js           # Isolated auth service (Cognito-ready)
│   │   └── storageService.js        # Isolated storage service (S3/DynamoDB-ready)
│   ├── utils/
│   │   └── pdfExtractor.js          # In-browser PDF text extraction via PDF.js
│   ├── App.jsx                      # Route definitions & layout wrappers
│   ├── index.css                    # Tailwind CSS directives & custom scrollbars
│   └── main.jsx                     # React entrypoint
├── index.html                       # HTML5 template with Inter font preconnect
├── package.json                     # Dependencies and build scripts
├── postcss.config.js                # PostCSS configuration for Tailwind
├── tailwind.config.js               # Custom theme colors and fonts
├── vite.config.js                   # Vite configuration with chunk splitting
└── README.md                        # Documentation and architecture guide
```

---

## 🔒 Security & Code Standards

- **Zero Hardcoded Secrets**: No API keys, AWS credentials, or sensitive tokens are stored in the client codebase.
- **Safe Environment**: Fully deterministic calculations run locally in the browser with no external network telemetry.
- **Lint & Build Clean**: Tested against modern ES modules, passing strict Vite and Rollup production builds.
