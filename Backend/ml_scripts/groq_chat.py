
import sys
import os
import json
from groq import Groq

def is_medical_question(text):
    # Enhanced medical keywords list (removed generic phrases)
    medical_keywords = [
        'symptom', 'disease', 'treatment', 'medicine', 'doctor', 'hospital','diabetes','ai doctor','doctor','nurse',
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
        5. Responses strictly limited to 170 tokens.It is necessary"""
        
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




