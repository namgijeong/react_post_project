import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';

const CommentWriteDivStyle = css`
  margin-top: 100px;
  margin : auto;
  font-size: 20px;
  text-align: center;
 
`;

const CommentWriteButtonDivStyle = css`
    margin-left:10px;
`

const insertClick = () => {
    console.log("등록완료");
}

const CommentWrite = () => {
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
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua."
                style={{ width: 500,  resize: 'none', border:"1px solid gray" }}
            />
                <Button css = {CommentWriteButtonDivStyle} variant="contained" size="small" onClick={() => insertClick()}> 등록 </Button>

        </Box>
    )
}

export default CommentWrite;
