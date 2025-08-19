import React, {useEffect, useState} from "react";
import axios from 'axios';
import { AxiosRequest } from "../interface/AxiosRequest";
import { AxiosResponse } from "../interface/AxiosResponse";
import { RequestBase } from "../interface/RequestBase";
import { ResponseBase } from "../interface/ResponseBase";


//useQuery의 queryFn에서 쓰기 위해서는 훅으로 정의하고 쓰면 안된다고 한다.
//useQuery는 훅이지만 queryFn은 일반 함수
//따라서 useState와 useEffect를 뺀다.

//async 함수에서는 Promise 타입을 리턴해야함
export const makeAxiosAndGetData = async <T,V>(request : RequestBase<T>):Promise<ResponseBase<V>> => {

    let responseData:ResponseBase<V> = {responseData: null, isSuccess:false};

    //조건에 따라 객체를 재조립하기 
    //...(includeA && { a : 3 })
    //&&연산자의 경우 앞에 조건들이 참일 경우 마지막에 있는 값이 할당되는 특징
    // /따라서 includeA가 true 이면 { a : 3 } 이 값이 되고 spread 연산자에 의해 풀어진 후 객체에 들어가게 되는 로직
    try{
        const response = await axios({
            method: request.method,
            url: request.url,
            responseType: request.responseType,

            ... ("bodyData" in request && { data: request.bodyData}),

            ... ("params" in request && { params: request.params}),

    
        })
        responseData.responseData = response.data;
        responseData.isSuccess = true;
    } catch (error) {
         console.log("axios error");
        console.log(error);
        responseData.isSuccess = false;
        responseData.errorMessage = '' + error;
    }

    // .then(function (response) {
    //     //response.data가 json에서 받은 데이터 
    //     responseData.responseData = response.data;
    //     responseData.isSuccess = true;
    // })
    // .catch(function (error) {
    //     // 에러 핸들링
    //     console.log("axios error");
    //     console.log(error);
    //     responseData.isSuccess = false;
    //     responseData.errorMessage = '' + error;
    // })
    // .finally(function () {
    //     // 항상 실행되는 영역
    //     console.log("axios finally 영역");
       
    // });

     return responseData;
}


export const makeGetRequestBaseAndExecuteAxios = async <V>(url:string):Promise<ResponseBase<V>> => {
    //이게  RequestBase<T>
   const requestBase:RequestBase<null> =  {url:url, method: 'get',  responseType : 'json'};

   //타입 단언을 해줘야 unknown이라고 뜨지 않음 
   const responseData = makeAxiosAndGetData(requestBase) as Promise<ResponseBase<V>>;

   return responseData;

}


export const makePostRequestBaseAndExecuteAxios = async <T,V>(url:string , bodyData : T ):Promise<ResponseBase<V>> => {
    //이게  RequestBase<T>
   const requestBase:RequestBase<T> =  {url:url, method: 'post', bodyData: bodyData , responseType : 'json'};

   //타입 단언을 해줘야 unknown이라고 뜨지 않음 
   const responseData = makeAxiosAndGetData(requestBase) as Promise<ResponseBase<V>>;

   return responseData;

}

export const makePutRequestBaseAndExecuteAxios = async <T,V>(url:string , bodyData : T ):Promise<ResponseBase<V>> => {
    //이게  RequestBase<T>
   const requestBase:RequestBase<T> =  {url:url, method: 'put', bodyData: bodyData , responseType : 'json'};

   //타입 단언을 해줘야 unknown이라고 뜨지 않음 
   const responseData = makeAxiosAndGetData(requestBase) as Promise<ResponseBase<V>>;

   return responseData;

}

export const makeDeleteRequestBaseAndExecuteAxios = async <V>(url:string):Promise<ResponseBase<V>> => {
    //이게  RequestBase<T>
   const requestBase:RequestBase<null> =  {url:url, method: 'delete',  responseType : 'json'};

   //타입 단언을 해줘야 unknown이라고 뜨지 않음 
   const responseData = makeAxiosAndGetData(requestBase) as Promise<ResponseBase<V>>;

   return responseData;

}








export const axiosGetData = async <T>(request:AxiosRequest<T>) =>{

    let responseData;
    
    const response = await axios.get(request.url);
    responseData = response.data;
    console.log("axios get responseData");
    console.log(responseData);

    return responseData;
}

export const axiosPostData = async <T>(request:AxiosRequest<T>) =>{

    let responseData;
    
    const response = await axios.post(request.url, request.data);
    responseData = response.data;
    console.log("axios post responseData");
    console.log(responseData);

    return responseData;
}

export const axiosPutData = async <T>(request:AxiosRequest<T>) =>{

    let responseData;
    
    const response = await axios.put(request.url);
    responseData = response.data;
    console.log("axios put responseData");
    console.log(responseData);

    return responseData;

}

export const axiosPutDataWithBody = async <T>(request:AxiosRequest<T>) =>{

    let responseData;
    
    const response = await axios.put(request.url, request.data);
    responseData = response.data;
    console.log("axios put responseData");
    console.log(responseData);

    return responseData;

}

export const axiosDeleteData = async <T>(request:AxiosRequest<T>) =>{

    let responseData;
    
    const response = await axios.delete(request.url);
    responseData = response.data;
    console.log("axios delete responseData");
    console.log(responseData);

    return responseData;

}

//훅안에서 제네릭을 쓸려면 훅 자체도 제네릭이어야함

// export const useAxiosGetData = <T>(request:AxiosRequest) =>{

//     const [responseData, setResponseData] = useState<AxiosResponse<T>>();
//     useEffect(() => {
//         const getAxios = async() => {
//             const response = await axios.get(request.url);
//             setResponseData(response.data);
//             console.log("axios responseData");
//             console.log(responseData);
//         }
        
//         getAxios();
//     },[request.url]);

//     return responseData;
// }

// export const useAxiosPutData = <T>(request:AxiosRequest) =>{

//     const [responseData, setResponseData] = useState<AxiosResponse<T>>();
//     useEffect(() => {
//         const putAxios = async() => {
//             const response = await axios.put(request.url);
//             setResponseData(response.data);
//             console.log("axios responseData");
//             console.log(responseData);
//         }
        
//         putAxios();
//     },[request.url]);

//     return responseData;
// }

