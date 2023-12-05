import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

const BrowserRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={BrowserRouter} />
    </React.StrictMode>,
)
