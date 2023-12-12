import React from 'react'
import NoConnection from './NoConnection'
export default function ListUsers( props ) {

  const { noConnection , users , openModalFormCreateUser , blurEditUser , deleteUser , handleEditUser , handleInputEditChange , handleFormSubmitUpdate , EditUser , userIdEdit } = props;
  
  const styleList = ()=>{

    return {boxShadow:'0 0.01rem 0 0 grey', margin:'0.6rem 0.2rem' , padding:'0.2rem 0.5rem' , listStyle:'none' };

  }

  return (
    <div style={{ width:'50%',marginBottom:'1rem',display:'flex',flexDirection:'column',justifyContent:'center',margin:'auto'}}>
        { <NoConnection msg={noConnection ? 'Error in db conection server' : null } /> }
        <div style={{ width:'60%',marginBottom:'2rem',display:'flex',flexDirection:'row',justifyContent:'space-around' }}>
            <h2 >List of users</h2>
            <input type='button' className='btn btn-success' value={'Add user'} onClick={()=>{openModalFormCreateUser(true)}}/>
        </div>
        <ul className='list list-group'>
        {users.length === 0 ? (
            <li className='text-center' style={styleList()}><h5>There are no users</h5></li>
        ) : (
            users.map((user) => (
            EditUser && userIdEdit === user.idUser ?
                (<li className='list list-group-item' key={user.idUser}>
                    <form onSubmit={handleFormSubmitUpdate} style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-around'}} className='form form-group'>
                    <input
                        type="hidden"
                        name='id_user'
                        defaultValue={user.idUser}
                    />
                    <input
                        type='text'
                        name='username'
                        defaultValue={user.username}
                        onChange={handleInputEditChange}
                        autoFocus={true}
                        onClick={blurEditUser}
                        className='form form-control'
                        style={{width:'50%'}}
                    />
                    <input
                        type="submit"
                        value="Update"
                        style={{width:'20%'}}
                        className='btn btn-success'
                    />
                    <input
                        type="button"
                        value="Delete"
                        onClick={deleteUser}
                        style={{width:'20%'}}
                        className='btn btn-danger'
                    />
                    </form>
                </li>)
                :
                (<li style={styleList()} onClick={handleEditUser} id={user.idUser} key={user.idUser}>{user.username}</li>)
            ))
        )}
        </ul>
    </div>
  )
}
