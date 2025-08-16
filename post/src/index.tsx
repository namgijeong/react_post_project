import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import useStore from './store/useStore';

//서비스 워커를 등록하고 활성화
//서비스 워커 등록이 비동기 작업이므로, async/await을 사용해 앱 렌더링을 연기
async function enableMocking() {
  const { worker } = await import('./mocks/browsers');

  return worker.start({
    //핸들러 없는 요청은 그냥 실제 서버로 보내고 경고도 안 뜸=> react router 경로도 계속 가로챌려고함
    onUnhandledRequest: 'bypass',
  });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

enableMocking().then(() => {

  // useEffect(() => {
  //   //프로젝트 자체를 새로 구동시에는 zustand persist를 초기화
  //   useStore.persist?.clearStorage();
  //   useStore.getState().updatePosts([]);
  // }, []);

  
    //프로젝트 자체를 새로 구동시에는 zustand persist를 초기화
    //useStore.persist?.clearStorage();
    //useStore.getState().updatePosts([]);
  

  root.render(
      <App />
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
