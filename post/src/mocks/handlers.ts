//intercept할 API들의 요청과 응답을 작성하는 곳
import postsData from './dummy_post.json';
import { HttpResponse, http } from "msw";
import { Post } from '../components/interface/Post';

//인터페이스와 매핑
const posts: Array<Post> = postsData;

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
        const findPost = posts.find(post => post.id === Number(params.id));
        console.log(findPost);
        return HttpResponse.json(findPost);
    }),

    http.get('/findPosts', async({params, request}) => {
        const findPosts = posts;
        console.log(findPosts);
        return HttpResponse.json(findPosts);
    })
];
