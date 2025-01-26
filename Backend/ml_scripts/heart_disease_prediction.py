import sys
import json
import joblib
import numpy as np

# Load heart disease model
heart_disease_model = joblib.load('../models/heart_disease_model.sav')

# Read input from command line
input_data = json.loads(sys.argv[1])

# Convert input to numpy array
input_array = np.array(input_data).reshape(1, -1)

# Make prediction
prediction = heart_disease_model.predict(input_array)

# Print result
print(json.dumps(prediction.tolist()))