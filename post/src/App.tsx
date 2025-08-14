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

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 5000, 
      staleTime: 6000 ,
    },
  },
});

function App() {

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PostList />}></Route>
            <Route path="/detail/:id" element={<PostDetail />}></Route>
            <Route path="/detail/:id/edit" element={<PostUpdate />}></Route>
            <Route path="/write/" element={<PostWrite />}></Route>
            {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
  

}


export default App;
