import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page3.css";

const Page3 = () => {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleNext = () => {
    navigate("/page4");
  };

  const handlePrevious = () => {
    navigate("/page2");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 업로드된 파일 가져오기
    if (file) {
      const reader = new FileReader(); // FileReader로 파일 읽기
      reader.onload = (event) => {
        setUploadedImage(event.target.result); // 이미지를 상태에 저장
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽기
    }
  };

  return (
    <div className="container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(2 / 4) * 100}%` }}></div>
      </div>
      <h1>당신의 <span id="result-bold">얼굴형</span>을 확인하세요!</h1>
      {loading ? (
        <p className="subtext">모델 분석 중입니다. 잠시만 기다려주세요...</p>
      ) : (
        <p className="subtext">모델 분석 완료! 결과 버튼을 눌러주세요.</p>
      )}
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
