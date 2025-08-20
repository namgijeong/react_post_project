// 제네릭 인터페이스
// 브라우저 환경에서 TypeScript는 DOM 타입 정의(lib.dom.d.ts)를 자동으로 로드합
// Response라고 하면 충돌
export interface AxiosResponse<T> {
    data : T
}
