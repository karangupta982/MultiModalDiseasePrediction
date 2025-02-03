# import sys
# import os
# import json
# from groq import Groq

# def get_groq_response(message):
#     try:
#         client = Groq(api_key=os.environ.get('GROQ_API_KEY'))
        
#         chat_completion = client.chat.completions.create(
#             messages=[{
#                 "role": "user",
#                 "content": message
#             }],
#             model="mixtral-8x7b-32768",  # or your chosen model
#         )
        
#         return {
#             "message": chat_completion.choices[0].message.content,
#             "success": True
#         }
#     except Exception as e:
#         print(json.dumps({"error": str(e)}), file=sys.stderr)
#         return {"error": str(e), "success": False}

# if __name__ == "__main__":
#     try:
#         if len(sys.argv) <= 1:
#             raise ValueError("No message provided")
            
#         user_message = json.loads(sys.argv[1])
#         response = get_groq_response(user_message)
#         print(json.dumps(response))
        
#     except Exception as e:
#         print(json.dumps({"error": str(e), "success": False}))
#         sys.exit(1)
















# Python ML Script (groq_chat.py)
import sys
import os
import json
from groq import Groq

def is_medical_question(text):
    # Add medical keywords to check if question is medical-related
    medical_keywords = [
         'symptom', 'disease', 'treatment', 'medicine', 'doctor', 'hospital',
  'pain', 'health', 'medical', 'diagnosis', 'diagnose', 'patient', 'surgery',
  'prescription', 'nurse', 'clinic', 'therapy', 'vaccination',
  'infection', 'illness', 'virus', 'bacteria', 'condition', 'stress',
  'naturally', 'diet', 'prevention tips', 'sleep', 'cold', 'healthy lifestyle', 
  'healthy','healthy schedule,' 'healthy diet', 'healthy habits', 'healthy food',
    'healthy exercise', 'healthy sleep', 'healthy mind', 'healthy body', 'healthy heart',
  'consultation', 'recovery', 'chronic', 'acute', 'emergency', 'urgent', 'appointment',
  'examination', 'lab tests', 'analysis', 'screening', 'check-up', 'diagnostic','diagnostic tests',
  'follow-up', 'referral', 'specialist',' bedtime routine','reduce stress','healthy habits',
  'outpatient', 'inpatient', 'emergency room', 'ambulance', 'paramedic', 'first aid',
  'wellness', #name all body parts
    'head', 'neck', 'shoulder', 'arm', 'elbow', 'forearm', 'wrist', 'hand', 'finger', 'thumb',
    'chest', 'abdomen', 'back', 'hip', 'buttocks', 'groin', 'thigh', 'knee', 'leg', 'ankle', 'foot', 'toe',
    'heart', 'lungs', 'brain', 'liver', 'kidney', 'stomach', 'intestine', 'bladder', 'uterus', 'ovary', 'testicle',
    # name basic health conditions and problems
    'injury', 'fracture', 'sprain', 'strain', 'dislocation', 'concussion', 'wound', 'cut', 'burn', 'bruise', 'bite', 'sting',
    'bleeding', 'swelling', 'inflammation', 'infection', 'fever', 'rash', 'itch', 'pain', 'numbness', 'tingling', 'weakness', 'fatigue',
    'dizziness', 'nausea', 'vomiting', 'diarrhea', 'constipation', 'indigestion', 'heartburn', 'cough', 'sneeze', 'wheeze', 'shortness of breath',
    'chest pain', 'palpitations', 'high blood pressure', 'low blood pressure', 'high cholesterol', 'diabetes', 'asthma', 'allergy', 'anemia',
    'arthritis', 'osteoporosis', 'cancer', 'infection', 'inflammation', 'autoimmune', 'genetic', 'mental health', 'anxiety', 'depression',
    'stress', 'insomnia', 'eating disorder', 'addiction', 'alcoholism', 'substance abuse'
    'vaccine', 'immunization', 'antibiotic', 'antiviral', 'antifungal', 'antiparasitic', 'painkiller', 'anti-inflammatory', 'antacid', 'laxative',
    'antihistamine', 'decongestant', 'cough syrup', 'antiseptic', 'disinfectant', 'sunscreen', 'insect repellent', 'first aid kit', 'bandage',
    'band-aid', 'gauze', 'cotton ball', 'tweezers', 'scissors', 'thermometer', 'blood pressure monitor', 'glucose meter', 'inhaler', 'epinephrine',
    'insulin', 'birth control', 'pregnancy test', 'condom', 'tampon', 'sanitary pad', 'diaper', 'wheelchair', 'crutches', 'hearing aid', 'eyeglasses',
    'contact lenses', 'cane', 'walker', 'prosthesis', 'orthosis', 'pacemaker', 'defibrillator', 'oxygen tank', 'nasogastric tube', 'catheter', 'stent',
    'suture', 'staple', 'cast', 'splint', 'brace', 'orthosis', 'prosthesis', 'dialysis machine', 'ventilator', 'CPAP machine', 'IV drip', 'blood bag',
    #name basic medical procedures
    'physical exam', 'medical history', 'vital signs', 'blood pressure', 'heart rate', 'respiratory rate', 'temperature', 'BMI', 'pulse oximetry',
    'blood test', 'urine test', 'stool test', 'biopsy', 'imaging test', 'X-ray', 'CT scan', 'MRI', 'ultrasound', 'endoscopy', 'colonoscopy', 'laparoscopy',
    
    'baby', 'infant', 'toddler', 'preschooler', 'school-age child', 'teenager', 'adolescent', 'young adult', 'puberty', 'growth spurt', 'developmental milestone',
    # name youngsters problems related to health and medical
    'colic', 'diaper rash', 'teething', 'croup', 'ear infection', 'strep throat', 'bronchiolitis', 'pneumonia', 'gastroenteritis', 'food allergy','food poisoning',
    'masturbation','sleepwalking', 'night terror', 'nightmare', 'bedwetting', 'picky eating', 'tantrum', 'sibling rivalry', 'bullying', 'peer pressure',

  'nutritionist', 
  'prescription refill', 
  'side effects', 
  'dosage',
  'therapy session', 
  'mental health','anxiety','depression','rehabilitation','physiotherapy','medication','emergency room','first aid','screening','antibiotic',"cardiac arrest", "cardiogenic shock", "cardiomegaly", "cardiomyopathy", 
  "cardiopulmonary resuscitation", "cardiovascular system", "catheter", 
  "catheterization", "clinical trial", "concussion", "diabetes mellitus", 
  "dialysis", "edema", "embolism", "emphysema", "endarterectomy",  'allergy', 'asthma', 'cancer', 'cardiac', 'checkup', 'cholesterol', 'cold', 
  'cough', 'cramps', 'dizziness', 'eczema', 'flu', 'fracture', 'gastroenteritis', 
  'headache', 'heart attack', 'high blood pressure', 'inflammation', 'joint pain', 
  'kidney stones', 'liver disease', 'migraine', 'nausea', 'obesity', 'osteoporosis', 
  'palpitations', 'rash', 'respiratory', 'seizure', 'shingles', 'stroke', 'tumor', 
  'ulcer', 'urinary tract infection', 'vomiting', 'wheezing', 'wound', 'zoonosis', 
  'antibiotic resistance', 'biopsy', 'blood test', 'bronchitis', 'cerebral palsy', 
  'chronic obstructive pulmonary disease', 'concussion', 'coronary artery disease', 
  'diabetes', 'dyslexia', 'eczema', 'fibromyalgia', 'gastroesophageal reflux disease', 
  'hemophilia', 'hypertension', 'influenza', 'leukemia', 'menopause', 'multiple sclerosis', 
  'myocardial infarction', 'narcolepsy', 'neurology', 'osteoarthritis', 'pneumonia', 
  'psoriasis', 'rheumatoid arthritis', 'schizophrenia', 'sleep apnea', 'tuberculosis', 
  'ulcerative colitis', 'vascular disease', 'viral infection', 'wound care', 'x-ray', 
  'yellow fever', 'zika virus','diabetes', 'hypertension', 'asthma', 'cancer', 'arthritis', 'alzheimer\'s disease', 
  'coronary heart disease', 'stroke', 'chronic obstructive pulmonary disease (copd)', 
  'influenza', 'tuberculosis', 'hepatitis', 'malaria', 'hiv/aids', 'parkinson\'s disease', 
  'multiple sclerosis', 'schizophrenia', 'depression', 'anxiety disorders', 'osteoporosis', 
  'kidney disease', 'liver disease', 'obesity', 'diabetes mellitus', 'rheumatoid arthritis', 
  'lupus', 'psoriasis', 'crohn\'s disease', 'ulcerative colitis', 'sickle cell anemia', 
  'leukemia', 'lymphoma', 'melanoma', 'prostate cancer', 'breast cancer', 'cervical cancer', 
  'colon cancer', 'pancreatic cancer', 'thyroid disorders', 'eczema', 'acne', 'migraine', 
  'epilepsy', 'autism', 'adhd', 'bipolar disorder', 'schizoaffective disorder', 'panic disorder', 
  'obsessive-compulsive disorder (ocd)', 'post-traumatic stress disorder (ptsd)', 
  'chronic fatigue syndrome', 'fibromyalgia', 'irritable bowel syndrome (ibs)', 
  'gastroesophageal reflux disease (gerd)', 'gallstones', 'hernia', 'appendicitis', 'tonsillitis', 
  'bronchitis', 'pneumonia', 'pleurisy', 'emphysema', 'bronchiectasis', 'sinusitis', 'tinnitus', 
  'vertigo', 'meniere\'s disease', 'glaucoma', 'macular degeneration', 'cataracts', 'conjunctivitis', 
  'otitis media', 'otitis externa', 'osteomyelitis', 'osteomalacia', 'osteonecrosis', 'osteosarcoma', 
  'osteochondritis dissecans', 'osteochondroma', 'osteitis', 'osteofibrosis', 'osteogenesis imperfecta', 
  'osteopetrosis', 'osteopenia', 'osteoradionecrosis', 'osteosclerosis', 'cardiomyopathy', 
  'cardiac arrest', 'cardiogenic shock'
    ]
    return any(keyword in text.lower() for keyword in medical_keywords)

def get_groq_response(message):
    try:
        if not is_medical_question(message):
            return {
                "message": "I can only answer medical-related questions. Please ask me about health, symptoms, treatments, or other medical topics.",
                "success": True
            }

        client = Groq(api_key=os.environ.get('GROQ_API_KEY'))
        
        prompt = f"""You are a medical chatbot. Provide a concise, accurate answer in 197 tokens. 
        Only answer medical questions. Focus on being precise and clinically relevant.
        
        Question: {message} . Comment: Provide a concise, accurate answer in 197 tokens."""
        
        chat_completion = client.chat.completions.create(
            messages=[{
                "role": "system",
                "content": "You are a medical chatbot. Provide only medical information. Keep answers accurate and clinically relevant."
            },
            {
                "role": "user",
                "content": prompt
            }],
            model="mixtral-8x7b-32768",
            max_tokens=200  # Limit response length
        )
        
        
        return {
            "message": chat_completion.choices[0].message.content,
            "success": True
        }
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        return {"error": str(e), "success": False}

if __name__ == "__main__":
    try:
        if len(sys.argv) <= 1:
            raise ValueError("No message provided")
            
        user_message = json.loads(sys.argv[1])
        response = get_groq_response(user_message)
        print(json.dumps(response))
        
    except Exception as e:
        print(json.dumps({"error": str(e), "success": False}))
        sys.exit(1)