//intercept할 API들의 요청과 응답을 작성하는 곳
import postsData from './dummy_post.json';
import { HttpResponse, http } from "msw";
import { Post } from '../components/interface/Post';
import useStore from '../components/store/useStore';

//인터페이스와 매핑
//const posts: Array<Post> = postsData;
//useStore.getState().updatePosts(posts);

// let paramId ;
// const findPost = <T>(element:T): T => {
//     if (element.id === Number(params.id)){
//         return element;
//     }
//     return undefined;
// }

export const handlers = [
    
    http.get('/findPostById/:id', async({params, request}) => {
        //const data = await request.json();

        const {id} =params;
        console.log("handler에서 받은 id : "+id);
        console.log(id);
        let findPost:Post|undefined = undefined;

        //zustand와 연동
        const posts = useStore.getState().posts;
        console.log("첫 상세페이지 진입시 데이터")
        console.log(posts);
        findPost = posts.find(post => post.id === Number(params.id));
        console.log(findPost);
        return HttpResponse.json(findPost);
    }),

    http.get('/findPosts', async({params, request}) => {
        //zustand와 연동
        const posts: Array<Post> = useStore.getState().posts;
        const findPosts = posts;
        console.log(findPosts);
        return HttpResponse.json(findPosts);
    }),

   
    http.get('/updateLike/:id/:like', async({params, request}) => {
        const {id, like} =params;
        console.log("msw id : "+id);
        console.log("msw like : "+like);

        //zustand와 연동
        const posts: Array<Post> = useStore.getState().posts;
        //객체의 복사와 일부 속성 덮어쓰기
        const newArr = posts.map(item =>
            item.id === Number(id) ? { ...item, likeCount: Number(like) } : item
        );

        console.log(newArr);
        useStore.getState().updatePosts(newArr);
    
        console.log("zustand 바뀜???");
        console.log(useStore.getState().posts);
    
       
        return HttpResponse.json({success:true});
    }),

    http.get('/updateRead/:id/:read', async({params, request}) => {
        const {id, read} =params;
        console.log("msw id : "+id);
        console.log("msw read : "+read);

        //zustand와 연동
        const posts: Array<Post> = useStore.getState().posts;
        //객체의 복사와 일부 속성 덮어쓰기
        const newArr = posts.map(item =>
            item.id === Number(id) ? { ...item, readCount: Number(read) } : item
        );

        console.log(newArr);
        useStore.getState().updatePosts(newArr);
    
        console.log("zustand 바뀜???");
        console.log(useStore.getState().posts);
    
       
        return HttpResponse.json({success:true});
    }),

];
