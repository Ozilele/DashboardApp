import React, { useEffect, useState, memo } from 'react'
import './DataTable.css';
import axios from 'axios';
import { userColumns } from '../../utils/datatablesrc';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { selectAuth } from '../../features/auth/authSlice';

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/admin/users", {
          signal: controller.signal
        });
        console.log(response.data);
        if(response?.data?.message === "Users found") {
          const rowsData = response?.data?.users.map(user => {
            return {
              id: user._id,
              firstName: user.firstName,
              secondName: user.secondName,
              email: user.email,
              avatarUrl: user?.imageFile ? user?.imageFile : null,
            }
          });
          isMounted && setRows(rowsData);
        }
      } catch(err) {
        console.log(err);
        console.log(err?.status);
      }
    }

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    }
    // axios.get(API_URL, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`
    //   }
    // })
    //   .then((res) => {
    //     if(res?.data?.message === "Users found") {
    //       const rowsData = res?.data?.users.map(user => {
    //         return {
    //           id: user._id,
    //           firstName: user.firstName,
    //           secondName: user.secondName,
    //           email: user.email,
    //           avatarUrl: user?.imageFile ? user?.imageFile : null,
    //         }
    //       });
    //       setRows(rowsData);
    //     } else if(res.data.message === "No users found") {
    //       setRows([]);
    //     } else {
    //       setError(true);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }, []);

  const handleViewUser = (e) => {}

  const handleDeleteUser = (e, userId) => {
    const { accessToken } = Cookies.get();
    const API_URL = `/admin/users/${userId}`;
    axios.delete(API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
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

export default memo(DataTable);