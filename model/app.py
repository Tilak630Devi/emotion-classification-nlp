from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load model and vectorizer
model = joblib.load("xgboost_model.pkl")
tfidf = joblib.load("tfidf_vectorizer.pkl")

# Hardcoded index-to-label mapping
index_to_label = {
    0: "sadness",
    1: "joy",
    2: "love",
    3: "anger",
    4: "fear",
    5: "surprise"
}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if not data or 'text' not in data:
        return jsonify({'error': 'No input text provided'}), 400

    text = data['text']
    vectorized_text = tfidf.transform([text])
    
    # Predict class probabilities
    probabilities = model.predict_proba(vectorized_text)[0]
    predicted_index = int(np.argmax(probabilities))
    predicted_emotion = index_to_label[predicted_index]
    confidence = float(np.max(probabilities))

    print(f"Prediction: {predicted_emotion}, Confidence: {confidence}")

    return jsonify({
        'emotion': predicted_emotion,
        'confidence': confidence
    })

if __name__ == '__main__':
    app.run(debug=True)
    print("Server is running...")
