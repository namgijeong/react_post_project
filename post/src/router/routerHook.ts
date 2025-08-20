import { useNavigate } from 'react-router-dom';
import { InputPost } from '../interface/InputPost';

// 커스텀 훅에서 일반함수를 반환
// useNavigate자체가 custom hook이나 컴포넌트상단에서만 호출가능
export const useGoDetailPost = () => {
   const navigate = useNavigate();
   const go = async (id: number) => {
      await navigate(`/detail/${id}`);
   };

   return go;
};

export const useGoWritePost = () => {
   const navigate = useNavigate();
   const go = async () => {
      await navigate('/write');
   };

   return go;
};

export const useGoListPost = () => {
   const navigate = useNavigate();
   const go = async () => {
      await navigate('/');
   };

   return go;
};

export const useGoUpdatePost = () => {
   const navigate = useNavigate();
   const go = async (id: number, data: InputPost) => {
      await navigate(`/detail/${id}/edit`, { state: data });
   };

   return go;
};
