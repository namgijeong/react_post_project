import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ResponseBase } from '../interface/ResponseBase';
import { AxiosError } from 'axios';



//Function이라고 하면 매개변수 개수, 타입, 반환값에 관계없이 아무 함수나 들어올 수 있다
//useQuery => 조회 
export const useReactQuery = <T> (key:Array<string>, execute:() => Promise<T>) => {

    //useQuery는 훅이므로 컴포넌트나 커스텀 훅에서만 호출 가능
    //TQueryFnData => queryFn의 리턴 값, TError => queryFn의 에러 형식, TData => data에 담기는 실질적 타입, TQueryKey => query key

    //useQuery에서 타입 제네릭으로 주는 건 Promise<T>가 아니라, T 즉, Promise가 resolve된 값
    const {data, isLoading, isFetching, error} = useQuery<T, AxiosError, T, string[]>({
    //const {data} = useQuery<ResponseBase<T>>({
        queryKey: key ,
        //queryFn 타입은 () => Promise<T> 또는 () => T를 허용
        queryFn:  () => execute(),
    })

    return {data, isLoading, isFetching, error};
}


//mutation을 써서 수정메서드를 실행시키자마자, 조회메서드가 실행되도록 
//데이터가 update가 되면(데이터가 변한다면: 생성 및 삭제 및 수정), 쿼리 키 값을 사용해서 무효화시킴으로써, 
//데이터를 최신화
//mutationFn이 **정확하게 () => Promise<T>**를 기대
export const useMutationReactQuery = <V,T>(key:Array<string>, execute: (variables:V) => Promise<T>) => {
    const queryClient = useQueryClient();
    //TData => mutationFn의 실행결과 타입 , TError => mutationFn의 실행결과 error 타입,  TVariables=> mutationFn의 인자 타입, mutationFn을 실행하기 전에 수행하는 onMutate의 return 타입 
    //react-query는 이 Promise를 await 해서 해결된 값을 TData로 간주
    const mutation = useMutation<T, AxiosError, V>({
        mutationFn: (variables:V) => execute(variables),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: key});
        },
    })

    return mutation;

}