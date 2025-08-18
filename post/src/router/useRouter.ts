import { useNavigate, useParams  } from 'react-router-dom';
const useRouter = () => {
      const navigate = useNavigate();
      const params = useParams();


    const goToPage = (url : string) => {
        navigate(url)
    }

    const goToDetailPost =(id: number) => {
        goToPage(`/detail/${id}`)
    }
    

    return {
        goToPage,
        goToDetailPost,
        params
    }
}

export default useRouter;