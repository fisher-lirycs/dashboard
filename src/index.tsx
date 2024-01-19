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
