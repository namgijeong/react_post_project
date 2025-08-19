//intercept할 API들의 요청과 응답을 작성하는 곳
import { HttpResponse, http } from "msw";
import { Post } from '../interface/Post';
import { MyComment } from '../interface/MyComment';
// import useStore from '../components/store/useStore';
import {getPostsData, getCommentsData, changePostsData, changeCommentsData } from '../faker/storeFakerData';
import { registerComment } from "../interface/InputComment";
import { InputPost } from "../interface/InputPost";
import { fakerKO as faker } from "@faker-js/faker";

let postsData = getPostsData();
let commentsData = getCommentsData();

export const handlers = [
    
    //게시글 상세 조회
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

    //게시글 리스트 불러오기 
    http.get('/posts', async({params, request}) => {
        //데이터 배열과 연동
        const posts: Array<Post> = postsData;
        const findPosts = posts;
        console.log("/posts msw에 들어옴");
        console.log(findPosts);
        return HttpResponse.json(findPosts);
    }),

    //게시글 상세 페이지 좋아요 버튼 누르기 
    // http.put('/like/:id/:like', async({params, request}) => {
    //     console.log("like handler 진입");
    //     const {id, like} =params;
    //     console.log("msw id : "+id);
    //     console.log("msw like : "+like);

    //     //데이터 배열과 연동
    //     let posts: Array<Post> = postsData;
    //     //객체의 복사와 일부 속성 덮어쓰기
    //     const newArr = posts.map(item =>
    //         item.id === Number(id) ? { ...item, likeCount: Number(like) } : item
    //     );

    //     console.log(newArr);
    //     posts = newArr;
    //     postsData = newArr;
    
    //     console.log("바뀐 posts 데이터");
    //     console.log(posts);

    //     //저장소 데이터 배열에 덮어쓰기
    //     changePostsData(newArr);
    
    //     return HttpResponse.json({success:true});
    // }),

    //게시글 상세페이지 진입시 조회수 올리기
    // http.put('/read/:id/:read', async({params, request}) => {
    //     const {id, read} =params;
    //     console.log("msw id : "+id);
    //     console.log("msw read : "+read);

    //     //데이터 배열과 연동
    //     let posts: Array<Post> = postsData;
    //     //객체의 복사와 일부 속성 덮어쓰기기
    //     const newArr = posts.map(item =>
    //         item.id === Number(id) ? { ...item, readCount: Number(read) } : item
    //     );

    //     console.log(newArr);
    //     posts = newArr;
    //     postsData = newArr;
    
    //     console.log("바뀐 posts 데이터");
    //     console.log(posts);
    
    //     //저장소 데이터 배열에 덮어쓰기
    //     changePostsData(newArr);
       
    //     return HttpResponse.json({success:true});
    // }),

    //게시글 작성하기 
    http.post('/post', async({params, request}) => {
        const bodyData =await request.json() as InputPost;
        console.log("msw bodyData : "+bodyData);

        let bodyPost = {...bodyData, id:faker.number.int({ min: 1, max: 999 }), readCount:0, likeCount:0, regDate: faker.date.recent().toString()}
        //데이터 배열과 연동
        let posts: Array<Post> = postsData;
        //filter는 콜백 함수가 true를 반환하는 원소만 남기는 함수
        const newArr = [...postsData, bodyPost];
        console.log(newArr);
        posts = newArr;
        postsData = newArr;

        console.log("바뀐 comments 데이터");
        console.log(posts);

        //저장소 데이터 배열에 덮어쓰기
        changePostsData(newArr);
        
        return HttpResponse.json({success:true});
    }),

    //게시글 수정하기
    http.put('/post/:id', async({params, request}) => {
        const {id} =params;

        const bodyData =await request.json() as InputPost;
        console.log("msw bodyData : "+bodyData);
        console.log("msw id : "+id);

        //데이터 배열과 연동
        let posts: Array<Post> = postsData;
        //객체의 복사와 일부 속성 덮어쓰기기
        const newArr = posts.map(item =>
            item.id === Number(id) ? { ...item, title: bodyData.title, writer:bodyData.writer, content:bodyData.content } : item
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

    //게시글 삭제하기
    http.delete('/post/:id', async({params, request}) => {
        const {id} =params;
        console.log("msw id : "+id);

        //데이터 배열과 연동
        let posts: Array<Post> = postsData;
        //filter는 콜백 함수가 true를 반환하는 원소만 남기는 함수
        const newArr = posts.filter(item =>
            item.id !== Number(id)
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

    //댓글 리스트 조회
    http.get('/comments', async({params, request}) => {
        //데이터 배열과 연동
        const comments: Array<MyComment> = commentsData;
        console.log("/posts msw에 들어옴");
        console.log(comments);
        return HttpResponse.json(comments);
    }),

    //댓글 등록하기
    http.post('/comment', async({params, request}) => {
        const bodyData =await request.json() as registerComment;
        let bodyPost = {...bodyData, id:faker.number.int({ min: 1, max: 999 }), regDate: faker.date.recent().toString()}
        console.log("msw bodyData : "+bodyData);

        //데이터 배열과 연동
        let comments: Array<MyComment> = commentsData;
        //filter는 콜백 함수가 true를 반환하는 원소만 남기는 함수
        const newArr = [...comments, bodyPost];
        console.log(newArr);
        comments = newArr;
        commentsData = newArr;

        console.log("바뀐 comments 데이터");
        console.log(comments);

        //저장소 데이터 배열에 덮어쓰기
        changeCommentsData(newArr);
        
        return HttpResponse.json({success:true});
    }),

    //댓글 삭제하기
    http.delete('/comment/:id', async({params, request}) => {
        const {id} =params;
        console.log("msw id : "+id);

        //데이터 배열과 연동
        let comments: Array<MyComment> = commentsData;
        //filter는 콜백 함수가 true를 반환하는 원소만 남기는 함수
        const newArr = comments.filter(item =>
            item.id !== Number(id)
        );

        console.log(newArr);
        comments = newArr;
        commentsData = newArr;
    
        console.log("바뀐 comments 데이터");
        console.log(comments);
    
        //저장소 데이터 배열에 덮어쓰기
        changeCommentsData(newArr);
       
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
