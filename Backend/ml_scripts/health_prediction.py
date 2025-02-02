# import os
# import sys
# import json
# import logging
# import numpy as np
# import joblib
# import warnings
# warnings.filterwarnings("ignore")

# # Configure logging to stderr
# logging.basicConfig(level=logging.DEBUG, stream=sys.stderr)
# logger = logging.getLogger(__name__)

# try:
#     logger.debug("Starting health prediction script...")
    
#     # Get input features from command line argument
#     input_json = sys.argv[1]
#     logger.debug(f"Received input: {input_json}")
    
#     # Parse input features (assumed to be a dictionary with keys: age, gender, etc.)
#     features_dict = json.loads(input_json)
#     # Convert to a list in a specific order (customize as needed)
#     # For example: [age, gender_binary, height, weight, ...]
#     age = float(features_dict.get("age", 0))
#     gender = features_dict.get("gender", "Male")
#     # Convert gender to binary (e.g., Male: 1, Female: 0)
#     gender_binary = 1 if gender.lower() == "male" else 0
#     height = float(features_dict.get("height", 0))
#     weight = float(features_dict.get("weight", 0))
#     # You can add more processing for other fields (symptoms, history, etc.) if your model requires it
    
#     # Example feature vector (adjust the order and features as per your model)
#     feature_vector = [age, gender_binary, height, weight]
#     logger.debug(f"Feature vector for prediction: {feature_vector}")
    
#     # Load the model
#     model_path = os.path.join(os.path.dirname(__file__), "..", "models", "health_model.sav")
#     logger.debug(f"Loading model from: {model_path}")
#     model = joblib.load(model_path)
#     logger.debug("Model loaded successfully")
    
#     # Reshape features and predict
#     features_array = np.array(feature_vector).reshape(1, -1)
#     prediction = model.predict(features_array)
    
#     # Print the JSON result (only stdout for success)
#     print(json.dumps({"prediction": int(prediction[0])}))
    
# except Exception as e:
#     logger.error(f"Error: {str(e)}")
#     # Print error as JSON to stdout and exit with error code
#     print(json.dumps({"error": str(e)}))
#     sys.exit(1)












import os
import sys
import json
import logging
import numpy as np
import joblib
import warnings
warnings.filterwarnings("ignore")

# Configure logging
logging.basicConfig(level=logging.DEBUG, stream=sys.stderr)
logger = logging.getLogger(__name__)

# Encoding categorical features
def encode_features(features):
    """ Convert categorical features to numerical values. """
    gender_map = {"Male": 0, "Female": 1}
    smoker_map = {"No": 0, "Yes": 1}
    diabetes_map = {"No": 0, "Yes": 1}
    activity_map = {"Sedentary": 0, "Moderate": 1, "Active": 2}
    lifestyle_map = {"Exercise": 1, "No Exercise": 0}

    return [
        features[0],  # Age (Numeric)
        gender_map.get(features[1], -1),  # Gender (Encoded)
        features[2],  # Height (cm)
        features[3],  # Weight (kg)
        smoker_map.get(features[4], -1),  # Smoker (Encoded)
        diabetes_map.get(features[5], -1),  # Diabetes History (Encoded)
        activity_map.get(features[6], -1),  # Activity Level (Encoded)
        lifestyle_map.get(features[7], -1)  # Exercise Habit (Encoded)
    ]

try:
    logger.debug("Starting the health prediction script...")

    # Get input JSON from command line arguments
    input_json = sys.argv[1]
    logger.debug(f"Received input: {input_json}")

    # Parse input JSON
    raw_features = json.loads(input_json)

    # Encode categorical data
    processed_features = encode_features(raw_features)

    # Load the trained model
    model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'health_prediction_model.sav')
    logger.debug(f"Loading model from: {model_path}")

    model = joblib.load(model_path)
    logger.debug("Model loaded successfully")

    # Convert features into NumPy array and predict
    features_array = np.array(processed_features).reshape(1, -1)
    prediction = model.predict(features_array)

    # Output result as JSON
    print(json.dumps({"prediction": int(prediction[0])}))

except Exception as e:
    logger.error(f"Error: {str(e)}")
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
