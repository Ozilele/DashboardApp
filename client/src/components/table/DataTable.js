import React, { useEffect, useState } from 'react'
import './DataTable.css';
import { userRows, userColumns } from '../../utils/datatablesrc';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../../features/userSlice';

const DataTable = () => {

  const [rows, setRows] = useState(userRows);
  const dispatch = useDispatch();

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

  const handleDeleteUser = (e) => {
    const deletedItemId = e.target.parentNode.getAttribute("id");
    const newRowsData = rows.filter(row => row.id !== parseFloat(deletedItemId));
    setRows(newRowsData);
  } 

  const actionColumn = [{
    field: 'action',
    headerName: "Action",
    width: 160,
    renderCell: (params) => {
      const url = `/user/${params.row.id}`;
      return (
        <div className="action__btns" id={params.row?.id}>
          <Link to={url}>
            <button onClick={handleViewUser} className="view__user__btn">View</button>
          </Link>
          <button onClick={handleDeleteUser} className="delete__user__btn">Delete</button>
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