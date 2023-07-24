import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/dashboardPages/home/Dashboard';
import Users from './pages/dashboardPages/users/Users';
import User from './pages/dashboardPages/user/User';
import NewUser from './pages/dashboardPages/newUser/NewUser';
import Hotels from './pages/dashboardPages/hotels/Hotels';
import ClientHotels from './pages/hotelPages/ClientHotels';
import CalendarApp from './pages/dashboardPages/apps/CalendarApp';
import LineChart from './pages/dashboardPages/charts/LineChart';
import AreaChart from './pages/dashboardPages/charts/AreaChart';
import PieChart from './pages/dashboardPages/charts/PieChart';
import BarChart from './pages/dashboardPages/charts/BarChart';
import ScatterChart from './pages/dashboardPages/charts/ScatterChart';
import PolarChart from './pages/dashboardPages/charts/PolarChart';
import Kanban from './pages/dashboardPages/apps/Kanban';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/client/Navbar';
import UserSettings from './pages/visitorPages/UserSettings';
import SingleHotel from './pages/hotelPages/SingleHotel';
import NewHotel from './pages/dashboardPages/hotels/NewHotel';
import ProtectedRoute from './components/ProtectedRoute';

const AdminRouteLayout = () => {
  
  return (
    <div className="App">
      <Sidebar/>
      <div className="App__content">
        <Header/>
        <Outlet/>
      </div>
    </div>
  );
}

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
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
        element: 
        <Dashboard/>
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
    element:<Layout />,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/hotels",
        element: <ClientHotels/>
      },
      {
        path: "/user/:id",
        element: <UserSettings/>,
      }, 
      {
        path: "/hotel/:id",
        element: <SingleHotel />,
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
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer/>
    </>
  )
}

export default App;