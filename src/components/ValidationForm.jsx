import React from 'react'
import Alert from './Alert';

export default function validationForm( props ) {

    const { msg } = props;

    return (

       <Alert msg={msg}/>

    )

}
