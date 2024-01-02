import React, { FC } from 'react'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import 'react-quill/dist/quill.bubble.css';


interface Props{
    placeholder?:string;
    readonly?:boolean;
    onChange?:(val:string)=>void;
    value:string;
    id?:string;
}

const Editor:FC<Props> = ({onChange,value,readonly,placeholder,id}) =>  <ReactQuill id={id} placeholder={placeholder} readOnly={readonly} theme={readonly?'bubble':'snow'} value={value} onChange={onChange} />


export default Editor