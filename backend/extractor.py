import pdfplumber

def extract_text_from_pdf(pdf_path):
    """Extracts all text from a PDF file."""
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() + "\n"
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
    return text

if __name__ == "__main__":
    import os
    cv_path = os.path.join(os.path.dirname(__file__), "cv.pdf")
    print(extract_text_from_pdf(cv_path))
