import React from 'react';
import useRouter from '../../router/useRouter';
import Detail from '../detail/Detail';
import Comment from '../comment/Comment';

function PostDetail() {
   // 객체 구조분해
   const { params } = useRouter();
   const detailId = params.id ? parseInt(params.id, 10) : null;

   if (detailId == null) {
      return (
         <div>
            <h1>해당 게시글이 존재하지 않습니다.</h1>
         </div>
      );
   }
   return (
      <div>
         <h1>Postdetail</h1>
         <h3>{detailId}번 게시글입니다.</h3>

         {/** 포스트의 상세정보 */}
         <Detail detailId={detailId} />

         {/** 코멘트 영역 */}
         <Comment detailId={detailId} />
      </div>
   );
}

export default PostDetail;
