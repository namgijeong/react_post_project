import { fakerKO as faker } from "@faker-js/faker";
import { Post } from "../interface/Post";
import {MyComment} from "../interface/MyComment";

// Named Export
// 여러 개를 한 파일에서 내보낼 수 있음.
// 이름이 고정되어 있어서 가져올 때 반드시 같은 이름을 써야 함.
// { } 중괄호로 가져옴.

export const makeOnePostData = () => {
    const id = faker.number.int({ min: 1, max: 999 });
    const title = faker.lorem.words(1);
    const writer = faker.person.fullName();
    const regDate = faker.date.recent().toString();
    const readCount = faker.number.int({ min: 1, max: 999 });
    const likeCount = faker.number.int({ min: 1, max: 999 });
    const content = faker.lorem.paragraph(); 

    const onePost:Post = {id:id, title:title, writer:writer, regDate:regDate, readCount:readCount, likeCount:likeCount, content:content}
    return onePost;
}

export const makeMultiplePostData = () => {
    const posts:Array<Post> = [];
    for (let i = 0; i < 30 ; i++) {
        const onePost = makeOnePostData();
        onePost.id = (i+1);
        posts.push(onePost);
    }
    
    return posts;
}

export const makeOneCommentData = () => {
    const id = faker.number.int({ min: 1, max: 999 });
    const writer = faker.person.fullName();
    const regDate = faker.date.recent().toString();
    const content = faker.lorem.paragraph(); 

    const oneComment:MyComment = {id:id,  writer:writer, regDate:regDate, content:content}
    return oneComment;
}

export const makeMultipleCommentData = () => {
    const comments:Array<MyComment> = [];
    for (let i = 0; i < 30 ; i++) {
        const oneComment = makeOneCommentData();
        oneComment.id = (i+1);
        comments.push(oneComment);
    }    
    
    return comments;
}


