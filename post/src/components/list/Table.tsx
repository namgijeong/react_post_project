import React, {useEffect, useMemo, useState} from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import axios from 'axios';
import { Post } from '../interface/Post';

type TableRow = {
  "id" :number,
  "title": string,
  "writer": string,
  "regDate": string,
  "readCount" :number,
  "likeCount" :number,
}

const requestPosts = async() => {
    //axios에서 두번째 매개변수로 params를 사용하는것은 쿼리방식
    //url에 포함시키는것은 경로 파라미터로 매개변수 한개만 
    const response = await axios.get("/findPosts");
    console.log("axios 결과");
    console.log(response.data);
    return response.data;
}

// let rows: TableRow[] = [
//   {"id":1, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":2, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":3, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":4, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":5, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":6, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":7, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":8, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":9, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":10, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":11, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":12, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":13, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":14, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":15, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":16, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":17, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":18, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":19, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":20, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":21, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
//   {"id":22, "title":"test1", "writer": "jinseong", "regDate":"2025-08-11", "readCount":1, "likeCount":10, },
  
// ]

let rows:TableRow[] = [];

const columns: GridColDef[] = [
        //`field`는 데이터 접근 시 이름
        //`headerName`은 테이블에 노출되는 컬럼명
        {field: 'id', headerName: '번호', width: 150},
        {field: 'title', headerName: '제목', width: 150},
        {field: 'writer', headerName: '작성자', width: 150},
        {field: 'regDate', headerName: '작성일시', width: 150},
        {field: 'readCount', headerName: '조회수', width: 150},
        {field: 'likeCount', headerName: '좋아요수', width: 150},
 ];

const paginationModel = { page: 0, pageSize: 20 };

const goDetailClick = (params: GridRowParams) => {
  const clickedId = params.id;
  console.log("클릭한 디테일 아이디: "+clickedId);
  window.location.href = "/detail/"+clickedId;
}



const Table = () => {

  const [data,setData] = useState<Post| null>(null);

    useEffect (() => {
        requestPosts().then(data => {
            setData(data);
            rows = data;
        });
    },[])

    return (
        //Paper => mui 컨테이너 컴포넌트 종이느낌
        //sx=> mui에서 스타일을 바로 작성할 수 있게 해주는 prop
      <Paper sx={{ height: 400, width: '70%', margin: 'auto',}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        sx={{ border: 0 }}
        onRowClick = {(params) => goDetailClick(params)} 
      />
    </Paper>
    );
}

export default Table;
