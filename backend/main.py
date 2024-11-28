from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import shutil
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "cnn_face_model.keras")
model = load_model(MODEL_PATH)

class_names = ["Heart", "Oval", "Round", "Square"]

temp_dir = "temp"
if os.path.exists(temp_dir):
    shutil.rmtree(temp_dir) 
os.makedirs(temp_dir)  


def preprocess_image(image_path):
    try:
        img = image.load_img(image_path, target_size=(128, 128))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) 
        img_array /= 255.0 
        return img_array
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid image format")


@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    file_location = os.path.join(temp_dir, file.filename)

    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)
    try:
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        img_array = preprocess_image(file_location)
        predictions = model.predict(img_array)
        predicted_class = class_names[np.argmax(predictions)]
        confidence = np.max(predictions)

        return {"class": predicted_class, "confidence": float(confidence)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

    finally:
        if os.path.exists(file_location):
            os.remove(file_location)
