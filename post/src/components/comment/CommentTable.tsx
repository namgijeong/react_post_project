import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { makeGetRequestBaseAndExecuteAxios, makeDeleteRequestBaseAndExecuteAxios } from '../../axios/axiosHook';

import { useReactQuery, useMutationReactQuery } from '../../reactquery/reactqueryHook';

import useStore from '../../store/useStore';
import UserLevel from '../../enum/UserLevel';

import { MyComment } from '../../interface/MyComment';
import { Result } from '../../interface/Result';
import { DetailProps } from '../../interface/DetailProps';
import { CommentProps } from '../../interface/CommentProps';

// type TableRow = {
//    id: number;
//    writer: string;
//    regDate: string;
//    content: string;
// };

// let rows: TableRow[] = [];

const paginationModel = { page: 0, pageSize: 10 };

function CommentTable({ detailId }: DetailProps) {
   const requestComments = async () => {
      // axios에서 두번째 매개변수로 params를 사용하는것은 쿼리방식
      // url에 포함시키는것은 경로 파라미터
      const data = await makeGetRequestBaseAndExecuteAxios<Array<MyComment>>(`/comments/${detailId}`);
      // console.log('axios comments 결과');
      // console.log(data);
      return data.responseData;
   };

   const deleteComment = async (commentProps: CommentProps) => {
      // axios에서 두번째 매개변수로 params를 사용하는것은 쿼리방식
      // url에 포함시키는것은 경로 파라미터
      const data = await makeDeleteRequestBaseAndExecuteAxios<Result>(
         `/comment/${commentProps.postId}/${commentProps.id}`,
      );
      // console.log('axios comment 결과');
      // console.log(data);
      return data.responseData;
   };

   const { data } = useReactQuery<Array<MyComment> | null>(['comments'], requestComments);

   const deleteMutation = useMutationReactQuery<CommentProps, Result | null>(['comments'], deleteComment);

   // useEffect(() => {
   //   if (data) {
   //       setCommentsData(data);
   //       rows = data;

   //   }
   // },[data]);

   const level = useStore(state => state.level);

   // renderCell의 params 타입은 GridRenderCellParams
   const deleteClick = (params: GridRenderCellParams) => {
      const clickedId = Number(params.id);
      // console.log(`${clickedId}번 게시글 삭제`);
      // useQuery는 컴포넌트가 마운트되면서 자동으로 실행이되는 반면, useMutation은 함수를 직접 실행
      const commentProps: CommentProps = { postId: detailId, id: clickedId };
      deleteMutation.mutate(commentProps);
   };

   const columns: GridColDef[] = [
      // `field`는 데이터 접근 시 이름
      // `headerName`은 테이블에 노출되는 컬럼명
      { field: 'id', headerName: '번호', width: 150 },
      { field: 'writer', headerName: '작성자', width: 150 },
      { field: 'regDate', headerName: '작성일시', width: 150 },
      { field: 'content', headerName: '내용', width: 300 },

      // renderCell => (params: GridRenderCellParams<R, V, F>) => React.ReactNode
      // params => 셀과 행에 대한 모든 정보가 담긴 객체
      // React.ReactNode => 반환값은 React가 렌더할 수 있는 모든 것(요소, 문자열, 숫자, null 등)
      {
         field: 'delete',
         headerName: '삭제',
         width: 100,
         renderCell: params =>
            level === UserLevel.Admin ? (
               <Button variant="contained" size="small" onClick={() => deleteClick(params)}>
                  삭제
               </Button>
            ) : null,
      },
   ];

   // {/* //Paper => mui 컨테이너 컴포넌트 종이느낌
   // //sx=> mui에서 스타일을 바로 작성할 수 있게 해주는 prop */}
   return (
      <Paper sx={{ height: 400, width: 865, margin: 'auto' }}>
         <DataGrid
            rows={data || []}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            sx={{ border: 0 }}
         />
      </Paper>
   );
}

export default CommentTable;
