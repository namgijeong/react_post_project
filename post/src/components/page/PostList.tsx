import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Button from '@mui/material/Button';
import Table from '../list/Table';

import useRouter from '../../router/useRouter';

const tableDivStyle = css`
  margin-top:100px;

  font-size: 24px;
  text-align: center;
  &:hover {
    color: white;
  }

`

const buttonDivStyle = css`
  margin-top:50px;
`

const PostList = () => {

  //커스텀 훅에서 일반함수를 반환 
  const {goToWritePost} = useRouter();
  const goWriteClick = () => {
     goToWritePost();
  }

  return (
    <div>
       {/* 여기 테이블이 들어감 */}
      <div css = {tableDivStyle}>
        <Table/>
      </div>

      <div css = {buttonDivStyle}>
        {/* // 리액트 엘리먼트에서 이벤트 속성 작성 시 카멜케이스로 작성하며
        // 속성 값은 문자열이 아닌 표현식을 이용해 함수로 이벤트 핸들러를 전달한다. */}
        {/* //onClick={alert(name)} (다른 예시: onClick={handleIncrease()} 등)와 같이 진행하게 된다면, 리턴 값이 onClick으로 전달되어서 함수 자체가 전달되는 것이 아니라, 함수의 결괏값이 전달된다.
        //{} 안에 함수를 정의(그 안의 함수는 호출)하거나 함수 자체를 전달*/}
        <Button variant="contained" onClick = {() => {goWriteClick()}}>작성하기</Button>
      </div>
    </div>
   
  );
}

export default PostList;
