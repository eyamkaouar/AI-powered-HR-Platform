from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn
import os
import shutil
import sys
from pathlib import Path

# Add project root to sys.path
root_path = Path(__file__).resolve().parent.parent
sys.path.append(str(root_path))

from parser import parse_cv_text
from extractor import extract_text_from_pdf
from predictor import predictor
from llm.feedback_generator import generate_match_feedback

app = FastAPI(title="AI HR Assistant API")

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_cv(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    # Save temporary file
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        # Extract and parse
        text = extract_text_from_pdf(temp_path)
        parsed_data = parse_cv_text(text)
        
        # Add salary prediction
        predicted_salary = predictor.predict(parsed_data)
        parsed_data['predicted_salary'] = predicted_salary
        
        # Add AI matching feedback
        ai_matching = generate_match_feedback(parsed_data)
        parsed_data['ai_matching'] = ai_matching
        
        return parsed_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Cleanup
        if os.path.exists(temp_path):
            os.remove(temp_path)

# Serve Frontend Static Files
# The frontend build folder is at /app/frontend/dist
parent_dir = os.path.dirname(os.path.dirname(__file__))
frontend_path = os.path.join(parent_dir, "frontend", "dist")

if os.path.exists(frontend_path):
    print(f"DEBUG: Serving frontend from {frontend_path}")
    
    # Mount the assets folder for CSS/JS
    assets_path = os.path.join(frontend_path, "assets")
    if os.path.exists(assets_path):
        app.mount("/assets", StaticFiles(directory=assets_path), name="assets")

    # Explicitly serve index.html at root
    @app.get("/")
    async def serve_index():
        return FileResponse(os.path.join(frontend_path, "index.html"))

    # Catch-all for other frontend routes (SPA)
    @app.get("/{full_path:path}")
    async def catch_all(full_path: str):
        # Avoid catching API routes if they were GET
        if full_path.startswith("upload"):
            return 
        
        page_path = os.path.join(frontend_path, "index.html")
        if os.path.exists(page_path):
            return FileResponse(page_path)
        return {"detail": "Frontend index not found"}
else:
    print(f"WARNING: Frontend path NOT found at {frontend_path}")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
