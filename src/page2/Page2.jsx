import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./page2.css";

const Page2 = ({ setUploadedFile, uploadedFile }) => {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);

  // 부모 컴포넌트에서 받은 파일 상태를 사용해 이미지 미리보기 설정
  useEffect(() => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result); // 이미지 미리보기 설정
      };
      reader.readAsDataURL(uploadedFile);
    }
  }, [uploadedFile]);

  const handleNext = () => {
    if (!uploadedImage) {
      alert("이미지를 업로드하세요!");
      return;
    }
    navigate("/page3");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 업로드된 파일 가져오기
    if (file) {
      setUploadedFile(file); // 부모 컴포넌트로 파일 전달
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result); // 이미지 미리보기 상태 저장
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
            업로드
          </label>
        </div>
      </div>
      <div className="navigation">
        <button className="next-button" onClick={handleNext}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Page2;
