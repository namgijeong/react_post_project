// 제네릭 인터페이스
// 브라우저 환경에서 TypeScript는 DOM 타입 정의(lib.dom.d.ts)를 자동으로 로드합
// Response라고 하면 충돌
export interface ResponseBase<T> {
    // 원하는 응답 데이터
    responseData : T | null;
    // 성공했는가
    isSuccess : boolean;

    // 메시지는 있을수도, 없을수도
    successMessage ?: string;
    errorMessage ?: string;
}
