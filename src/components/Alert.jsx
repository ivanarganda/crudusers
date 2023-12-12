import React from 'react'

export default function Alert(props) {
    
  const { msg } = props;

  return (
    msg !== null ? ( <div className='alert alert-danger'>
    <span>{msg}</span>
    </div> )
    : ('')
  )
}
