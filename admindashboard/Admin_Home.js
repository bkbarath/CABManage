import React, { Fragment } from 'react';
import { Table } from 'react-bootstrap';
import './Admin_Home.css';
import Dashboard from '../Component/Dashboard';

function Admin_Home() {
  return (
    <div>
      <Dashboard>
    <div className="homecontainer ">
      <h1>Hello</h1>
    <div>
      <Table>
        
      </Table>
    </div>
    </div>
    </Dashboard>
    </div>
  );
}

export default Admin_Home;
