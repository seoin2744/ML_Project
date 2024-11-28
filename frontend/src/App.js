import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Page1 from "./page1/Page1";
import Page2 from "./page2/Page2";
import Page3 from "./page3/Page3";
import Page4 from "./page4/Page4";
import Page5 from "./page5/Page5";

function App() {
  const [uploadedFile, setUploadedFile] = useState(null); // 업로드된 파일
  const [predictionResult, setPredictionResult] = useState(null); // 모델 예측 결과

  useEffect(() => {
    // 새로고침 시 상태 초기화
    const handleBeforeUnload = () => {
      setUploadedFile(null);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/page1",
      element: <Page1 />,
    },
    {
      path: "/page2",
      element: (
        <Page2
          setUploadedFile={setUploadedFile}
          uploadedFile={uploadedFile}
        />
      ),
    },
    {
      path: "/page3",
      element: (
        <Page3
          uploadedFile={uploadedFile}
          setPredictionResult={setPredictionResult}
        />
      ),
    },
    {
      path: "/page4",
      element: <Page4 predictionResult={predictionResult} />,
    },
    {
      path: "/page5",
      element: <Page5 predictionResult={predictionResult} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
