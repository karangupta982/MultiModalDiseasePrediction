
import os
import sys
import json
import logging
import numpy as np
from sklearn.svm import SVC
import joblib
import warnings
warnings.filterwarnings("ignore")

# Configure logging to write to stderr instead of stdout
logging.basicConfig(level=logging.DEBUG, stream=sys.stderr)
logger = logging.getLogger(__name__)

try:
    logger.debug("Starting the Parkisons prediction script...")
    
    # Get input features from command line argument
    input_json = sys.argv[1]
    logger.debug(f"Received input: {input_json}")
    
    # Parse input features
    features = json.loads(input_json)
    
    # Load the model
    # model_path = 'C:/Users/Karan Gupta/Desktop/MultiModalDiseasePrediction/Backend/models/diabetes_model.sav'
    model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'parkinsons_model.sav')
    logger.debug(f"Loading model from: {model_path}")


# # Get the absolute path to the model

# # Load diabetes model with absolute path
# model = joblib.load(model_path)


    model = joblib.load(model_path)
    logger.debug("Model loaded successfully")
    
    # Make prediction
    features_array = np.array(features).reshape(1, -1)
    prediction = model.predict(features_array)
    
    # Only print the JSON result to stdout
    print(json.dumps({"prediction": int(prediction[0])}))

except Exception as e:
    logger.error(f"Error: {str(e)}")
    # Print error as JSON to stdout
    print(json.dumps({"error": str(e)}))
    sys.exit(1)