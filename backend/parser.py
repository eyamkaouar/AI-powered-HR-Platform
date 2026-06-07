import re

def parse_cv_text(text):
    """
    Highly advanced CV parser that extracts a massive set of features.
    Matches field names with values (numeric or string) and handles binary flags.
    """
    
    # Mapping of field name to its target type (float or int)
    field_config = {
        "country_p90": float, "country_p10": float, "country_p75": float, "country_p25": float, 
        "country_median_salary": float, "country_market_premium": float, "country_mean_salary": float, 
        "country_iqr": float, "country_count": int, "country_te_x_cluster": float, "lang_vs_market": float, 
        "country_te": float, "log_country_te": float, "country_x_devtype": float, "market_x_exp": float, 
        "org_x_market": float, "country_cluster": int, "country_devtype_interact": float, "cluster_te": float, 
        "country_x_exp": float, "is_usa": int, "is_western_europe": int, "triple_interact": float, 
        "WorkExp": float, "exp_x_org": float, "log_exp": float, "exp_squared": float, "YearsCodePro": float, 
        "edu_x_exp": float, "seniority_score": float, "exp_edu_ratio": float, "log_age": float, 
        "exp_ratio": float, "YearsCode": float, "age_squared": int, "career_efficiency": float, 
        "age_num": int, "EdLevel_num": int, "formation_gap": float, "db_salary_score": float, 
        "edu_squared": int, "OrgSize_num": float, "senior_bigcorp_nonusa": int, "misc_salary_score": float, 
        "is_senior": int, "log_devtype_te": float, "dev_salary_score": float, 
        "plat_Amazon_Web_Services__AWS_": int, "log_tech_stack": float, "fw_salary_score": float, 
        "ai_salary_score": float, "is_fulltime": int, "devtype_te": float, "tech_x_exp": float, 
        "plat_salary_score": float, "ai_Google_Bard_AI": int, "fw_Laravel": int, "misc_Apache_Kafka": int, 
        "lang_C": int, "ai_WolframAlpha": int, "db_SQLite": int, "db_Dynamodb": int, "devtype_salary_rank": float, 
        "lang_PHP": int, "misc_Spring_Framework": int, "fw_WordPress": int, "dev_Developer__embedded_appli": int, 
        "lang_Ruby": int, "plat_Microsoft_Azure": int, "total_tech_stack": float, "lang_salary_score": float, 
        "fw_Spring_Boot": int, "dev_Engineering_manager": int, "plat_Google_Cloud": int, "ai_ChatGPT": int, 
        "plat_Firebase": int, "country_cv": float, "db_MySQL": int, "plat_Hetzner": int, 
        "lang_Visual_Basic___Net_": int, "lang_R": int, "fw_Next_js": int, "fw_React": int, 
        "weighted_tech_score": float, "fw_Node_js": int, "fw_Vue_js": int, "misc_NumPy": int, 
        "lang_Bash_Shell__all_shells_": int, "ai_Bing_AI": int, "lang_VBA": int, "fw_ASP_NET": int, 
        "dev_Data_scientist_or_machine": int, "fw_Django": int, "lang_SQL": int, "nb_languages": float, 
        "dev_Other__please_specify__": int, "lang_Dart": int, "misc_Scikit_Learn": int, "lang_Kotlin": int, 
        "plat_Vercel": int, "db_Redis": int, "db_MariaDB": int, "fw_FastAPI": int, "db_PostgreSQL": int, 
        "db_H2": int, "dev_Engineer__data": int, "dev_DevOps_specialist": int, "lang_Assembly": int, 
        "lang_Groovy": int, "lang_Go": int, "db_BigQuery": int, "lang_C_": int, "plat_OpenShift": int, 
        "plat_VMware": int, "ai_Quora_Poe": int, "uses_ai_tools": int, "dev_Senior_Executive__C_Suite": int, 
        "dev_Developer__back_end": int, "db_Oracle": int, "fw_jQuery": int, "misc__NET_Framework__1_0___4_8": int, 
        "plat_Heroku": int, "premium_lang_score": int, "db_Firebase_Realtime_Databas": int, 
        "cloud_specialization": float, "dev_Academic_researcher": int
    }

    parsed_data = {}
    
    # 1. Clean up text for easier matching (removing extra spaces and normalization)
    clean_text = re.sub(r'\s+', ' ', text)
    
    for field, target_type in field_config.items():
        # Strategy A: Key: Value (e.g., country_p90: 185000)
        pattern = rf"{re.escape(field)}[:\s]+([-+]?[\d,\.]+)"
        match = re.search(pattern, text, re.IGNORECASE)
        
        if match:
            val_str = match.group(1).replace(',', '')
            try:
                parsed_data[field] = target_type(float(val_str))
            except ValueError:
                parsed_data[field] = target_type(0)
        else:
            # Strategy B: Binary Flag (e.g., is_usa: 1)
            binary_pattern = rf"{re.escape(field)}[:\s]*1"
            if re.search(binary_pattern, text, re.IGNORECASE):
                parsed_data[field] = target_type(1)
            else:
                parsed_data[field] = target_type(0)

    # 3. Handle Special Aliases and Variations found in PDF
    aliases = {
        'country_median': 'country_median_salary',
        'YoC': 'YearsCode',
        'YoCP': 'YearsCodePro',
        'country_market_prem': 'country_market_premium',
    }
    
    for alias, target in aliases.items():
        if target in field_config and parsed_data.get(target) == 0:
            alias_match = re.search(rf"{re.escape(alias)}[:\s]+([-+]?[\d,\.]+)", text, re.IGNORECASE)
            if alias_match:
                val_str = alias_match.group(1).replace(',', '')
                try:
                    parsed_data[target] = field_config[target](float(val_str))
                except ValueError:
                    pass

    # 4. Tech Stack Aliases / Fuzzy Matching for binary flags
    tech_mappings = {
        r'AWS': 'plat_Amazon_Web_Services__AWS_',
        r'Azure': 'plat_Microsoft_Azure',
        r'C\+\+': 'lang_C_',
        r'Bash': 'lang_Bash_Shell__all_shells_',
        r'Google Cloud': 'plat_Google_Cloud',
        r'Kafka': 'misc_Apache_Kafka',
        r'Scikit': 'misc_Scikit_Learn',
        r'Spring Boot': 'fw_Spring_Boot',
        r'Data Scientist': 'dev_Data_scientist_or_machine',
        r'Back-end': 'dev_Developer__back_end',
    }
    
    for alias, key in tech_mappings.items():
        if key in field_config and parsed_data.get(key) == 0:
            if re.search(rf"{alias}", text, re.IGNORECASE):
                parsed_data[key] = field_config[key](1)

    return parsed_data

if __name__ == "__main__":
    import os
    import json
    # For local testing
    from extractor import extract_text_from_pdf
    
    current_dir = os.path.dirname(__file__)
    pdf_path = os.path.join(current_dir, "neww.pdf")
    
    if os.path.exists(pdf_path):
        raw_text = extract_text_from_pdf(pdf_path)
        data = parse_cv_text(raw_text)
        print(json.dumps(data, indent=4))
    else:
        print(f"File not found: {pdf_path}")
