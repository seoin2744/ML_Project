import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page2.css";

const Page2 = () => {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleNext = () => {
    navigate("/page3");
  };

  const handlePrevious = () => {
    navigate("/");
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
        <div className="progress" style={{ width: `${(1 / 4) * 100}%` }}></div>
      </div>
      <h1>
        얼굴 사진을 <span id="result-bold">업로드</span>하세요
      </h1>
      <div className="options">
        <div className="option" id="option">
          {uploadedImage ? (
            <img src={uploadedImage} alt="업로드된 이미지" />
          ) : (
            <img src="" alt="이미지를 업로드하세요." />
          )}
          <input
            type="file"
            accept="image/*"
            id="file-input"
            style={{ display: "none" }}
            onChange={handleFileChange} // 파일 선택 시 처리
          />
          <label htmlFor="file-input" className="upload_img">
            업로드
          </label>
        </div>
      </div>
      <div className="navigation">
        <button className="prev-button" onClick={handlePrevious}>
          이전
        </button>
        <button className="next-button" onClick={handleNext}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Page2;
