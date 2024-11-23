from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import shutil
import os

# FastAPI 앱 생성
app = FastAPI()

# CORS 미들웨어 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React 앱이 실행되는 주소
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)

# 모델 로드
model = load_model("cnn_face_model.h5")

# 클래스 이름
class_names = ["Heart", "Oval", "Round", "Square"]

# 서버 시작 시 temp 폴더 초기화
temp_dir = "temp"
if os.path.exists(temp_dir):
    shutil.rmtree(temp_dir)  # 기존 temp 폴더 삭제
os.makedirs(temp_dir)  # 새 temp 폴더 생성


# 이미지 처리 함수 - 이미지를 모델이 처리 가능한 형태로 전처리
def preprocess_image(image_path):
    try:
        img = image.load_img(image_path, target_size=(128, 128))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)  # 배치 차원 추가
        img_array /= 255.0  # 255로 나눠서 정규화
        return img_array
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid image format")


# 엔드포인트: 이미지 업로드 및 예측
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    # 업로드된 파일 저장 경로
    file_location = os.path.join(temp_dir, file.filename)

    # temp 디렉터리가 없으면 생성
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)
    try:
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # 이미지 전처리 및 예측
        img_array = preprocess_image(file_location)
        predictions = model.predict(img_array)
        predicted_class = class_names[np.argmax(predictions)]
        confidence = np.max(predictions)

        return {"class": predicted_class, "confidence": float(confidence)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

    finally:
        # 처리 완료 후 업로드된 파일 삭제
        if os.path.exists(file_location):
            os.remove(file_location)

