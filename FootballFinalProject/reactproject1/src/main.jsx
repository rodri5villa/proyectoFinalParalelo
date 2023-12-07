import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import UpdateTeam from './components/teams/UpdateTeam.jsx';

const BrowserRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/Team/:id",
        element: <UpdateTeam />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={BrowserRouter} />
    </React.StrictMode>,
)
