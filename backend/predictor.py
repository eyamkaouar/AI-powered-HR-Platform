import joblib
import os
import numpy as np
import pandas as pd

class SalaryPredictor:
    def __init__(self, model_path):
        self.model_path = model_path
        self.model = None
        self._load_model()
        
        # Exact order of features expected by the model
        self.feature_names = [
            "country_p90", "country_p10", "country_p75", "country_p25", "country_median_salary",
            "country_market_premium", "country_mean_salary", "country_iqr", "country_count",
            "country_te_x_cluster", "lang_vs_market", "country_te", "log_country_te",
            "country_x_devtype", "market_x_exp", "org_x_market", "country_cluster",
            "country_devtype_interact", "cluster_te", "country_x_exp", "is_usa",
            "is_western_europe", "triple_interact", "WorkExp", "exp_x_org", "log_exp",
            "exp_squared", "YearsCodePro", "edu_x_exp", "seniority_score", "exp_edu_ratio",
            "log_age", "exp_ratio", "YearsCode", "age_squared", "career_efficiency",
            "age_num", "EdLevel_num", "formation_gap", "db_salary_score", "edu_squared",
            "OrgSize_num", "senior_bigcorp_nonusa", "misc_salary_score", "is_senior",
            "log_devtype_te", "dev_salary_score", "plat_Amazon_Web_Services__AWS_",
            "log_tech_stack", "fw_salary_score", "ai_salary_score", "is_fulltime",
            "devtype_te", "tech_x_exp", "plat_salary_score", "ai_Google_Bard_AI",
            "fw_Laravel", "misc_Apache_Kafka", "lang_C", "ai_WolframAlpha", "db_SQLite",
            "db_Dynamodb", "devtype_salary_rank", "lang_PHP", "misc_Spring_Framework",
            "fw_WordPress", "dev_Developer__embedded_appli", "lang_Ruby", "plat_Microsoft_Azure",
            "total_tech_stack", "lang_salary_score", "fw_Spring_Boot", "dev_Engineering_manager",
            "plat_Google_Cloud", "ai_ChatGPT", "plat_Firebase", "country_cv", "db_MySQL",
            "plat_Hetzner", "lang_Visual_Basic___Net_", "lang_R", "fw_Next_js", "fw_React",
            "weighted_tech_score", "fw_Node_js", "fw_Vue_js", "misc_NumPy",
            "lang_Bash_Shell__all_shells_", "ai_Bing_AI", "lang_VBA", "fw_ASP_NET",
            "dev_Data_scientist_or_machine", "fw_Django", "lang_SQL", "nb_languages",
            "dev_Other__please_specify__", "lang_Dart", "misc_Scikit_Learn", "lang_Kotlin",
            "plat_Vercel", "db_Redis", "db_MariaDB", "fw_FastAPI", "db_PostgreSQL", "db_H2",
            "dev_Engineer__data", "dev_DevOps_specialist", "lang_Assembly", "lang_Groovy",
            "lang_Go", "db_BigQuery", "lang_C_", "plat_OpenShift", "plat_VMware", "ai_Quora_Poe",
            "uses_ai_tools", "dev_Senior_Executive__C_Suite", "dev_Developer__back_end",
            "db_Oracle", "fw_jQuery", "misc__NET_Framework__1_0___4_8", "plat_Heroku",
            "premium_lang_score", "db_Firebase_Realtime_Databas", "cloud_specialization",
            "dev_Academic_researcher"
        ]

    def _load_model(self):
        if os.path.exists(self.model_path):
            try:
                self.model = joblib.load(self.model_path)
                print(f"Model loaded successfully from {self.model_path}")
            except Exception as e:
                print(f"Error loading model with joblib: {e}")
        else:
            print(f"Model file not found at {self.model_path}")

    def predict(self, parsed_data):
        if self.model is None:
            return 0.0
        
        try:
            # Prepare features in the exact order
            features = []
            for field in self.feature_names:
                val = parsed_data.get(field, 0)
                features.append(val)
            
            # Convert to 2D array for sklearn
            features_array = np.array([features])
            
            # Predict (The model output is log-transformed)
            log_prediction = self.model.predict(features_array)
            
            # Inverse transform (exp) to get the actual salary
            actual_salary = np.exp(log_prediction[0])
            
            # Debug log
            print(f"DEBUG: Log Prediction: {log_prediction[0]}, Actual Salary: {actual_salary}")
            
            return float(actual_salary)
        except Exception as e:
            print(f"Prediction error: {e}")
            return 0.0

# Initialize global predictor
model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "model", "extratrees_model.pkl")
predictor = SalaryPredictor(model_path)
