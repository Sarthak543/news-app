import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

export default class App extends Component {

  api_key = process.env.REACT_APP_API_KEY_MONKEY

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route path='/' element={<News setProgress={this.setProgress} api_key={this.api_key} key={"general"} pageSize={15} country={"in"} category={"general"} />} />
            <Route path='/home' element={<News setProgress={this.setProgress} api_key={this.api_key} key={"general"} pageSize={15} country={"in"} category={"general"} />} />
            <Route path='/business' element={<News setProgress={this.setProgress} api_key={this.api_key} key={"business"} pageSize={15} country={"in"} category={"business"} />} />
            <Route path='/entertainment' element={<News setProgress={this.setProgress} api_key={this.api_key} key={"entertainment"} pageSize={15} country={"in"} category={"entertainment"} />} />
            <Route path='/health' element={<News setProgress={this.setProgress} api_key={this.api_key} key={"health"} pageSize={15} country={"in"} category={"health"} />} />
            <Route path='/science' element={<News setProgress={this.setProgress} api_key={this.api_key} key={"science"} pageSize={15} country={"in"} category={"science"} />} />
            <Route path='/sports' element={<News setProgress={this.setProgress} api_key={this.api_key} key={"sports"} pageSize={15} country={"in"} category={"sports"} />} />
            <Route path='/technology' element={<News setProgress={this.setProgress} api_key={this.api_key} key={"technology"} pageSize={15} country={"in"} category={"technology"} />} />
          </Routes>
        </Router>
      </>
    )
  }
}
