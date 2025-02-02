# import os
# import sys
# import json
# import joblib
# import numpy as np

# # # Load diabetes model
# # # Update the path if necessary
# # model = joblib.load('../models/diabetes_model.sav')  # Ensure this path is correct


# # Get the absolute path to the model
# model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'diabetes_model.sav')

# # Load diabetes model with absolute path
# model = joblib.load(model_path)

# # Read input from command line
# input_data = json.loads(sys.argv[1])

# # Convert input to numpy array
# input_array = np.array(input_data).reshape(1, -1)

# # Make prediction
# prediction = model.predict(input_array)

# # Print result
# print(json.dumps(prediction.tolist()))

















# import os
# import sys
# import json
# import numpy as np
# import pickle  # Import pickle module

# # Get the absolute path to the model
# # model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'diabetes_model.pkl')

# # # Load diabetes model with absolute path using pickle
# # with open(model_path, 'rb') as file:
# #     model = pickle.load(file)

# try:
#     model = pickle.load(open('../models/diabetes_model.sav','rb'))
# except Exception as e:
#     print(f"Error loading model: {e}")
#     sys.exit(1)

# # model = pickle.load(open('../models/diabetes_model.sav','rb'))
# #    model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'diabetes_model.sav')
# #    model = pickle.load(open(model_path, 'rb'))

# # Read input from command line
# input_data = json.loads(sys.argv[1])

# # Convert input to numpy array
# input_array = np.array(input_data).reshape(1, -1)

# # Make prediction
# prediction = model.predict(input_array)












# import os
# import sys
# import json
# import numpy as np
# import pickle

# # Load diabetes model using pickle
# print(f"sys.argv received: {sys.argv}")
# try:
#     # model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'diabetes_model.sav')
#     model = pickle.load(open('../models/diabetes_model.sav','rb'))
#     # model = pickle.load(open(model_path, 'rb'))
#     print(f"Model loaded successfully: {model}")    
# except Exception as e:
#     print(f"Error loading model: {e}")
#     sys.exit(1)

# print(f"sys.argv received: {sys.argv}")
# # Read input from command line
# try:
#     # input_data = json.loads(sys.argv)  # Read JSON input
#     input_data = json.loads(sys.argv[1])  # Read JSON input
#     # input_array = np.array(input_data)  # Convert to NumPy array (1 sample, many features)
#     input_array = np.array(input_data).reshape(1, -1)  # Convert to NumPy array (1 sample, many features)
#     print(f"Input array for prediction: {input_array}")
#     # print("input given by user",input_array)
# except Exception as e:
#     print(f"Error processing input data: {e}")
#     sys.exit(1)

# # Make prediction
# try:
    
#     prediction = model.predict(input_array).tolist()  # Convert prediction to a list for JSON serialization
#     # print(f"Model prediction: {prediction}")
#     print(f"JSON Output: {json.dumps(prediction)}")
#     print("prediction made by model",prediction)
#     # print(json.dumps(prediction))  # Send JSON output
# except Exception as e:
#     print(f"Error during prediction: {e}")
#     sys.exit(1)








# import os
# import sys
# import json
# import numpy as np
# import pickle

# print("Starting the diabetes prediction script...")


# # Load diabetes model using pickle
# print(f"sys.argv received: {sys.argv}")
# try:
#     # Construct absolute path to the model
#     # model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'diabetes_model.sav')
#     # print(f"Model path: {model_path}")
#     # model = pickle.load(open(model_path, 'rb'))  # Load the model
#     model = pickle.load(open('C:/Users/Karan Gupta/Desktop/MultiModalDiseasePrediction/Backend/models/diabetes_model.sav','rb'))
#     print("Model loaded successfully")    
# except Exception as e:
#     print(f"Error loading model: {e}")
#     sys.exit(1)

# # Read input from command line
# print(f"sys.argv received: {sys.argv}")
# try:
#     input_data = json.loads(sys.argv[1])  # Read JSON input
#     # input_array = np.array(input_data).reshape(1, -1)  # Convert to NumPy array (1 sample, many features)
#     # print(f"Input array for prediction: {input_array}")
# except Exception as e:
#     print(f"Error processing input data: {e}")
#     sys.exit(1)

# # Make prediction
# try:
#     # prediction = model.predict(input_array).tolist()  # Convert prediction to a list for JSON serialization
#     prediction = model.predict([input_data]).tolist()  # Convert prediction to a list for JSON serialization
#     print(f"JSON Output: {json.dumps(prediction)}")
#     print("Prediction made by model:", prediction)
   
# except Exception as e:
#     print(f"Error during prediction: {e}")
#     sys.exit(1)









# import os
# import sys
# import json
# import numpy as np
# import pickle

# print("Starting the diabetes prediction script...")

# # Load diabetes model using pickle
# print(f"sys.argv received: {sys.argv}")
# try:
#     model_path = 'C:/Users/Karan Gupta/Desktop/MultiModalDiseasePrediction/Backend/models/diabetes_model.sav'
#     print(f"Loading model from: {model_path}")
#     model = pickle.load(open(model_path, 'rb'))
#     print("Model loaded successfully")
# except Exception as e:
#     print(f"Error loading model: {e}")
#     sys.exit(1)

# # Read input from command line
# print(f"sys.argv received: {sys.argv}")
# try:
#     input_data = json.loads(sys.argv[1])  # Read JSON input
#     print(f"Input data received: {input_data}")
#     input_array = np.array(input_data).reshape(1, -1)  # Convert to NumPy array (1 sample, many features)
#     print(f"Input array for prediction: {input_array}")
# except Exception as e:
#     print(f"Error processing input data: {e}")
#     sys.exit(1)

# # Make prediction
# try:
#     print("Making prediction...")
#     prediction = model.predict(input_array).tolist()  # Convert prediction to a list for JSON serialization
#     print(f"Prediction made by model: {prediction}")
#     print(f"JSON Output: {json.dumps(prediction)}")
# except Exception as e:
#     print(f"Error during prediction: {e}")
#     sys.exit(1)

# print("Diabetes prediction script completed.")









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
    logger.debug("Starting the diabetes prediction script...")
    
    # Get input features from command line argument
    input_json = sys.argv[1]
    logger.debug(f"Received input: {input_json}")
    
    # Parse input features
    features = json.loads(input_json)
    
    # Load the model
    # model_path = 'C:/Users/Karan Gupta/Desktop/MultiModalDiseasePrediction/Backend/models/diabetes_model.sav'
    model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'diabetes_model.sav')
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