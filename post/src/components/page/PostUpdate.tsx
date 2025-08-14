import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

import { DetailProps } from '../interface/DetailProps';
import {useParams} from 'react-router-dom';


function PostUpdate(){

     //객체 구조분해
    const {id} = useParams();
    const  detailId = id ? parseInt(id, 10) : null;
    return (
        <div >
            <h1>PostUpdate</h1>
              
        </div>
    );
}

export default PostUpdate;