import {Component} from 'react'
import {IoMdClose} from 'react-icons/io'
import Videos from '../Videos'
import './index.css'
import Commoncontent from '../../Commoncontent/common'

class HomeRightSection extends Component {
  state = {
    bannerDispay: true,
  }

  onClickCloseIcon = () => {
    this.setState({bannerDispay: false})
  }

  render() {
    const {bannerDispay} = this.state
    return (
      <Commoncontent.Consumer>
        {value => {
          const {darkAndLightMode} = value

          return (
            <div
              className={`homeright-main-bg ${
                darkAndLightMode && 'dark-homeright-main-bg'
              }`}
              data-testid="banner"
            >
              {bannerDispay && (
                <div className="pop-container">
                  <div className="overlay-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="nxt watch logo"
                      className="popup-logo"
                    />
                    <p className="pop-text">
                      Buy Nxt Watch Premium prepaid plans with UPI
                    </p>
                    <button type="button" className="popup-btn">
                      GET IT NOW
                    </button>
                  </div>
                  <button
                    type="button"
                    className="hidden-btn"
                    onClick={this.onClickCloseIcon}
                    data-testid="close"
                  >
                    <IoMdClose className="cross-icon" />
                  </button>
                </div>
              )}
              <div
                className={`home-main-body-container ${
                  darkAndLightMode && 'dark'
                }`}
              >
                <Videos />
              </div>
            </div>
          )
        }}
      </Commoncontent.Consumer>
    )
  }
}

export default HomeRightSection
