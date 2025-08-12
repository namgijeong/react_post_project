import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import CommentTable from "./CommentTable";
import CommentWrite from './CommentWrite';

const CommentWriteDivStyle = css`
  margin-top: 50px !important;
  margin : auto;
  font-size: 20px;
  text-align: center;
 
`;

const CommentTableDivStyle = css`
  margin-top: 50px !important;
  margin : auto;
  font-size: 20px;
  text-align: center;
 
`;

const Comment = () => {
    return (
        <div>
            {/**코멘트 작성하기 칸 */}
            <div css ={CommentWriteDivStyle}>
                <CommentWrite/>
            </div>
            
            {/**코멘트 리스트와 각 코멘트별로 삭제버튼 */}
            <div css={CommentTableDivStyle}>
                <CommentTable/>
            </div>
           
        </div>
    )
}

export default Comment;
