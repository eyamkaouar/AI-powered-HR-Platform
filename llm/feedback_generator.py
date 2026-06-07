import requests
import json
import os
import re

MISTRAL_API_KEY = "nYmiVpuyk5ffDJNPU1E8awmD0uB1hc5G"
MISTRAL_MODEL = "mistral-tiny" 

STATIC_ROLES = [
    { "id": "ds", "title": "Data Scientist", "requirements": ["Python", "PyTorch", "SQL", "Statistics", "BigQuery"] },
    { "id": "se", "title": "Software Engineer", "requirements": ["React", "Node.js", "PostgreSQL", "System Design", "Git"] },
    { "id": "ce", "title": "Cloud Engineer", "requirements": ["AWS", "Terraform", "Kubernetes", "Networking", "IAM"] },
    { "id": "do", "title": "DevOps Specialist", "requirements": ["CI/CD", "Docker", "Jenkins", "Linux Admin", "Monitoring"] },
    { "id": "qe", "title": "Quality Engineer", "requirements": ["Selenium", "Cypress", "Automation Testing", "Agile", "Jira"] }
]

def clean_label(key):
    # Remove technical prefixes and underscores
    label = re.sub(r'^(lang_|fw_|plat_|misc_|db_|ai_|dev_|is_)', '', key)
    label = label.replace('__', ' ').replace('_', ' ')
    return label.title()

def generate_match_feedback(parsed_data):
    url = "https://api.mistral.ai/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {MISTRAL_API_KEY}"
    }
    
    # AGGRESSIVE SANITIZATION: Only send the role title and high-level traits
    # We completely hide the raw numbers and technical keys from the LLM input
    traits = []
    for k, v in parsed_data.items():
        if v and (isinstance(v, (int, float)) and v > 0):
            label = clean_label(k)
            # If it's a binary skill (1.0), just list the skill name
            if v == 1:
                traits.append(label)
            # If it's a score/metric, convert to a pure word
            elif any(x in label for x in ["Score", "Efficiency", "Te", "Ratio", "Premium"]):
                if v > 0.7: traits.append(f"Expert-level {label}")
                elif v > 0.4: traits.append(f"Strong {label}")
            elif k in ["YearsCodePro", "WorkExp", "YearsCode"]:
                if v > 10: traits.append("Extensive professional experience")
                elif v > 5: traits.append("Established career history")
                else: traits.append("Foundational professional background")

    prompt = f"""
    You are a professional Recruitment Director. Evaluate this candidate profile for the available roles.
    
    Candidate Traits & Skills:
    {", ".join(traits)}
    
    Available Roles:
    {json.dumps(STATIC_ROLES, indent=2)}
    
    STRICTEST OUTPUT RULES:
    1. NEVER use any numbers (e.g., 0-9).
    2. NEVER use technical feature names or words with underscores (e.g., seniority_score).
    3. Use ONLY natural, professional, text-only English.
    4. If the candidate doesn't fit, return "no_match".
    
    Return ONLY a JSON object:
    {{
        "recommended_role_id": "role_id or no_match",
        "role_title": "Role Title",
        "justification": "Pure text analysis. No digits. No underscores.",
        "improvement_areas": ["Word-based goal 1", "Word-based goal 2"]
    }}
    """
    
    data = {
        "model": MISTRAL_MODEL,
        "messages": [
            {"role": "system", "content": "You are a senior recruiter. You communicate using natural language only. Numbers and underscores are strictly forbidden in your output."},
            {"role": "user", "content": prompt}
        ],
        "response_format": {"type": "json_object"}
    }
    
    try:
        response = requests.post(url, headers=headers, data=json.dumps(data), timeout=30)
        response.raise_for_status()
        result = response.json()
        content = result['choices'][0]['message']['content']
        parsed_result = json.loads(content)
        
        # AGGRESSIVE POST-PROCESSOR: Scrub any remaining digits or underscores
        def scrub_content(text):
            if not isinstance(text, str): return text
            # 1. Remove any word containing an underscore (internal feature names)
            text = re.sub(r'\b\w*_\w*\b', '', text)
            # 2. Remove any digits or decimal points
            text = re.sub(r'[\d\.]+', '', text)
            # 3. Clean up double spaces
            return re.sub(r'\s+', ' ', text).strip()

        parsed_result['justification'] = scrub_content(parsed_result.get('justification', ''))
        parsed_result['improvement_areas'] = [scrub_content(area) for area in parsed_result.get('improvement_areas', [])]
        
        return parsed_result
    except Exception as e:
        return {
            "recommended_role_id": "unknown",
            "role_title": "Analysis Unavailable",
            "justification": "Technical error during analysis.",
            "improvement_areas": ["Verify connectivity", "Retry upload"]
        }

