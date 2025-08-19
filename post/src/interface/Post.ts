//타입스크립트의 특징
// interface Post {
//   title: string;
// }
// const posts: Post[] = [
//   { title: "Hello" }, // 구현체 없이 그냥 객체 리터럴 가능
//   { title: "World" }
// ];
//자바와 다르게 구현체 클래스가 필요 없음 → 바로 배열에 넣을 수 있음.

export interface Post{
    id: number;
    title: string;
    writer: string;
    regDate: string;
    readCount: number;
    likeCount: number;
    content: string;

}


