/**
 * textExtractor.js
 * Client-side text extraction from uploaded files.
 * Supports: PDF, DOCX, XLSX, CSV, TXT, and plain text files.
 */

/**
 * Extract text content from a File object.
 * Returns plain text string.
 */
export async function extractTextFromFile(file) {
  const name = file.name.toLowerCase()

  if (name.endsWith('.txt') || name.endsWith('.md')) {
    return readAsText(file)
  }

  if (name.endsWith('.csv')) {
    const text = await readAsText(file)
    return csvToReadable(text)
  }

  if (name.endsWith('.pdf')) {
    return extractFromPDF(file)
  }

  if (name.endsWith('.docx') || name.endsWith('.doc')) {
    return extractFromWord(file)
  }

  if (name.endsWith('.xlsx') || name.endsWith('.xls')) {
    return extractFromExcel(file)
  }

  // Fallback: try to read as text
  try {
    return readAsText(file)
  } catch {
    return `[File: ${file.name} — Text extraction not supported for this format]`
  }
}

function readAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = reject
    reader.readAsText(file, 'UTF-8')
  })
}

function readAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

function csvToReadable(csvText) {
  const lines = csvText.split('\n').filter(Boolean)
  if (lines.length === 0) return csvText
  const headers = lines[0].split(',').map((h) => h.trim().replace(/"/g, ''))
  const rows = lines.slice(1).map((line) => {
    const vals = line.split(',').map((v) => v.trim().replace(/"/g, ''))
    return headers.map((h, i) => `${h}: ${vals[i] || ''}`).join(' | ')
  })
  return `CSV Data (${rows.length} rows):\nColumns: ${headers.join(', ')}\n\n${rows.slice(0, 200).join('\n')}`
}

async function extractFromPDF(file) {
  try {
    const pdfjsLib = await import('pdfjs-dist')
    // Use the bundled worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.mjs',
      import.meta.url
    ).toString()

    const arrayBuffer = await readAsArrayBuffer(file)
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    const totalPages = pdf.numPages
    let fullText = `PDF Document: ${file.name} (${totalPages} pages)\n\n`

    for (let pageNum = 1; pageNum <= Math.min(totalPages, 50); pageNum++) {
      const page = await pdf.getPage(pageNum)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map((item) => item.str).join(' ')
      if (pageText.trim()) {
        fullText += `--- Page ${pageNum} ---\n${pageText}\n\n`
      }
    }

    return fullText || `[PDF: ${file.name} — Could not extract text. The file may be scanned/image-based.]`
  } catch (err) {
    console.error('PDF extraction error:', err)
    return `[PDF: ${file.name} — Text extraction failed: ${err.message}]`
  }
}

async function extractFromWord(file) {
  try {
    const mammoth = await import('mammoth')
    const arrayBuffer = await readAsArrayBuffer(file)
    const result = await mammoth.extractRawText({ arrayBuffer })
    return result.value || `[Word Document: ${file.name} — No text content found]`
  } catch (err) {
    console.error('Word extraction error:', err)
    return `[Word Document: ${file.name} — Text extraction failed: ${err.message}]`
  }
}

async function extractFromExcel(file) {
  try {
    const XLSX = await import('xlsx')
    const arrayBuffer = await readAsArrayBuffer(file)
    const workbook = XLSX.read(arrayBuffer, { type: 'array' })

    let fullText = `Excel Workbook: ${file.name}\nSheets: ${workbook.SheetNames.join(', ')}\n\n`

    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName]
      const csv = XLSX.utils.sheet_to_csv(worksheet)
      if (csv.trim()) {
        fullText += `--- Sheet: ${sheetName} ---\n${csvToReadable(csv)}\n\n`
      }
    }

    return fullText
  } catch (err) {
    console.error('Excel extraction error:', err)
    return `[Excel: ${file.name} — Text extraction failed: ${err.message}]`
  }
}
