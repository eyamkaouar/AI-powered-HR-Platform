# HR AI Platform 🚀

A high-fidelity, end-to-end recruitment solution that leverages **Machine Learning** for salary prediction and **LLMs** for strategic candidate matching and professional growth analysis.

## 🌟 Key Features

-   **Intelligent CV Parsing:** Automatically extracts 120+ technical and professional features from PDF resumes.
-   **Salary Prediction:** Uses an **Extra Trees Regressor** model to forecast market-competitive salary ranges based on candidate experience and region.
-   **AI Professional Matching:** Integrated with **Mistral AI** to provide high-level, human-readable evaluation reports.
-   **Global Salary Map:** Interactive world map visualization showing market rates across different countries using `react-plotly.js`.
-   **Modern Recruiter Dashboard:** Sleek, responsive 2-column layout designed for a seamless screening experience.
-   **Automated Docker Setup:** Fully containerized for one-click deployment.

## 🛠️ Technology Stack

-   **Backend:** FastAPI (Python), pdfplumber, scikit-learn, Mistral AI API.
-   **Frontend:** React (Vite), Tailwind CSS, Framer Motion, Lucide Icons, Plotly.
-   **DevOps:** Docker, Docker Compose.

---

## 🚀 How to Test the Project

There are two ways to get the platform running on your machine.

### Method 1: Docker (Recommended)
The easiest way to run the project without installing local dependencies.

1.  **Ensure Docker is installed** and running on your system.
2.  **Clone the repository** and navigate to the root folder.
3.  Run the following command:
    ```bash
    docker-compose up --build
    ```
4.  Access the applications:
    -   **Frontend:** [http://localhost:5173](http://localhost:5173)
    -   **Backend API:** [http://localhost:8000](http://localhost:8000)

### Method 2: Manual Setup (Local Development)

#### 1. Backend Setup
```bash
# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\activate  # Windows
source venv/bin/activate # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Start the server
python backend/main.py
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📝 Usage Guide

1.  **Login:** Click "Login" on the entry page (placeholder authentication).
2.  **Navigate to "CV Analysis":** Click the "Upload CV" tab in the sidebar.
3.  **Upload Resume:** Drag and drop a technical PDF resume.
4.  **View Insights:**
    -   See the **Market Salary Forecast** on the left.
    -   Review the **AI Matching Report** on the right for fit justification and growth goals.
    -   Explore the **Technical Breakdown** of detected skills.

---

## 🛡️ Privacy & Safety
- Internal machine learning feature names and numeric scores are filtered out of all AI responses to ensure a clean, professional recruiter experience.
- No resume data is permanently stored; extraction and analysis happen in-memory.
