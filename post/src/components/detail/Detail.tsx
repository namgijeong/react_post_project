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

import axios from 'axios';
import { Post } from '../interface/Post';


const DetailDivStyle = css`
  margin-top: 100px;
  margin : auto;
  font-size: 20px;
  text-align: center;
 
`;


// const DetailDivStyle = css({
//   marginTop:"100px",
//   margin : "auto",
//   fontSize: "20px",
//   textAlign: "center",
 
// });

const TitleDivStyle50 = css`
    width: 50px;
    height: 100px;
    line-height:100px;
    
`

// const TitleDivStyle50 = css({
//     width: "50px",
//     height: "100px",
//     lineHeight:"100px",
//     border : "1px solid gray",
// })

const TitleDivStyle100 = css`
    width: 100px;
    height: 100px;
    line-height:100px;
   
`

// const TitleDivStyle100 = css({
//     width: "100px",
//     height: "100px",
//     lineHeight:"100px",
//     border : "1px solid gray",
// })


const TitleDivStyle200 = css`
    width: 200px;
    height: 100px;
    line-height:100px;
    
`

// const TitleDivStyle200 = css({
//     width: "200px",
//     height: "100px",
//     lineHeight:"100px",
//     border : "1px solid gray",
// })

const TitleDivStyle300 = css`
    width: 300px;
    height: 100px;
    line-height:100px;
   
`

// const TitleDivStyle300 = css({
//     width: "300px",
//     height: "100px",
//     lineHeight:"100px;
//     border : 1px solid gray;
// })

const rightDivBorder = css`
    border-right:1px solid gray;
`

const BorderBottomNone = css`
    border-bottom:none;
`

type DetailProps = {
  detailId: number | null;  
};



const requestPost = async(detailId:DetailProps) => {
    //axios에서 두번째 매개변수로 params를 사용하는것은 쿼리방식
    //url에 포함시키는것은 경로 파라미터로 매개변수 한개만 
    const response = await axios.get(`/findPostById/${detailId.detailId}`);
    console.log("axios 결과");
    console.log(response.data);
    return response.data;
}


//props를 받아올때는 {}
const Detail = ({detailId}:DetailProps) => {
    console.log("detailId : "+detailId);

    //여기서 AXIOS를 사용하여 데이터 전체를 가져오자 
    //requestPost({detailId});

    //useEffect는 해당 컴포넌트의 렌더링이 완료된 후에 실행되지만, useMemo는 렌더링 중에 실행
    //빈배열 => 의존하는 값이 없다. 최초 한 번만 실행
    //useMemo에 async 함수를 바로 넣으면 data는 Promise 객체가 돼서, data.number 같은 직접 접근이 안 되고 에러
    
    const [data,setData] = useState<Post| null>(null);
    const [like,setLike] = useState<number>(0);

    useEffect (() => {
        requestPost({detailId}).then(data => {
            setData(data);
            setLike(data.likeCount);
        });
    },[])


    const clickLikeButton = () => {
        setLike(like+1);
    }

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
                    {/* <Box sx={{
                        width: 50,
                        height: 100,
                        lineHeight:100,
                        border : "1px solid gray",
                        margin: "auto",
                        display: "flex",
                        alignItems: "center",
            
                    }}>번호</Box>
                    <Box sx={{
                        width: 50,
                        height: 100,
                        lineHeight:100,
                        border : "1px solid gray",
                        margin: "auto",
            
                    }}> 1 </Box> */}
                    <div css = {[TitleDivStyle50, rightDivBorder]}>번호</div>
                    <div css = {[TitleDivStyle50, rightDivBorder] }>{data ? data.id : '로딩중'}</div>

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
                    <div css = {[TitleDivStyle200, rightDivBorder]}>{data ? data.regDate : '로딩중'}</div>

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
                    <div css = {[TitleDivStyle50, rightDivBorder]}>{data ? data.readCount : '로딩중'}</div>

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
                    <div css = {[TitleDivStyle300, rightDivBorder]}>{data ? data.title : '로딩중'}</div>
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
                    <div css = {TitleDivStyle200}>{data ? data.writer : '로딩중'}</div>
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
                    value={data ? data.content : '로딩중'}
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
                justifyContent: "flex-end",
            
            }}>
                <Button sx={{width:150, height:50}} variant="contained" onClick = {() => {clickLikeButton();}}>좋아요 누르기</Button>
            </Box>
           
        </div>
    );
}

export default Detail;
