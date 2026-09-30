import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { atsService } from '../services/atsService';
import { storageService } from '../services/storageService';
import { extractTextFromFile } from '../utils/pdfExtractor';
import { SAMPLE_RESUMES, SAMPLE_JOB_DESCRIPTIONS } from '../data/sampleData';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Tag,
  ArrowRight,
  RefreshCw,
  BookmarkPlus,
  Check,
  Info,
  HelpCircle,
  FileCheck2,
  Layers
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import ScoreGauge from '../components/ui/ScoreGauge';

export default function AnalyzerPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Resume state
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFileName, setResumeFileName] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [showRawText, setShowRawText] = useState(false);

  // Job description state
  const [jobDescription, setJobDescription] = useState('');
  const [selectedJdTitle, setSelectedJdTitle] = useState('');

  // UI & Analysis state
  const [isExtracting, setIsExtracting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  // Handle file drop / upload
  const handleFileUpload = async (file) => {
    if (!file) return;
    setErrorMessage('');
    setIsSaved(false);

    try {
      setIsExtracting(true);
      setResumeFileName(file.name);
      setResumeFile(file);

      const text = await extractTextFromFile(file);
      setResumeText(text);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to extract text from PDF. Try using one of our sample resumes below.');
    } finally {
      setIsExtracting(false);
    }
  };

  // Load sample resume
  const handleSelectSampleResume = (sample) => {
    setErrorMessage('');
    setResumeFile(null);
    setResumeFileName(sample.fileName);
    setResumeText(sample.text);
    setIsSaved(false);
    setAnalysisResult(null);
  };

  // Load sample job description
  const handleSelectSampleJd = (sample) => {
    setJobDescription(sample.text);
    setSelectedJdTitle(sample.title);
  };

  // Run ATS Analysis
  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setErrorMessage('Please upload a resume or select a sample resume first.');
      return;
    }

    try {
      setIsAnalyzing(true);
      setErrorMessage('');

      // Deterministic evaluation with slight simulated computation pause
      await new Promise((res) => setTimeout(res, 450));

      const result = atsService.analyzeResume(resumeText, jobDescription);
      setAnalysisResult(result);
      setIsSaved(false);

      // Scroll smoothly to results
      setTimeout(() => {
        const resultsEl = document.getElementById('ats-results-view');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      setErrorMessage(err.message || 'Analysis encountered an error.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Save analysis to history
  const handleSaveToHistory = async () => {
    if (!analysisResult) return;

    try {
      const payload = {
        userId: user ? user.id : 'guest-user',
        userName: user ? user.name : 'Guest Evaluator',
        resumeName: resumeFileName || 'Uploaded_Resume.pdf',
        jobTitle: selectedJdTitle || 'General Software Engineering Role',
        score: analysisResult.score,
        keywordMatch: analysisResult.keywordMatch,
        detectedSkillsCount: analysisResult.detectedSkills.length,
        missingKeywordsCount: analysisResult.missingKeywords.length,
        status:
          analysisResult.score >= 80
            ? 'Ready for ATS'
            : analysisResult.score >= 65
            ? 'Good Match'
            : 'Needs Work',
        sectionBreakdown: analysisResult.sectionAnalysis,
      };

      await storageService.saveAnalysis(payload);
      setIsSaved(true);
    } catch (err) {
      console.error('Error saving analysis:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="primary" size="sm" dot>
            Deterministic Engine
          </Badge>
          <span className="text-xs text-slate-500 font-medium">100-Point Scoring Model</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Resume ATS Scanner
        </h1>
        <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
          Upload your resume PDF and match it against any job description to discover your ATS score, detected skills, and keyword gaps.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
          <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold">Notice:</span> {errorMessage}
          </div>
        </div>
      )}

      {/* Input Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Resume Upload & Samples */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="p-6">
            <CardHeader
              title="1. Upload Resume"
              subtitle="Upload PDF or text resume for local text extraction"
              action={
                resumeText && (
                  <Badge variant="pass" size="sm">
                    {resumeFileName || 'Resume Loaded'}
                  </Badge>
                )
              }
            />

            {/* Drag and Drop Zone */}
            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.[0]) {
                  handleFileUpload(e.dataTransfer.files[0]);
                }
              }}
              className="border-2 border-dashed border-slate-300 hover:border-brand-500 bg-slate-50/60 hover:bg-brand-50/20 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group"
            >
              <input
                type="file"
                accept=".pdf,.txt"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 group-hover:border-brand-300 shadow-2xs flex items-center justify-center text-brand-600 mb-3 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {isExtracting ? 'Extracting Resume Text...' : 'Click to upload or drag & drop'}
              </p>
              <p className="text-xs text-slate-500 mt-1">PDF or TXT documents (Max 10MB)</p>
            </label>

            {/* Quick Sample Resumes for Zero-Friction Testing */}
            <div className="mt-5 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-semibold text-slate-700">Or test with a sample resume:</span>
                <span className="text-[11px] text-slate-400">1-click test</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {SAMPLE_RESUMES.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSampleResume(sample)}
                    className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                      resumeFileName === sample.fileName
                        ? 'bg-brand-50/80 border-brand-300 text-brand-900 shadow-2xs ring-1 ring-brand-400'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="font-semibold truncate">{sample.title.split('(')[0]}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate">{sample.category}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Extracted Text Inspector Toggle */}
            {resumeText && (
              <div className="mt-5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRawText(!showRawText)}
                  className="flex items-center justify-between w-full text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-brand-600" />
                    Inspect Extracted Text ({resumeText.split(/\s+/).filter(Boolean).length} words)
                  </span>
                  {showRawText ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showRawText && (
                  <div className="mt-3">
                    <textarea
                      rows={6}
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      className="w-full p-3 font-mono text-xs bg-slate-900 text-slate-200 rounded-xl border border-slate-800 focus:outline-none"
                      placeholder="Extracted text..."
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      You can edit or paste raw resume text directly here if needed.
                    </p>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Job Description & Trigger */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="p-6">
            <CardHeader
              title="2. Target Job Description"
              subtitle="Paste the role requirements to calculate keyword match"
              action={
                selectedJdTitle && (
                  <Badge variant="cyan" size="sm">
                    {selectedJdTitle.split('(')[0]}
                  </Badge>
                )
              }
            />

            <div>
              <textarea
                rows={8}
                value={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  setSelectedJdTitle('Custom Job Description');
                }}
                placeholder="Paste the target job description here (e.g. responsibilities, required skills, tools)..."
                className="w-full p-3.5 text-xs sm:text-sm bg-slate-50/50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Quick Sample Job Descriptions */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700">Or use a sample job posting:</span>
                <span className="text-[11px] text-slate-400">Popular roles</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_JOB_DESCRIPTIONS.map((jd) => (
                  <button
                    key={jd.id}
                    type="button"
                    onClick={() => handleSelectSampleJd(jd)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                      selectedJdTitle === jd.title
                        ? 'bg-cyan-50 border-cyan-300 text-cyan-800 font-semibold'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    {jd.title.split('(')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Trigger Button */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Button
                onClick={handleAnalyze}
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isAnalyzing}
                disabled={!resumeText.trim()}
                icon={Sparkles}
                iconPosition="left"
              >
                {isAnalyzing ? 'Calculating Deterministic Score...' : 'Analyze Resume Now'}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Analysis Results View */}
      {analysisResult && (
        <div id="ats-results-view" className="space-y-8 pt-6 border-t border-slate-200">
          {/* Top Score Summary Banner */}
          <Card className="p-6 sm:p-8 bg-gradient-to-b from-white to-slate-50/60 border border-slate-200">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Score Gauge */}
              <div className="flex items-center gap-6 sm:gap-8">
                <ScoreGauge score={analysisResult.score} size={150} strokeWidth={12} />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      Overall ATS Score
                    </h3>
                    <Badge
                      variant={
                        analysisResult.score >= 80
                          ? 'pass'
                          : analysisResult.score >= 65
                          ? 'primary'
                          : 'fail'
                      }
                      size="md"
                      dot
                    >
                      {analysisResult.score >= 80
                        ? 'Recruiter Ready'
                        : analysisResult.score >= 65
                        ? 'Competitive Match'
                        : 'Needs Revision'}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                    Deterministic score calculated from 8 key evaluation pillars including keyword density,
                    formatting, experience metrics, and technical skills.
                  </p>
                  <p className="text-xs text-slate-400 pt-1">
                    Evaluated for: <span className="font-semibold text-slate-700">{resumeFileName || 'Resume Document'}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons & Quick Stats */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
                <Button
                  onClick={handleSaveToHistory}
                  variant={isSaved ? 'subtle' : 'outline'}
                  size="md"
                  disabled={isSaved}
                  icon={isSaved ? Check : BookmarkPlus}
                >
                  {isSaved ? 'Saved to Your History' : 'Save Analysis to History'}
                </Button>

                {isAuthenticated ? (
                  <Button href="/dashboard" variant="ghost" size="sm">
                    View in Dashboard <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                ) : (
                  <Button href="/login" variant="ghost" size="sm">
                    Sign in to track progress <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Metric Tiles: Keyword Match & Skills Count */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Target Keyword Match
                </span>
                <Badge variant={analysisResult.keywordMatch >= 75 ? 'pass' : 'warning'} size="sm">
                  {analysisResult.keywordMatch}% Matched
                </Badge>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mb-2">
                {analysisResult.keywordMatch}%
              </div>
              <ProgressBar
                value={analysisResult.keywordMatch}
                max={100}
                showValue={false}
                height="h-2.5"
                color="auto"
              />
              <p className="text-xs text-slate-500 mt-2">
                {analysisResult.matchedKeywords.length} keywords matched • {analysisResult.missingKeywords.length} missing
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Detected Skills
                </span>
                <Badge variant="cyan" size="sm">
                  Catalog Match
                </Badge>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mb-2">
                {analysisResult.detectedSkills.length}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Technologies, tools, and technical competencies identified in the resume.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-brand-600">
                <CheckCircle2 className="w-4 h-4 text-brand-600" /> High skill density
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Resume Word Count
                </span>
                <Badge variant="default" size="sm">
                  Length Check
                </Badge>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mb-2">
                {analysisResult.wordCount}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Target 350-800 words for standard 1-page modern ATS parsing efficiency.
              </p>
              <div className="mt-3 text-xs text-slate-500 font-medium">
                {analysisResult.wordCount >= 250 && analysisResult.wordCount <= 900
                  ? '✓ Optimal word length'
                  : '⚠ Slightly non-standard length'}
              </div>
            </Card>
          </div>

          {/* Keyword Breakdown: Matched vs Missing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Detected Skills Chips */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Detected Skills ({analysisResult.detectedSkills.length})
                  </h4>
                </div>
                <span className="text-xs text-slate-400">Found in resume</span>
              </div>

              {analysisResult.detectedSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysisResult.detectedSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 capitalize"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">No recognizable technical skills detected.</p>
              )}
            </Card>

            {/* Missing Keywords Chips */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
                    !
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Missing Target Keywords ({analysisResult.missingKeywords.length})
                  </h4>
                </div>
                <span className="text-xs text-rose-500 font-medium">Priority additions</span>
              </div>

              {analysisResult.missingKeywords.length > 0 ? (
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {analysisResult.missingKeywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200 capitalize"
                      >
                        + {kw}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <strong>Tip:</strong> Incorporate these terms into your Experience or Projects bullets to immediately elevate your match score.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Excellent keyword coverage! All target keywords from the posting were found.</span>
                </div>
              )}
            </Card>
          </div>

          {/* Section Analysis Breakdown (8 Pillars) */}
          <Card className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Section-by-Section ATS Audit</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Detailed evaluation of the 8 deterministic scoring categories
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                Total 100 Pts
              </span>
            </div>

            <div className="space-y-4">
              {analysisResult.sectionAnalysis.map((section, idx) => {
                const isExpanded = expandedSection === idx;
                const percent = Math.round((section.score / section.maxScore) * 100);

                return (
                  <div
                    key={idx}
                    className="border border-slate-200/90 rounded-xl p-4 transition-all hover:border-slate-300 bg-white"
                  >
                    <div
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                      onClick={() => setExpandedSection(isExpanded ? null : idx)}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{section.name}</h4>
                          <Badge
                            variant={
                              section.status === 'pass'
                                ? 'pass'
                                : section.status === 'warning'
                                ? 'warning'
                                : 'fail'
                            }
                            size="sm"
                          >
                            {section.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600">{section.details}</p>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <span className="text-sm font-extrabold text-slate-900">
                            {section.score} / {section.maxScore}
                          </span>
                          <span className="text-xs text-slate-400 block">({percent}%)</span>
                        </div>
                        <div className="w-20 hidden sm:block">
                          <ProgressBar
                            value={section.score}
                            max={section.maxScore}
                            showValue={false}
                            height="h-2"
                            color="auto"
                          />
                        </div>
                        <button
                          type="button"
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-2 text-slate-600">
                        <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-800">Recruiter Guidance: </span>
                            {section.tip}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Actionable Improvement Suggestions */}
          <Card className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Prioritized Improvement Roadmap</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Follow these prioritized recommendations to raise your ATS score before submitting
                </p>
              </div>
              <Badge variant="cyan" size="sm">
                {analysisResult.suggestions.length} Action Items
              </Badge>
            </div>

            <div className="space-y-3">
              {analysisResult.suggestions.map((sug, idx) => (
                <div
                  key={sug.id || idx}
                  className={`p-4 rounded-xl border transition-all ${
                    sug.priority === 'high'
                      ? 'bg-rose-50/40 border-rose-200'
                      : sug.priority === 'medium'
                      ? 'bg-amber-50/40 border-amber-200'
                      : 'bg-slate-50/60 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          sug.priority === 'high'
                            ? 'danger'
                            : sug.priority === 'medium'
                            ? 'warning'
                            : 'default'
                        }
                        size="sm"
                      >
                        {sug.priority.toUpperCase()} PRIORITY
                      </Badge>
                      <span className="text-xs font-semibold text-slate-500">{sug.category}</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{sug.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{sug.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
