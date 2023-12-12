import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CrudSPAPHP from './CrudSPAPHP';
import Navbar from './Navbar';

export default function MainPage() {
  /* SPA CRUD USERS version mysql */
  return (
    <>   
      <Router>
        <Navbar/>
        <CrudSPAPHP/>
      </Router>
    </>
  );
}
