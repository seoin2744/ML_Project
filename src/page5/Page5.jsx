import React from "react";
import { useNavigate } from "react-router-dom";
import "./page5.css"; 

const Page5 = ({ predictionResult }) => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/"); 
  };

  const handlePrevious = () => {
    navigate("/page4"); 
  };

  if (!predictionResult) {
    return <p>결과를 불러오는 중입니다...</p>;
  }

  return (
    <div className="container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(4 / 4) * 100}%` }}></div>
      </div>
      <h1>당신의 얼굴형은 <span id="result-bold">{predictionResult.class}형</span>입니다.</h1>
      <p className="subtext">
        {predictionResult.class}형은 <span id="context-bold">설명~</span>이 특징이에요. <br />
        <span id="context-bold">설명 블라블라 ~</span>으로 보이게 하는 것이 포인트입니다.
      </p>
      <div className="options">
        <div className="option">
          <img src="/assets/~~.jpg" alt="추천 헤어스타일" />
          <p className="subtext-context">추천 헤어스타일</p>
        </div>
        <div className="option">
          <img src="/assets/~~.jpg" alt="비추천 헤어스타일" />
          <p className="subtext-context">비추천 헤어스타일</p>
        </div>
      </div>
      <div className="navigation">
        <button className="prev-button" onClick={handlePrevious}>
          이전
        </button>
        <button className="next-button" onClick={handleNext}>
          Home
        </button>
      </div>
    </div>
  );
};

export default Page5;
