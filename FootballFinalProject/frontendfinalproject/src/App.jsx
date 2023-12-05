import './App.css'
import Header from './components/tools/Header'
import Leagues from './components/Leagues/Leagues'
import Teams from './components/Teams/Teams'

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
                          <Leagues/>
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
