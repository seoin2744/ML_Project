import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page5.css";

const Page5 = ({ predictionResult }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("woman"); 
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null); 

  const handleNext = () => {
    navigate("/");
  };

  const handlePrevious = () => {
    navigate("/page4");
  };

  if (!predictionResult) {
    return <p>결과를 불러오는 중입니다...</p>;
  }

  const renderContent = () => {
    switch (predictionResult.class) {
      case "Oval":
        return {
          subtext:
            "계란형은 균형잡힌 얼굴형으로 어떤 스타일도 소화할 수 있는 특징이 있습니다.",
          woman: [
            {
              description: "추천 헤어스타일",
              styles: [
                "앞머리가 있는 헤어",
                "중간 길이의 레이어드 컷",
              ],
              images: ["/assets/recommend/oval/banggirl.png", "/assets/recommend/oval/CWavegirl.png"]
            },
            {
              description: "비추천 헤어스타일",
              styles: [
                "극단적으로 짧거나 긴 스타일",
                "세로 방향으로 길어 보이는 스타일",
              ],
              images: ["/assets/not_recommend/oval/shortcut.jpg", "/assets/not_recommend/oval/columnlong.jpg"]
            }
          ],
          man: [
            {
              description: "추천 헤어스타일",
              styles: [
                "단정한 올백 스타일",
                "자연스러운 가르마 스타일",
              ],
              images: ["/assets/recommend/oval/allbackboy.png", "/assets/recommend/oval/songjongji.png"]
            },
            {
              description: "비추천 헤어스타일",
              styles: [
                "극단적인 짧은 스타일",
                "너무 긴 머리",
              ],
              images: ["/assets/not_recommend/oval/boyshort.jpg", "/assets/not_recommend/oval/boylonglong.jpg"]
            }
          ],
        };
        case "Round":
          return {
            subtext:
              "둥근형은 길이 대비 가로 너비가 넓으며 아기처럼 광대, 턱 골격이 발달되지 않은 얼굴형입니다.",
            woman: [
              {
                description: "추천 헤어스타일",
                styles: [
                  "세로 라인을 강조하는 긴 레이어드 컷",
                  "턱선 아래로 내려오는 긴 스트레이트 헤어",
                ],
                images: ["/assets/recommend/round/round.png", "/assets/recommend/round/kimdami.png"]
              },
              {
                description: "비추천 헤어스타일",
                styles: [
                  "둥근 형태의 전체적인 볼륨 스타일",
                  "짧은 앞머리",
                ],
                images: ["/assets/not_recommend/round/bbangbbanggirl.jpg", "/assets/not_recommend/round/girlshort.webp"]
              }
            ],
            
            man: [
              {
                description: "추천 헤어스타일",
                styles: [
                  "세로 라인을 강조하는 포마드 스타일",
                  "옆머리를 짧게 치고 윗머리를 세운 투블럭",
                ],
                images: ["/assets/recommend/round/napolli.png", "/assets/recommend/round/hodong.png"]
              },
              {
                description: "비추천 헤어스타일",
                styles: [
                  "앞머리를 내려 이마를 가리는 스타일",
                  "옆머리에 볼륨을 주는 스타일",
                ],
                images: ["/assets/not_recommend/round/boyEgemeno.jpg", "/assets/not_recommend/round/boytongtong.webp"]
              }
            ],
          };

          case "Heart":
            return {
              subtext:
                "하트형은 광대가 무조건 발달되어 있으며 얼굴은 길지 않은 얼굴형입니다.",
              woman: [
                {
                  description: "추천 헤어스타일",
                  styles: [
                    "턱선 아래로 내려오는 긴 헤어",
                    "부드러운 웨이브가 있는 미디엄 길이 헤어",
                  ],
                  images: ["/assets/recommend/heart/image.png", "/assets/recommend/heart/sana.png"]
                },
                {
                  description: "비추천 헤어스타일",
                  styles: [
                    "이마를 완전히 드러내는 스타일",
                    "턱 부분에 볼륨을 주는 스타일",
                  ],
                  images: ["/assets/not_recommend/heart/suzi_short.jpg", "/assets/not_recommend/heart/sana_tteok.jpg"]
                }
              ],
              
              man: [
                {
                  description: "추천 헤어스타일",
                  styles: [
                    "이마를 가리는 앞머리 스타일",
                    "자연스러운 가르마와 함께 옆으로 넘긴 헤어",
                  ],
                  images: ["/assets/recommend/heart/namjoohyukk.png", "/assets/recommend/heart/namjoohyukkkkk.png"]
                },
                {
                  description: "비추천 헤어스타일",
                  styles: [
                    "짧은 앞머리",
                    "높은 볼륨의 윗머리",
                  ],
                  images: ["/assets/not_recommend/heart/boyfrontshort.png", "/assets/not_recommend/heart/boyvolumnup.jpg"]
                }
              ],
            };
            case "Square":
            return {
              subtext:
                "사각형은 광대가 거의 부각되지 않으며 턱이 발달한 유형으로, 고급스럽고 진중한 느낌을 줍니다.",
              woman: [
                {
                  description: "추천 헤어스타일",
                  styles: [
                    "부드러운 웨이브나 컬",
                    "얼굴 주변으로 레이어드된 미디엄 길이 헤어",
                  ],
                  images: ["/assets/recommend/square/kimtaeri.png", "/assets/recommend/square/hanhyefjoo.png"]
                },
                {
                  description: "비추천 헤어스타일",
                  styles: [
                    "짧고 직선적인 컷",
                    "볼륨 없는 스트레이트 헤어",
                  ],
                  images: ["/assets/not_recommend/square/girlstraight.jpg", "/assets/not_recommend/square/girlnovolume.png"]
                }
              ],
              
              man: [
                {
                  description: "추천 헤어스타일",
                  styles: [
                    "이마를 드러내는 올백 스타일",
                    "가벼운 텍스처의 쇼트 컷",
                  ],
                  images: ["/assets/recommend/square/jojinyoong.png", "/assets/recommend/square/madongseok.png"]
                },
                {
                  description: "비추천 헤어스타일",
                  styles: [
                    "짧은 옆머리",
                    "직선적인 헤어컷",
                  ],
                  images: ["/assets/not_recommend/square/madongseok.png", "/assets/not_recommend/square/boyStraight.jpg"]
                }
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

  const { subtext, woman, man } = renderContent();
  const activeStyles = activeTab === "woman" ? woman : man;

  const handleCardClick = (index) => {
    setFlippedIndex(index === flippedIndex ? null : index);
  };

  const handleStyleSelect = (style, image) => {
    setSelectedStyle({ style, image });
  };

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

      <div id="process" className="process">
        <div id="options-5">
          {activeStyles.map((style, index) => (
            <div
              className={`option-5 ${flippedIndex === index ? "flipped" : ""}`}
              key={index}
              onClick={() => handleCardClick(index)}
            >
              <div className="option-content-5">
                <div className="style-buttons">
                  {style.styles.map((s, i) => (
                    <button
                      key={i}
                      className="style-button"
                      onClick={() => handleStyleSelect(s, style.images[i])}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="option-back">
                {selectedStyle && (
                  <img
                    src={selectedStyle.image}
                    alt={selectedStyle.style}
                    className="option-back-image"
                  />
                )}
              </div>
            </div>
          ))
          }
        </div>
        <div className="style-description">
          <div className="recommendation-text">
            <h3>추천 헤어스타일</h3>
          </div>
          <div className="not-recommendation-text">
            <h3>비추천 헤어스타일</h3>
          </div>
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
