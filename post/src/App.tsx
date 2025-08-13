import React,{useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PostList from './components/page/PostList';
import PostDetail from './components/page/PostDetail';
import PostWrite from './components/page/PostWrite';
import PostUpdate from './components/page/PostUpdate';
import NotFound from './components/page/NotFound';

import useStore from './components/store/useStore';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostList />}></Route>
          <Route path="/detail/:id" element={<PostDetail />}></Route>
          {/* <Route path="/detail/" element={<PostDetail />}></Route> */}
          <Route path="/write/" element={<PostWrite />}></Route>
          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>

  
    </div>
  );
  

}


export default App;
