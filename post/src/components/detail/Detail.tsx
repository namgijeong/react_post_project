import React, {useEffect, useMemo, useState} from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';


/**cx를 쓰는 이유는 여러가지 css를 합치기위해서 */
//css()는 호출하면 바로 className 문자열을 반환
//cx()는 클래스명 문자열을 합치는 함수
//css``...`` =>  SerializedStyles라는 내부 객체 형태로 변환해서 충돌
//import { cx } from '@emotion/css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import { DetailProps } from '../../interface/DetailProps';
import { Post } from '../../interface/Post';
import {LikeVariables} from '../../interface/LikeVariables';
import {ReadVariables} from '../../interface/ReadVariables';
import { InputPost } from '../../interface/InputPost';

import axios from 'axios';
import { axiosGetData, axiosPutData, axiosDeleteData } from '../../axios/axiosHook';

import { useQuery } from '@tanstack/react-query';
import { useReactQuery, useMutationReactQuery } from '../../reactquery/reactqueryHook';

import useStore from '../../store/useStore';
import { Level } from '../../interface/Level';
import { UserLevel } from '../../enum/UserLevel';

import { useGoUpdatePost, useGoListPost } from '../../router/routerHook';

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



//props를 받아올때 {} => props 객체에서 구조분해 할당문법
const Detail = ({detailId}:DetailProps) => {
    console.log("detailId : "+detailId);

    //여기서 AXIOS를 사용하여 데이터 전체를 가져오자 

    //useEffect는 해당 컴포넌트의 렌더링이 완료된 후에 실행되지만, useMemo는 렌더링 중에 실행
    //빈배열 => 의존하는 값이 없다. 최초 한 번만 실행
    //useMemo에 async 함수를 바로 넣으면 data는 Promise 객체가 돼서, data.number 같은 직접 접근이 안 되고 에러
    
    //React는 Virtual DOM 비교(diffing)를 할 때 상태 객체의 참조가 달라졌는지 먼저 봄
    //깊은 객체 구조에서는 ... 스프레드 연산자로 변경된 경로와 그 부모 객체들을 새로 만들어줘야 참조가 바뀜
    //const [postData, setPostData] = useState<Post>();
    const [alreadyIncreased, setAlreadyIncreased] = useState(false);
    const [id,setId] = useState<number>(0);
    const [like,setLike] = useState<number>(0);
    const [read,setRead] = useState<number>(0);
    const [content,setContent] = useState<string>('');
    const [title,setTitle] = useState<string>('');
    const [writer,setWriter] = useState<string>('');
    const [date,setDate] = useState<string>('');
    let readCount = 0;

    let level = useStore((state) => state.level);
    let changeLevel = useStore((state) => state.changeLevel);

    const requestPost = async (detailId:number) => {

        //axios에서 두번째 매개변수로 params를 사용하는것은 쿼리방식
        //url에 포함시키는것은 경로 파라미터
        const data = await axiosGetData<string>({url:`/post/${detailId}`, data:""});
        console.log("request post axios 결과");
        console.log(data);
        return data;
    }


    //객체 구조분해(destructuring) + 타입 지정
    const requestUpdateLike = async ({ detailId, like }: LikeVariables) => {
    
        //axios에서 두번째 매개변수로 params를 사용하는것은 쿼리방식
        //url에 포함시키는것은 경로 파라미터로 매개변수 한개만 

        console.log("detailId: " , detailId);
        console.log("like: " , like);
        const data = await axiosPutData<string>({url:`/like/${detailId}/${like}`, data:""});
        console.log("update like axios 수행");
        return data;
    }

    const requestUpdateRead = async ({detailId, read}: ReadVariables) => {
    
        //axios에서 두번째 매개변수로 params를 사용하는것은 쿼리방식
        //url에 포함시키는것은 경로 파라미터로 매개변수 한개만 

        const data = await axiosPutData<string>({url:`/read/${detailId}/${read}`, data:""});
        console.log("update read axios 수행");
        return data;
    }

    const requestDeletePost = async (detailId:number) => {
    
        //axios에서 두번째 매개변수로 params를 사용하는것은 쿼리방식
        //url에 포함시키는것은 경로 파라미터로 매개변수 한개만 

        const data = await axiosDeleteData<string>({url:`/post/${detailId}`, data:""});
        console.log("delete post axios 수행");
        return data;
    }

    const {data, isLoading, isFetching, error} = useReactQuery(
        ['post', `${detailId}`], () => requestPost(detailId)
    );
    
    const likeMutation = useMutationReactQuery(
        ['post',  `${detailId}`],
        requestUpdateLike
    );

    const readMutation = useMutationReactQuery(
        ['post',  `${detailId}`],
        requestUpdateRead
    );

    const deleteMutation = useMutationReactQuery(
        ['post',  `${detailId}`],
        requestDeletePost
    );

    const clickLikeButton = () => {
        //number는 원시 타입(primitive type)
        //새 값을 계산하면 원래 값과 참조가 완전히 달라짐
        let newLike = like +1;
        setLike(newLike);
        
        //useQuery는 컴포넌트가 마운트되면서 자동으로 실행이되는 반면, useMutation은 함수를 직접 실행
        likeMutation.mutate({detailId: detailId , like: newLike});
        
    }
    
    //커스텀 훅에서 일반함수를 반환 
    let goUpdate = useGoUpdatePost();
    let goList = useGoListPost();

    const clickUpdateButton = () => {
        let postData:InputPost = {title:title, writer:writer, content:content};
        goUpdate(detailId,postData);
    }

    const clickDeleteButton = () => {
        deleteMutation.mutate(detailId);
        goList();
    }

    
    useEffect(() => {
        console.log("useEffect data에 들어옴");
        if (data) {
            console.log("if data안에 들어옴");
            //setPostData(data);
            setId(data.id);
            setLike(data.likeCount);
            setRead(data.readCount);
            readCount = data.readCount;
            setContent(data.content);
            setTitle(data.title);
            setWriter(data.writer);
            setDate(data.regDate);

            console.log("첫 useEffect 렌더링시 값들");
            console.log(data);
            console.log(data.likeCount);
            console.log(data.readCount+1);
            console.log(read);
            console.log(data.content);
            console.log(data.title);
            console.log(data.writer);
            console.log(data.regDate);
        }
    }, [data]);


    useEffect (() => {
        console.log("useEffect read에 들어옴");
        if (!data) return; // 데이터가 준비되지 않았으면 실행하지 않음
        if (alreadyIncreased) return; // 이미 증가시켰으면 다시 실행하지 않음
        
        //TypeScript의 "Optional Chaining" 문법
        //처음 불러온 초기상태랑 값이 같으면 또 자동동작하지 않도록
        // if (postData?.readCount == undefined) return;
        // if (read == postData?.readCount) return;
        let readPlus = readCount + 1 ;
        setRead(readPlus+1);
        setAlreadyIncreased(true);
        readMutation.mutate({detailId: detailId , read: readPlus});
    },[data, alreadyIncreased]);


    return (
        <div css = {DetailDivStyle} >
            <Box sx={{
                width: 700,
                height: 100,
                border : "1px solid gray",
                borderBottom : "none",
                margin: "auto",
                display: "flex",
                alignItems: "center",
            
            }}>
                 {/**번호 영역*/}
                <Box sx={{
                    width: 100,
                    height: 100,
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
            
                }}> 
                    
                    <div css = {[TitleDivStyle50, rightDivBorder]}>번호</div>
                    {/* id 상태는 숫자 0으로 초기화돼서, <div>{id}</div>는 항상 보임.
                    그래서 id는 바로 렌더링 가능하고, postData?.id나 data?.id는 데이터가 들어오기 전에는 안 보이는 것처럼 보임 */}
                    <div css = {[TitleDivStyle50, rightDivBorder] }>{id}</div>

                </Box>
                
                {/**작성일시 영역*/}
                <Box sx={{
                    width: 300,
                    height: 100,
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
            
                }}>

                    <div css = {[TitleDivStyle100, rightDivBorder]}>작성일시</div>
                    <div css = {[TitleDivStyle200, rightDivBorder,smallFontSize]}>{date}</div>

                </Box>

                {/**조회수*/}
                <Box sx={{
                    width: 150,
                    height: 100,
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
            
                }}>
                    
                    <div css = {[TitleDivStyle100, rightDivBorder]}>조회수</div>
                    <div css = {[TitleDivStyle50, rightDivBorder]}>{read}</div>

                </Box>

                {/**좋아요 수*/}
                <Box sx={{
                    width: 150,
                    height: 100,
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
            
                }}>

                    <div css = {[TitleDivStyle100, rightDivBorder]}>좋아요 수</div>
                    <div css = {TitleDivStyle50}>{like}</div>
                </Box>

            </Box>


            <Box sx={{
                width: 700,
                height: 100,
                border : "1px solid gray",
                borderBottom : "none",
                margin: "auto",
                display: "flex",
                alignItems: "center",
            
            }}>

                {/**제목 영역*/}
                <Box sx={{
                    width: 400,
                    height: 100,
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
            
                }}>
                    <div css = {[TitleDivStyle100, rightDivBorder]}>제목</div>
                    <div css = {[TitleDivStyle300, rightDivBorder]}>{title}</div>
                </Box>

                {/**작성자 영역*/}
                <Box sx={{
                    width: 300,
                    height: 100,
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
            
                }}>
                    <div css = {[TitleDivStyle100,rightDivBorder]}>작성자</div>
                    <div css = {TitleDivStyle200}>{writer}</div>
                </Box>
            </Box>


            {/**본격적 내용영역 */}
            <Box sx={{
                width: 700,
                height: 300,
                border : "1px solid gray",
                borderBottom : "none",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
            
            }}>
                <TextareaAutosize
                    readOnly
                    minRows={21}
                    aria-label="maximum height"
                    placeholder="글의 본문내용이 여기에 표시되었습니다. 안녕하세요."
                    value={content}
                    style={{ width: 700,  resize: 'none', border:"none" }}
                />
            </Box>

            {/**좋아요 버튼 구역*/}
             <Box sx={{
                width: 700,
                height: 50,
                border : "1px solid gray",
                borderTop : "none",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
            
            }}>
                {level == UserLevel.Admin ? ( 
                    <>
                     <Button sx={{width:150, height:50}} variant="contained" onClick = {() => {clickUpdateButton();}}>수정하기</Button>
                     <Button sx={{width:150, height:50}} variant="contained" onClick = {() => {clickDeleteButton();}}>삭제하기</Button> 
                    </>
                ) :  null
                    
                }
               
                
                <Button sx={{width:150, height:50}} variant="contained" onClick = {() => {clickLikeButton();}}>좋아요 누르기</Button>
            </Box>
           
        </div>
    );
}

export default Detail;
