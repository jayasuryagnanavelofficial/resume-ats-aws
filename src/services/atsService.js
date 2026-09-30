/**
 * atsService.js
 * 
 * Deterministic Local ATS Scoring Engine for ResumeLens ATS.
 * 
 * SCORING BREAKDOWN (TOTAL: 100):
 * - Contact information:    5
 * - Professional summary:  10
 * - Skills:                20
 * - Experience:            20
 * - Education:             10
 * - Projects:              10
 * - Keywords:              15
 * - Formatting/readability:10
 * 
 * ARCHITECTURE NOTE FOR AWS INTEGRATION:
 * In the AWS cloud architecture, this deterministic rule-based analysis can be executed
 * inside an AWS Lambda function triggered via Amazon API Gateway, or enhanced with
 * Amazon Textract for OCR scanned resumes and Amazon Comprehend for entity/keyword extraction.
 */

// Comprehensive skills catalog for robust pattern matching
export const SKILLS_DICTIONARY = [
  // Programming & Scripting
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'c', 'golang', 'go', 'rust',
  'ruby', 'php', 'swift', 'kotlin', 'scala', 'bash', 'shell', 'r', 'dart', 'perl',
  // Frontend
  'react', 'react.js', 'next.js', 'vue', 'vue.js', 'angular', 'svelte', 'redux', 'tailwind css',
  'tailwind', 'bootstrap', 'html', 'html5', 'css', 'css3', 'sass', 'webpack', 'vite',
  // Backend & APIs
  'node.js', 'node', 'express', 'express.js', 'fastapi', 'flask', 'django', 'spring boot',
  'spring', 'ruby on rails', 'rest api', 'restful apis', 'rest', 'graphql', 'grpc', 'microservices',
  'websockets', 'socket.io',
  // Databases & Storage
  'postgresql', 'postgres', 'mysql', 'mongodb', 'redis', 'sqlite', 'oracle', 'dynamodb',
  'cassandra', 'elasticsearch', 'prisma', 'sql', 'nosql', 'firebase', 'firestore',
  // Cloud & DevOps
  'aws', 'amazon web services', 'ec2', 's3', 'lambda', 'ecs', 'eks', 'cloudwatch', 'iam',
  'azure', 'google cloud', 'gcp', 'docker', 'kubernetes', 'k8s', 'terraform', 'ansible',
  'ci/cd', 'jenkins', 'github actions', 'gitlab ci', 'linux', 'unix', 'nginx', 'apache',
  // Testing & Quality
  'jest', 'cypress', 'mocha', 'chai', 'pytest', 'selenium', 'unit testing', 'integration testing',
  'tdd', 'test driven development',
  // Methodologies & Tools
  'git', 'github', 'gitlab', 'bitbucket', 'jira', 'confluence', 'agile', 'scrum', 'kanban',
  // Data & AI / ML
  'machine learning', 'deep learning', 'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch',
  'data analysis', 'power bi', 'tableau', 'etl',
];

// Action verbs that indicate strong impact and quantifiable work
const ACTION_VERBS = [
  'architected', 'spearheaded', 'delivered', 'optimized', 'engineered', 'developed',
  'orchestrated', 'streamlined', 'implemented', 'designed', 'accelerated', 'reduced',
  'boosted', 'generated', 'scaled', 'mentored', 'collaborated', 'provisioned',
  'automated', 'built', 'maintained', 'deployed', 'managed', 'led'
];

/**
 * Normalizes text for case-insensitive matching
 */
function normalizeText(text) {
  return (text || '').toLowerCase();
}

/**
 * Extracts key technical terms and words from a Job Description
 */
export function extractJdKeywords(jdText) {
  if (!jdText || jdText.trim().length === 0) {
    // Standard industry baseline if no JD supplied
    return [
      'react', 'javascript', 'typescript', 'node.js', 'aws', 'docker',
      'ci/cd', 'rest api', 'sql', 'git', 'agile', 'unit testing'
    ];
  }

  const normalized = normalizeText(jdText);
  const foundKeywords = new Set();

  // 1. Check against dictionary skills
  for (const skill of SKILLS_DICTIONARY) {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(normalized)) {
      foundKeywords.add(skill);
    }
  }

  // 2. Extract capitalized or acronym tokens from JD (e.g. AWS, CI/CD, SQL, REST)
  const tokenRegex = /\b[A-Za-z0-9#+.-]{2,15}\b/g;
  const words = jdText.match(tokenRegex) || [];
  
  // Clean common stop words
  const stopWords = new Set([
    'and', 'the', 'with', 'for', 'you', 'will', 'are', 'our', 'team', 'work',
    'have', 'experience', 'years', 'looking', 'role', 'responsibilities', 'requirements',
    'qualifications', 'strong', 'skills', 'about', 'join', 'company', 'building', 'across'
  ]);

  for (const w of words) {
    const lower = w.toLowerCase();
    if (lower.length > 2 && !stopWords.has(lower) && SKILLS_DICTIONARY.includes(lower)) {
      foundKeywords.add(lower);
    }
  }

  const result = Array.from(foundKeywords);
  // Ensure we always have a healthy set to evaluate against
  if (result.length < 5) {
    return [
      'react', 'node.js', 'javascript', 'typescript', 'aws', 'docker',
      'git', 'sql', 'ci/cd', 'agile'
    ];
  }

  return result;
}

/**
 * Analyzes resume contact information (Max: 5 pts)
 */
function analyzeContactInfo(resumeText) {
  let score = 0;
  const feedback = [];
  const normalized = normalizeText(resumeText);

  // Email check (2 pts)
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
  const hasEmail = emailRegex.test(resumeText);
  if (hasEmail) {
    score += 2;
    feedback.push('Professional email address detected.');
  } else {
    feedback.push('Missing valid email address.');
  }

  // Phone number check (1.5 pts)
  const phoneRegex = /(?:(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4})/;
  const hasPhone = phoneRegex.test(resumeText);
  if (hasPhone) {
    score += 1.5;
    feedback.push('Phone contact number present.');
  } else {
    feedback.push('Missing phone contact number.');
  }

  // Location or Social/GitHub/LinkedIn link (1.5 pts)
  const hasLinkedIn = normalized.includes('linkedin.com') || normalized.includes('github.com');
  const hasLocation = /\b(remote|[A-Z][a-z]+,\s*[A-Z]{2})\b/.test(resumeText) || normalized.includes('location');
  if (hasLinkedIn || hasLocation) {
    score += 1.5;
    feedback.push('Location or professional profile link (LinkedIn/GitHub) detected.');
  } else {
    feedback.push('Add a location or professional portfolio/LinkedIn link.');
  }

  const roundedScore = Math.min(5, Math.round(score * 10) / 10);
  return {
    name: 'Contact Information',
    score: roundedScore,
    maxScore: 5,
    status: roundedScore >= 4.5 ? 'pass' : roundedScore >= 3 ? 'warning' : 'fail',
    details: feedback.join(' '),
    tip: 'Include a clean header with your email, phone, location, and LinkedIn/GitHub profile.'
  };
}

/**
 * Analyzes professional summary (Max: 10 pts)
 */
function analyzeSummary(resumeText) {
  let score = 0;
  const feedback = [];
  const normalized = normalizeText(resumeText);

  const hasSummaryHeading = /(summary|professional summary|executive summary|about me|profile|objective)/i.test(resumeText);
  if (hasSummaryHeading) {
    score += 3;
    feedback.push('Professional summary section header detected.');
  } else {
    feedback.push('No distinct Summary or Profile section found.');
  }

  // Word count in summary proximity
  const words = resumeText.split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  // Check for action verbs or experience claims in first 150 words
  const introSlice = normalized.slice(0, 700);
  const matchedVerbs = ACTION_VERBS.filter((v) => introSlice.includes(v));
  if (matchedVerbs.length >= 2) {
    score += 4;
    feedback.push(`Strong action verbs found in summary (${matchedVerbs.slice(0, 3).join(', ')}).`);
  } else if (matchedVerbs.length === 1) {
    score += 2;
    feedback.push('Summary has few active verbs.');
  } else {
    feedback.push('Incorporate punchy action verbs like "architected", "delivered", or "optimized".');
  }

  // Conciseness check
  if (hasSummaryHeading && totalWords >= 80) {
    score += 3;
    feedback.push('Well-structured summary length.');
  } else if (hasSummaryHeading) {
    score += 1.5;
  }

  const roundedScore = Math.min(10, Math.round(score));
  return {
    name: 'Professional Summary',
    score: roundedScore,
    maxScore: 10,
    status: roundedScore >= 8 ? 'pass' : roundedScore >= 5 ? 'warning' : 'fail',
    details: feedback.join(' '),
    tip: 'Provide a 3-4 sentence summary highlighting your core tech stack, years of experience, and key accomplishments.'
  };
}

/**
 * Analyzes skills section and technical skill density (Max: 20 pts)
 */
function analyzeSkills(resumeText) {
  let score = 0;
  const feedback = [];
  const normalized = normalizeText(resumeText);

  // Section heading (4 pts)
  const hasHeading = /(skills|technical skills|core competencies|technologies|proficiencies)/i.test(resumeText);
  if (hasHeading) {
    score += 4;
    feedback.push('Dedicated Skills section header detected.');
  } else {
    feedback.push('No dedicated Skills header identified.');
  }

  // Detect skills from catalog
  const detected = [];
  for (const skill of SKILLS_DICTIONARY) {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(normalized)) {
      detected.push(skill);
    }
  }

  // Score based on skills count (Max: 16 pts)
  if (detected.length >= 12) {
    score += 16;
    feedback.push(`Excellent skill density (${detected.length} technical skills identified).`);
  } else if (detected.length >= 8) {
    score += 12;
    feedback.push(`Good skill coverage (${detected.length} skills identified).`);
  } else if (detected.length >= 4) {
    score += 7;
    feedback.push(`Moderate skill list (${detected.length} skills identified).`);
  } else {
    score += 3;
    feedback.push(`Low skill coverage (${detected.length} skills detected).`);
  }

  const roundedScore = Math.min(20, Math.round(score));
  return {
    name: 'Skills & Competencies',
    score: roundedScore,
    maxScore: 20,
    detectedSkills: detected,
    status: roundedScore >= 16 ? 'pass' : roundedScore >= 10 ? 'warning' : 'fail',
    details: feedback.join(' '),
    tip: 'Group skills by category (e.g. Frontend, Backend, Cloud & DevOps, Databases) for optimal ATS readability.'
  };
}

/**
 * Analyzes professional work experience (Max: 20 pts)
 */
function analyzeExperience(resumeText) {
  let score = 0;
  const feedback = [];
  const normalized = normalizeText(resumeText);

  // Heading check (4 pts)
  const hasHeading = /(experience|work experience|employment history|professional experience)/i.test(resumeText);
  if (hasHeading) {
    score += 4;
    feedback.push('Work Experience section heading present.');
  } else {
    feedback.push('No formal Work Experience heading found.');
  }

  // Date chronological presence (4 pts)
  const dateRegex = /\b(20[0-2][0-9]|19[8-9][0-9]|\bpresent\b|\bcurrent\b)/i;
  const hasDates = dateRegex.test(resumeText);
  if (hasDates) {
    score += 4;
    feedback.push('Employment timeline and dates clearly formatted.');
  } else {
    feedback.push('Missing employment dates or clear chronological order.');
  }

  // Quantified metrics & achievements (numbers, percentages, scale) (8 pts)
  const metricMatches = resumeText.match(/(\d+%\b|\$\d+|\b\d+\+?\b|\b\d+k\b|\b\d+x\b)/gi) || [];
  if (metricMatches.length >= 5) {
    score += 8;
    feedback.push('Strong quantification of achievements with metrics/percentages.');
  } else if (metricMatches.length >= 2) {
    score += 5;
    feedback.push('Moderate use of quantifiable numbers and impact metrics.');
  } else {
    score += 2;
    feedback.push('Few or no quantified accomplishments (percentages, numbers, savings).');
  }

  // Role titles (4 pts)
  const roleTitles = ['engineer', 'developer', 'architect', 'manager', 'lead', 'analyst', 'administrator', 'consultant', 'intern'];
  const hasRoleTitle = roleTitles.some((r) => normalized.includes(r));
  if (hasRoleTitle) {
    score += 4;
    feedback.push('Recognizable professional job titles detected.');
  } else {
    feedback.push('Ensure standard job titles like "Software Engineer" or "DevOps Engineer" are highlighted.');
  }

  const roundedScore = Math.min(20, Math.round(score));
  return {
    name: 'Work Experience',
    score: roundedScore,
    maxScore: 20,
    status: roundedScore >= 16 ? 'pass' : roundedScore >= 10 ? 'warning' : 'fail',
    details: feedback.join(' '),
    tip: 'Use the XYZ formula: Accomplished [X], as measured by [Y], by doing [Z] for each bullet point.'
  };
}

/**
 * Analyzes education section (Max: 10 pts)
 */
function analyzeEducation(resumeText) {
  let score = 0;
  const feedback = [];
  const normalized = normalizeText(resumeText);

  // Heading (3 pts)
  const hasHeading = /(education|academic background|academics|degrees)/i.test(resumeText);
  if (hasHeading) {
    score += 3;
    feedback.push('Education section header present.');
  } else {
    feedback.push('Education section header missing.');
  }

  // Degree keywords (4 pts)
  const degreeRegex = /(bachelor|master|b\.s\.|m\.s\.|ph\.d\.|btech|mtech|degree|diploma|associate)/i;
  const hasDegree = degreeRegex.test(resumeText);
  if (hasDegree) {
    score += 4;
    feedback.push('Standard academic degree credential detected.');
  } else {
    feedback.push('No recognized degree credential (e.g. Bachelor of Science) found.');
  }

  // University / Graduation year (3 pts)
  const hasInstitution = /(university|college|institute|graduated|\b20[0-2][0-9]\b)/i.test(resumeText);
  if (hasInstitution) {
    score += 3;
    feedback.push('Academic institution and graduation timeline stated.');
  } else {
    feedback.push('Add your college/university name and expected or actual graduation year.');
  }

  const roundedScore = Math.min(10, Math.round(score));
  return {
    name: 'Education',
    score: roundedScore,
    maxScore: 10,
    status: roundedScore >= 8 ? 'pass' : roundedScore >= 5 ? 'warning' : 'fail',
    details: feedback.join(' '),
    tip: 'State your full degree, major, university name, and graduation year clearly.'
  };
}

/**
 * Analyzes projects section (Max: 10 pts)
 */
function analyzeProjects(resumeText) {
  let score = 0;
  const feedback = [];
  const normalized = normalizeText(resumeText);

  // Heading (4 pts)
  const hasHeading = /(projects|personal projects|key projects|academic projects|technical projects)/i.test(resumeText);
  if (hasHeading) {
    score += 4;
    feedback.push('Projects section header identified.');
  } else {
    feedback.push('No distinct Projects section detected.');
  }

  // Tech stack references in projects or bullet points (6 pts)
  if (hasHeading) {
    const techWordsInProject = SKILLS_DICTIONARY.filter((skill) => normalized.includes(skill));
    if (techWordsInProject.length >= 4) {
      score += 6;
      feedback.push('Projects list concrete technologies, tooling, and architectures.');
    } else {
      score += 3;
      feedback.push('Add specific tools and cloud services used in each project description.');
    }
  } else {
    feedback.push('Include 2-3 hands-on projects showcasing cloud, frontend, and backend competencies.');
  }

  const roundedScore = Math.min(10, Math.round(score));
  return {
    name: 'Projects',
    score: roundedScore,
    maxScore: 10,
    status: roundedScore >= 8 ? 'pass' : roundedScore >= 5 ? 'warning' : 'fail',
    details: feedback.join(' '),
    tip: 'Include project links (GitHub/Live Demo) and detail the technologies and problem solved.'
  };
}

/**
 * Analyzes keyword alignment against target Job Description (Max: 15 pts)
 */
function analyzeKeywords(resumeText, jdKeywords) {
  const normalized = normalizeText(resumeText);
  const matched = [];
  const missing = [];

  for (const kw of jdKeywords) {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(normalized)) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  }

  const matchRatio = jdKeywords.length > 0 ? matched.length / jdKeywords.length : 0.7;
  const keywordMatchPercent = Math.min(100, Math.round(matchRatio * 100));
  
  // Score out of 15
  const rawScore = matchRatio * 15;
  const score = Math.min(15, Math.max(0, Math.round(rawScore * 10) / 10));

  let status = 'fail';
  if (keywordMatchPercent >= 75) status = 'pass';
  else if (keywordMatchPercent >= 50) status = 'warning';

  return {
    name: 'Target Keywords Match',
    score: Math.round(score),
    maxScore: 15,
    keywordMatch: keywordMatchPercent,
    matchedKeywords: matched,
    missingKeywords: missing,
    status,
    details: `${matched.length} of ${jdKeywords.length} target job description keywords detected (${keywordMatchPercent}% match).`,
    tip: missing.length > 0
      ? `Naturally integrate missing keywords like ${missing.slice(0, 4).join(', ')} into your bullet points.`
      : 'Great job! Your resume closely reflects the keywords found in the target job posting.'
  };
}

/**
 * Analyzes formatting, readability, and structural health (Max: 10 pts)
 */
function analyzeFormatting(resumeText) {
  let score = 0;
  const feedback = [];
  const words = resumeText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Length check (ideal: 250 - 900 words) (3 pts)
  if (wordCount >= 250 && wordCount <= 900) {
    score += 3;
    feedback.push(`Optimal word count (${wordCount} words) for standard 1-2 page format.`);
  } else if (wordCount > 900) {
    score += 1.5;
    feedback.push(`Word count (${wordCount} words) is slightly lengthy; aim for concise 1-page impact.`);
  } else {
    score += 1;
    feedback.push(`Resume text is sparse (${wordCount} words); elaborate on impact and skills.`);
  }

  // Bullet point usage (3 pts)
  const hasBullets = /[-•*]\s+/m.test(resumeText);
  if (hasBullets) {
    score += 3;
    feedback.push('Clear bullet point hierarchy for scannability.');
  } else {
    feedback.push('Use bullet points instead of narrative paragraphs for better ATS parsing.');
  }

  // Clean ASCII / No broken encoding artifacts (2 pts)
  const nonAsciiCount = (resumeText.match(/[^\x00-\x7F]/g) || []).length;
  if (nonAsciiCount < 10) {
    score += 2;
    feedback.push('Clean ATS-friendly text encoding without strange glyphs or tables.');
  } else {
    score += 1;
    feedback.push('Potential non-standard characters detected; ensure standard font glyphs.');
  }

  // Capitalization / Section balance (2 pts)
  const upperHeaders = resumeText.match(/^[A-Z\s]{4,}$/m);
  if (upperHeaders || words.length > 100) {
    score += 2;
    feedback.push('Logical capitalization and clean section demarcations.');
  } else {
    score += 1;
  }

  const roundedScore = Math.min(10, Math.round(score));
  return {
    name: 'Formatting & Readability',
    score: roundedScore,
    maxScore: 10,
    status: roundedScore >= 8 ? 'pass' : roundedScore >= 5 ? 'warning' : 'fail',
    details: feedback.join(' '),
    tip: 'Stick to clean single-column layouts, standard headings, and bullet points without nested tables.'
  };
}

/**
 * Compiles actionable, prioritized improvement suggestions
 */
function generateSuggestions(sectionResults, missingKeywords, overallScore) {
  const suggestions = [];

  // 1. Missing Keywords (High Priority if any exist)
  if (missingKeywords.length > 0) {
    suggestions.push({
      id: 'sug-keywords',
      priority: 'high',
      category: 'Keywords Optimization',
      title: `Integrate ${missingKeywords.length} Target Keywords`,
      description: `Your target job description expects keywords like: ${missingKeywords.slice(0, 5).join(', ')}. Work these into your experience or project bullet points where relevant.`
    });
  }

  // 2. Section specific suggestions
  sectionResults.forEach((section) => {
    if (section.status === 'fail' || section.score < section.maxScore * 0.6) {
      suggestions.push({
        id: `sug-${section.name.toLowerCase().replace(/\s+/g, '-')}`,
        priority: 'high',
        category: section.name,
        title: `Strengthen ${section.name} (Scored ${section.score}/${section.maxScore})`,
        description: section.tip || section.details
      });
    } else if (section.status === 'warning') {
      suggestions.push({
        id: `sug-${section.name.toLowerCase().replace(/\s+/g, '-')}`,
        priority: 'medium',
        category: section.name,
        title: `Refine ${section.name} (Scored ${section.score}/${section.maxScore})`,
        description: section.tip || section.details
      });
    }
  });

  // 3. Quantitative metrics recommendation
  const expSection = sectionResults.find((s) => s.name === 'Work Experience');
  if (expSection && expSection.score < expSection.maxScore) {
    suggestions.push({
      id: 'sug-metrics',
      priority: 'medium',
      category: 'Impact Metrics',
      title: 'Quantify Achievements With Hard Numbers',
      description: 'Replace generic job duties with measurable results (e.g. "Reduced build times by 35%", "Maintained 99.9% uptime", "Managed $50k monthly cloud budget").'
    });
  }

  // 4. Low priority polishes
  suggestions.push({
    id: 'sug-ats-format',
    priority: 'low',
    category: 'Format Polish',
    title: 'Maintain ATS-Clean Document Structure',
    description: 'Avoid multi-column tables, text boxes, and embedded graphics which some legacy ATS parsers fail to extract properly.'
  });

  return suggestions;
}

export const atsService = {
  /**
   * Deterministically analyze resume text against an optional Job Description
   * @param {string} resumeText - Extracted resume text
   * @param {string} jdText - Job Description text
   * @returns {Object} - Full ATS analysis report
   */
  analyzeResume(resumeText, jdText = '') {
    if (!resumeText || resumeText.trim().length === 0) {
      throw new Error('Please provide resume text or upload a valid resume file.');
    }

    const jdKeywords = extractJdKeywords(jdText);

    // 1. Evaluate individual sections
    const contactAnalysis = analyzeContactInfo(resumeText);
    const summaryAnalysis = analyzeSummary(resumeText);
    const skillsAnalysis = analyzeSkills(resumeText);
    const experienceAnalysis = analyzeExperience(resumeText);
    const educationAnalysis = analyzeEducation(resumeText);
    const projectsAnalysis = analyzeProjects(resumeText);
    const keywordsAnalysis = analyzeKeywords(resumeText, jdKeywords);
    const formattingAnalysis = analyzeFormatting(resumeText);

    const sectionAnalysis = [
      contactAnalysis,
      summaryAnalysis,
      skillsAnalysis,
      experienceAnalysis,
      educationAnalysis,
      projectsAnalysis,
      keywordsAnalysis,
      formattingAnalysis,
    ];

    // Compute total deterministic score (exact sum of parts)
    const rawTotalScore = sectionAnalysis.reduce((acc, curr) => acc + curr.score, 0);
    const score = Math.min(100, Math.max(0, Math.round(rawTotalScore)));

    // Categorize detected skills
    const detectedSkills = skillsAnalysis.detectedSkills || [];
    const missingKeywords = keywordsAnalysis.missingKeywords || [];
    const matchedKeywords = keywordsAnalysis.matchedKeywords || [];

    // Compile actionable suggestions
    const suggestions = generateSuggestions(sectionAnalysis, missingKeywords, score);

    return {
      score,
      keywordMatch: keywordsAnalysis.keywordMatch,
      detectedSkills,
      missingKeywords,
      matchedKeywords,
      sectionAnalysis,
      suggestions,
      analyzedAt: new Date().toISOString(),
      wordCount: resumeText.split(/\s+/).filter(Boolean).length,
    };
  }
};
