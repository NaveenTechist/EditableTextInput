import Header from '../Header'
import HomeLeftSection from '../HomeLeftSection'
import Commoncontent from '../../Commoncontent/common'
import './index.css'

const NotFound = () => (
  <Commoncontent.Consumer>
    {value => {
      const {darkAndLightMode} = value
      return (
        <>
          <Header />
          <div className="trending-right-body-conatiner">
            <HomeLeftSection />
            <div className="trending-main-container">
              <div
                className={`failure-container ${darkAndLightMode && 'dark'} `}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
                  alt="not found"
                  className="not-found-img"
                />
                <h2
                  className={`failure-header ${
                    darkAndLightMode && 'not-found-text'
                  } `}
                >
                  Page Not Found
                </h2>
                <p className="failure-para">
                  We are sorry, the page you requested could not be found.
                </p>
              </div>
            </div>
          </div>
        </>
      )
    }}
  </Commoncontent.Consumer>
)

export default NotFound
