from fastapi import FastAPI, File, UploadFile
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import shutil
import os

# FastAPI 앱 생성
app = FastAPI()

# 모델 로드
model = load_model("cnn_face_model.h5")

# 클래스 이름
class_names = ["Heart", "Oval", "Round", "Square"]

# 이미지 처리 함수 - 이미지를 모델이 처리 가능한 형태로 전처리함
def preprocess_image(image_path):
    img = image.load_img(image_path, target_size=(128, 128))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # 배치 차원 추가
    img_array /= 255.0  # 255로 나눠서 정규화
    return img_array

# 엔드포인트: 이미지 업로드 및 예측
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    # 업로드된 파일 저장 경로
    temp_dir = "temp"
    file_location = os.path.join(temp_dir, file.filename)

    # temp 디렉터리가 없으면 생성
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)
    with open(file_location, "wb") as buffer:
        # 파일 데이터를 디스크에 씀
        shutil.copyfileobj(file.file, buffer)

    # 이미지 전처리 및 예측
    img_array = preprocess_image(file_location)
    predictions = model.predict(img_array)
    predicted_class = class_names[np.argmax(predictions)]
    confidence = np.max(predictions)

    # 예측값을 JSON 형태로 리액트한테 반환
    return {"class": predicted_class, "confidence": float(confidence)}
