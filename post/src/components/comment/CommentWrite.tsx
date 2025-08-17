import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';

import { useForm } from "react-hook-form";

import axios from 'axios';
import { axiosGetData, axiosPostData, axiosPutData, axiosDeleteData } from '../../axios/axiosHook';

import { useReactQuery, useMutationReactQuery } from '../../reactquery/reactqueryHook';

import { AxiosRequest } from '../../interface/AxiosRequest';
import { InputComment } from '../../interface/InputComment';
import { MyComment } from '../../interface/MyComment';

import { fakerKO as faker } from "@faker-js/faker";

const CommentWriteDivStyle = css`
  margin-top: 100px;
  margin : auto;
  font-size: 20px;
  text-align: center;
 
`;

const CommentWriteButtonDivStyle = css`
    margin-left:10px;
`


const CommentWrite = () => {

    //RHF 기본은 FieldValues 타입이라 지정해야함
    const { register, handleSubmit, reset } = useForm<InputComment>();

    const registerComment = async (comment:MyComment) => {
          //axios에서 두번째 매개변수로 params를 사용하는것은 쿼리방식
          //url에 포함시키는것은 경로 파라미터
          const data = await axiosPostData<MyComment>({url:`/comment`,data:comment});
          console.log("axios comment 결과");
          console.log(data);
          return data;
    }

    //<Comment, Comment>를 줬는데도 CharacterData 라는 정체불명의 타입이 나온다는 건…
    //거의 100% Comment 라는 이름이 네이티브 DOM 타입(Comment = HTML 주석 노드) 과 충돌
    const registerMutation = useMutationReactQuery(
        ['comments'],
        registerComment
    );

    const insertClick = (inputContent:InputComment) => {
        console.log("등록완료");
        registerMutation.mutate({id:faker.number.int({ min: 1, max: 999 }), writer:'익명이', regDate:new Date(), content:inputContent.content});
        reset();
    } 

    {/**본격적 내용영역 */}
    return (
           
        <Box sx={{
            width: 700,
            height: 150,
            border : "1px solid gray",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        
        }}>
            <TextareaAutosize
                minRows={10}
                aria-label="maximum height"
                placeholder="댓글을 입력해주세요."
                {...register("content")}    
                style={{ width: 500,  resize: 'none', border:"1px solid gray" }}
            />
                <Button css = {CommentWriteButtonDivStyle} variant="contained" size="small" onClick={handleSubmit(insertClick)}> 등록 </Button>

        </Box>
    )
}

export default CommentWrite;
