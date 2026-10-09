const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { analyzeResumeText } = require('./aiService');

/**
 * Resume Parser Service
 * Safely extracts raw text from PDF and DOCX buffers without executing untrusted binaries.
 */

async function extractTextFromFile(filePath, mimeType, originalName) {
  const extension = originalName.split('.').pop().toLowerCase();

  try {
    if (extension === 'pdf' || mimeType === 'application/pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return sanitizeText(data.text);
    } else if (
      extension === 'docx' ||
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      return sanitizeText(result.value);
    } else if (extension === 'txt' || mimeType === 'text/plain') {
      const text = fs.readFileSync(filePath, 'utf-8');
      return sanitizeText(text);
    } else {
      throw new Error(`Unsupported resume format: ${extension}. Please upload PDF or DOCX.`);
    }
  } catch (error) {
    console.error(`[Resume Parser] Error parsing ${originalName}:`, error.message);
    throw new Error(`Failed to parse resume document: ${error.message}`);
  }
}

/**
 * Sanitize untrusted document text: strip null bytes, limit size, normalize line breaks
 */
function sanitizeText(raw) {
  if (!raw) return '';
  return raw
    .replace(/\0/g, '') // remove null bytes
    .replace(/\r\n/g, '\n')
    .slice(0, 100000) // max 100KB of clean text
    .trim();
}

/**
 * End-to-end resume analyzer pipeline
 */
async function processResume(filePath, mimeType, originalName, targetRole = 'Full-Stack Developer') {
  const extractedText = await extractTextFromFile(filePath, mimeType, originalName);

  if (!extractedText || extractedText.length < 50) {
    throw new Error('Resume file contains insufficient readable text or is an image-only scanned document.');
  }

  // Pass sanitized text to AI / Evidence extraction
  const analysis = await analyzeResumeText(extractedText, targetRole);

  return {
    rawTextPreview: extractedText.slice(0, 500) + '...',
    fileName: originalName,
    parsedAt: new Date(),
    ...analysis
  };
}

module.exports = {
  extractTextFromFile,
  processResume,
  sanitizeText
};
