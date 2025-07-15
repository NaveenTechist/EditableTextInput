import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import {IoMdSearch} from 'react-icons/io'
import './index.css'
import Commoncontent from '../../Commoncontent/common'

const videoDataDisplay = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  noSearchResults: 'NO-RESULTS',
}

class Videos extends Component {
  state = {
    videosData: [],
    videoStatus: videoDataDisplay.loading,
    searchInputValue: '',
  }

  componentDidMount() {
    this.getVideosData()
  }

  getVideosData = async () => {
    const token = Cookies.get('jwtToken')
    const url = 'https://apis.ccbp.in/videos/all'
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
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))
      this.setState({
        videosData: toCamelCase,
        videoStatus: videoDataDisplay.success,
      })
    } else {
      this.setState({
        videoStatus: videoDataDisplay.failure,
      })
    }
  }

  onChangeInput = event => {
    this.setState({searchInputValue: event.target.value})
    console.log()
  }

  onKeyDownFunction = event => {
    if (event.key === 'Enter') {
      this.searchInputFilter()
      console.log('Here')
    }
  }

  onClickSearchFunction = () => {
    this.searchInputFilter()
  }

  searchInputFilter = async () => {
    const {searchInputValue} = this.state
    // const filterdVideos = videosData.filter(each =>
    //   each.title.toLowerCase().includes(searchInputValue.toLowerCase()),
    // )
    console.log(searchInputValue)
    const token = Cookies.get('jwtToken')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInputValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {videos} = data
      const arrayConvert = Object.values(videos)
      const toCamelCase = arrayConvert.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))

      this.setState({videosData: toCamelCase})
      console.log(arrayConvert)
    } else {
      this.setState({videoStatus: videoDataDisplay.noSearchResults})
    }
  }

  onClickFailureBtn = () => {
    this.setState({videoStatus: videoDataDisplay.loading}, this.getVideosData)
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

  noSearchResultFunction = () => (
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
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
              className="failure-view"
            />
            <h2
              className={`failure-header ${
                darkAndLightMode && 'dark-mode-no-results-head'
              }`}
            >
              No Search results found
            </h2>
            <p
              className={`failure-para ${
                darkAndLightMode && 'dark-mode-no-results-para'
              }`}
            >
              Try different key words or remove search filter
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

  searchRenderFunction = () => (
    <Commoncontent.Consumer>
      {value => {
        const {darkAndLightMode} = value
        const {searchInputValue} = this.state
        return (
          <div className="home-search-container">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className={`home-search-input  ${
                  darkAndLightMode && 'home-search-input-dark'
                }`}
                onChange={this.onChangeInput}
                onKeyDown={this.onKeyDownFunction}
                value={searchInputValue}
              />
              <div
                className={`search-icon-container ${
                  darkAndLightMode && 'search-icon-container-dark'
                }`}
              >
                <button
                  type="button"
                  className="hidden-btn"
                  onClick={this.onClickSearchFunction}
                >
                  <IoMdSearch
                    className={`search-icon ${
                      darkAndLightMode && 'search-icon-dark'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )
      }}
    </Commoncontent.Consumer>
  )

  loadingFunction = () => (
    <div className="loader" data-testid="loader">
      <Loader type="TailSpin" color="#1E90FF" />
    </div>
  )

  successFunction = () => (
    <Commoncontent.Consumer>
      {value => {
        const {darkAndLightMode} = value

        const {videosData} = this.state
        return (
          <>
            <ul className="each-video-containers">
              {videosData.map(each => (
                <li key={each.id}>
                  <Link className="Link" to={`videos/${each.id}`}>
                    <div className="videos-main-container">
                      <div className="thumbnail-container">
                        <img
                          src={each.thumbnailUrl}
                          alt="video thumbnail"
                          className="thumbnail-img"
                        />
                      </div>
                      <div className="all-text-video-container row-wise">
                        <div className="video-logo-container">
                          <img
                            src={each.profileImageUrl}
                            alt="channel logo"
                            className="video-user-logo"
                          />
                        </div>
                        <div className="video-text-container">
                          <p
                            className={`video-title ${
                              darkAndLightMode && 'dark-video-title'
                            }`}
                          >
                            {each.title}
                          </p>
                          <div className="mobile-name-views-date">
                            <p className="channel-name">{each.name}</p>
                            <div className="row-wise">
                              <p className="views-count">{`${each.viewCount} views`}</p>
                              <p className="views-count">
                                {each.publishedAt
                                  ? `• ${formatDistanceToNow(
                                      new Date(each.publishedAt),
                                    )} ago`
                                  : '• Unknown'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )
      }}
    </Commoncontent.Consumer>
  )

  switchVideoBody = () => {
    const {videoStatus} = this.state
    switch (videoStatus) {
      case videoDataDisplay.loading:
        return this.loadingFunction()
      case videoDataDisplay.success:
        return this.successFunction()
      case videoDataDisplay.failure:
        return this.failureFunction()
      case videoDataDisplay.noSearchResults:
        return this.noSearchResultFunction()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        {this.searchRenderFunction()}
        {this.switchVideoBody()}
      </>
    )
  }
}

export default Videos
