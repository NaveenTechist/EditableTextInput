import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Commoncontent from '../../Commoncontent/common'

import './index.css'

class LogInRoute extends Component {
  state = {
    showPassword: false,
    username: '',
    password: '',
    errorMsg: '',
    errorMsgDisplay: false,
  }

  onClickLoginBtn = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const nameAndPassword = {username, password}
    const options = {
      method: 'POST',

      body: JSON.stringify(nameAndPassword),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props
      Cookies.set('jwtToken', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg, errorMsgDisplay: true})
    }
  }

  onchangeCheckBox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const token = Cookies.get('jwtToken')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    const {
      showPassword,
      username,
      password,
      errorMsg,
      errorMsgDisplay,
    } = this.state
    return (
      <Commoncontent.Consumer>
        {value => {
          const {darkAndLightMode} = value

          return (
            <div
              className={`login-main-bg ${
                darkAndLightMode && 'login-main-bg-dark'
              }`}
            >
              <div className="view-others">
                <p>
                  Name: rahul <br />
                  Password: rahul@2021{' '}
                </p>
              </div>
              <div
                className={`login-card-bg ${
                  darkAndLightMode && 'login-card-bg-dark'
                }`}
              >
                <div className="login-logo-container">
                  <img
                    src={
                      darkAndLightMode
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                    }
                    alt="website logo"
                    className="login-logo"
                  />
                </div>
                <form onSubmit={this.onClickLoginBtn}>
                  <div className="username-container">
                    <label
                      htmlFor="username"
                      className={`login-label ${
                        darkAndLightMode && 'text-white-dark'
                      }`}
                    >
                      USERNAME
                    </label>
                    <input
                      id="username"
                      type="text"
                      placeholder="USERNAME"
                      className={`login-input ${
                        darkAndLightMode && 'login-input-dark'
                      }`}
                      onChange={this.onChangeUsername}
                      value={username}
                    />
                  </div>
                  <div className="username-container">
                    <label
                      htmlFor="password"
                      className={`login-label ${
                        darkAndLightMode && 'text-white-dark'
                      }`}
                    >
                      PASSWORD
                    </label>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="PASSWORD"
                      className={`login-input ${
                        darkAndLightMode && 'login-input-dark'
                      }`}
                      onChange={this.onChangePassword}
                      value={password}
                    />
                  </div>
                  <div className="login-showpassword-container">
                    <input
                      id="show-password"
                      type="checkbox"
                      onChange={this.onchangeCheckBox}
                    />
                    <label
                      htmlFor="show-password"
                      className={`showpassword-label ${
                        darkAndLightMode && 'text-white-dark'
                      }`}
                    >
                      Show Password
                    </label>
                  </div>
                  <div className="login-btn-container">
                    <button type="submit" className="login-btn">
                      Login
                    </button>
                    {errorMsgDisplay && (
                      <p className="login-error-msg">{`*${errorMsg}`}</p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )
        }}
      </Commoncontent.Consumer>
    )
  }
}
export default LogInRoute
