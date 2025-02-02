# # groq_chat.py
# import sys
# import os
# import json
# from groq import Groq

# # def analyze_health_data(health_data):
# #     """Analyze health assessment data and return a recommendation"""
# #     try:
# #         features = health_data.get('features', {})
        
# #         # Create a detailed prompt based on the health data
# #         prompt = f"""As a medical AI assistant, please analyze the following health information:
        
# #         Age: {features.get('age', 'Not provided')}
# #         Gender: {features.get('gender', 'Not provided')}
# #         Height: {features.get('height', 'Not provided')} cm
# #         Weight: {features.get('weight', 'Not provided')} kg
# #         Symptoms: {features.get('symptoms', 'None reported')}
# #         Medical History: {features.get('medicalHistory', 'None reported')}
# #         Lifestyle: {features.get('lifestyle', 'Not provided')}
# #         Current Medications: {features.get('medications', 'None reported')}
        
# #         Please provide a brief (40-50 words) health assessment and general recommendations based on this information.
# #         """
        
# #         return prompt
# #     except Exception as e:
# #         return str(e)



# def analyze_health_data(health_data):
#     """Analyze comprehensive health assessment data"""
#     try:
#         features = health_data.get('features', {})
        
#         prompt = f"""As a medical AI assistant, please analyze the following comprehensive health information:

#                 Basic Information:
#                 - Age: {features.get('age', 'Not provided')}
#                 - Gender: {features.get('gender', 'Not provided')}
#                 - Height: {features.get('height', 'Not provided')} cm
#                 - Weight: {features.get('weight', 'Not provided')} kg

#                 Vital Signs:
#                 - Blood Pressure: {features.get('bloodPressure', 'Not provided')}
#                 - Heart Rate: {features.get('heartRate', 'Not provided')} bpm
#                 - Blood Sugar: {features.get('bloodSugar', 'Not provided')} mg/dL

#                 Symptoms:
#                 - Current Symptoms: {features.get('symptoms', 'None reported')}
#                 - Duration: {features.get('symptomsDuration', 'Not provided')}
#                 - Severity (1-10): {features.get('symptomsServerity', 'Not provided')}

#                 Medical Background:
#                 - Medical History: {features.get('medicalHistory', 'None reported')}
#                 - Family History: {features.get('familyHistory', 'Not provided')}
#                 - Allergies: {features.get('allergies', 'None reported')}
#                 - Current Medications: {features.get('medications', 'None reported')}

#                 Lifestyle Factors:
#                 - Exercise: {features.get('exercise', 'Not provided')}
#                 - Diet: {features.get('diet', 'Not provided')}
#                 - Smoking: {features.get('smoking', 'Not provided')}
#                 - Alcohol Consumption: {features.get('alcohol', 'Not provided')}
#                 - Sleep: {features.get('sleep', 'Not provided')}

#                 Mental Health:
#                 - Stress Level (1-10): {features.get('stressLevel', 'Not provided')}
#                 - Mood Changes: {features.get('moodChanges', 'Not provided')}
#                 - Mental Health Symptoms: {features.get('mentalHealth', 'Not provided')}

#                 Based on this information, please provide:
#                 1. A brief health assessment
#                 2. Key areas of concern
#                 3. General recommendations for health improvement
#                 Keep the response concise (around 100 words) but comprehensive.
#                 """    
#         return prompt
#     except Exception as e:
#         return str(e)

# def get_groq_response(request_data):
#     try:
#         # Validate input
#         if not request_data:
#             raise ValueError("No data provided")
            
#         # Parse the input data
#         if isinstance(request_data, str):
#             data = json.loads(request_data)
#         else:
#             data = request_data

#         # Get API key
#         api_key = os.environ.get('GROQ_API_KEY')
#         if not api_key:
#             raise ValueError("GROQ_API_KEY not found in environment variables")

#         client = Groq(api_key=api_key)
        
#         # Generate appropriate prompt based on data type
#         if 'features' in data:
#             prompt = analyze_health_data(data)
#         else:
#             prompt = data.get('message', '')

#         # Make API call
#         chat_completion = client.chat.completions.create(
#             messages=[
#                 {
#                     "role": "system",
#                     "content": "You are a medical AI assistant. Provide concise, helpful responses focused on health and wellness. Keep responses to 40-50 words."
#                 },
#                 {
#                     "role": "user",
#                     "content": prompt
#                 }
#             ],
#             model="mixtral-8x7b-32768",
#             max_tokens=100
#         )
        
#         return {
#             "message": chat_completion.choices[0].message.content,
#             "success": True
#         }
#     except Exception as e:
#         print(json.dumps({"error": str(e), "success": False}), file=sys.stderr)
#         return {"error": str(e), "success": False}

# if __name__ == "__main__":
#     try:
#         # Read input from command line arguments
#         if len(sys.argv) <= 1:
#             raise ValueError("No input data provided")
            
#         input_data = sys.argv[1]
#         response = get_groq_response(input_data)
#         print(json.dumps(response))
        
#     except Exception as e:
#         print(json.dumps({"error": str(e), "success": False}))
#         sys.exit(1)

























import sys
import os
import json
from groq import Groq

def analyze_health_metrics(features):
    """Analyze specific health metrics against medical guidelines"""
    analysis = []
    recommendations = []
    
    # Blood Pressure Analysis
    if bp := features.get('bloodPressure'):
        try:
            systolic, diastolic = map(int, bp.split('/'))
            if systolic < 120 and diastolic < 80:
                analysis.append("Blood pressure (${bp}) is optimal.")
            elif systolic < 130 and diastolic < 85:
                analysis.append("Blood pressure (${bp}) is normal.")
            else:
                analysis.append("Blood pressure (${bp}) is elevated.")
                recommendations.append("Consider lifestyle changes and consult a healthcare provider about blood pressure management.")
        except:
            analysis.append("Blood pressure format invalid.")

    # Sleep Analysis
    if sleep := features.get('sleep'):
        try:
            sleep_hours = float(sleep)
            if sleep_hours < 7:
                analysis.append(f"Sleep duration ({sleep_hours}h) is below recommended 7-9 hours.")
                recommendations.append("Increase sleep duration. Establish consistent bedtime routine, create dark/quiet environment, limit screen time before bed.")
            elif sleep_hours > 9:
                analysis.append(f"Sleep duration ({sleep_hours}h) is above recommended range.")
                recommendations.append("Consider adjusting sleep schedule to 7-9 hours for optimal health.")
            else:
                analysis.append(f"Sleep duration ({sleep_hours}h) is healthy.")
        except:
            analysis.append("Sleep hours format invalid.")

    # BMI Calculation and Analysis
    height = features.get('height')
    weight = features.get('weight')
    if height and weight:
        try:
            height_m = float(height) / 100
            weight_kg = float(weight)
            bmi = weight_kg / (height_m * height_m)
            if bmi < 18.5:
                analysis.append(f"BMI {bmi:.1f} indicates underweight status.")
                recommendations.append("Consider nutritional counseling and healthy weight gain strategies.")
            elif bmi < 25:
                analysis.append(f"BMI {bmi:.1f} is within healthy range.")
            else:
                analysis.append(f"BMI {bmi:.1f} indicates overweight status.")
                recommendations.append("Consider balanced diet and regular exercise program.")
        except:
            analysis.append("Unable to calculate BMI - invalid measurements.")

    # Heart Rate Analysis
    if hr := features.get('heartRate'):
        try:
            heart_rate = int(hr)
            if 60 <= heart_rate <= 100:
                analysis.append(f"Heart rate ({heart_rate} bpm) is normal.")
            else:
                analysis.append(f"Heart rate ({heart_rate} bpm) is outside normal range.")
                recommendations.append("Monitor heart rate and consult healthcare provider if consistently abnormal.")
        except:
            analysis.append("Heart rate format invalid.")

    # Blood Sugar Analysis
    if bs := features.get('bloodSugar'):
        try:
            blood_sugar = float(bs)
            if blood_sugar < 70:
                analysis.append(f"Blood sugar ({blood_sugar} mg/dL) is low.")
                recommendations.append("Monitor blood sugar levels closely. Consider immediate carbohydrate intake.")
            elif blood_sugar > 140:
                analysis.append(f"Blood sugar ({blood_sugar} mg/dL) is elevated.")
                recommendations.append("Monitor blood sugar and consult healthcare provider about management.")
            else:
                analysis.append(f"Blood sugar ({blood_sugar} mg/dL) is within normal range.")
        except:
            analysis.append("Blood sugar format invalid.")

    # Stress Level Analysis
    if stress := features.get('stressLevel'):
        try:
            stress_level = int(stress)
            if stress_level > 7:
                analysis.append(f"High stress level reported ({stress_level}/10).")
                recommendations.append("Consider stress management: regular exercise, meditation, counseling if needed.")
            elif stress_level > 4:
                analysis.append(f"Moderate stress level reported ({stress_level}/10).")
                recommendations.append("Practice stress reduction techniques: deep breathing, regular breaks, physical activity.")
        except:
            analysis.append("Stress level format invalid.")

    return analysis, recommendations

def analyze_health_data(health_data):
    """Analyze comprehensive health assessment data"""
    try:
        features = health_data.get('features', {})
        analysis, recommendations = analyze_health_metrics(features)
        
        health_summary = {
            "analysis": analysis,
            "recommendations": recommendations,
            "lifestyle_factors": []
        }

        # Add lifestyle analysis
        if exercise := features.get('exercise'):
            health_summary["lifestyle_factors"].append(f"Exercise: {exercise}")
        if diet := features.get('diet'):
            health_summary["lifestyle_factors"].append(f"Diet: {diet}")
        if smoking := features.get('smoking'):
            health_summary["lifestyle_factors"].append(f"Smoking status: {smoking}")
        if alcohol := features.get('alcohol'):
            health_summary["lifestyle_factors"].append(f"Alcohol consumption: {alcohol}")

        prompt = f"""Based on the health analysis:

Analysis Findings:
{chr(10).join(f"- {item}" for item in health_summary['analysis'])}

Key Recommendations:
{chr(10).join(f"- {item}" for item in health_summary['recommendations'])}

Lifestyle Factors:
{chr(10).join(f"- {item}" for item in health_summary['lifestyle_factors'])}

Please provide:
1.Complete the answer in 297 max_tokens so that completeness is shown in answer, it is necessary
2. A brief assessment of overall health status
3. Prioritized recommendations for improvement
4. Any immediate concerns that require attention
"""
        return prompt
    except Exception as e:
        return str(e)

def get_groq_response(request_data):
    try:
        # Validate input
        if not request_data:
            raise ValueError("No data provided")
        


        try:
            data = json.loads(request_data) if isinstance(request_data, str) else request_data
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON format: {str(e)}")



        # Parse the input data
        # if isinstance(request_data, str):
        #     data = json.loads(request_data)
        # else:
        #     data = request_data



        if not isinstance(data, dict):
            raise ValueError("Input must be a JSON object")
        
        if 'features' not in data:
            raise ValueError("Input data must contain 'features' object")



        # Get API key
        api_key = os.environ.get('GROQ_API_KEY')
        if not api_key:
            raise ValueError("GROQ_API_KEY not found in environment variables")

        client = Groq(api_key=api_key)
        


        prompt = analyze_health_data(data)
        


        # Generate appropriate prompt based on data type
        # if 'features' in data:
        #     prompt = analyze_health_data(data)
        # else:
        #     prompt = data.get('message', '')

        # Make API call
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": """You are a medical AI assistant specializing in health assessments. 
                    Provide clear, actionable health recommendations based on the data provided. 
                    Focus on specific improvements while maintaining a supportive tone. 
                    Include both immediate actions and long-term health goals."""
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            model="mixtral-8x7b-32768",
            max_tokens=300
        )
        
        return {
            "message": chat_completion.choices[0].message.content,
            "success": True
        }
    except ValueError as e:
        error_response = {"error": str(e), "success": False}
        print(json.dumps(error_response), file=sys.stderr)
        return error_response
    except Exception as e:
        error_response = {"error": f"Unexpected error: {str(e)}", "success": False}
        print(json.dumps(error_response), file=sys.stderr)
        return error_response
    # except Exception as e:
    #     print(json.dumps({"error": str(e), "success": False}), file=sys.stderr)
    #     return {"error": str(e), "success": False}

if __name__ == "__main__":
    try:
        if len(sys.argv) <= 1:
            raise ValueError("No input data provided")
            
    #     input_data = sys.argv[1]
    #     response = get_groq_response(input_data)
    #     print(json.dumps(response))
        
    # except Exception as e:
    #     print(json.dumps({"error": str(e), "success": False}))
    #     sys.exit(1)
        input_data = ' '.join(sys.argv[1:])
    
    # Try to parse the JSON input
        try:
            json.loads(input_data)  # Validate JSON format
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON format: {str(e)}")
            
        response = get_groq_response(input_data)
        print(json.dumps(response))
        
    except Exception as e:
        error_response = {"error": str(e), "success": False}
        print(json.dumps(error_response))
        sys.exit(1)
        