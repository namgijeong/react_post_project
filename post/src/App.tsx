import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';

import PostList from './components/page/PostList';
import PostDetail from './components/page/PostDetail';
import PostWrite from './components/page/PostWrite';
import PostUpdate from './components/page/PostUpdate';
import NotFound from './components/page/NotFound';

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         gcTime: 5000,
         staleTime: 6000,
      },
   },
});

function App() {
   return (
      <div className="App">
         <QueryClientProvider client={queryClient}>
            <BrowserRouter>
               <Routes>
                  <Route path="/" element={<PostList />} />
                  <Route path="/detail/:id" element={<PostDetail />} />
                  <Route path="/detail/:id/edit" element={<PostUpdate />} />
                  <Route path="/write" element={<PostWrite />} />
                  {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                  <Route path="*" element={<NotFound />} />
               </Routes>
            </BrowserRouter>
         </QueryClientProvider>
      </div>
   );
}

export default App;
