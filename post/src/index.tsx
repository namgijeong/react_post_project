import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//서비스 워커를 등록하고 활성화
//서비스 워커 등록이 비동기 작업이므로, async/await을 사용해 앱 렌더링을 연기
async function enableMocking() {
  const { worker } = await import('./mocks/browsers');

  return worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

enableMocking().then(() => {
  root.render(
      <App />
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
