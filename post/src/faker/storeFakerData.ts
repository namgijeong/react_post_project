import { makeMultiplePostData, makeMultipleCommentData } from './makeFakerData';
import { Post } from '../interface/Post';
import { MyComment } from '../interface/MyComment';

let postsData = makeMultiplePostData();
let commentsData = makeMultipleCommentData();

// 계속 값이 랜덤으로 바뀌어서 게시판 상세페이지에 들어갈때 못찾기때문
// declare global {
//    let POSTS_DATA: Post[] | undefined;
//    let COMMENTS_DATA: MyComment[] | undefined;
// }

// if (!globalThis.POSTS_DATA) {
//    globalThis.POSTS_DATA = makeMultiplePostData(); // 딱 한 번만 생성
// }

// if (!globalThis.COMMENTS_DATA) {
//    globalThis.COMMENTS_DATA = makeMultipleCommentData(); // 딱 한 번만 생성
// }

export const getPostsData = () => postsData;

export const getCommentsData = () => commentsData;

export const changePostsData = (newPostsData: Array<Post>) => {
   postsData = newPostsData;
   return postsData;
};
export const changeCommentsData = (newCommentsData: Array<MyComment>) => {
   commentsData = newCommentsData;
   return commentsData;
};
