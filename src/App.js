import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Page1 from "./page1/Page1";
import Page2 from "./page2/Page2";
import Page3 from "./page3/Page3";
import Page4 from "./page4/Page4";
import Page5 from "./page5/Page5";

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
    element: <Page2 />,
  },
  {
    path: "/page3",
    element: <Page3 />,
  },
  {
    path: "/page4",
    element: <Page4 />,
  },
  {
    path: "/page5",
    element: <Page5 />,
  },
]);

function App() {
  // 상태 관리
  const [uploadedFile, setUploadedFile] = useState(null); // 업로드된 파일
  const [predictionResult, setPredictionResult] = useState(null); // 모델 예측 결과

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
          setUploadedFile={setUploadedFile} // 파일 업로드 상태를 전달
          uploadedFile={uploadedFile} // 업로드된 파일 전달
        />
      ),
    },
    {
      path: "/page3",
      element: (
        <Page3
          uploadedFile={uploadedFile} // 업로드된 파일 전달
          setPredictionResult={setPredictionResult} // 예측 결과 상태 전달
        />
      ),
    },
    {
      path: "/page4",
      element: (
        <Page4
          predictionResult={predictionResult} // 예측 결과 전달
        />
      ),
    },
    {
      path: "/page5",
      element: (
        <Page5
          predictionResult={predictionResult} // 예측 결과 전달
        />
      ),
    },
  ]);  

  return <RouterProvider router={router} />;
}

export default App;
