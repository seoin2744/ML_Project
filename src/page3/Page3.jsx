import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./page3.css";

const Page3 = ({ uploadedFile, setPredictionResult }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (uploadedFile) {
      // 업로드된 이미지를 FastAPI로 전송
      const formData = new FormData();
      formData.append("file", uploadedFile);

      axios
        .post("http://127.0.0.1:8000/predict/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setPredictionResult(response.data); // 결과 저장
          setLoading(false); // 로딩 상태 해제
        })
        .catch((error) => {
          console.error("Error during prediction:", error);
          alert("예측 중 오류가 발생했습니다.");
        });
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
      <div className="navigation">
        <button className="next-button" onClick={handleNext}>
          결과
        </button>
      </div>
    </div>
  );
};

export default Page3;
