import {SiYoutubegaming} from 'react-icons/si'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import HomeLeftSection from '../HomeLeftSection'
import Commoncontent from '../../Commoncontent/common'

import './index.css'

const trendingVideosStatus = {
  failure: 'FAILURE',
  success: 'SUCCESS',
  loading: 'LOADING',
}

class Trending extends Component {
  state = {
    trendingVideoData: [],
    trendingStatusSt: trendingVideosStatus.loading,
  }

  componentDidMount() {
    this.getTrendingVideoData()
  }

  getTrendingVideoData = async () => {
    const token = Cookies.get('jwtToken')
    const url = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {videos} = data
      const toCamelCase = videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
      }))
      this.setState({
        trendingVideoData: toCamelCase,
        trendingStatusSt: trendingVideosStatus.success,
      })
    } else {
      this.setState({
        trendingStatusSt: trendingVideosStatus.failure,
      })
    }
  }

  failureFunction = () => (
    <Commoncontent.Consumer>
      {value => {
        const {darkAndLightMode} = value
        return (
          <div
            className={`failure-container ${
              darkAndLightMode && 'failure-dark'
            }`}
          >
            <img
              src={`${
                darkAndLightMode
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
              }`}
              alt="failure view"
              className="failure-view"
            />
            <h2
              className={`failure-header ${
                darkAndLightMode && 'dark-mode-no-results-head'
              }`}
            >
              Oops! Something Went Wrong
            </h2>
            <p
              className={`failure-para ${
                darkAndLightMode && 'dark-mode-no-results-para'
              }`}
            >
              We are having some trouble to complete your request Please try
              again.
            </p>
            <button
              type="button"
              className="failure-retry-btn"
              onClick={this.onClickFailureBtn}
            >
              Retry
            </button>
          </div>
        )
      }}
    </Commoncontent.Consumer>
  )

  successRenderFunction = () => (
    <Commoncontent.Consumer>
      {value => {
        const {darkAndLightMode} = value

        const {trendingVideoData} = this.state
        return (
          <div>
            <div
              className={`trending-top-conatiner ${
                darkAndLightMode && 'trending-top-conatiner-dark'
              }`}
            >
              <div
                className={`trending-icon-conatiner ${
                  darkAndLightMode && 'trending-icon-conatiner-dark'
                }`}
              >
                <SiYoutubegaming className="trending-icon" />
              </div>
              <h1
                className={`trending-icon-text ${
                  darkAndLightMode && 'trending-icon-text-dark'
                }`}
              >
                Gaming
              </h1>
            </div>
            <div className="trending-body-conatiner">
              <ul className="gaming-video-ul">
                {trendingVideoData.map(each => (
                  <li key={each.id}>
                    <Link
                      className="Link gaming-text-conatiner"
                      to={`videos/${each.id}`}
                    >
                      <img
                        src={each.thumbnailUrl}
                        alt={each.name}
                        className="gaming-video-img"
                      />
                      <div className="gaming-text-conatiner2">
                        <h2
                          className={`gaming-header-text ${
                            darkAndLightMode && 'gaming-header-text-dark'
                          }`}
                        >
                          {each.title}
                        </h2>
                        <p className="gaming-channel-name">{`${each.viewCount} Watching Worldwide`}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      }}
    </Commoncontent.Consumer>
  )

  loadingFunction = () => (
    <div className="loader video-details" data-testid="loader">
      <Loader type="TailSpin" color="#1E90FF" />
    </div>
  )

  onClickFailureBtn = () => {
    this.setState(
      {trendingStatusSt: trendingVideosStatus.loading},
      this.getTrendingVideoData,
    )
  }

  switchingFunction = () => {
    const {trendingStatusSt} = this.state
    switch (trendingStatusSt) {
      case trendingVideosStatus.success:
        return this.successRenderFunction()
      case trendingVideosStatus.loading:
        return this.loadingFunction()
      case trendingVideosStatus.failure:
        return this.failureFunction()
      default:
        return null
    }
  }

  render() {
    return (
      <Commoncontent.Consumer>
        {value => {
          const {darkAndLightMode} = value
          return (
            <>
              <Header />
              <div
                className={`trending-right-body-conatiner ${
                  darkAndLightMode && 'left-side-bar'
                }`}
                data-testid="gaming"
              >
                <HomeLeftSection />
                <div
                  className={`trending-main-container ${
                    darkAndLightMode && 'trending-main-container-dark'
                  }`}
                >
                  {this.switchingFunction()}
                </div>
              </div>
            </>
          )
        }}
      </Commoncontent.Consumer>
    )
  }
}
export default Trending
