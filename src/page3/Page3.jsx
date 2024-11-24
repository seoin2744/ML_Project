import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./page3.css";
import * as faceapi from "face-api.js"; // face-api.js를 사용하여 랜드마크 검출

const Page3 = ({ uploadedFile, setPredictionResult }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imageWithLandmarks, setImageWithLandmarks] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      // face-api.js 모델 로드
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    };

    const drawLandmarks = async (file) => {
      try {
        const img = await faceapi.bufferToImage(file);
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const detections = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions({
            inputSize: 320, // 감지에 사용할 이미지 크기 (기본값: 416)
            scoreThreshold: 0.4, // 감지 임계값 (기본값: 0.5)
          }))
          .withFaceLandmarks();

        if (detections) {
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          faceapi.draw.drawFaceLandmarks(canvas, detections);
          setImageWithLandmarks(canvas.toDataURL());
        } else {
          alert("얼굴을 감지할 수 없습니다.");
        }
      } catch (error) {
        console.error("Error drawing landmarks:", error);
      }
    };

    const handlePrediction = async () => {
      // 업로드된 이미지를 FastAPI로 전송
      const formData = new FormData();
      formData.append("file", uploadedFile);

      try {
        const response = await axios.post("http://127.0.0.1:8000/predict/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setPredictionResult(response.data); // 모델 예측 결과 저장
      } catch (error) {
        console.error("Error during prediction:", error);
        alert("예측 중 오류가 발생했습니다.");
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    const processImage = async () => {
      await loadModels();
      await drawLandmarks(uploadedFile);
      await handlePrediction();
    };

    if (uploadedFile) {
      processImage();
    }
  }, [uploadedFile, setPredictionResult]);

  const handleNext = () => {
    if (!loading) {
      navigate("/page4"); // 로딩 완료 후 페이지 이동
    }
  };

  return (
    <div className="container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(2 / 4) * 100}%` }}></div>
      </div>
      <h1>모델 <span id="result-bold">분석</span>중</h1>
      {loading ? (
        <p className="subtext">모델 분석 중입니다. 잠시만 기다려주세요...</p>
      ) : (
        <p className="subtext">모델 분석 완료! 결과 버튼을 눌러주세요.</p>
      )}
      <div className="options">
        <div className="option">
          {imageWithLandmarks ? (
            <img src={imageWithLandmarks} alt="랜드마크가 그려진 이미지" />
          ) : (
            <p>이미지를 처리 중입니다...</p>
          )}
        </div>
      </div>
      <div className="navigation">
        <button className="next-button" onClick={handleNext}>
          결과
        </button>
      </div>
    </div>
  );
};

export default Page3;

