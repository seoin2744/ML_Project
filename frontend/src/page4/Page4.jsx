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

  const renderContent = () => {
    switch (predictionResult.class) {
      case "Oval":
        return {
          subtext:
            "계란형은 광대와 턱 골격이 아주 살짝 있지만 전체적인 얼굴 윤곽이 부드러운 얼굴형입니다.",
          options: [
            { src: "/assets/윤아.png", alt: "윤아", name: "윤아" },
            { src: "/assets/송중기.jpg", alt: "송중기", name: "송중기" },
          ],
        };
      case "Round":
        return {
          subtext:
            "둥근형은 길이 대비 가로 너비가 넓으며 아기처럼 광대, 턱 골격이 발달되지 않은 얼굴형입니다. ",
          options: [
            { src: "/assets/김다미.jpg", alt: "김다미", name: "김다미" },
            { src: "/assets/조세호.png", alt: "조세호", name: "조세호" },
          ],
        };
      case "Heart":
        return {
          subtext:
            "하트형은 광대가 넓고 턱이 좁은 형태로, 세련되고 매력적인 인상을 줍니다.",
          options: [
            { src: "/assets/사나.png", alt: "사나", name: "사나" },
            { src: "/assets/이승기.png", alt: "이승기", name: "이승기" },
          ],
        };
      case "Square":
        return {
          subtext:
            "사각형은 광대가 거의 부각되지 않으며 턱이 발달한 유형으로, 고급스럽고 진중한 느낌을 줍니다.",
          options: [
            { src: "/assets/한효주.png", alt: "한효주", name: "한효주" },
            { src: "/assets/김성오.png", alt: "김성오", name: "김성오" },
          ],
        };
      default:
        return {
          subtext: "알 수 없는 얼굴형입니다.",
          options: [],
        };
    }
  };

  const { subtext, options } = renderContent();

  return (
    <div className="container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(3 / 4) * 100}%` }}></div>
      </div>
      <h1>
        당신의 얼굴형은{" "}
        <span id="result-bold">
          {predictionResult.class}형
        </span>
        입니다. ({(predictionResult.confidence * 100).toFixed(2)}%)
      </h1>
      <p className="subtext">{subtext}</p>
      <div className="options">
        {options.map((option, index) => (
          <div className="option" key={index}>
            <img src={option.src} alt={option.alt} />
            <p className="subtext-context">{option.name}</p>
          </div>
        ))}
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