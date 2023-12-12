import React from 'react'

const styleModal = ()=>{

    return {
        position:'absolute',
        margin:'auto',
        translate:'50%',
        zIndex:'1',
        width:'30%',
        background:'white',
        boxShadow:'0 0 0.08rem 0 grey',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        padding:'2rem 2rem'};

} 

export default function Modal(props) {

  const { content , openModalFormCreateUser } = props;

  return (
    <div style={styleModal()}>
        <div className='btn btn-info bg-info' style={{position:'absolute',top:'0',right:'50px',color:'white'}}>___</div>
        <div 
          className='btn-close btn btn-danger bg-danger' 
          style={{position:'absolute',top:'0',right:'0',padding:'0.7rem',color:'white'}}
          onClick={()=>{openModalFormCreateUser(false)}}
          ></div>
        {content} 
    </div>
  )
}
