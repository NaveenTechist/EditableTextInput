import {Component} from 'react'
import PopUp from 'reactjs-popup'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {
  IoMdMoon,
  IoMdMenu,
  IoMdClose,
  IoMdHome,
  IoMdTrendingUp,
  IoIosSunny,
} from 'react-icons/io'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {FiLogOut} from 'react-icons/fi'
import Commoncontent from '../../Commoncontent/common'

import './index.css'

class Header extends Component {
  onClickLogoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwtToken')
    history.replace('/login')
  }

  render() {
    return (
      <Commoncontent.Consumer>
        {value => {
          const {
            tabUpdatedFunction,
            selectedTab,
            darkAndLightMode,
            darkAndLightModeFunction,
          } = value

          const onClickTabButton = id => {
            tabUpdatedFunction(id)
          }

          const darkOrWhiteMode = () => {
            darkAndLightModeFunction()
          }

          return (
            <nav className={darkAndLightMode && 'dark-nav'}>
              <div>
                <Link to="/">
                  <button type="button" className="hidden-btn">
                    <img
                      src={
                        !darkAndLightMode
                          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      }
                      alt="website logo"
                      className="home-logo"
                    />
                  </button>
                </Link>
              </div>
              <div className="nav-right-conatiner">
                <button
                  type="button"
                  className="hidden-btn"
                  onClick={darkOrWhiteMode}
                  data-testid="theme"
                >
                  {darkAndLightMode ? (
                    <IoIosSunny className="light-mode-icon" />
                  ) : (
                    <IoMdMoon className="dark-mode-icon" />
                  )}
                </button>
                <button type="button" className="hidden-btn">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="header-profile"
                  />
                </button>
                <PopUp
                  modal
                  trigger={
                    <button type="button" className="hidden-btn menubar">
                      <IoMdMenu
                        className={`menu-icon ${
                          darkAndLightMode && 'light-mode-icon'
                        }`}
                      />
                    </button>
                  }
                >
                  {close => (
                    <div
                      className={`menubar-popup-conatiner ${
                        darkAndLightMode && 'menubar-popup-conatiner-dark'
                      } `}
                    >
                      <button
                        type="button"
                        className="hidden-btn"
                        onClick={close}
                      >
                        <IoMdClose className="popup-cross-icon" />
                      </button>

                      <div className="popup-links">
                        <div className="home-left-top-conatiner">
                          <div
                            className={`home-left-each-container ${
                              selectedTab === 'HOME' &&
                              'home-left-conatiner-selected'
                            }`}
                          >
                            <Link className="Link" to="/">
                              <button
                                type="button"
                                className="hidden-btn row-wise"
                                onClick={() => onClickTabButton('HOME')}
                              >
                                <IoMdHome
                                  className={`home-left-icons selected-home ${
                                    selectedTab === 'HOME' && 'selected-icon'
                                  }`}
                                />
                                <p
                                  className={`home-left-icon-text ${
                                    selectedTab === 'HOME' && 'selected-text'
                                  }`}
                                >
                                  Home
                                </p>
                              </button>
                            </Link>
                          </div>
                          <div
                            className={`home-left-each-container ${
                              selectedTab === 'TRENDING' &&
                              'home-left-conatiner-selected'
                            }`}
                          >
                            <Link className="Link" to="/trending">
                              <button
                                type="button"
                                className="hidden-btn row-wise"
                                onClick={() => onClickTabButton('TRENDING')}
                              >
                                <IoMdTrendingUp
                                  className={`home-left-icons selected-home ${
                                    selectedTab === 'TRENDING' &&
                                    'selected-icon'
                                  }`}
                                />
                                <p
                                  className={`home-left-icon-text ${
                                    selectedTab === 'TRENDING' &&
                                    'selected-text'
                                  }`}
                                >
                                  Trending
                                </p>
                              </button>
                            </Link>
                          </div>
                          <div
                            className={`home-left-each-container ${
                              selectedTab === 'GAMING' &&
                              'home-left-conatiner-selected'
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
                                  }`}
                                />
                                <p
                                  className={`home-left-icon-text ${
                                    selectedTab === 'GAMING' && 'selected-text'
                                  }`}
                                >
                                  Gaming
                                </p>
                              </button>
                            </Link>
                          </div>
                          <div
                            className={`home-left-each-container ${
                              selectedTab === 'SAVED' &&
                              'home-left-conatiner-selected'
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
                                  }`}
                                />
                                <p
                                  className={`home-left-icon-text ${
                                    selectedTab === 'SAVED' && 'selected-text'
                                  }`}
                                >
                                  Saved
                                </p>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </PopUp>
                <PopUp
                  modal
                  trigger={
                    <button type="button" className="hidden-btn">
                      <FiLogOut
                        className={`mobile-logout ${
                          darkAndLightMode && 'logout-white-color'
                        } `}
                      />
                    </button>
                  }
                >
                  {close => (
                    <div className="popup">
                      <div
                        className={`logout-popup-conatiner ${
                          darkAndLightMode && 'logout-popup-conatiner-dark'
                        }`}
                      >
                        <p
                          className={`logout-text ${
                            darkAndLightMode && 'logout-text-color'
                          } `}
                        >
                          Are you sure you want to logout?
                        </p>
                        <div className="popup-btns">
                          <button
                            type="button"
                            className="close-btn"
                            onClick={close}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="confirm-btn"
                            onClick={this.onClickLogoutBtn}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </PopUp>
                <PopUp
                  modal
                  trigger={
                    <button
                      type="button"
                      className={`logout-btn ${
                        darkAndLightMode && 'dark-logout-btn'
                      }`}
                    >
                      Logout
                    </button>
                  }
                >
                  {close => (
                    <div className="popup">
                      <div
                        className={`logout-popup-conatiner ${
                          darkAndLightMode && 'logout-popup-conatiner-dark'
                        }`}
                      >
                        <p
                          className={`logout-text ${
                            darkAndLightMode && 'logout-text-color'
                          } `}
                        >
                          Are you sure you want to logout?
                        </p>
                        <div className="popup-btns">
                          <button
                            type="button"
                            className="close-btn"
                            onClick={close}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="confirm-btn"
                            onClick={this.onClickLogoutBtn}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </PopUp>
              </div>
            </nav>
          )
        }}
      </Commoncontent.Consumer>
    )
  }
}
export default withRouter(Header)
