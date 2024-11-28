import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page5.css";

const Page5 = ({ predictionResult }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("woman"); // 기본 탭은 "woman"

  const handleNext = () => {
    navigate("/");
  };

  const handlePrevious = () => {
    navigate("/page4");
  };

  if (!predictionResult) {
    return <p>결과를 불러오는 중입니다...</p>;
  }

  // 추천 및 비추천 데이터 정의
  const renderContent = () => {
    switch (predictionResult.class) {
      case "Oval":
        return {
          subtext:
            "계란형은 균형잡힌 얼굴형으로 어떤 스타일도 소화할 수 있는 특징이 있습니다.",
          woman: [
            {
              src: "/assets/윤아.png",
              alt: "윤아",
              description: "추천 헤어스타일",
            },
            {
              src: "/assets/사나.jpg",
              alt: "사나",
              description: "비추천 헤어스타일",
            },
          ],
          man: [
            {
              src: "/assets/송중기.jpg",
              alt: "송중기",
              description: "추천 헤어스타일",
            },
            {
              src: "/assets/조세호.png",
              alt: "조세호",
              description: "비추천 헤어스타일",
            },
          ],
        };
      case "Round":
        return {
          subtext:
            "둥근형은 부드럽고 귀여운 인상을 주며, 길이감을 더하는 스타일이 잘 어울립니다.",
          woman: [
            {
              src: "/assets/김다미.jpg",
              alt: "김다미",
              description: "추천 헤어스타일",
            },
            {
              src: "/assets/사나.png",
              alt: "사나",
              description: "비추천 헤어스타일",
            },
          ],
          man: [
            {
              src: "/assets/송중기.jpg",
              alt: "송중기",
              description: "추천 헤어스타일",
            },
            {
              src: "/assets/조세호.jpg",
              alt: "조세호",
              description: "비추천 헤어스타일",
            },
          ],
        };
      case "Heart":
        return {
          subtext:
            "하트형은 광대가 넓고 턱이 좁아, 부드러운 느낌을 강조하는 스타일이 잘 어울립니다.",
          woman: [
            {
              src: "/assets/사나.png",
              alt: "사나",
              description: "추천 헤어스타일",
            },
            {
              src: "/assets/윤아.png",
              alt: "윤아",
              description: "비추천 헤어스타일",
            },
          ],
          man: [
            {
              src: "/assets/이승기.png",
              alt: "이승기",
              description: "추천 헤어스타일",
            },
            {
              src: "/assets/조세호.png",
              alt: "조세호",
              description: "비추천 헤어스타일",
            },
          ],
        };
      case "Square":
        return {
          subtext:
            "사각형은 강하고 고급스러운 인상을 주며, 부드러운 곡선 스타일이 잘 어울립니다.",
          woman: [
            {
              src: "/assets/한효주.png",
              alt: "한효주",
              description: "추천 헤어스타일",
            },
            {
              src: "/assets/김다미.jpg",
              alt: "김다미",
              description: "비추천 헤어스타일",
            },
          ],
          man: [
            {
              src: "/assets/김성오.png",
              alt: "김성오",
              description: "추천 헤어스타일",
            },
            {
              src: "/assets/조세호.png",
              alt: "조세호",
              description: "비추천 헤어스타일",
            },
          ],
        };
      default:
        return {
          subtext: "알 수 없는 얼굴형입니다.",
          woman: [],
          man: [],
        };
    }
  };

  // 조건에 맞는 데이터 가져오기
  const { subtext, woman, man } = renderContent();
  const activeStyles = activeTab === "woman" ? woman : man;

  return (
    <div className="container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(4 / 4) * 100}%` }}></div>
      </div>
      <h1>
        당신의 얼굴형은{" "}
        <span id="result-bold">{predictionResult.class}형</span>입니다.
      </h1>
      <p className="subtext">{subtext}</p>

      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === "woman" ? "active" : ""}`}
          onClick={() => setActiveTab("woman")}
        >
          여자
        </button>
        <button
          className={`tab-button ${activeTab === "man" ? "active" : ""}`}
          onClick={() => setActiveTab("man")}
        >
          남자
        </button>
      </div>

      <div id="process-block" className="process-block">
        <div id="options">
          {activeStyles.map((style, index) => (
            <div className="option" key={index}>
              <div className="option-content">
                <img src={style.src} alt={style.alt} />
              </div>
              <p className="subtext-context">{style.description}</p>
            </div>
          ))}
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