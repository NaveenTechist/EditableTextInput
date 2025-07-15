import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {BiListPlus} from 'react-icons/bi'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import Header from '../Header'
import HomeLeftSection from '../HomeLeftSection'
import Commoncontent from '../../Commoncontent/common'

import './index.css'

const speicificVideoStatus = {
  failure: 'FAILURE',
  success: 'SUCCESS',
  loading: 'LOADING',
}

class VideoItemDetails extends Component {
  state = {
    videoStatus: speicificVideoStatus.loading,
    videoDetailsData: [],
    likeBtn: false,
    disLikeBtn: false,
    savedBtn: false,
  }

  componentDidMount() {
    this.getSpecifiVideoData()
  }

  getSpecifiVideoData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwtToken')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const videoDetails = data.video_details
      const toCamelCase = {
        id: videoDetails.id,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        thumbnailUrl: videoDetails.thumbnail_url,
        name: videoDetails.channel.name,
        profileImageUrl: videoDetails.channel.profile_image_url,
        subscriberCount: videoDetails.channel.subscriber_count,
        viewCount: videoDetails.view_count,
        publishedAt: videoDetails.published_at,
        description: videoDetails.description,
      }
      this.setState({
        videoDetailsData: toCamelCase,
        videoStatus: speicificVideoStatus.success,
      })
    } else {
      this.setState({
        videoStatus: speicificVideoStatus.failure,
      })
    }
  }

  loadingFunction = () => (
    <div className="loader video-details" data-testid="loader">
      <Loader type="TailSpin" color="#1E90FF" />
    </div>
  )

  onClickFailureBtn = () => {
    this.setState(
      {videoStatus: speicificVideoStatus.loading},
      this.getSpecifiVideoData,
    )
  }

  successRenderFunction = () => (
    <Commoncontent.Consumer>
      {value => {
        const {toSavedComponent, darkAndLightMode} = value
        const {videoDetailsData, likeBtn, disLikeBtn, savedBtn} = this.state

        const onClickSaveBtn = () => {
          toSavedComponent(videoDetailsData)
          this.setState(prevState => ({savedBtn: !prevState.savedBtn}))
          // if (savedBtn === false) {
          //   removeSavedItemFun(videoDetailsData)
          // }
          // console.log('yes saved!')
        }

        return (
          <div className="specific-video-right-body-conatiner">
            <div className="desktop-view">
              <ReactPlayer
                url={videoDetailsData.videoUrl}
                width="100%"
                height="500px"
              />
            </div>
            <div className="mobile-view">
              <ReactPlayer
                url={videoDetailsData.videoUrl}
                width="100%"
                height="300px"
              />
            </div>
            <div className="all-video-botttom-conatiner">
              <p
                className={`video-title m10 ${
                  darkAndLightMode && 'video-details-white-text'
                }  `}
              >
                {videoDetailsData.title}
              </p>
              <div className="row-wise-space-between">
                <div className="row-wise views-year-container">
                  <p className="views-count">{`${videoDetailsData.viewCount} views`}</p>
                  <p className="views-count">
                    {videoDetailsData?.publishedAt &&
                      `• ${formatDistanceToNow(
                        new Date(videoDetailsData.publishedAt),
                      )} ago`}
                  </p>
                </div>
                <div className="row-wise second-container">
                  <div className="row-wise mr">
                    <button
                      type="button"
                      className="hidden-btn row-wise"
                      onClick={this.onClickLikeBtn}
                    >
                      <AiOutlineLike
                        className={`vide-detail-icon-like  ${
                          likeBtn && 'like-selected-icon'
                        }`}
                      />
                      <p
                        className={`home-left-icon-text ${
                          likeBtn && 'like-selected'
                        }`}
                      >
                        Like
                      </p>
                    </button>
                  </div>
                  <div className="row-wise mr">
                    <button
                      type="button"
                      className="hidden-btn row-wise"
                      onClick={this.onClickDisLikeBtn}
                    >
                      <AiOutlineDislike
                        className={`vide-detail-icon-like  ${
                          disLikeBtn && 'like-selected-icon'
                        }`}
                      />
                      <p
                        className={`home-left-icon-text ${
                          disLikeBtn && 'like-selected'
                        }`}
                      >
                        Dislike
                      </p>
                    </button>
                  </div>
                  <div className="row-wise mr">
                    <button
                      type="button"
                      className="hidden-btn row-wise"
                      onClick={onClickSaveBtn}
                    >
                      <BiListPlus
                        className={`vide-detail-icon-like  ${
                          savedBtn && 'like-selected-icon'
                        }`}
                      />
                      <p
                        className={`home-left-icon-text ${
                          savedBtn && 'like-selected'
                        }`}
                      >
                        {savedBtn ? 'Saved' : 'Save'}
                      </p>
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row-wise profile-subs ">
                <img
                  src={videoDetailsData.profileImageUrl}
                  alt={videoDetailsData.name}
                  className="vide--detail-profile"
                />
                <div>
                  <p
                    className={`channel-name ${
                      darkAndLightMode && 'video-details-white-text'
                    } `}
                  >
                    {videoDetailsData.name}
                  </p>
                  <p className="views-count mobile-subs">{`${videoDetailsData.subscriberCount} subscribers`}</p>
                </div>
              </div>
              <p
                className={`channel-name ${
                  darkAndLightMode && 'video-details-white-text'
                } `}
              >
                {videoDetailsData.description}
              </p>
            </div>
          </div>
        )
      }}
    </Commoncontent.Consumer>
  )

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

  onClickLikeBtn = () => {
    this.setState(prevState => ({
      likeBtn: !prevState.likeBtn,
      disLikeBtn: false,
    }))
  }

  onClickDisLikeBtn = () => {
    this.setState(prevState => ({
      disLikeBtn: !prevState.disLikeBtn,
      likeBtn: false,
    }))
  }

  switchingFunction = () => {
    const {videoStatus} = this.state
    switch (videoStatus) {
      case speicificVideoStatus.success:
        return this.successRenderFunction()
      case speicificVideoStatus.loading:
        return this.loadingFunction()
      case speicificVideoStatus.failure:
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
            <div
              className={`home-main-bg ${
                darkAndLightMode && 'home-main-bg-dark'
              }`}
              data-testid="videoItemDetails"
            >
              <div className="home-card-bg">
                <Header />
                <div className="home-body-container">
                  <HomeLeftSection />
                  <div
                    className={`video-details-body-conatiner ${
                      darkAndLightMode && 'video-details-body-conatiner-dark'
                    } `}
                  >
                    {this.switchingFunction()}
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
export default VideoItemDetails
