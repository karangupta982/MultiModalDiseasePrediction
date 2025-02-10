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
















# # Python ML Script (groq_chat.py)
# import sys
# import os
# import json
# from groq import Groq

# def is_medical_question(text):
#     # Add medical keywords to check if question is medical-related
#     medical_keywords = [
#        'symptom', 'disease', 'treatment', 'medicine', 'doctor', 'hospital', 'pain', 'health', 'medical', 'diagnosis', 'diagnose', 'patient', 'surgery', 'prescription', 'nurse', 'clinic', 'therapy', 'vaccination', 'infection', 'illness', 'virus', 'bacteria', 'condition', 'stress', 'naturally', 'diet', 'prevention tips', 'sleep', 'cold', 'healthy lifestyle', 'healthy schedule', 'healthy diet', 'healthy habits', 'healthy food', 'healthy exercise', 'healthy sleep', 'healthy mind', 'healthy body', 'healthy heart', 'consultation', 'recovery', 'chronic', 'acute', 'emergency', 'urgent', 'appointment', 'examination', 'lab tests', 'analysis', 'screening', 'check-up', 'diagnostic', 'follow-up', 'referral', 'specialist', 'bedtime routine', 'reduce stress', 'outpatient', 'inpatient', 'ambulance', 'paramedic', 'first aid', 'wellness', 'head', 'neck', 'shoulder', 'arm', 'elbow', 'forearm', 'wrist', 'hand', 'finger', 'thumb', 'chest', 'abdomen', 'back', 'hip', 'buttocks', 'groin', 'thigh', 'knee', 'leg', 'ankle', 'foot', 'toe', 'heart', 'lungs', 'brain', 'liver', 'kidney', 'stomach', 'intestine', 'bladder', 'uterus', 'ovary', 'testicle', 'injury', 'fracture', 'sprain', 'strain', 'dislocation', 'concussion', 'wound', 'cut', 'burn', 'bruise', 'bite', 'sting', 'bleeding', 'swelling', 'inflammation', 'fever', 'rash', 'itch', 'numbness', 'tingling', 'weakness', 'fatigue', 'dizziness', 'nausea', 'vomiting', 'diarrhea', 'constipation', 'indigestion', 'heartburn', 'cough', 'sneeze', 'wheeze', 'shortness of breath', 'chest pain', 'palpitations', 'high blood pressure', 'low blood pressure', 'high cholesterol', 'diabetes', 'asthma', 'allergy', 'anemia', 'arthritis', 'osteoporosis', 'cancer', 'autoimmune', 'genetic', 'mental health', 'anxiety', 'depression', 'insomnia', 'eating disorder', 'addiction', 'alcoholism', 'substance abuse', 'vaccine', 'immunization', 'antibiotic', 'antiviral', 'antifungal', 'antiparasitic', 'painkiller', 'anti-inflammatory', 'antacid', 'laxative', 'antihistamine', 'decongestant', 'cough syrup', 'antiseptic', 'disinfectant', 'sunscreen', 'insect repellent', 'first aid kit', 'bandage', 'band-aid', 'gauze', 'cotton ball', 'tweezers', 'scissors', 'thermometer', 'blood pressure monitor', 'glucose meter', 'inhaler', 'epinephrine', 'birth control', 'pregnancy test', 'condom', 'tampon', 'sanitary pad', 'diaper', 'wheelchair', 'crutches', 'hearing aid', 'eyeglasses', 'contact lenses', 'cane', 'walker', 'prosthesis', 'orthosis', 'pacemaker', 'defibrillator', 'oxygen tank', 'nasogastric tube', 'catheter', 'stent', 'suture', 'staple', 'cast', 'splint', 'brace', 'dialysis machine', 'ventilator', 'cpap machine', 'iv drip', 'blood bag', 'physical exam', 'medical history', 'vital signs', 'blood pressure', 'heart rate', 'respiratory rate', 'temperature', 'bmi', 'pulse oximetry', 'blood test', 'urine test', 'stool test', 'biopsy', 'imaging test', 'x-ray', 'ct scan', 'mri', 'ultrasound', 'endoscopy', 'colonoscopy', 'laparoscopy', 'baby', 'infant', 'toddler', 'preschooler', 'school-age child', 'teenager', 'adolescent', 'young adult', 'puberty', 'growth spurt', 'developmental milestone', 'colic', 'diaper rash', 'teething', 'croup', 'ear infection', 'strep throat', 'bronchiolitis', 'pneumonia', 'gastroenteritis', 'food allergy', 'masturbation', 'sleepwalking', 'night terror', 'nightmare', 'bedwetting', 'picky eating', 'tantrum', 'sibling rivalry', 'bullying', 'peer pressure', 'nutritionist', 'prescription refill', 'side effects', 'dosage', 'therapy session', 'rehabilitation', 'physiotherapy', 'medication', 'cardiac arrest', 'cardiogenic shock', 'cardiomegaly', 'cardiomyopathy', 'cardiopulmonary resuscitation', 'cardiovascular system', 'catheterization', 'clinical trial', 'diabetes mellitus', 'dialysis', 'edema', 'embolism', 'emphysema', 'endarterectomy', 'cardiac', 'checkup', 'cholesterol', 'cramps', 'kidney stones', 'liver disease', 'migraine', 'obesity', 'palpitations', 'respiratory', 'seizure', 'shingles', 'stroke', 'tumor', 'urinary tract infection', 'vomiting', 'zoonosis', 'antibiotic resistance', 'cerebral palsy', 'chronic obstructive pulmonary disease', 'coronary artery disease', 'dyslexia', 'fibromyalgia', 'gastroesophageal reflux disease', 'hemophilia', 'hypertension', 'influenza', 'leukemia', 'menopause', 'multiple sclerosis', 'myocardial infarction', 'narcolepsy', 'neurology', 'osteoarthritis', 'pneumonia', 'psoriasis', 'rheumatoid arthritis', 'schizophrenia', 'sleep apnea', 'tuberculosis', 'ulcerative colitis', 'vascular disease', 'viral infection', 'wound care', 'x-ray', 'yellow fever', 'zika virus', 'alzheimer disease', 'coronary heart disease', 'chronic obstructive pulmonary disease', 'hepatitis', 'malaria', 'hiv','aids', 'parkinson disease', 'schizoaffective disorder', 'panic disorder', 'obsessive-compulsive disorder (ocd)', 'post-traumatic stress disorder (ptsd)', 'chronic fatigue syndrome', 'irritable bowel syndrome (ibs)', 'gallstones', 'hernia', 'appendicitis', 'tonsillitis', 'pleurisy', 'bronchiectasis', 'sinusitis', 'tinnitus', 'vertigo', 'meniere disease', 'glaucoma', 'macular degeneration', 'cataracts', 'conjunctivitis', 'otitis media', 'otitis externa', 'osteomyelitis', 'osteomalacia', 'osteonecrosis', 'osteosarcoma', 'osteochondritis dissecans', 'osteochondroma', 'osteitis', 'osteofibrosis', 'osteogenesis imperfecta', 'osteopetrosis', 'osteopenia', 'osteoradionecrosis', 'osteosclerosis', 'dialysis machine', 'ventilator', 'cpap machine', 'iv drip', 'blood bag', 'anesthesiologist', 'cardiologist', 'dermatologist', 'endocrinologist', 'gastroenterologist', 'gynecologist', 'hematologist', 'immunologist', 'nephrologist', 'neurologist', 'oncologist', 'ophthalmologist', 'orthopedist', 'otolaryngologist', 'pathologist', 'pediatrician', 'psychiatrist', 'pulmonologist', 'radiologist', 'rheumatologist', 'urologist', 'phlebotomist', 'optometrist', 'audiologist', 'chiropractor', 'physical therapist', 'occupational therapist', 'speech therapist', 'dietitian', 'nutritionist', 'medical technologist', 'nurse practitioner', 'physician assistant', 'radiologic technologist', 'surgical technologist', 'pharmacist', 'pharmacy technician', 'respiratory therapist', 'clinical laboratory scientist', 'public health worker', 'emergency medical technician', 'paramedic', 'medical coder', 'medical biller', 'health information manager', 'medical transcriptionist', 'medical librarian', 'what is', 'effect of'


#     ]
#     return any(keyword in text.lower() for keyword in medical_keywords)

# def get_groq_response(message):
#     try:
#         if not is_medical_question(message):
#             return {
#                 "message": "I can only answer medical-related questions. Please ask me about health, symptoms, treatments, or other medical topics.",
#                 "success": True
#             }

#         client = Groq(api_key=os.environ.get('GROQ_API_KEY'))
        
#         prompt = f"""You are a medical chatbot. Provide a concise, accurate answer in 197 tokens. 
#         Only answer medical questions. Focus on being precise and clinically relevant.
        
#         Question: {message} . Comment: Provide a concise, accurate answer in 197 tokens."""
        
#         chat_completion = client.chat.completions.create(
#             messages=[{
#                 "role": "system",
#                 "content": "You are a medical chatbot. Provide only medical information. Keep answers accurate and clinically relevant."
#             },
#             {
#                 "role": "user",
#                 "content": prompt
#             }],
#             model="mixtral-8x7b-32768",
#             max_tokens=200  # Limit response length
#         )
        
        
#         return {
#             "message": chat_completion.choices[0].message.content,
#             "success": True
#         }
#     except Exception as e:
#         print(json.dumps({"error": str(e)}), file=sys.stderr)
#         return {"error": str(e), "success": False}

# if __name__ == "__main__":
    # try:
    #     if len(sys.argv) <= 1:
    #         raise ValueError("No message provided")
            
    #     user_message = json.loads(sys.argv[1])
    #     response = get_groq_response(user_message)
    #     print(json.dumps(response))
        
    # except Exception as e:
    #     print(json.dumps({"error": str(e), "success": False}))
    #     sys.exit(1)












import sys
import os
import json
from groq import Groq

def is_medical_question(text):
    # Enhanced medical keywords list (removed generic phrases)
    medical_keywords = [
        'symptom', 'disease', 'treatment', 'medicine', 'doctor', 'hospital',
        'pain', 'health', 'medical', 'diagnosis', 'patient', 'surgery',
        'prescription', 'clinic', 'therapy', 'vaccination', 'infection',
        'illness', 'virus', 'bacteria', 'chronic', 'acute', 'emergency',
        'appointment', 'examination', 'lab tests', 'check-up', 'referral',
        'specialist', 'recovery', 'physical exam', 'medical history',
        'blood pressure', 'heart rate', 'respiratory rate', 'temperature',
        'blood test', 'urine test', 'x-ray', 'ct scan', 'mri', 'ultrasound',
        'medication', 'side effects', 'dosage', 'rehabilitation', 'physiotherapy',
        'cardiac', 'cholesterol', 'migraine', 'obesity', 'seizure', 'stroke',
        'tumor', 'infection', 'chronic disease', 'acute condition', 'vaccine',
        'antibiotic', 'antiviral', 'painkiller', 'anti-inflammatory', 'insulin',
        'surgery', 'pediatric', 'geriatric', 'mental health', 'anxiety',
        'depression', 'allergy', 'asthma', 'diabetes', 'cancer', 'arthritis',
        'osteoporosis', 'pneumonia', 'hypertension', 'hypotension', 'cardiologist',
        'dermatologist', 'neurologist', 'oncologist', 'pediatrician', 'psychiatrist',
        'prescription refill', 'medical emergency', 'clinical trial', 'prognosis',
        'relapse', 'remission', 'biopsy', 'pathology', 'radiology', 'hematology',
        'immunology', 'neurosurgery', 'orthopedics', 'pharmacology', 'symptomatic',
        'asymptomatic', 'benign', 'malignant', 'congenital', 'hereditary',
        'palliative', 'recurrence', 'complication', 'comorbidity', 'contagious',
        'non-contagious', 'differential diagnosis', 'first aid', 'resuscitation',
        'defibrillator', 'intravenous', 'subcutaneous', 'epidemiology', 'etiology',
        'pathogenesis', 'preventive care', 'rehabilitation', 'screening', 'prophylaxis',
        'contraindication', 'drug interaction', 'overdose', 'remission', 'relapse','head', 'neck', 'shoulder', 'arm', 'elbow', 'forearm', 'wrist', 'hand', 
        'finger', 'thumb', 'chest', 'abdomen', 'back', 'hip', 'buttocks', 'groin', 
        'thigh', 'knee', 'leg', 'ankle', 'foot', 'toe', 'heart', 'lungs', 'brain', 
        'liver', 'kidney', 'stomach', 'intestine', 'bladder', 'uterus', 'ovary', 
        'testicle', 'pancreas', 'spleen', 'thyroid', 'adrenal', 'prostate', 'colon', 
        'esophagus', 'trachea', 'bronchi', 'diaphragm', 'spinal cord', 'nerves', 
        'artery', 'vein', 'capillary', 'lymph node', 'bone', 'cartilage', 'tendon', 
        'ligament', 'muscle', 'skin', 'hair', 'nails', 'eye', 'ear', 'nose', 'mouth', 
        'throat', 'tongue', 'teeth', 'gums', 'jaw', 'sinus', 'pharynx', 'larynx', 
        'uvula', 'tonsils', 'appendix', 'gallbladder', 'bile duct', 'ureter', 
        'urethra', 'fallopian tube', 'cervix', 'vagina', 'penis', 'scrotum', 
        'epididymis', 'vas deferens', 'seminal vesicle', 'bulbourethral gland', 
        'mammary gland', 'pituitary gland', 'pineal gland', 'parathyroid', 
        'hypothalamus', 'amygdala', 'hippocampus', 'cerebellum', 'brainstem', 
        'cornea', 'retina', 'iris', 'pupil', 'lens', 'eardrum', 'cochlea', 
        'vestibule', 'semicircular canals', 'eustachian tube', 'auricle', 
        'nostril', 'septum', 'alveoli', 'pleura', 'pericardium', 'myocardium', 
        'endocardium', 'atrioventricular node', 'sinoatrial node', 'aorta', 
        'vena cava', 'pulmonary artery', 'pulmonary vein', 'coronary artery', 
        'carotid artery', 'jugular vein', 'femoral artery', 'femoral vein', 
        'radial artery', 'ulnar artery', 'brachial artery', 'popliteal artery', 
        'tibial artery', 'peroneal artery', 'saphenous vein', 'portal vein', 
        'hepatic vein', 'renal artery', 'renal vein', 'mesenteric artery', 
        'mesenteric vein', 'iliac artery', 'iliac vein', 'subclavian artery', 
        'subclavian vein', 'axillary artery', 'axillary vein', 'basilic vein', 
        'cephalic vein', 'median cubital vein', 'great saphenous vein', 
        'small saphenous vein', 'dorsal venous arch', 'plantar venous arch', 
        'digital veins', 'metatarsal veins', 'metacarpal veins', 'phalanges', 
        'metacarpals', 'metatarsals', 'tarsals', 'carpals', 'clavicle', 'scapula', 
        'humerus', 'radius', 'ulna', 'femur', 'patella', 'tibia', 'fibula', 
        'calcaneus', 'talus', 'navicular', 'cuboid', 'cuneiforms', 'sacrum', 
        'coccyx', 'ilium', 'ischium', 'pubis', 'acetabulum', 'obturator foramen', 
        'sacroiliac joint', 'pubic symphysis', 'intervertebral disc', 'vertebrae', 
        'cervical spine', 'thoracic spine', 'lumbar spine', 'sacral spine', 
        'coccygeal spine', 'ribs', 'sternum', 'manubrium', 'xiphoid process', 
        'costal cartilage', 'intercostal muscles', 'diaphragm', 'abdominal muscles', 
        'pectoral muscles', 'deltoid', 'biceps', 'triceps', 'quadriceps', 
        'hamstrings', 'gluteus maximus', 'gluteus medius', 'gluteus minimus', 
        'trapezius', 'latissimus dorsi', 'erector spinae', 'rotator cuff', 
        'sartorius', 'gastrocnemius', 'soleus', 'tibialis anterior', 'peroneus', 
        'flexor digitorum', 'extensor digitorum', 'abductor pollicis', 
        'adductor pollicis', 'opponens pollicis', 'abductor digiti minimi', 
        'flexor digiti minimi', 'opponens digiti minimi', 'lumbricals', 
        'interossei', 'thenar eminence', 'hypothenar eminence', 'plantar fascia', 
        'achilles tendon', 'patellar tendon', 'quadriceps tendon', 'rotator cuff', 
        'meniscus', 'labrum', 'annulus fibrosus', 'nucleus pulposus', 
        'anterior cruciate ligament', 'posterior cruciate ligament', 
        'medial collateral ligament', 'lateral collateral ligament', 
        'deltoid ligament', 'spring ligament', 'plantar ligament', 
        'calcaneofibular ligament', 'anterior talofibular ligament', 
        'posterior talofibular ligament', 'calcaneonavicular ligament', 
        'bifurcate ligament', 'dorsal talonavicular ligament', 
        'plantar calcaneonavicular ligament', 'long plantar ligament', 
        'short plantar ligament', 'plantar aponeurosis', 'transverse tarsal joint', 
        'subtalar joint', 'talocalcaneonavicular joint', 'calcaneocuboid joint', 
        'cuneonavicular joint', 'tarsometatarsal joint', 'metatarsophalangeal joint', 
        'interphalangeal joint', 'sacroiliac joint', 'pubic symphysis', 
        'acromioclavicular joint', 'sternoclavicular joint', 'glenohumeral joint', 
        'elbow joint', 'radioulnar joint', 'wrist joint', 'carpometacarpal joint', 
        'metacarpophalangeal joint', 'interphalangeal joint', 'hip joint', 
        'knee joint', 'ankle joint', 'subtalar joint', 'talocalcaneonavicular joint', 
        'calcaneocuboid joint', 'cuneonavicular joint', 'tarsometatarsal joint', 
        'metatarsophalangeal joint', 'interphalangeal joint', 'sacroiliac joint', 
        'pubic symphysis', 'acromioclavicular joint', 'sternoclavicular joint', 
        'glenohumeral joint', 'elbow joint', 'radioulnar joint', 'wrist joint', 
        'carpometacarpal joint', 'metacarpophalangeal joint', 'interphalangeal joint', 
        'hip joint', 'knee joint', 'ankle joint', 'subtalar joint', 
        'talocalcaneonavicular joint', 'calcaneocuboid joint', 'cuneonavicular joint', 
        'tarsometatarsal joint', 'metatarsophalangeal joint', 'interphalangeal joint', 
        'sacroiliac joint', 'pubic symphysis', 'acromioclavicular joint', 
        'sternoclavicular joint', 'glenohumeral joint', 'elbow joint', 
        'radioulnar joint', 'wrist joint', 'carpometacarpal joint', 
        'metacarpophalangeal joint', 'interphalangeal joint', 'hip joint', 
        'knee joint', 'ankle joint', 'subtalar joint', 'talocalcaneonavicular joint', 
        'calcaneocuboid joint', 'cuneonavicular joint', 'tarsometatarsal joint', 
        'metatarsophalangeal joint', 'interphalangeal joint', 'sacroiliac joint', 
        'pubic symphysis', 'acromioclavicular joint', 'sternoclavicular joint', 
        'glenohumeral joint', 'elbow joint', 'radioulnar joint', 'wrist joint', 
        'carpometacarpal joint', 'metacarpophalangeal joint', 'interphalangeal joint', 
        'hip joint', 'knee joint', 'ankle joint', 'subtalar joint', 
        'talocalcaneonavicular joint', 'calcaneocuboid joint', 'cuneonavicular joint', 
        'tarsometatarsal joint', 'metatarsophalangeal joint', 'interphalangeal joint', 
        'sacroiliac joint', 'pubic symphysis', 'acromioclavicular joint', 
        'sternoclavicular joint', 'glenohumeral joint', 'elbow joint', 
        'radioulnar joint', 'wrist joint', 'carpometacarpal joint', 
        'metacarpophalangeal joint', 'interphalangeal joint', 'hip joint', 
        'knee joint', 'ankle joint', 'subtalar joint', 'talocalcaneonavicular joint', 
        'calcaneocuboid joint', 'cuneonavicular joint', 'tarsometatarsal joint', 
        'metatarsophalangeal joint', 'interphalangeal joint', 'sacroiliac joint', 
        'pubic symphysis', 'acromioclavicular joint', 'sternoclavicular joint', 
        'glenohumeral joint', 'elbow joint', 'radioulnar joint', 'wrist joint', 
        'carpometacarpal joint', 'metacarpophalangeal joint', 'interphalangeal joint', 
        'hip joint', 'knee joint', 'ankle joint', 'subtalar joint', 
        'talocalcaneonavicular joint', 'calcaneocuboid joint', 'cuneonavicular joint', 
        'tarsometatarsal joint', 'metatarsophalangeal joint', 'interphalangeal joint', 
        'sacroiliac joint', 'pubic symphysis', 'acromioclavicular joint', 
        'sternoclavicular joint', 'glenohumeral joint', 'elbow joint', 
        'radioulnar joint', 'wrist joint', 'carpometacarpal joint', 
        'metacarpophalangeal joint', 'interphalangeal joint', 'hip joint', 
        'knee joint', 'ankle joint', 'subtalar joint', 'talocalcaneonavicular joint', 
        'calcaneocuboid joint', 'cuneonavicular joint', 'tarsometatarsal joint', 
        'metatarsophalangeal joint', 'interphalangeal joint', 'sacroiliac joint', 
        'pubic symphysis', 'acromioclavicular joint', 'sternoclavicular joint', 
        'glenohumeral joint', 'elbow joint', 'radioulnar joint', 'wrist joint', 
        'carpometacarpal joint', 'metacarpophalangeal joint', 'interphalangeal joint', 
        'hip joint', 'knee joint', 'ankle joint', 'subtalar joint', 
        'talocalcaneonavicular joint', 'calcaneocuboid joint', 'cuneonavicular joint', 
        'tarsometatarsal joint', 'metatarsophalangeal joint', 'interphalangeal joint', 
        'sacroiliac joint', 'pubic symphysis', 'acromioclavicular joint', 
        'sternoclavicular joint', 'glenohumeral joint', 'elbow joint', 
        'radioulnar joint', 'wrist joint', 'carpometacarpal joint', 
        'metacarpophalangeal joint', 'interphalangeal joint', 'hip joint', 
        'knee joint', 'ankle joint', 'subtalar joint', 'talocalcaneonavicular joint', 
        'calcaneocuboid joint', 'cuneonavicular joint', 'tarsometatarsal joint', 
        'metatarsophalangeal joint', 'interphalangeal joint', 'sacroiliac joint', 
        'pubic symphysis', 'acromioclavicular joint', 'sternoclavicular joint', 
        'glenohumeral joint', 'elbow joint', 'radioulnar joint', 'wrist joint', 
        'carpometacarpal joint', 'metacarpophalangeal joint', 'interphalangeal joint', 
        'hip joint', 'knee joint', 'ankle joint', 'subtalar joint', 
        'talocalcaneonavicular joint', 'calcaneocuboid joint', 'cuneonavicular joint', 
        'tarsometatarsal joint', 'metatarsophalangeal joint', 'interphalangeal joint', 
        'sacroiliac joint', 'pubic symphysis', 'acromioclavicular joint', 
        'sternoclavicular joint', 'glenohumeral joint', 'elbow joint', 
        'radioulnar joint', 'wrist joint', 'carpometacarpal joint', 
        'metacarpophalangeal joint', 'interphalangeal joint', 'hip joint', 
        'knee joint', 'ankle joint', 'subtalar joint', 'talocalcaneonavicular joint', 
        'calcaneocuboid joint', 'cuneonavicular joint', 'tarsometatarsal joint', 
        'metatarsophalangeal joint', 'interphalangeal joint', 'sacroiliac joint', 
        'pubic symphysis', 'acromioclavicular joint', 'sternoclavicular joint', 
        'glenohumeral joint', 'elbow joint', 'radioulnar joint', 'wrist joint', 
        'carpometacarpal joint', 'metacarpophalangeal joint', 'interphalangeal joint', 
        'hip joint', 'knee joint', 'ankle joint', 'subtalar joint', 
        'talocalcaneonavicular joint', 'calcaneocuboid joint', 'cuneonavicular joint', 
        'tarsometatarsal joint', 'metatarsophalangeal joint', 'interphalangeal joint', 
        'sacroiliac joint', 'pubic symphysis', 'acromioclavicular joint', 
        'sternoclavicular joint', 'glenohumeral joint', 'elbow joint', 
        'radioulnar joint', 'wrist joint', 'carpometacarpal joint', 
        'metacarpophalangeal joint', 'interphalangeal joint', 'hip joint', 
        'knee joint', 'ankle joint', 'subtalar joint', 'talocalcaneonavicular joint', 
        'calcaneocuboid joint', 'cuneonavicular joint', 'tarsometatarsal joint', 
        'metatarsophalangeal joint', 'interphalangeal joint', 'sacroiliac joint', 
        'pubic symphysis', 'acromioclavicular joint', 'sternoclavicular joint', 
        'glenohumeral joint', 'elbow joint', 'radioulnar joint', 'wrist joint', 
        'carpometacarpal joint', 'metacarpophalangeal joint', 'interphalangeal joint', 
        'hip joint', 'knee joint', 'ankle joint', 'subtalar joint', 
        'talocalcaneonavicular joint', 'calcaneocuboid joint', 'cuneonavicular joint', 
        'tarsometatarsal joint', 'metatarsophalangeal joint', 'interphalangeal joint', 
        'sacroiliac joint', 'pubic symphysis', 'acromioclavicular joint', 
        'sternoclavicular joint', 'glenohumeral joint', 'elbow joint', 
        'radioulnar joint', 'wrist joint', 'carpometacarpal joint', 
        'metacarpophalangeal joint', 'interphalangeal joint', 'hip joint', 
        'knee joint', 'ankle joint', 'subtalar joint', 'talocalcaneonavicular joint', 
        'calcaneocuboid joint', 'cuneonavicular joint', 'tarsometatarsal joint', 
        'metatarsophalangeal joint', 'interphalangeal joint', 'sacroiliac joint', 
        'pubic symphysis', 'acromioclavicular joint', 'sternoclavicular joint', 
        'glenohumeral joint', 'elbow joint', 'radioulnar joint', 'wrist joint', 
        'carpometacarpal joint', 'metacarpophalangeal joint', 'interphalangeal joint', 
        'hip joint', 'knee joint', 'ankle joint', 'subtalar joint', 
        'talocalcaneonavicular joint', 'calcaneocuboid joint', 'cuneonavicular joint',
    ]
    
    # Check for medical context indicators
    text_lower = text.lower()
    medical_indicator = any(
        keyword in text_lower for keyword in medical_keywords
    )
    
    # Check for question patterns that imply medical context
    question_patterns = (
        'should i', 'could this be', 'does this mean',
        'is this normal', 'do i have', 'what causes',
        'how to treat', 'how to prevent', 'risk factors',
        'warning signs', 'medical advice'
    )
    
    return medical_indicator or any(
        pattern in text_lower for pattern in question_patterns
    )

def get_groq_response(message):
    try:
        if not is_medical_question(message):
            return {
                "message": "I specialize in medical information only. Please ask about health-related topics, symptoms, treatments, or medical concerns.",
                "success": True
            }

        client = Groq(api_key=os.environ.get('GROQ_API_KEY'))
        
        # Enhanced system prompt with strict guidelines
        system_prompt = """You are a medical information assistant. Provide:
        1. Factual, evidence-based medical information
        2. Clear distinctions between professional advice and general knowledge
        3. No responses to non-medical queries
        4. Cautions about medication/supplement interactions when relevant
        5. Responses limited to 197 tokens"""
        
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": f"Medical question: {message}"
                }
            ],
            model="mixtral-8x7b-32768",
            temperature=0.3,
            max_tokens=200,
            top_p=0.9
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




