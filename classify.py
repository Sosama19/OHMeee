# classify.py
import sys
import some_ml_library  # Replace with actual ML library

def classify_image(image_path):
    # Load the image and model
    model = some_ml_library.load_model('model_path')
    image = some_ml_library.load_image(image_path)
    
    # Predict the material
    prediction = model.predict(image)
    
    # Convert prediction to material type
    materials = ['plastic', 'metal', 'glass', 'paper']
    return materials[prediction.argmax()]

if __name__ == "__main__":
    image_path = sys.argv[1]
    result = classify_image(image_path)
    print(result)
