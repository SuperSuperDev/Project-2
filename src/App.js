
import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Coins from './coins/Coins'
import Home from './components/Home'
import CoinDetails from './coins/CoinDetails'
import Nav from './components/Nav'
import Calculator from './components/Calculator'
import CrystalBall from './components/CrystalBall'


function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/coins/:id" component={CoinDetails} />
          <Route path="/coins" component={Coins} />
          <Route path="/calculator" component={Calculator} />
          <Route path="/crystalball" component={CrystalBall} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
