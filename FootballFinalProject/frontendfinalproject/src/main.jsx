import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import AddTeam from './components/teams/AddTeam.jsx'; 
import AddLeague from './components/leagues/AddLeague.jsx'; 
import AddPlayer from './components/players/AddPlayer.jsx'; 



const BrowserRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/add-league",
        element: <AddLeague />,
    },
    {
        path: "/add-team",
        element: <AddTeam />,
    },
    {
        path: "/add-player",
        element: <AddPlayer />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={BrowserRouter} />
    </React.StrictMode>,
)
