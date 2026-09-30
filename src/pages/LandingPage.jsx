import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileSearch,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Target,
  FileCheck,
  Sparkles,
  Layers,
  Terminal,
  BarChart3,
  Cpu,
  Award,
  Zap,
  Check
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ScoreGauge from '../components/ui/ScoreGauge';

export default function LandingPage() {
  const scoringBreakdown = [
    { name: 'Contact Information', weight: 5, desc: 'Email, phone, location, and verified GitHub/LinkedIn handles' },
    { name: 'Professional Summary', weight: 10, desc: 'Targeted career elevator pitch, years of experience, and action verbs' },
    { name: 'Technical Skills', weight: 20, desc: 'Categorized catalog matching frontend, backend, cloud, and databases' },
    { name: 'Work Experience', weight: 20, desc: 'Chronological timeline with quantifiable achievements and metrics' },
    { name: 'Education Credentials', weight: 10, desc: 'Degree classification, accredited university, and graduation year' },
    { name: 'Projects Portfolio', weight: 10, desc: 'Applied technical projects demonstrating tools and production code' },
    { name: 'Job Keywords Match', weight: 15, desc: 'Mathematical keyword overlap against the target job posting' },
    { name: 'Formatting & Readability', weight: 10, desc: 'ATS-clean single-column text structure and optimal word density' },
  ];

  return (
    <div className="space-y-24 py-10 md:py-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
              Deterministic ATS Analysis Engine • College Cloud Tech Project
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Test Your Resume Before the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-cyan-600">
                Recruiter Does
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              ResumeLens ATS audits your resume against real applicant tracking system standards.
              Get a deterministic score out of 100, discover missing job keywords, inspect detected skills,
              and receive prioritized improvement suggestions in seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button href="/analyzer" size="lg" variant="primary" icon={ArrowRight} iconPosition="right">
                Check Your Resume
              </Button>
              <Button href="/login" size="lg" variant="outline">
                Sign In to Dashboard
              </Button>
            </div>

            {/* Micro value props */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200/80 text-slate-600 text-xs">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Deterministic 100-pt formula</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Instant PDF parsing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero cloud secrets</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / Interactive Preview */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Subtle background glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-500/10 to-cyan-500/10 blur-xl -z-10" />

              <Card className="border border-slate-200 shadow-xl p-6 sm:p-7 relative overflow-hidden bg-white">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">Alex_Morgan_Senior_FullStack.pdf</p>
                      <p className="text-[11px] text-slate-400">Target: Senior Full-Stack Engineer</p>
                    </div>
                  </div>
                  <Badge variant="pass" size="sm" dot>
                    ATS Ready
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 items-center mb-6 py-2">
                  <ScoreGauge score={89} size={130} label="ATS Score" sublabel={false} />
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <p className="text-[11px] text-slate-500 font-medium">Keyword Match</p>
                      <p className="text-xl font-bold text-slate-900">86%</p>
                      <p className="text-[10px] text-emerald-600 font-semibold">12 of 14 target terms matched</p>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <p className="text-[11px] text-slate-500 font-medium">Detected Skills</p>
                      <p className="text-xl font-bold text-brand-600">18 Identified</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Contact & Header</span>
                    <span className="font-semibold text-emerald-600">5 / 5 pts</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Skills & Technologies</span>
                    <span className="font-semibold text-emerald-600">20 / 20 pts</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Experience & Metrics</span>
                    <span className="font-semibold text-emerald-600">18 / 20 pts</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Job Keyword Alignment</span>
                    <span className="font-semibold text-brand-600">13 / 15 pts</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">College Demo Preview</span>
                  <Link
                    to="/analyzer"
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    Launch Analyzer <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="cyan" size="md" className="mb-3">
            Workflow Process
          </Badge>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
            How ResumeLens Evaluates Your Application
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Three simple steps to benchmark your resume against real recruiter screening parameters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="relative p-6 sm:p-8" hoverEffect>
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-lg mb-6 border border-brand-100">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Upload or Pick Sample</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Upload your resume as a standard PDF file, or pick from our pre-loaded candidate resumes to test immediately.
            </p>
          </Card>

          <Card className="relative p-6 sm:p-8" hoverEffect>
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-lg mb-6 border border-cyan-100">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Provide Job Description</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Paste the exact target job description. The engine tokenizes hard requirements, certifications, and required libraries.
            </p>
          </Card>

          <Card className="relative p-6 sm:p-8" hoverEffect>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-6 border border-emerald-100">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Inspect 100-Point Audit</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Review your overall score, examine detected skills, see missing keywords, and follow prioritized suggestions to pass recruiter screening.
            </p>
          </Card>
        </div>
      </section>

      {/* Deterministic ATS Scoring Explanation Section */}
      <section className="bg-white border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="primary" size="md" className="mb-3">
              Deterministic Scoring Engine
            </Badge>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
              Transparent 100-Point ATS Rubric
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Unlike black-box scoring systems with random fluctuations, ResumeLens uses a deterministic 8-category weighting model.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scoringBreakdown.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Category {index + 1}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-800">
                    {item.weight} pts
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1">{item.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-brand-50/60 border border-brand-200 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-brand-950">Total Maximum ATS Score: 100 Points</h4>
              <p className="text-xs text-brand-800">
                Score &ge; 80: ATS Ready • Score 65-79: Competitive • Score &lt; 65: Revision Recommended
              </p>
            </div>
            <Button href="/analyzer" variant="primary" size="sm" className="shrink-0">
              Run Free Assessment
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="cyan" size="md" className="mb-3">
            Core Features
          </Badge>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
            Built for Modern Job Seekers & Engineering Students
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Clean, professional software engineering tool built to withstand real recruiter screening.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6" hoverEffect>
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Targeted Keyword Matching</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Detects exactly which critical tools and qualifications from the job description are missing in your resume.
            </p>
          </Card>

          <Card className="p-6" hoverEffect>
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Section-by-Section Health</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Audits contact details, professional summary, work experience metrics, education, and formatting independently.
            </p>
          </Card>

          <Card className="p-6" hoverEffect>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Prioritized Recommendations</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Actionable advice ranked by high, medium, and low priority so you know which changes deliver the highest score boost.
            </p>
          </Card>

          <Card className="p-6" hoverEffect>
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Analysis History & Analytics</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Track your ATS score trajectory over time as you tweak and tailor resumes for different company applications.
            </p>
          </Card>

          <Card className="p-6" hoverEffect>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Sample Resumes Included</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Test immediately without uploading a file using pre-packaged senior engineer, DevOps, or draft candidate resumes.
            </p>
          </Card>

          <Card className="p-6" hoverEffect>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">AWS Cloud Integration Ready</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Built with isolated service boundaries ready for Amazon Cognito, S3, and API Gateway deployment.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-brand-700 to-cyan-700 p-8 sm:p-12 text-white text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              Ready to Optimize Your Resume?
            </h2>
            <p className="text-brand-100 text-sm sm:text-base leading-relaxed">
              Upload your resume or try a sample candidate profile right now. Fast, free, and deterministic.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/analyzer" variant="secondary" size="lg" className="bg-white text-brand-800 hover:bg-slate-100 border-none shadow-md">
                Launch Resume Analyzer
              </Button>
              <Button href="/register" variant="outline" size="lg" className="text-white border-white/50 hover:bg-white/10 hover:border-white">
                Create Free Account
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
