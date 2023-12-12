import ValidationForm from './ValidationForm';
import { React } from 'react';

export default function FormCreateUsers(props) {

  const { msgError , handleFormSubmit , handleInputChange } = props;

  return (

    <div style={{
        width:'80%',display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'}} 
        className='w-60'>

        <h3 className='text-center'>Create User</h3>

        <div style={{ width:'80%' , marginBottom:'1rem' }}>{ <ValidationForm msg={msgError} /> }</div>

        <form className='form form-group' style={{ width:'80%' }} onSubmit={handleFormSubmit}>
            <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleInputChange}  
            className='form-control'         
            />
            <br />
            <br />
            <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleInputChange}   
            className='form-control'       
            />
            <br />
            <br />
            <input
            type="submit"
            value="Create user"
            className='btn btn-success'
            />
        </form>
    </div>
        
  )
}
