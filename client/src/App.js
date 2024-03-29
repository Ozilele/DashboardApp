import React, { useEffect } from 'react'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/dashboardPages/home/Dashboard';
import Users from './pages/dashboardPages/users/Users';
import User from './pages/dashboardPages/user/User';
import NewUser from './pages/dashboardPages/newUser/NewUser';
import Hotels from './pages/dashboardPages/hotels/Hotels';
import CalendarApp from './pages/dashboardPages/apps/CalendarApp';
import LineChart from './pages/dashboardPages/charts/LineChart';
import AreaChart from './pages/dashboardPages/charts/AreaChart';
import PieChart from './pages/dashboardPages/charts/PieChart';
import BarChart from './pages/dashboardPages/charts/BarChart';
import ScatterChart from './pages/dashboardPages/charts/ScatterChart';
import PolarChart from './pages/dashboardPages/charts/PolarChart';
import Kanban from './pages/dashboardPages/apps/Kanban';
import Register from './pages/registerPage/Register';
import Login from './pages/loginPage/Login';
import Home from './pages/clientPages/landingPage/Home';
import ClientSearchPage from './pages/clientPages/searchPage/index';
import Navbar from './components/client/navbar/Navbar';
import UserSettings from './pages/clientPages/userPages/UserSettings';
import SingleHotel from './pages/clientPages/singleHotelPage/SingleHotel';
import NewHotel from './pages/dashboardPages/hotels/NewHotel';
import ProtectedRoute from './components/ProtectedRoute';
import useRefreshToken from './hooks/useRefreshToken';
import SuccessfulPayment from './pages/clientPages/payments/SuccessfulPayment';
import CanceledPayment from './pages/clientPages/payments/CanceledPayment';


const AdminRouteLayout = () => {
  return (
    <div className="App dark">
      <Sidebar/>
      <div className="App__content">
        <Header/>
        <Outlet/>
      </div>
    </div>
  );
}

const CLientLayout = () => {
  const { refresh } = useRefreshToken();

  useEffect(() => {
    const getToken = async () => {
      try { 
        const response = await refresh();
      } catch(err) {
        console.log(err);
      }
    }
    getToken();
  }, []);

  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "dashboard",
    element: 
      <ProtectedRoute>
        <AdminRouteLayout/>
      </ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Dashboard/>
      },
      {
        path: "users",
        element: <Users/>
      },
      {
        path: "user/:id",
        element: <User/>
      },
      {
        path: "addUser",
        element: <NewUser/>
      },
      {
        path: "hotels",
        element: <Hotels/>,
      },
      {
        path: "hotels/newHotel",
        element: <NewHotel/>
      },
      {
        path: "calendar",
        element: <CalendarApp/>
      },
      {
        path: "kanban",
        element: <Kanban/>
      },
      {
        path: "charts/line",
        element: <LineChart/>
      },
      {
        path: "charts/area",
        element: <AreaChart/>
      },
      {
        path: "charts/pie",
        element: <PieChart/>
      },
      {
        path: "charts/bar",
        element: <BarChart/>
      },
      {
        path: "charts/scatter",
        element: <ScatterChart/>
      },
      {
        path: "charts/polar",
        element: <PolarChart/>
      }
    ]
  },
  {
    path: "/",
    element: <CLientLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/hotels",
        element: <ClientSearchPage/>
      },
      {
        path: "/user/:id",
        element: <UserSettings/>,
      }, 
      {
        path: "/hotel/:id",
        element: <SingleHotel />,
      },
      {
        path: "/payments/success",
        element: <SuccessfulPayment/>
      },
      {
        path: "/payments/cancel",
        element: <CanceledPayment/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer/>
    </>
  )
}

export default App;