import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import UpdateTeam from './components/teams/UpdateTeam.jsx';
<<<<<<< HEAD
import UpdateLeague from './components/leagues/UpdateLeague.jsx';
import UpdatePlayer from './components/players/UpdatePlayer.jsx';
=======
import AddTeam from './components/teams/AddTeam.jsx';
import AddLeague from './components/leagues/AddLeague.jsx';
import AddPlayer from './components/players/AddPlayer.jsx'; 
>>>>>>> 76756339483930fa68e24c62d15ac2900d8f0e05

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
<<<<<<< HEAD
        path: "/League/:id",
        element: <UpdateLeague />
    },
    {
        path: "/Player/:id",
        element: <UpdatePlayer />
=======
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
>>>>>>> 76756339483930fa68e24c62d15ac2900d8f0e05
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={BrowserRouter} />
    </React.StrictMode>,
)
