import React, { useEffect, useState } from 'react'
import './DataTable.css';
import axios from 'axios';
import { userRows, userColumns } from '../../utils/datatablesrc';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../../features/userSlice';

const DataTable = () => {

  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const API_URL = `/admin/users`;
    axios.get(API_URL)
      .then((res) => {
        if(res?.data?.message === "Users found") {
          const rowsData = res?.data?.users.map(user => {
            return {
              id: user._id,
              firstName: user.firstName,
              secondName: user.secondName,
              email: user.email,
              avatarUrl: user?.imageFile ? user?.imageFile : null,
            }
          });
          setRows(rowsData);
        } else if(res.data.message === "No users found") {
          setRows([]);
        } else {
          setError(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleViewUser = (e) => {
    const viewedUserId = e.target.parentNode.parentNode.getAttribute("id");
    const [user] = rows.filter(row => row.id === parseFloat(viewedUserId));
    dispatch(getUserInfo({
      id: user.id,
      fullName: user.fullName,
      imgSrc: user.imgSrc,
      email: user.email,
      age: user.age,
      status: user.status,
    }));
  }

  const handleDeleteUser = (e, userId) => {
    const API_URL = `/admin/users/${userId}`;
    axios.delete(API_URL)
      .then((res) => {
        if(res.data.message === "User deleted successfully") {
          const updatedUsers = rows.filter(row => row.id !== userId);
          setRows(updatedUsers);
        }
      })
      .catch(err => {
        console.log(err);
      });
  } 

  const actionColumn = [{
    field: 'action',
    headerName: "Action",
    width: 160,
    renderCell: (params) => {
      const url = `/user/${params.row?.id}`;
      return (
        <div className="action__btns" id={params.row?.id}>
          <Link to={url}>
            <button onClick={handleViewUser} className="view__user__btn">View</button>
          </Link>
          <button onClick={(e) => handleDeleteUser(e, params.row?.id)} className="delete__user__btn">Delete</button>
        </div>
      )
    }
  }];

  return (
    <>
      <DataGrid
        columns={userColumns.concat(actionColumn)}
        rows={rows}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </>
  )
}

export default DataTable;