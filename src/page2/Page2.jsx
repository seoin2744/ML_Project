import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./page2.css";

const Page2 = ({ setUploadedFile, uploadedFile }) => {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploaded, setIsUploaded] = useState(!!uploadedFile); 

  useEffect(() => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(uploadedFile);
    }
  }, [uploadedFile]);

  const handleNext = () => {
    if (isUploaded) {
      navigate("/page3");
    } else {
      alert("이미지를 업로드해주세요."); 
    }
  };

  const handlePrevious = () => {
    navigate("/");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      setUploadedFile(file); 
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setIsUploaded(true);
      };
      reader.readAsDataURL(file);
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
            onChange={handleFileChange}
          />
          <label htmlFor="file-input" className="upload_img">
            {isUploaded ? "다시 업로드" : "업로드"}
          </label>
        </div>
      </div>
      <div className="navigation">
        <button className="prev-button" onClick={handlePrevious}>
          이전
        </button>
        <button
          className="next-button"
          onClick={handleNext}
          disabled={!isUploaded} 
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Page2;
