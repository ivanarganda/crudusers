import React from 'react'
import Alert from './Alert';

export default function NoConnection(props){

    const { msg } = props;

    return (

       <Alert msg={msg}/>

    )

}