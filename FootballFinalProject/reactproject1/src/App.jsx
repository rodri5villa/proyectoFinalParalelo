import './App.css';
import Header from './components/tools/Header';
import Carousel from './components/leagues/Carousel';
import { leagueApi, teamsApi } from './components/api/Api.jsx';
import { useState } from 'react';

function App() {

    const [id, setId] = useState(0);
    const [teamId, setTeamId] = useState(0);
  

  return (
      <>
          <section className="layout">
              <div className="header">
                  <Header/>
              </div>
              <div className="main">
                  <div className="left">
                      <div className="leagues-container">
                          <Carousel api={leagueApi.get()} setId={setTeamId()} id={id} />
                      </div>
                  </div>
                  <div className="right">
                      <div className="teams-container">
                          <Carousel api={teamsApi.getByLeagueId(teamId)} />
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
