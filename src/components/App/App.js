import React, { Component } from 'react'
import FirstPage from "../FirstPage"
import SecondPage from "../SecondPage"
import TempData from "./temp-data"

const HEADER_TITLE = "სლამი • Slami"

class App extends Component {
  constructor(props) {
    super(props)
    // TODO remove TempData after finishing SecondPage testing
    this.state = { currentPage: 1, slides: TempData }
    //this.state = { currentPage: 0, slides: [] }
  }

  renderCurrentPage() {
    switch(this.state.currentPage) {
      case 0: return <FirstPage onNextPage={(media) => this.onFinishFirstPage(media)} />; break;
      case 1: return <SecondPage slides={this.state.slides} onBack={() => this.onBackToFirstPage()} />; break;
    }
  }

  onFinishFirstPage(media) {
    this.setState({ currentPage: 1, slides: media })
  }

  onBackToFirstPage() {
    console.log("APP: back to first page")
    this.setState({ currentPage: 0 })
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
          <div style={{height: 200, backgroundColor: "orange"}}/>
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
    minHeight: 600
  },
}

export default App;
