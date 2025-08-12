import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { GridRowId } from '@mui/x-data-grid';

type TableRow = {
  "id" :number,
  "writer": string,
  "regDate": string,
  "content": string,
}

const rows: TableRow[] = [
  {"id":1, "writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.", },
  {"id":2, "writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.", },
  {"id":3, "writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.", },
  {"id":4, "writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.", },
  {"id":5, "writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.",},
  {"id":6, "writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.", },
  {"id":7, "writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.", },
  {"id":8, "writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.", },
  {"id":9, "writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.",},
  {"id":10,"writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.", },
  {"id":11,"writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.",},
  {"id":12,"writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.", },
  {"id":13,"writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.", },
  {"id":14,"writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.",},
  {"id":15, "writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.", },
  {"id":16, "writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.",},
  {"id":17, "writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.",},
  {"id":18, "writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.", },
  {"id":19, "writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.",},
  {"id":20, "writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.",},
  {"id":21, "writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.", },
  {"id":22, "writer": "jinseong", "regDate":"2025-08-11", "content":"안녕하세요.",},
  
]

const columns: GridColDef[] = [
        //`field`는 데이터 접근 시 이름
        //`headerName`은 테이블에 노출되는 컬럼명
        {field: 'id', headerName: '번호', width: 150},
        {field: 'writer', headerName: '작성자', width: 150},
        {field: 'regDate', headerName: '작성일시', width: 150},
        {field: 'content', headerName: '안녕하세요', width: 300},

        //renderCell => (params: GridRenderCellParams<R, V, F>) => React.ReactNode
        //params => 셀과 행에 대한 모든 정보가 담긴 객체
        //React.ReactNode => 반환값은 React가 렌더할 수 있는 모든 것(요소, 문자열, 숫자, null 등)
        {
          field: "delete",
          headerName: "삭제",
          width: 100,
          renderCell: (params) => (
            <Button
              variant="contained"
              size="small"
              onClick={() => deleteClick(params.id)}
            >
              삭제
            </Button>
          ),
        },
 ];

const paginationModel = { page: 0, pageSize: 10 };

//params.id => MUI DataGrid의 GridRowId 타입
const deleteClick = (id:GridRowId) => {
  console.log(`${id}번 게시글 삭제`);
}

const CommentTable = () => {

  // {/* //Paper => mui 컨테이너 컴포넌트 종이느낌
  // //sx=> mui에서 스타일을 바로 작성할 수 있게 해주는 prop */}
  return (
        
    <Paper sx={{ height: 400, width: 865, margin: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        sx={{ border: 0 }}
      />
  </Paper>
      
  );
}

export default CommentTable;
