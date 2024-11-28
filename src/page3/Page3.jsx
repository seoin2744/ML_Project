import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./page3.css";
import * as faceapi from "face-api.js";

const Page3 = ({ uploadedFile, setPredictionResult }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [uploadedImage, setUploadedImage] = useState(null); // 이미지를 저장
  const canvasRef = useRef(null); // 캔버스 참조를 위한 ref

  const handlePrevious = () => {
    navigate("/page2");
  };

  const handleNext = () => {
    if (!loading) {
      navigate("/page4");
    }
  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    };

    const drawLandmarksAnimated = async (img, landmarks) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // 캔버스 초기화 및 이미지 그리기
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      let index = 0;

      // 캔버스 크기와 이미지 크기의 비율을 맞추기 위한 스케일링 계산
      const scaleX = canvas.width / img.naturalWidth;
      const scaleY = canvas.height / img.naturalHeight;

      const drawPoint = () => {
        if (index >= landmarks.length) return;

        const point = landmarks[index];

        // 랜드마크 좌표를 캔버스 크기에 맞게 변환
        const scaledX = point.x * scaleX;
        const scaledY = point.y * scaleY;

        ctx.beginPath();
        ctx.arc(scaledX, scaledY, 4, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        index++;
        requestAnimationFrame(drawPoint);
      };

      drawPoint();
    };

    const processImage = async () => {
      if (!uploadedFile) return;

      await loadModels();

      const img = await faceapi.bufferToImage(uploadedFile);
      const canvas = canvasRef.current;

      // 이미지 크기 비율에 맞춰 캔버스 크기 설정
      const maxCanvasWidth = 800;
      const scaleFactor = Math.min(1, maxCanvasWidth / img.naturalWidth); // 캔버스 너비를 이미지 크기 비율에 맞게 조정
      canvas.width = img.naturalWidth * scaleFactor;
      canvas.height = img.naturalHeight * scaleFactor; // 이미지의 세로 비율에 맞게 캔버스 높이 조정

      setUploadedImage(URL.createObjectURL(uploadedFile));

      const detections = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.5 }))
        .withFaceLandmarks();

      if (detections) {
        const landmarks = detections.landmarks.positions;
        await drawLandmarksAnimated(img, landmarks); // 랜드마크 그리기
      } else {
        alert("얼굴을 감지할 수 없습니다.");
      }

      const formData = new FormData();
      formData.append("file", uploadedFile);

      try {
        const response = await axios.post("http://127.0.0.1:8000/predict/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setPredictionResult(response.data);
      } catch (error) {
        console.error("Error during prediction:", error);
        alert("예측 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    processImage();
  }, [uploadedFile, setPredictionResult]);

  return (
    <div className="container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(2 / 4) * 100}%` }}></div>
      </div>
      <h1>
        당신의 <span id="result-bold">얼굴형</span>을 확인하세요!
      </h1>
      {loading ? (
        <p className="subtext">모델 분석 중입니다. 잠시만 기다려주세요...</p>
      ) : (
        <p className="subtext">모델 분석 완료! 결과 버튼을 눌러주세요.</p>
      )}

      <div className="options">
        <div className="option" id="option">
          <div className="image-container">
            {uploadedImage && (
              <img src={uploadedImage} alt="업로드된 이미지" className="overlay-image" />
            )}
            <canvas ref={canvasRef} className="overlay-canvas"></canvas>
          </div>
        </div>
      </div>
      <div className="navigation">
        <button className="prev-button" onClick={handlePrevious}>
          이전
        </button>
        <button className="next-button" onClick={handleNext}>
          결과
        </button>
      </div>
    </div>
  );
};

export default Page3;
