import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import cafe24FontWoff2 from './assets/fonts/Cafe24Ohsquare.woff2';

export const Home = () => {

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/page2"); 
  };

  return (
    
    <div className="home">
      <style>
      {`
        @font-face {
          font-family: 'Cafe24Ohsquare';
          src: url(${cafe24FontWoff2}) format('woff2');
          font-weight: normal;
          font-style: normal;
        }
      `}
      </style>
      <div className="frame">
        <div className="div">
          <div className="group">
            <div className="frame-2">
              <div className="div-wrapper">
              <img className="left-img" src="/assets/left.png" alt="슈1" />
              <div className="text-wrapper" style={{ fontFamily: 'Cafe24Ohsquare' }}>미용실에서<br />김이나유</div>
              <img className="right-img" src="/assets/right.png" alt="슈2" />
              </div>
            </div>
          </div>

          <p className="p">AI 기반 얼굴형 기반 헤어스타일 추천 서비스!</p>
        </div>
      </div>

      <div className="frame-wrapper">
          <button className="next-button" onClick={handleNext}>
          시작하기
          </button>
      </div>
    </div>
  );
};


export default Home;