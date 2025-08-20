// 제네릭 인터페이스
type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream';

export interface RequestBase<T>{
    url : string;

    // get,post,put,delete
    method: string;

    // 쿼리스트링을 쓴다면
    params ?: T;

    // body에 데이터를 담는다면
    bodyData ?: T;

    // 기본적으로 json
    // 이때 type string을 주고 직접 'json'쓰려 했더니 에러
    responseType : ResponseType;
}
