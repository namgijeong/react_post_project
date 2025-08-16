//intercept할 API들의 요청과 응답을 작성하는 곳
import { HttpResponse, http } from "msw";
import { Post } from '../interface/Post';
import { Comment } from '../interface/Comment';
// import useStore from '../components/store/useStore';
import {getPostsData, getCommentsData, changePostsData, changeCommentssData } from '../faker/storeFakerData';

let postsData = getPostsData();

export const handlers = [
    
    http.get('/post/:id', async({params, request}) => {
        //const data = await request.json();

        const {id} =params;
        console.log("handler에서 받은 id : "+id);
        console.log(id);
        let findPost:Post|undefined = undefined;

        //데이터 배열과 연동
        const posts = postsData;
        console.log("첫 상세페이지 진입시 데이터")
        console.log(posts);
        findPost = posts.find(post => post.id === Number(id));
        console.log(findPost);

        console.log("params.id type:", typeof id, id);
        console.log("post.id type:", typeof posts[0].id, posts[0].id);
        return HttpResponse.json(findPost);
    }),

    http.get('/posts', async({params, request}) => {
        //데이터 배열과 연동
        const posts: Array<Post> = postsData;
        const findPosts = posts;
        console.log("/posts msw에 들어옴");
        console.log(findPosts);
        return HttpResponse.json(findPosts);
    }),

    http.put('/like/:id/:like', async({params, request}) => {
        console.log("like handler 진입");
        const {id, like} =params;
        console.log("msw id : "+id);
        console.log("msw like : "+like);

        //데이터 배열과 연동
        let posts: Array<Post> = postsData;
        //객체의 복사와 일부 속성 덮어쓰기
        const newArr = posts.map(item =>
            item.id === Number(id) ? { ...item, likeCount: Number(like) } : item
        );

        console.log(newArr);
        posts = newArr;
        postsData = newArr;
    
        console.log("바뀐 posts 데이터");
        console.log(posts);

        //저장소 데이터 배열에 덮어쓰기
        changePostsData(newArr);
    
        return HttpResponse.json({success:true});
    }),

    http.put('/read/:id/:read', async({params, request}) => {
        const {id, read} =params;
        console.log("msw id : "+id);
        console.log("msw read : "+read);

        //데이터 배열과 연동
        let posts: Array<Post> = postsData;
        //객체의 복사와 일부 속성 덮어쓰기기
        const newArr = posts.map(item =>
            item.id === Number(id) ? { ...item, readCount: Number(read) } : item
        );

        console.log(newArr);
        posts = newArr;
        postsData = newArr;
    
        console.log("바뀐 posts 데이터");
        console.log(posts);
    
        //저장소 데이터 배열에 덮어쓰기
        changePostsData(newArr);
       
        return HttpResponse.json({success:true});
    }),




    // http.get('/post/:id', async({params, request}) => {
    //     //const data = await request.json();

    //     const {id} =params;
    //     console.log("handler에서 받은 id : "+id);
    //     console.log(id);
    //     let findPost:Post|undefined = undefined;

    //     //zustand와 연동
    //     const posts = useStore.getState().posts;
    //     console.log("첫 상세페이지 진입시 데이터")
    //     console.log(posts);
    //     findPost = posts.find(post => post.id === Number(params.id));
    //     console.log(findPost);
    //     return HttpResponse.json(findPost);
    // }),

    // http.get('/posts', async({params, request}) => {
    //     //zustand와 연동
    //     const posts: Array<Post> = useStore.getState().posts;
    //     const findPosts = posts;
    //     console.log(findPosts);
    //     return HttpResponse.json(findPosts);
    // }),

   
    // http.put('/:id/:like', async({params, request}) => {
    //     const {id, like} =params;
    //     console.log("msw id : "+id);
    //     console.log("msw like : "+like);

    //     //zustand와 연동
    //     const posts: Array<Post> = useStore.getState().posts;
    //     //객체의 복사와 일부 속성 덮어쓰기
    //     const newArr = posts.map(item =>
    //         item.id === Number(id) ? { ...item, likeCount: Number(like) } : item
    //     );

    //     console.log(newArr);
    //     useStore.getState().updatePosts(newArr);
    
    //     console.log("zustand 바뀜???");
    //     console.log(useStore.getState().posts);
    
       
    //     return HttpResponse.json({success:true});
    // }),

    // http.put('/:id/:read', async({params, request}) => {
    //     const {id, read} =params;
    //     console.log("msw id : "+id);
    //     console.log("msw read : "+read);

    //     //zustand와 연동
    //     const posts: Array<Post> = useStore.getState().posts;
    //     //객체의 복사와 일부 속성 덮어쓰기
    //     const newArr = posts.map(item =>
    //         item.id === Number(id) ? { ...item, readCount: Number(read) } : item
    //     );

    //     console.log(newArr);
    //     useStore.getState().updatePosts(newArr);
    
    //     console.log("zustand 바뀜???");
    //     console.log(useStore.getState().posts);
    
       
    //     return HttpResponse.json({success:true});
    // }),

];
