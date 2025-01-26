import sys
import json
import joblib
import numpy as np

# Load the model
model = joblib.load('../models/diabetes_model.sav')

# Read input from command line
input_data = json.loads(sys.argv[1])

# Convert input to numpy array
input_array = np.array(input_data).reshape(1, -1)

# Make prediction
prediction = model.predict(input_array)

# Print result (for Python Shell to capture)
print(json.dumps(prediction.tolist()))

