import React from "react";
import { useNavigate } from "react-router-dom";
import "./page4.css"; 

const Page4 = ({ predictionResult }) => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/page5"); 
  };

  const handlePrevious = () => {
    navigate("/page3"); 
  };

  if (!predictionResult) {
    return <p>결과를 불러오는 중입니다...</p>;
  }

  return (
    <div className="container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(3 / 4) * 100}%` }}></div>
      </div>
      <h1>당신의 얼굴형은 <span id="result-bold">{predictionResult.class}</span>입니다.({(predictionResult.confidence * 100).toFixed(2)}%)</h1>
      <p className="subtext">
        {predictionResult.class}형은 <span id="context-bold">가로폭 세로폭 비율이 비슷하고, 광대와 턱을 잇는 라인에 볼살이 많아서 <br />얼굴이 부드럽고 동그래보이는 것</span>이 특징이에요.
        그래서 <span id="context-bold">사랑스럽고 귀여운 이미지</span>가 강합니다.<br />
      </p>
      <div className="options">
        <div className="option">
          <img src="/assets/김다미.jpg" alt="김다미" />
          <p className="subtext-context">김다미</p>
        </div>
        <div className="option">
          <img src="/assets/송중기.jpg" alt="송중기" />
          <p className="subtext-context">송중기</p>
        </div>
      </div>
      <div className="navigation">
        <button className="prev-button" onClick={handlePrevious}>
          이전
        </button>
        <button className="next-button" onClick={handleNext}>
          헤어스타일
        </button>
      </div>
    </div>
  );
};

export default Page4;
