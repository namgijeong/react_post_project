import { makeMultiplePostData, makeMultipleCommentData} from "./makeFakerData";
import { Post } from '../interface/Post';
import { Comment } from '../interface/Comment';

export let postsData = makeMultiplePostData();
export let commentsData = makeMultipleCommentData();

export const changePostsData = (newPostsData:Array<Post>) => {
    postsData = newPostsData;
    return postsData;
}
export const changeCommentssData = (newCommentsData:Array<Comment>) => {
    commentsData = newCommentsData;
    return commentsData;
}