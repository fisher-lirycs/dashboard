import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Carousel.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashBoard01 from './components/Dashboard/01';
import DashBoard02 from './components/Dashboard/02';
import DashBoard03 from './components/Dashboard/03';
import DashBoard04 from './components/Dashboard/04';
import DashBoard05 from './components/Dashboard/05';
import DashBoard06 from './components/Dashboard/06';
import DashBoard07 from './components/Dashboard/07';
import Setting from './components/Setting';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard01",
    element: <DashBoard01 />,
  },
  {
    path: "/dashboard02",
    element: <DashBoard02 />,
  },
  {
    path: "/dashboard03",
    element: <DashBoard03 />,
  },
  {
    path: "/dashboard04",
    element: <DashBoard04 />,
  },
  {
    path: "/dashboard",
    element: <DashBoard07 />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/mamory",
    element: <DashBoard06 />,
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
