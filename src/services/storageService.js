/**
 * storageService.js
 * 
 * Local Storage Service for ResumeLens ATS.
 * 
 * ARCHITECTURE NOTE FOR AWS INTEGRATION:
 * In the AWS cloud deployment, this service will be refactored to interface with:
 * - Amazon S3: Direct file upload via presigned S3 URLs (e.g. s3://resumelens-resumes-bucket/)
 * - Amazon DynamoDB / AWS RDS: Relational or document storage for ATS score breakdown reports
 * - AWS Lambda + API Gateway: Serverless endpoints for persisting analysis payloads
 * 
 * NOTICE: No AWS credentials or secrets are placed here.
 */

import { INITIAL_ANALYSES } from '../data/sampleData';

const STORAGE_KEYS = {
  ANALYSES: 'resumelens_analyses_list',
  SAVED_RESUMES: 'resumelens_saved_resumes',
};

// Initialize with seed analyses if empty
function initAnalyses() {
  const existing = localStorage.getItem(STORAGE_KEYS.ANALYSES);
  if (!existing) {
    localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(INITIAL_ANALYSES));
  }
}

export const storageService = {
  /**
   * Save an analysis result
   */
  async saveAnalysis(analysisData) {
    initAnalyses();
    await new Promise((res) => setTimeout(res, 200));

    const analyses = JSON.parse(localStorage.getItem(STORAGE_KEYS.ANALYSES) || '[]');
    
    const newEntry = {
      id: `ana-${Date.now().toString(36)}`,
      date: new Date().toISOString(),
      ...analysisData,
      // S3 mock key for cloud architecture readiness
      s3StorageKey: `s3://resumelens-bucket-local/resumes/${analysisData.userId || 'guest'}/${Date.now()}_${encodeURIComponent(analysisData.resumeName || 'resume.pdf')}`,
    };

    analyses.unshift(newEntry);
    localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(analyses));

    // Update user's analysis count if user exists
    try {
      const usersRaw = localStorage.getItem('resumelens_all_users');
      if (usersRaw && analysisData.userId) {
        const users = JSON.parse(usersRaw);
        const updated = users.map((u) => {
          if (u.id === analysisData.userId) {
            return { ...u, analysesCount: (u.analysesCount || 0) + 1 };
          }
          return u;
        });
        localStorage.setItem('resumelens_all_users', JSON.stringify(updated));
      }
    } catch {
      // Ignore user counter errors
    }

    return newEntry;
  },

  /**
   * Get all analyses for a specific user
   */
  getUserAnalyses(userId) {
    initAnalyses();
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.ANALYSES) || '[]');
      if (!userId) return all;
      return all.filter((item) => item.userId === userId);
    } catch {
      return [];
    }
  },

  /**
   * Get all analyses across all users (for Admin Dashboard)
   */
  getAllAnalyses() {
    initAnalyses();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.ANALYSES) || '[]');
    } catch {
      return INITIAL_ANALYSES;
    }
  },

  /**
   * Get a single analysis record by ID
   */
  getAnalysisById(id) {
    initAnalyses();
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.ANALYSES) || '[]');
    return all.find((item) => item.id === id) || null;
  },

  /**
   * Delete an analysis record
   */
  deleteAnalysis(id) {
    initAnalyses();
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.ANALYSES) || '[]');
    const filtered = all.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(filtered));
    return true;
  },

  /**
   * Calculate aggregated platform statistics
   */
  getStats() {
    initAnalyses();
    const usersRaw = localStorage.getItem('resumelens_all_users');
    let users = [];
    try {
      users = usersRaw ? JSON.parse(usersRaw) : [];
    } catch {
      users = [];
    }

    const analyses = this.getAllAnalyses();
    const totalUsers = users.length;
    const totalAnalyses = analyses.length;

    let averageScore = 0;
    if (totalAnalyses > 0) {
      const sum = analyses.reduce((acc, curr) => acc + (curr.score || 0), 0);
      averageScore = Math.round(sum / totalAnalyses);
    }

    // Score distribution for visual analytics
    const distribution = {
      excellent: analyses.filter((a) => a.score >= 80).length, // 80-100
      good: analyses.filter((a) => a.score >= 65 && a.score < 80).length, // 65-79
      average: analyses.filter((a) => a.score >= 50 && a.score < 65).length, // 50-64
      poor: analyses.filter((a) => a.score < 50).length, // <50
    };

    return {
      totalUsers,
      totalAnalyses,
      averageScore,
      distribution,
    };
  },
};
