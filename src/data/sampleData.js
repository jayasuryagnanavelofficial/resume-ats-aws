/**
 * Sample resumes, job descriptions, and seed data for ResumeLens ATS.
 * Useful for deterministic testing, presentation demos, and fallback testing.
 */

export const SAMPLE_RESUMES = [
  {
    id: 'sample-senior-swe',
    title: 'Senior Full-Stack Engineer (Strong ATS)',
    category: 'Software Engineering',
    fileName: 'Alex_Morgan_Senior_FullStack_Resume.pdf',
    text: `ALEX MORGAN
alex.morgan@email.com | +1 (555) 019-2834 | San Francisco, CA
LinkedIn: linkedin.com/in/alexmorgan-dev | GitHub: github.com/alexmorgan

PROFESSIONAL SUMMARY
Results-driven Senior Full-Stack Software Engineer with 6+ years of experience architecting scalable distributed web applications, RESTful microservices, and cloud-native solutions. Proficient in React, Node.js, TypeScript, AWS, and Docker. Track record of optimizing web application performance by 40% and mentoring 8+ junior engineers.

CORE SKILLS
- Frontend: JavaScript (ES6+), TypeScript, React, Next.js, Redux, Tailwind CSS, HTML5, CSS3
- Backend & Cloud: Node.js, Express, Python, REST APIs, GraphQL, AWS (EC2, S3, Lambda, DynamoDB)
- Databases & Tools: PostgreSQL, MongoDB, Redis, Docker, Git, CI/CD pipelines, Jest, Cypress
- Methodologies: Agile/Scrum, Microservices Architecture, Test-Driven Development (TDD)

WORK EXPERIENCE

Senior Full-Stack Engineer | CloudScale Systems, San Francisco, CA
March 2021 – Present
- Architected and delivered a multi-tenant enterprise dashboard in React and Node.js serving 120,000+ monthly active users with 99.98% uptime.
- Deployed microservices using Docker containers and AWS ECS, reducing operational cloud infrastructure expenditure by 28%.
- Optimized database queries and implemented Redis distributed caching layer, reducing API latency from 450ms to 95ms.
- Spearheaded automated testing adoption (Jest, React Testing Library), boosting code test coverage from 55% to 88%.
- Mentored 6 software engineers and led bi-weekly technical design reviews and sprint planning.

Full-Stack Software Engineer | Apex Digital Solutions, Seattle, WA
July 2018 – February 2021
- Developed interactive web components and responsive user interfaces utilizing React, TypeScript, and Tailwind CSS.
- Designed and maintained 15+ secure RESTful APIs with Node.js and PostgreSQL for real-time analytics.
- Integrated automated CI/CD workflows using GitHub Actions and AWS S3/CloudFront for continuous deployment.
- Collaborated closely with UI/UX designers and product managers in 2-week Agile sprints.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley — Graduated May 2018
GPA: 3.82 / 4.0 | Dean's Honor List

PROJECTS
CloudPulse - Real-time Infrastructure Monitoring Tool (React, Node.js, AWS, WebSockets)
- Engineered an open-source system performance monitor tracking CPU, memory, and container health metrics.
- Utilized WebSockets for low-latency live streaming telemetry to 1,500+ active GitHub community stars.

DevMatch - Developer Portfolio & Tech Job Matching Platform (Next.js, PostgreSQL, Tailwind)
- Implemented resume keyword matching algorithm and applicant tracking dashboard deployed on AWS.
`
  },
  {
    id: 'sample-cloud-devops',
    title: 'Cloud & DevOps Associate (Targeted ATS)',
    category: 'Cloud & DevOps',
    fileName: 'Jordan_Lee_Cloud_DevOps_Resume.pdf',
    text: `JORDAN LEE
jordan.lee@example.com | (555) 432-8765 | Austin, TX | linkedin.com/in/jordanlee-cloud

SUMMARY
Ambitious Cloud and DevOps Engineer with 2+ years of hands-on experience building CI/CD deployment pipelines, managing AWS cloud infrastructure, and automating containerized microservices with Docker and Kubernetes. Certified AWS Solutions Architect Associate.

TECHNICAL SKILLS
- Cloud Platforms: Amazon Web Services (AWS - EC2, S3, IAM, CloudWatch, VPC, Route 53)
- DevOps & CI/CD: Docker, Kubernetes, Jenkins, GitHub Actions, Terraform, Ansible
- Scripting & Languages: Python, Bash scripting, Linux/Unix administration, JavaScript
- Monitoring & Security: Prometheus, Grafana, AWS CloudTrail, SSL/TLS, IAM Policies

EXPERIENCE

Associate DevOps Engineer | NovaTech Cloud Services, Austin, TX
January 2023 – Present
- Implemented and managed continuous integration and deployment pipelines using GitHub Actions and AWS CodePipeline.
- Provisioned infrastructure as code (IaC) using Terraform for test, staging, and production environments on AWS.
- Configured CloudWatch alarms, Prometheus alerts, and Grafana dashboards for proactive incident resolution.
- Containerized 8 legacy services using Docker and orchestrated deployments on Kubernetes clusters.

Junior Systems Administrator | BluePeak IT, Austin, TX
June 2021 – December 2022
- Maintained Linux servers, managed user access rights via IAM and LDAP, and automated routine backups.
- Authored Bash and Python automation scripts reducing manual deployment tasks by 10 hours weekly.

EDUCATION
Bachelor of Science in Information Technology
University of Texas at Austin — May 2021

CERTIFICATIONS
- AWS Certified Solutions Architect – Associate (2023)
- HashiCorp Certified: Terraform Associate (2023)

PROJECTS
Automated Multi-Region Disaster Recovery Pipeline
- Built automated Terraform script to snapshot AWS RDS databases and replicate S3 buckets across regions.
`
  },
  {
    id: 'sample-draft-resume',
    title: 'Incomplete / Weak Resume (Needs Optimization)',
    category: 'Needs Work',
    fileName: 'Taylor_Draft_Resume.pdf',
    text: `Taylor
Looking for a tech job.

I have worked with computers for a few years.
Did some coding in JavaScript and made some websites with HTML.
Worked at a local store helping them with their website.
Also did some Python scripting for class.

Skills:
Computers, typing, JavaScript, HTML, team player, fast learner.

Experience:
Web helper (2022-2023)
- Updated products on the store website.
- Helped customers with technical questions.

School:
Studied at City College.
`
  }
];

export const SAMPLE_JOB_DESCRIPTIONS = [
  {
    id: 'jd-fullstack',
    title: 'Senior Full-Stack Engineer (React, Node.js, AWS)',
    company: 'NextGen Cloud Labs',
    text: `Job Title: Senior Full-Stack Engineer
Location: Remote / Hybrid

About The Role:
We are looking for an experienced Senior Full-Stack Software Engineer to build scalable web applications. You will collaborate with cross-functional teams to design modern user interfaces and robust backend microservices.

Requirements & Qualifications:
- 4+ years of professional software engineering experience
- Strong proficiency in modern JavaScript (ES6+), TypeScript, React, and Node.js
- Hands-on experience with cloud infrastructure, specifically AWS (EC2, S3, Lambda)
- Experience designing and integrating RESTful APIs and microservices
- Proficiency with relational databases like PostgreSQL or MySQL
- Experience with Docker, CI/CD pipelines, and automated unit testing (Jest)
- Strong problem-solving, communication skills, and Agile/Scrum workflow experience
- Bachelor's degree in Computer Science, Software Engineering, or related technical field`
  },
  {
    id: 'jd-devops',
    title: 'Cloud DevOps Engineer (AWS, Docker, CI/CD)',
    company: 'Skyline Cloud Solutions',
    text: `Job Title: Cloud & DevOps Engineer
Location: Austin, TX / Remote

Key Responsibilities:
- Build, optimize, and maintain CI/CD pipelines using GitHub Actions and Jenkins
- Provision, monitor, and scale AWS cloud infrastructure using Terraform
- Manage containerized applications with Docker and Kubernetes clusters
- Implement cloud security best practices, IAM access policies, and automated backups
- Monitor system reliability using Prometheus, Grafana, and AWS CloudWatch

Requirements:
- Proven experience with Amazon Web Services (AWS - EC2, S3, VPC, IAM)
- Strong scripting skills in Python and Bash
- Hands-on expertise with Docker containers and Kubernetes orchestration
- Infrastructure as Code experience using Terraform
- AWS certification (Solutions Architect or SysOps) is a plus
- Bachelor's degree in Computer Science, IT, or equivalent experience`
  },
  {
    id: 'jd-frontend',
    title: 'Frontend React Developer (Tailwind, TypeScript)',
    company: 'Aura UI Studio',
    text: `Job Title: Frontend React Developer
Location: Remote

We are seeking a Frontend Developer to build polished web applications.
Responsibilities:
- Build responsive, accessible, and high-performance UI components using React and Tailwind CSS
- Integrate REST and GraphQL endpoints with state management
- Collaborate with designers to translate Figma mockups into clean code
- Write unit tests using Jest and Cypress

Required Skills:
- React, TypeScript, JavaScript, Tailwind CSS, HTML5, CSS3, Git
- Understanding of web performance, SEO, and ATS-friendly UI design`
  }
];

export const INITIAL_USERS = [
  {
    id: 'usr-1',
    name: 'College Demo User',
    email: 'user@resumelens.com',
    password: 'password123',
    role: 'student',
    joinedDate: '2026-09-15',
    analysesCount: 4,
    lastActive: '2026-09-30',
  },
  {
    id: 'usr-admin',
    name: 'Prof. / Admin Reviewer',
    email: 'admin@resumelens.com',
    password: 'admin123',
    role: 'admin',
    joinedDate: '2026-09-01',
    analysesCount: 12,
    lastActive: '2026-09-30',
  },
  {
    id: 'usr-3',
    name: 'Elena Rostova',
    email: 'elena.rostova@cloudtech.edu',
    role: 'student',
    joinedDate: '2026-09-20',
    analysesCount: 3,
    lastActive: '2026-09-28',
  },
  {
    id: 'usr-4',
    name: 'Marcus Vance',
    email: 'm.vance@stanford.edu',
    role: 'student',
    joinedDate: '2026-09-22',
    analysesCount: 2,
    lastActive: '2026-09-27',
  }
];

export const INITIAL_ANALYSES = [
  {
    id: 'ana-101',
    userId: 'usr-1',
    userName: 'College Demo User',
    resumeName: 'Alex_Morgan_Senior_FullStack_Resume.pdf',
    jobTitle: 'Senior Full-Stack Engineer (React, Node.js, AWS)',
    score: 89,
    keywordMatch: 86,
    date: '2026-09-30T10:15:00.000Z',
    detectedSkillsCount: 18,
    missingKeywordsCount: 3,
    status: 'Ready for ATS'
  },
  {
    id: 'ana-102',
    userId: 'usr-1',
    userName: 'College Demo User',
    resumeName: 'Jordan_Lee_Cloud_DevOps_Resume.pdf',
    jobTitle: 'Cloud DevOps Engineer (AWS, Docker, CI/CD)',
    score: 78,
    keywordMatch: 74,
    date: '2026-09-29T14:30:00.000Z',
    detectedSkillsCount: 14,
    missingKeywordsCount: 5,
    status: 'Good Match'
  },
  {
    id: 'ana-103',
    userId: 'usr-3',
    userName: 'Elena Rostova',
    resumeName: 'Elena_Cloud_Architect.pdf',
    jobTitle: 'Cloud & DevOps Engineer',
    score: 82,
    keywordMatch: 80,
    date: '2026-09-28T09:45:00.000Z',
    detectedSkillsCount: 16,
    missingKeywordsCount: 4,
    status: 'Ready for ATS'
  },
  {
    id: 'ana-104',
    userId: 'usr-4',
    userName: 'Marcus Vance',
    resumeName: 'Marcus_Software_Resume.pdf',
    jobTitle: 'Frontend React Developer',
    score: 64,
    keywordMatch: 58,
    date: '2026-09-27T16:20:00.000Z',
    detectedSkillsCount: 9,
    missingKeywordsCount: 8,
    status: 'Needs Work'
  }
];
