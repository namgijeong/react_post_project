import { makeMultiplePostData, makeMultipleCommentData} from "./makeFakerData";
import { Post } from '../interface/Post';
import { Comment } from '../interface/Comment';

// let postsData = makeMultiplePostData();
// let commentsData = makeMultipleCommentData();

//계속 값이 랜덤으로 바뀌어서 게시판 상세페이지에 들어갈때 못찾기때문
declare global {
  var POSTS_DATA: Post[] | undefined;
  var COMMENTS_DATA: Comment[] | undefined;
}

if (!globalThis.POSTS_DATA) {
    globalThis.POSTS_DATA = makeMultiplePostData(); // 딱 한 번만 생성
}

if (!globalThis.COMMENTS_DATA) {
    globalThis.COMMENTS_DATA = makeMultipleCommentData(); // 딱 한 번만 생성
}

export const getPostsData = () => globalThis.POSTS_DATA!;

export const getCommentsData = () => globalThis.COMMENTS_DATA!;

export const changePostsData = (newPostsData:Array<Post>) => {
    globalThis.POSTS_DATA = newPostsData;
    return globalThis.POSTS_DATA!;
}
export const changeCommentsData = (newCommentsData:Array<Comment>) => {
    globalThis.COMMENTS_DATA = newCommentsData;
    return globalThis.COMMENTS_DATA!;
}