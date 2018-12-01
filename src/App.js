import React, { Component } from 'react'
import './styles/normalize.css'
import './styles/global.css'

import Converter from './pages/Converter'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Converter />
      </div>
    )
  }
}

export default App
