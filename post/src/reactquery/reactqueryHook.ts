import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query'



//Function이라고 하면 매개변수 개수, 타입, 반환값에 관계없이 아무 함수나 들어올 수 있다
//useQuery => 조회 
export const useReactQuery = (key:Array<string>, execute:Function) => {

    //useQuery는 훅이므로 컴포넌트나 커스텀 훅에서만 호출 가능
    const {data, isLoading, isFetching, error} = useQuery({
        queryKey: key ,
        //queryFn 타입은 () => Promise<T> 또는 () => T를 허용
        queryFn: () => execute(),
    })

    return {data, isLoading, isFetching, error};
}


//mutation을 써서 수정메서드를 실행시키자마자, 조회메서드가 실행되도록 
//데이터가 update가 되면(데이터가 변한다면: 생성 및 삭제 및 수정), 쿼리 키 값을 사용해서 무효화시킴으로써, 
//데이터를 최신화
//mutationFn이 **정확하게 () => Promise<T>**를 기대
export const useMutationReactQuery = <T,V>(key:Array<string>, execute: (variables: V) => Promise<T>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (variables:V) => execute(variables),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: key});
        },
    })

    return mutation;

}