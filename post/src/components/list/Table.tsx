import React from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import { makeGetRequestBaseAndExecuteAxios } from '../../axios/axiosHook';

import { useReactQuery } from '../../reactquery/reactqueryHook';

import { Post } from '../../interface/Post';

import { useGoDetailPost } from '../../router/routerHook';

const columns: GridColDef[] = [
   // `field`는 데이터 접근 시 이름
   // `headerName`은 테이블에 노출되는 컬럼명
   { field: 'id', headerName: '번호', width: 150 },
   { field: 'title', headerName: '제목', width: 150 },
   { field: 'writer', headerName: '작성자', width: 150 },
   { field: 'regDate', headerName: '작성일시', width: 150 },
   { field: 'readCount', headerName: '조회수', width: 150 },
   { field: 'likeCount', headerName: '좋아요수', width: 150 },
];

const paginationModel = { page: 0, pageSize: 20 };

function Table() {
   const requestPosts = async () => {
      // axios에서 두번째 매개변수로 params를 사용하는것은 쿼리방식
      // url에 포함시키는것은 경로 파라미터
      const data = await makeGetRequestBaseAndExecuteAxios<Array<Post>>('/posts');
      // console.log('axios 결과');
      // console.log(data);
      return data.responseData;
   };

   const { data } = useReactQuery<Array<Post> | null>(['posts'], requestPosts);

   // console.log('useQuery 사용');
   // console.log(data);
   // console.log(`isLoading : ${isLoading}`);
   // console.log(`isFetching : ${isFetching}`);
   // console.log(error);

   // 커스텀 훅에서 일반함수를 반환
   const go = useGoDetailPost();
   const goDetailClick = async (params: GridRowParams) => {
      const clickedId = params.id;
      // console.log(`클릭한 디테일 아이디: ${clickedId}`);
      await go(Number(clickedId));
   };

   return (
      // Paper => mui 컨테이너 컴포넌트 종이느낌
      // sx=> mui에서 스타일을 바로 작성할 수 있게 해주는 prop
      <Paper sx={{ height: 400, width: '70%', margin: 'auto' }}>
         <DataGrid
            rows={data || []}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            sx={{ border: 0 }}
            onRowClick={params => goDetailClick(params)}
         />
      </Paper>
   );
}

export default Table;
