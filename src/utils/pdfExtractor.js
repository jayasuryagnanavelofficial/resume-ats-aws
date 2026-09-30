/**
 * pdfExtractor.js
 * 
 * Utility to extract raw text content from uploaded PDF files in the browser.
 * Utilizes pdfjs-dist with graceful fallbacks.
 */

import * as pdfjsLib from 'pdfjs-dist';

// Set worker source via reliable CDN matching the installed version to avoid Vite bundling worker issues
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

/**
 * Extracts plain text from a File object (PDF or text).
 * @param {File} file - The uploaded file
 * @returns {Promise<string>} - Extracted text
 */
export async function extractTextFromFile(file) {
  if (!file) {
    throw new Error('No file provided.');
  }

  // Handle plain text files
  if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
    return await file.text();
  }

  // Handle PDF files
  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      let fullText = '';
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageItems = textContent.items.map((item) => item.str).join(' ');
        fullText += pageItems + '\n\n';
      }

      if (!fullText.trim()) {
        throw new Error('PDF appears to be empty or contains scanned images without selectable text.');
      }

      return fullText.trim();
    } catch (err) {
      console.warn('PDF extraction warning:', err);
      throw new Error(
        err.message || 'Could not parse text from this PDF. Please test using our sample resumes or paste the resume text.'
      );
    }
  }

  throw new Error('Unsupported file format. Please upload a PDF (.pdf) or text (.txt) file.');
}
