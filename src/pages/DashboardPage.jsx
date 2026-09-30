import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import {
  FileText,
  TrendingUp,
  Sparkles,
  Clock,
  ArrowRight,
  PlusCircle,
  Award,
  Trash2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileCheck2,
  BarChart3
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ScoreGauge from '../components/ui/ScoreGauge';
import Modal from '../components/ui/Modal';
import ProgressBar from '../components/ui/ProgressBar';

export default function DashboardPage() {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  useEffect(() => {
    loadUserAnalyses();
  }, [user]);

  const loadUserAnalyses = () => {
    if (user) {
      const userRecords = storageService.getUserAnalyses(user.id);
      setAnalyses(userRecords);
    }
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Remove this analysis record from your history?')) {
      storageService.deleteAnalysis(id);
      loadUserAnalyses();
    }
  };

  // Latest analysis
  const latestAnalysis = analyses.length > 0 ? analyses[0] : null;

  // Average score
  const averageScore =
    analyses.length > 0
      ? Math.round(analyses.reduce((acc, curr) => acc + (curr.score || 0), 0) / analyses.length)
      : 0;

  // Best score
  const highestScore =
    analyses.length > 0
      ? Math.max(...analyses.map((a) => a.score || 0))
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">Candidate Workspace</span>
            <Badge variant="cyan" size="sm">
              Local Storage Mock
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome, {user?.name || 'Candidate'}!
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Monitor your ATS score readiness and review your resume improvements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button href="/analyzer" variant="primary" icon={PlusCircle} iconPosition="left">
            Analyze New Resume
          </Button>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Latest Score Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Latest ATS Score
            </span>
            <Award className="w-4 h-4 text-brand-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {latestAnalysis ? latestAnalysis.score : '—'}
            </span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {latestAnalysis
              ? `Tested ${new Date(latestAnalysis.date).toLocaleDateString()}`
              : 'No evaluations yet'}
          </p>
        </Card>

        {/* Average Score */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Average Score
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {averageScore > 0 ? averageScore : '—'}
            </span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Across {analyses.length} total assessments</p>
        </Card>

        {/* Highest Score */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Peak Score
            </span>
            <Award className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {highestScore > 0 ? highestScore : '—'}
            </span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Best recorded performance</p>
        </Card>

        {/* Resumes Count */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Analyses
            </span>
            <FileText className="w-4 h-4 text-violet-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{analyses.length}</span>
            <span className="text-xs text-slate-400">audits</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Saved in candidate history</p>
        </Card>
      </div>

      {/* Main Content Layout: Active Analysis + Improvement Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Analyses Table / Cards */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6">
            <CardHeader
              title="Recent Resume Analyses"
              subtitle="Review your previous scores and job match details"
              action={
                <Button href="/analyzer" variant="outline" size="sm">
                  Run New Scan
                </Button>
              }
            />

            {analyses.length === 0 ? (
              <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-xl">
                <FileCheck2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h4 className="text-sm font-semibold text-slate-800">No Resume Analyses Found</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto mb-4">
                  Upload a resume or select a sample profile in the ATS Analyzer to generate your first score.
                </p>
                <Button href="/analyzer" variant="primary" size="sm">
                  Go to Analyzer
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      <th className="pb-3 pl-2">Resume & Role</th>
                      <th className="pb-3 text-center">Score</th>
                      <th className="pb-3 text-center">Keyword Match</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3 text-right pr-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {analyses.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedAnalysis(item)}
                        className="hover:bg-slate-50/70 cursor-pointer transition-colors group"
                      >
                        <td className="py-3.5 pl-2">
                          <div className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
                            {item.resumeName}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate max-w-xs">{item.jobTitle}</div>
                        </td>
                        <td className="py-3.5 text-center">
                          <span
                            className={`font-bold px-2 py-0.5 rounded-full ${
                              item.score >= 80
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : item.score >= 65
                                ? 'bg-brand-50 text-brand-700 border border-brand-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {item.score} / 100
                          </span>
                        </td>
                        <td className="py-3.5 text-center font-medium text-slate-700">
                          {item.keywordMatch}%
                        </td>
                        <td className="py-3.5 text-slate-500">
                          {new Date(item.date).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 text-right pr-2">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAnalysis(item);
                              }}
                              className="p-1.5 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-slate-100 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleDelete(item.id, e)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Improvement Suggestions Summary & Gauge */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Score Gauge Card */}
          <Card className="p-6 text-center">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Latest Evaluation Metric</h3>
            {latestAnalysis ? (
              <div className="space-y-4">
                <ScoreGauge score={latestAnalysis.score} size={135} strokeWidth={11} label="Current Status" />
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Job Target: </span>
                  {latestAnalysis.jobTitle}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs">
                Run an ATS scan to see your active score breakdown.
              </div>
            )}
          </Card>

          {/* Key Improvement Suggestions */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900">Key ATS Checklist</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">Direct Keyword Matching</div>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Match at least 80% of required technical terms listed in the job posting.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">Quantified Work Experience</div>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Include concrete numbers, % boosts, and team scale in job bullets.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">Single Column Layout</div>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Eliminate side tables, floating text boxes, and icons that confuse scanners.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <Button href="/analyzer" variant="subtle" size="sm" className="w-full">
                Test Updated Resume
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Analysis Detail Modal */}
      <Modal
        isOpen={Boolean(selectedAnalysis)}
        onClose={() => setSelectedAnalysis(null)}
        title="Analysis Details"
        subtitle={selectedAnalysis?.resumeName}
      >
        {selectedAnalysis && (
          <div className="space-y-5 text-sm">
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-500 block">Job Target</span>
                <span className="font-semibold text-slate-900">{selectedAnalysis.jobTitle}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Date Evaluated</span>
                <span className="font-semibold text-slate-900">
                  {new Date(selectedAnalysis.date).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Overall ATS Score</span>
                <span className="font-bold text-brand-600 text-base">
                  {selectedAnalysis.score} / 100
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Keyword Match</span>
                <span className="font-bold text-emerald-600 text-base">
                  {selectedAnalysis.keywordMatch}%
                </span>
              </div>
            </div>

            {selectedAnalysis.s3StorageKey && (
              <div className="text-xs p-3 bg-brand-50/50 rounded-lg border border-brand-100 text-brand-800">
                <span className="font-semibold block">Planned Cloud Object Key:</span>
                <code className="text-[11px] text-slate-600 break-all">{selectedAnalysis.s3StorageKey}</code>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button onClick={() => setSelectedAnalysis(null)} variant="outline" size="sm">
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
