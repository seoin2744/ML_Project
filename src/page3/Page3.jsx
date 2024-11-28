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

      const drawPoint = () => {
        if (index >= landmarks.length) return;

        const point = landmarks[index];
        ctx.beginPath();
        ctx.arc(point.x, point.y, 9, 0, Math.PI * 2);
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

      // 원본 이미지와 캔버스 크기 설정
      const img = await faceapi.bufferToImage(uploadedFile);
      const canvas = canvasRef.current;

      // 수정사항1 - 이미지 비율 유지하며 캔버스 크기 조정
      const maxCanvasWidth = 800; // 캔버스의 최대 너비 (임의로 설정)
      const scaleFactor = Math.min(1, maxCanvasWidth / img.naturalWidth); // 축소 비율 계산
      canvas.width = img.naturalWidth * scaleFactor;
      canvas.height = img.naturalHeight * scaleFactor;

      setUploadedImage(URL.createObjectURL(uploadedFile)); // 업로드된 이미지 URL 저장

      const detections = await faceapi
        // 수정사항2 - 감지 옵션 조정
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.5 }))
        .withFaceLandmarks();

      if (detections) {
        const landmarks = detections.landmarks.positions;
        await drawLandmarksAnimated(img, landmarks);
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
