import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import LogInRoute from './components/LogInRoute'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import Saved from './components/Saved'
import NotFound from './components/NotFound'
import VideoItemDetails from './components/VideoItemDetails'
import Commoncontent from './Commoncontent/common'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    savedList: [],
    selectedTab: 'HOME',
    darkAndLightMode: false,
  }

  darkAndLightModeFunction = () => {
    this.setState(prevState => ({
      darkAndLightMode: !prevState.darkAndLightMode,
    }))
  }

  toSavedComponent = data => {
    this.setState(prevState => ({savedList: [...prevState.savedList, data]}))
  }

  tabUpdatedFunction = id => {
    this.setState({selectedTab: id})
  }

  removeSavedItemFun = data => {
    const {savedList} = this.state
    const {id} = data
    const removedItemn = savedList.filter(each => each.id !== id && each)
    this.setState({savedList: removedItemn})
  }

  render() {
    const {savedList, selectedTab, darkAndLightMode} = this.state
    return (
      <Commoncontent.Provider
        value={{
          savedList,
          selectedTab,
          darkAndLightMode,
          toSavedComponent: this.toSavedComponent,
          tabUpdatedFunction: this.tabUpdatedFunction,
          removeSavedItemFun: this.removeSavedItemFun,
          darkAndLightModeFunction: this.darkAndLightModeFunction,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LogInRoute} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={Saved} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </Commoncontent.Provider>
    )
  }
}

export default App
