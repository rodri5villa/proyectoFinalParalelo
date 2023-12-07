import './App.css';
import Header from './components/tools/Header';
import Carousel from './components/tools/Carousel';
import { leagueApi, teamApi } from './components/api/Api.jsx';
import { useState } from 'react';
import LoadingSpinner from './components/tools/LoadingSpinner';

function App() {

    const [id, setId] = useState(null);


    return (
        <>
            <section className="layout">
                <div className="header">
                    <Header />
                </div>
                <div className="main">
                    <div className="left">
                        <div className="leagues-container">
                            <Carousel api={leagueApi.get()} id={null} setId={setId} isLeague={false} />
                        </div>
                    </div>
                    <div className="right">
                        <div className="teams-container">
                            {id === null ?
                                <LoadingSpinner /> :
                                <Carousel api={teamApi.getByLeagueId(id)} id={id} isLeague={true} />

                            }
                        </div>
                    </div>
                </div>
                <div className="footer">
                    @Rodrigo Villa & Borja Martinez
                </div>
            </section>
        </>
    )
}

export default App
