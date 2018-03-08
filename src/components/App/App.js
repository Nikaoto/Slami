import React, { Component } from 'react'
import FirstPage from "../FirstPage"
import SecondPage from "../SecondPage"
import TempData from "./temp-data"
import "./App.css"

const HEADER_TITLE = "სლამი • Slami"

class App extends Component {
  constructor(props) {
    super(props)
    // TODO remove TempData after finishing SecondPage testing
    this.state = { currentPage: 1, slides: TempData, pageAnimation: "scene-element--fadeinright" }
    //this.state = { currentPage: 0, slides: [], pageAnimation: "scene-element--fadeinright" }
  }

  renderCurrentPage() {
    switch(this.state.currentPage) {
      case 0: return <FirstPage animation={this.state.pageAnimation} 
          onNextPage={(media) => this.onFinishFirstPage(media)} />
      case 1: return <SecondPage animation={this.state.pageAnimation} slides={this.state.slides} 
          onBack={() => this.onBackToFirstPage()} />
      default: break
    }
  }

  onFinishFirstPage(media) {
    if (media.length > 0) {
      this.setState({ 
        currentPage: 1, 
        slides: media,
        pageAnimation: "scene-element--fadeinright"
      })
    }
  }

  onBackToFirstPage() {
    console.log("APP: back to first page")
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
