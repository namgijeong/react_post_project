import { useNavigate, useParams, useLocation } from 'react-router-dom';

const useRouter = () => {
   const navigate = useNavigate();
   const params = useParams();
   const location = useLocation();
   const queryStrings = new URLSearchParams(location.search);

   const goToPage = async (url: string) => {
      await navigate(url);
   };

   const goToUpdatePost = async (
      id: number,
      title: string | undefined,
      writer: string | undefined,
      content: string | undefined,
   ) => {
      await goToPage(`/detail/${id}/edit?title=${title}&writer=${writer}&content=${content}`);
   };

   const goToDetailPost = async (id: number) => {
      await goToPage(`/detail/${id}`);
   };

   const goToWritePost = async () => {
      await goToPage('/write');
   };

   const goToListPost = async () => {
      await goToPage('/');
   };
   return {
      goToPage,
      goToDetailPost,
      goToWritePost,
      goToListPost,
      goToUpdatePost,
      params,
      location,
      queryStrings,
   };
};

export default useRouter;
