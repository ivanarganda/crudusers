import React, { useEffect, useState , useCallback, useMemo } from 'react';
import FormCreateUsers from './FormCreateUsers';
import ListUsers from './ListUsers';
import Modal from './Modal';
import Pagination from './Pagination';

export default function CrudSPAPHP() {
  const [users, setUsers] = useState([]);
  const [noConnection, setNoConnection] = useState(false);
  const [form, setForm] = useState({});
  const [userIdEdit, setUserIdEdit] = useState(0);
  const [EditUser, setEditUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);

  const URL_WS_CRUD = `${window.location.protocol}//${window.location.hostname}/ws-users/`
  const [msgError, setMsgError] = useState(null);
  const [modalForm, setModalForm] = useState(false);
  var [currentPage,setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(null);
  const [perPage,setPerPage] = useState(5);


  // In this case it is neccesary to check db conection each component rendering
  // setInterval(() => {
  //   fetch(URL_WS_CRUD + 'checkConectionDB.php')
  //     .then((res) => (res.ok ? res.json() : Promise.reject(res))) 
  //     .then((data) => {
  //       console.log(data);
  //       if (data === 'noConection') {
  //         setNoConnection(true);
  //       } else {
  //         setNoConnection(false);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error.name);
  //       if (error.name === 'TypeError') {
  //         // Handle a TypeError
  //         setNoConnection(true);
  //       }
  //     });
  // }, 1000);

  const loadPages = useMemo(()=>{

    let pages = [];

    for (let page = 1; page <= totalPages; page++) {

        pages.push(page);

    }

    return pages;

  },[ totalPages ]) 

  const loadUsers = useCallback(() => {
    fetch(URL_WS_CRUD + 'getUsers.php')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (!Array.isArray(data)) {
          if (data === 'noConection') {
            setNoConnection(true);
          }
        } else {

          setPerPage(5);
          
          setTotalPages( Math.ceil((data.length) / perPage ));

          const startIndex = (currentPage - 1) * perPage;
          const endIndex = startIndex + perPage;
          const pageItems = data.slice(startIndex, endIndex);

          setUsers(pageItems); 

          setCurrentPage(currentPage);

        }
      })
      .catch((error) => {
        console.log(error.name);
        if (error.name === 'TypeError') {
          // Handle a TypeError
          setNoConnection(true);
        }
      });
  } , [ URL_WS_CRUD , perPage , currentPage ] );

  useEffect(() => {
    loadUsers();
    if (userCreated) {
      setUserCreated(false);
    }
  }, [ loadUsers , userCreated, currentPage , userUpdated, EditUser, userDeleted, noConnection ]); // Add userCreated as a dependency

  const handleInputEditChange = (event) => {

    setForm({ ...form, [event.target.name]: event.target.value });

  }

  const handleInputChange = (event) => {

    setMsgError(null);

    if (!event.target.value) {

      setMsgError('Complete datas of form');

    }

    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const blurEditUser = () => {

    setEditUser(false);
    setUserIdEdit(0);

  }

  const handleEditUser = (event) => {

    // console.log( inputRef.current );

    setEditUser(true);
    setUserIdEdit(event.target.id);

  }

  const openModalFormCreateUser = (open) => {
    setModalForm(open);
  }

  const deleteUser = () => {

    fetch(URL_WS_CRUD + 'deleteUser.php?idUser=' + userIdEdit, {
      mode: 'cors',
      method: 'get',
    })
      .then((res) => res.json())
      .then((data) => {
        // After successfully adding a user, set the userCreated state to true
        setUserDeleted(true);
        setEditUser(false); // remove input to update user once updated
      })
      .catch((error) => console.log(error));

  }

  const handleFormSubmitUpdate = (event) => {

    event.preventDefault();

    console.log( event.target.username.value );

    fetch(URL_WS_CRUD + '/updateUser.php', {
      mode: 'cors',
      method: 'post',
      body: new FormData(event.target),
    })
      .then((res) => res.json())
      .then((data) => {
        // After successfully adding a user, set the userCreated state to true
        if (!Array.isArray(data)) {
          if (!data) {
            setUserUpdated(false);
            setEditUser(false);
            return false;
          }
        }

        setUserUpdated(true);
        setEditUser(false); // remove input to update user once updated

      })
      .catch((error) => console.log(error));
  }

  const handleFormSubmit = (event) => {

    event.preventDefault();
    setMsgError(null);

    if (!event.target.username.value || !event.target.password.value) {

      setMsgError('Complete datas of form');
      return false;

    }

    fetch(URL_WS_CRUD + 'addUsers.php', {
      mode: 'cors',
      method: 'post',
      body: new FormData(event.target),
    })
      .then((res) => res.json())
      .then((data) => {
        // After successfully adding a user, set the userCreated state to true

        if (!Array.isArray(data)) {

          if (data === 'existUser') {
            setMsgError(`User ${event.target.username.value} already exists`);
            return false;
          }

        }

        setUserCreated(true);
        // const pageItems = data.slice(startIndex, endIndex);

        if ( users.length !== 0 ){

          setTotalPages(Math.ceil((users.length) / perPage));

          setCurrentPage(totalPages);

          setUsers(users.slice(( (totalPages - 1) * perPage ), (perPage+totalPages)) );  

        }

      })
      .catch((error) => console.log(error));
  };

  const changePage = (currentPage_) => {
    setCurrentPage(currentPage_);
    console.log(currentPage);
  }
  
  const previousPage = () => {
    if (currentPage !== 1 ){
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }
  
  const nextPage = () => {
    if (currentPage !== totalPages ){
      setCurrentPage((prevPage) => prevPage + 1);
    }
    
  } 

  return (
    <div className='container mt-5 px-2'>
      <ListUsers
        noConnection={noConnection}
        users={users} blurEditUser={blurEditUser}
        openModalFormCreateUser={openModalFormCreateUser}
        deleteUser={deleteUser}
        handleEditUser={handleEditUser}
        handleInputEditChange={handleInputEditChange}
        handleFormSubmitUpdate={handleFormSubmitUpdate}
        EditUser={EditUser}
        userIdEdit={userIdEdit}
      />
      <hr />
      <Pagination key={totalPages} loadPages={loadPages} totalPages={totalPages} currentPage={currentPage} changePage={changePage} previousPage={previousPage} nextPage={nextPage}/>
      {modalForm && (
        <Modal content={<FormCreateUsers
          msgError={msgError}
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
        />} openModalFormCreateUser={openModalFormCreateUser} />
      )}

    </div>
  );
}
