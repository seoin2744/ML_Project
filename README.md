# ML_Project Frontend
npm start로 실행됨.

실행 경로 : 최상위 폴더

# ML_Project backend
backend 디렉터리 내에서 `python -m venv venv` 로 가상환경 생성
`source venv/bin/activate` 로 가상환경 활성화
실행 경로 : `cd backend`
FastAPI 서버 실행 명령: `uvicorn main:app --reload`

# 필요한 라이브러리 설치

필요한 라이브러리 다운로드 `pip install fastapi uvicorn tensorflow python-multipart pillow`
JSON 응답 데이터를 보기 쉽게 출력하는 라이브러리 `pip install orjson`