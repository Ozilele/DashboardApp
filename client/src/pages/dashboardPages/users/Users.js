import React from 'react'
import { Link } from 'react-router-dom';
import DataTable from '../../../components/table/DataTable';
import './Users.css';

const Users = () => {
  return (
    <div className="users__section">
      <div className="users__top__section">
        <h3>Customers</h3>
        <Link to="/dashboard/addUser">
          <button className="add__user__btn">Add New</button>
        </Link>
      </div>
      <div className="users__list">
        <DataTable/>
      </div>
    </div>
  )
}

export default Users;