import React from 'react'

const Commoncontent = React.createContext({
  savedList: [],
  toSavedComponent: () => {},
  selectedTab: 'HOME',
  tabUpdatedFunction: () => {},
  removeSavedItemFun: () => {},
  darkAndLightMode: false,
  darkAndLightModeFunction: () => {},
})

export default Commoncontent
