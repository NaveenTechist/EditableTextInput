import {Component} from 'react'
import Header from '../Header'
import HomeLeftSection from '../HomeLeftSection'
import HomeRightSection from '../HomeRightSection'
import Commoncontent from '../../Commoncontent/common'

import './index.css'

class Home extends Component {
  render() {
    return (
      <Commoncontent.Consumer>
        {value => {
          const {darkAndLightMode} = value

          return (
            <div
              className={`home-main-bg ${
                darkAndLightMode && 'home-main-bg-dark'
              }`}
              data-testid="home"
            >
              <div className="home-card-bg">
                <Header />
                <div className="home-body-container">
                  <HomeLeftSection />
                  <div className="home-right-body-conatiner">
                    <HomeRightSection />
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </Commoncontent.Consumer>
    )
  }
}
export default Home
