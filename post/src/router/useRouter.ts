import { useNavigate, useParams, useLocation  } from 'react-router-dom';
const useRouter = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    //const locationState = location.state;
    const queryStrings = new URLSearchParams(location.search);

    const goToPage = (url : string) => {
        navigate(url)
    }

    //location.state는 navigate로 전달한 state가 있을 때만 존재
    // const goToPageWithData = <T> (url : string, stateData:T) => {
    //     navigate(url, {state :stateData });
    // }

    const goToUpdatePost = (id: number, title:string|undefined, writer:string|undefined, content:string|undefined) => {
         goToPage(`/detail/${id}/edit?title=${title}&writer=${writer}&content=${content}`);
    }

    const goToDetailPost =(id: number) => {
        goToPage(`/detail/${id}`)
    }
    
    const goToWritePost = () => {
        goToPage(`/write`);
    }

    const goToListPost = () => {
        goToPage(`/`);
    }
    return {
        goToPage,
        goToDetailPost,
        goToWritePost,
        goToListPost,
        goToUpdatePost,
        params,
        location,
        queryStrings
    }
}

export default useRouter;