import React, { Component } from 'react'
import FirstPage from "../FirstPage"
import SecondPage from "../SecondPage"
import TempData from "./temp-data"
import "./App.css"
import {devMode} from "../../config"

const HEADER_TITLE = "სლამი • Slami"

class App extends Component {
  constructor(props) {
    super(props)

    if (devMode) {
      this.state = {
        currentPage: 1,
        slides: TempData,
        pageAnimation: "scene-element--fadeinright"
      }
    } else {
      this.state = {
        currentPage: 0,
        slides: [],
        savedState: {},
        pageAnimation: "scene-element--fadeinright"
      }
    }

    this.onFinishFirstPage = this.onFinishFirstPage.bind(this)
    this.onBackToFirstPage = this.onBackToFirstPage.bind(this)
  }

  renderCurrentPage() {
    switch(this.state.currentPage) {
      case 0: return <FirstPage animation={this.state.pageAnimation} savedState={this.state.firstPageState}
          onNextPage={this.onFinishFirstPage} />
      case 1: return <SecondPage animation={this.state.pageAnimation} slides={this.state.slides} 
          onBack={this.onBackToFirstPage} />
      default: break
    }
  }

  onFinishFirstPage(media, state) {
    if (media.length > 0) {
      this.setState({
        firstPageState: state,
        currentPage: 1, 
        slides: media,
        pageAnimation: "scene-element--fadeinright"
      })
    }
  }

  onBackToFirstPage() {
    this.setState({
      currentPage: 0,
      pageAnimation: "scene-element--fadeinleft"
    })
  }

  render() {
    return (
      <div className="blue-grey lighten-1">
        <header style={styles.headerTitle} >
          <a href="/">
            <h2 className="amber-text text-darken-3">{HEADER_TITLE}</h2>
          </a>
        </header>

        <div style={styles.pageStyle} className="page-container">
          {this.renderCurrentPage()}
        </div>

        <footer className="footer">
          <div style={{height: 120, backgroundColor: "orange"}}/>
        </footer>
      </div>
    );
  }
}

const styles = {
  headerTitle: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  pageStyle: {
    minHeight: 600,
    marginBottom: 50,
  },
}

export default App;
