import React, {useEffect, useState} from "react";
import axios from 'axios';
import { AxiosRequest } from "../interface/AxiosRequest";
import { AxiosResponse } from "../interface/AxiosResponse";

//useQuery의 queryFn에서 쓰기 위해서는 훅으로 정의하고 쓰면 안된다고 한다.
//useQuery는 훅이지만 queryFn은 일반 함수
//따라서 useState와 useEffect를 뺀다.
export const axiosGetData = async <T>(request:AxiosRequest) =>{

    let responseData;
    
    const response = await axios.get(request.url);
    responseData = response.data;
    console.log("axios get responseData");
    console.log(responseData);

    return responseData;
}

export const axiosPutData = async <T>(request:AxiosRequest) =>{

    let responseData;
    
    const response = await axios.put(request.url);
    responseData = response.data;
    console.log("axios put responseData");
    console.log(responseData);

    return responseData;

}

export const axiosDeleteData = async <T>(request:AxiosRequest) =>{

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

