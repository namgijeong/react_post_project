//제네릭 인터페이스
export interface AxiosRequest<T>{
    url:string;
    data:T;
}