from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import load_img, img_to_array
import numpy as np
import shutil
import os

# FastAPI 앱 생성
app = FastAPI()

# CORS 미들웨어 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 모델 로드
try:
    model = load_model("cnn_face_model.keras")
    class_names = ["Heart", "Oval", "Round", "Square"]
except Exception as e:
    raise RuntimeError(f"Failed to load model: {str(e)}")

# temp 폴더 초기화
temp_dir = "temp"
os.makedirs(temp_dir, exist_ok=True)


# 이미지 처리 함수 - 이미지를 모델이 처리 가능한 형태로 전처리
def preprocess_image(image_path):
    try:
        # 이미지 로드 및 전처리
        img = load_img(image_path, target_size=(128, 128))
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)  # 배치 차원 추가
        img_array /= 255.0  # 255로 나눠서 정규화
        return img_array
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image format: {str(e)}")


# 엔드포인트: 이미지 업로드 및 예측
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    # 파일 저장 경로 설정
    file_location = os.path.join(temp_dir, file.filename)

    try:
        # 파일 저장
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # 이미지 전처리 및 예측
        img_array = preprocess_image(file_location)
        predictions = model.predict(img_array)
        predicted_class = class_names[np.argmax(predictions)]
        confidence = np.max(predictions)

        # 예측 결과 반환
        return {
            "class": predicted_class,
            "confidence": float(confidence),
        }

    except HTTPException as e:
        # 입력 데이터 오류 처리
        raise e
    except Exception as e:
        # 기타 예외 처리
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
    finally:
        # 처리 완료 후 업로드된 파일 삭제
        if os.path.exists(file_location):
            os.remove(file_location)
