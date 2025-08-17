import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

import { DetailProps } from '../../interface/DetailProps';
import {useParams} from 'react-router-dom';
import { useLocation } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import { useForm } from "react-hook-form";

import { axiosGetData, axiosPostData, axiosPutDataWithBody } from '../../axios/axiosHook';

import { useReactQuery, useMutationReactQuery } from '../../reactquery/reactqueryHook';

import { InputPost } from '../../interface/InputPost';
import { Post } from '../../interface/Post';

import {useGoDetailPost} from '../../router/routerHook';

const DetailDivStyle = css`
  margin-top: 100px;
  margin : auto;
  font-size: 20px;
  text-align: center;
 
`;

const TitleDivStyle50 = css`
    width: 50px;
    height: 100px;
    line-height:100px;
    
`

const TitleDivStyle100 = css`
    width: 100px;
    height: 100px;
    line-height:100px;
   
`

const TitleDivStyle200 = css`
    width: 200px;
    height: 100px;
    line-height:100px;
    
`

const TitleDivStyle300 = css`
    width: 300px;
    height: 100px;
    line-height:100px;
   
`

const rightDivBorder = css`
    border-right:1px solid gray;
`

const BorderBottomNone = css`
    border-bottom:none;
`

const smallFontSize = css`
    font-size:14px;
`

function PostUpdate(){

    //navigator state로 가지고 온것
    const location = useLocation();
    const {title, writer, content} = location.state;

    //RHF 기본은 FieldValues 타입이라 지정해야함
    const { register, handleSubmit, reset } = useForm<InputPost>();
        
    //커스텀 훅에서 일반함수를 반환 
    let go = useGoDetailPost();

    const updatePost = async (post:Post) => {
        //axios에서 두번째 매개변수로 params를 사용하는것은 쿼리방식
        //url에 포함시키는것은 경로 파라미터
        const data = await axiosPutDataWithBody<Post>({url:`/post/${detailId}`,data:post});
        console.log("axios comment 결과");
        console.log(data);
        return data;
    }

    //mutate에 comment타입의 객체를 넣었더니 계속 에러가 났다..
    //거의 100% Comment 라는 이름이 네이티브 DOM 타입(Comment = HTML 주석 노드) 과 충돌
    const registerMutation = useMutationReactQuery(
        ['posts'],
        updatePost
    );
    

    //객체 구조분해
    const {id} = useParams();
    const  detailId = id ? parseInt(id, 10) : null;
    if (detailId == null) {
        return (
            <div>
                <h1>해당 게시글이 존재하지 않습니다.</h1>
            </div>
        )
    }

    
    const updateClick = (inputContent:InputPost) => {
        console.log("등록완료");
        registerMutation.mutate({id:detailId, title:inputContent.title, writer:inputContent.writer, regDate:new Date(), content:inputContent.content, likeCount:0, readCount:0});
        reset();
        go(detailId);
    } 

    return (
        <div css = {DetailDivStyle}>
            <h1>PostUpdate</h1>
            <Box sx={{
                width: 750,
                height: 150,
                border : "1px solid gray",
                borderBottom : "none",
                margin: "auto",
                display: "flex",
                alignItems: "center",
            
            }}>

                {/**제목 영역*/}
                <Box sx={{
                    width: 400,
                    height: 150,
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
            
                }}>
                    <div css = {[TitleDivStyle100]}>제목</div>
                    <TextareaAutosize minRows={1}  placeholder="제목을 입력해주세요." 
                    {...register("title")} 
                    style={{ width: 300,  resize: 'none', border:"1px solid gray" }}  
                    css = {[TitleDivStyle300, rightDivBorder]}
                    defaultValue={title}/>

                </Box>

                {/**작성자 영역*/}
                <Box sx={{
                    width: 300,
                    height: 150,
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
            
                }}>
                    <div css = {[TitleDivStyle100]}>작성자</div>
                    <TextareaAutosize minRows={1}  placeholder="작성자를 입력해주세요." 
                    {...register("writer")} 
                    style={{ width: 200,  resize: 'none', border:"1px solid gray" }}  
                    css = {[TitleDivStyle300, rightDivBorder]}
                    defaultValue={writer}/>
                
                </Box>
            </Box>


            {/**본격적 내용영역 */}
            <Box sx={{
                width: 750,
                height: 300,
                border : "1px solid gray",
                borderBottom : "none",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
            
            }}>
                <TextareaAutosize
                    minRows={21} placeholder="본문을 입력해주세요."
                    {...register("content")} 
                    style={{ width: 730,  resize: 'none', border:"none" }}
                    defaultValue={content}
                />
            </Box> 

            <Box sx={{
                width: 750,
                height: 50,
                border : "1px solid gray",
                borderTop : "none",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
            
            }}> 
               <Button sx={{width:150, height:50}} variant="contained" onClick={handleSubmit(updateClick)}>작성완료</Button>
            </Box> 
        </div>
    );
}

export default PostUpdate;