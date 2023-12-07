import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import UpdateTeam from './components/teams/UpdateTeam.jsx';
import UpdateLeague from './components/leagues/UpdateLeague.jsx';
import UpdatePlayer from './components/players/UpdatePlayer.jsx';

const BrowserRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/Team/:id",
        element: <UpdateTeam />
    },
    {
        path: "/League/:id",
        element: <UpdateLeague />
    },
    {
        path: "/Player/:id",
        element: <UpdatePlayer />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={BrowserRouter} />
    </React.StrictMode>,
)
