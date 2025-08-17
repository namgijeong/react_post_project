import {create} from 'zustand'
import { persist } from 'zustand/middleware';
import { Post } from '../interface/Post';
import postsData from '../mocks/dummy_post.json';
import { Level } from '../interface/Level';
import { UserLevel } from '../enum/UserLevel';

//브라우저 새로고침(F5) 또는 직접 URL 접근
//이 경우는 브라우저가 완전히 새로 로드되므로 JS 메모리 상태(Zustand)는 초기값으로
//persist middleware localstorage 저장 
const useStore = create<Level>()(
    persist(
        (set) => ({
            level: UserLevel.Admin,
            changeLevel: (newLevel) => set(( ) => ({level: newLevel})),
        }),

            { name: 'level-storage' } // localStorage key
    )
   
)

export default useStore;





//{"id":1, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10 , "content":"안녕하세요1"},
//인터페이스와 매핑
// const posts: Array<Post> = postsData;

// type Posts = {
//     posts:Array<Post>,
//     updatePosts: (newposts :Array<Post>) => void
// }

// type ReadCount = {
//     readCount: number,
//     increaseReadCount: (readCount: number) => void
// }
// type LikeCount = {
//     likeCount: number,
//     increaseLikeCount: (likeCount: number) => void
// }
// type writer = {
//     writer:string,
//     updateWriter: (writer:string) => void
// }

// const useStore = create<ReadCount & LikeCount>(set => ({
//     readCount: 0,
//     //state => 현재 Zustand 스토어가 가지고 있는 상태 객체 전체
//     //set함수에 콜백함수를 인자로 => 여기서 괄호 ({ ... })는 객체를 바로 반환하려고 쓴 문법 => 중괄호를 함수 본문으로 인식하지 않도록 감싸는 용도
//     increaseReadCount: (readCount) => set(( ) => ({readCount: readCount})),

//     likeCount: 0,
//     increaseLikeCount: (likeCount) => set(( ) => ({likeCount: likeCount})),
// }))

//브라우저 새로고침(F5) 또는 직접 URL 접근
//이 경우는 브라우저가 완전히 새로 로드되므로 JS 메모리 상태(Zustand)는 초기값으로
//persist middleware localstorage 저장 
// const useStore = create<Posts>()(
//     persist(
//         (set) => ({
//             //posts: [],
//             posts:posts,
//             updatePosts: (newposts) => set(( ) => ({posts: newposts})),
//         }),

//             { name: 'posts-storage' } // localStorage key
//     )
   
// )

// export default useStore;