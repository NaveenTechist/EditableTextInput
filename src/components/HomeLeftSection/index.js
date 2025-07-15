import {Link} from 'react-router-dom'
import {IoMdHome, IoMdTrendingUp} from 'react-icons/io'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import Commoncontent from '../../Commoncontent/common'
import './index.css'

const HomeLeftSection = () => (
  <Commoncontent.Consumer>
    {value => {
      const {selectedTab, tabUpdatedFunction, darkAndLightMode} = value

      const onClickTabButton = id => {
        tabUpdatedFunction(id)
      }

      return (
        <div
          className={`home-left-body-conatiner ${
            darkAndLightMode && 'dark-left-body'
          }`}
        >
          <ul className="home-left-top-conatiner">
            <div
              className={`home-left-each-container ${
                selectedTab === 'HOME' && darkAndLightMode
                  ? 'select-tab-dark'
                  : 'home-left-conatiner-selected'
              }`}
            >
              <Link className="Link" to="/">
                <button
                  type="button"
                  className="hidden-btn row-wise"
                  onClick={() => onClickTabButton('HOME')}
                  data-testid="searchButton"
                >
                  <IoMdHome
                    className={`home-left-icons selected-home ${
                      selectedTab === 'HOME' && 'selected-icon'
                    }`}
                  />
                  <p
                    className={`home-left-icon-text ${
                      selectedTab === 'HOME' && darkAndLightMode
                        ? 'dark-selected-text'
                        : 'selected-text'
                    }
                    ${darkAndLightMode && 'home-left-icon-text-dark'}  
                    `}
                  >
                    Home
                  </p>
                </button>
              </Link>
            </div>
            <div
              className={`home-left-each-container ${
                selectedTab === 'TRENDING' && 'home-left-conatiner-selected'
              }`}
            >
              <Link className="Link" to="/trending">
                <button
                  type="button"
                  className="hidden-btn row-wise"
                  onClick={() => onClickTabButton('TRENDING')}
                >
                  <IoMdTrendingUp
                    className={`home-left-icons selected-home 
                    ${selectedTab === 'TRENDING' && 'selected-icon'}
                    ${darkAndLightMode && 'home-left-icons-dark'}
                    `}
                  />
                  <p
                    className={`home-left-icon-text 
                    ${selectedTab === 'TRENDING' && 'selected-text'} 
                    ${darkAndLightMode && 'home-left-icon-text-dark'} `}
                  >
                    Trending
                  </p>
                </button>
              </Link>
            </div>
            <div
              className={`home-left-each-container ${
                selectedTab === 'GAMING' && 'home-left-conatiner-selected'
              }`}
            >
              <Link className="Link" to="/gaming">
                <button
                  type="button"
                  className="hidden-btn row-wise"
                  onClick={() => onClickTabButton('GAMING')}
                >
                  <SiYoutubegaming
                    className={`home-left-icons selected-home ${
                      selectedTab === 'GAMING' && 'selected-icon'
                    }
                    ${darkAndLightMode && 'home-left-icons-dark'} 
                    `}
                  />
                  <p
                    className={`home-left-icon-text ${
                      selectedTab === 'GAMING' && 'selected-text'
                    }
                    ${darkAndLightMode && 'home-left-icon-text-dark'} 
                    `}
                  >
                    Gaming
                  </p>
                </button>
              </Link>
            </div>
            <div
              className={`home-left-each-container ${
                selectedTab === 'SAVED' && 'home-left-conatiner-selected'
              }`}
            >
              <Link className="Link" to="/saved-videos">
                <button
                  type="button"
                  className="hidden-btn row-wise"
                  onClick={() => onClickTabButton('SAVED')}
                >
                  <BiListPlus
                    className={`home-left-icons selected-home ${
                      selectedTab === 'SAVED' && 'selected-icon'
                    }
                     ${darkAndLightMode && 'home-left-icons-dark'} 
                    `}
                  />
                  <p
                    className={`home-left-icon-text ${
                      selectedTab === 'SAVED' && 'selected-text'
                    }
                    ${darkAndLightMode && 'home-left-icon-text-dark'}  
                    `}
                  >
                    Saved videos
                  </p>
                </button>
              </Link>
            </div>
          </ul>
          <div className="home-left-top-conatiner">
            <p
              className={`home-left-header-contact ${
                darkAndLightMode && 'home-left-header-contact-dark'
              }`}
            >
              CONTACT US
            </p>
            <div className="home-left-row-wise">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="home-left-bottom-logos"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="home-left-bottom-logos"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="home-left-bottom-logos"
              />
            </div>
            <p
              className={`home-left-bottom-text ${
                darkAndLightMode && 'home-left-header-contact-dark'
              }`}
            >
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </Commoncontent.Consumer>
)
export default HomeLeftSection
