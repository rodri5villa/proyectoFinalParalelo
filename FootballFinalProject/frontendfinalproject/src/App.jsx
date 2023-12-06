import './App.css';
import Header from './components/tools/Header';
import Carousel from './components/leagues/Carousel';
import Teams from './components/Teams/Teams';
import { leagueApi } from './components/api/Api.jsx';

function App() {
  

  return (
      <>
          <section className="layout">
              <div className="header">
                  <Header/>
              </div>
              <div className="main">
                  <div className="left">
                      <div className="leagues-container">
                          <Carousel api={leagueApi}/>
                      </div>
                  </div>
                  <div className="right">
                      <div className="teams-container">
                          <Teams/>
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
