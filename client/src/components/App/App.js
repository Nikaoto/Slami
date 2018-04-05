import React, { Component } from 'react'
import FirstPage from "../FirstPage"
import SecondPage from "../SecondPage"
import TempData from "./temp-data"
import "./App.css"
import { about_us_label, contact_label, copyright_label, devMode, faq_label, privacy_policy_label } from "../../config"
import AboutUs from "../AboutUs/AboutUs"

const HEADER_TITLE = "სლამი • Slami"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 0,
      slides: [],
      savedState: {},
      pageAnimation: "scene-element--fadeinright"
    }

    this.onFinishFirstPage = this.onFinishFirstPage.bind(this)
    this.onBackToFirstPage = this.onBackToFirstPage.bind(this)
    this.onAboutUsClick = this.onAboutUsClick.bind(this)
    this.onFaqClick = this.onFaqClick.bind(this)
    this.onContactClick = this.onContactClick.bind(this)
  }

  renderCurrentPage() {
    switch(this.state.currentPage) {
      case 0: return <FirstPage animation={this.state.pageAnimation} savedState={this.state.firstPageState}
                                onNextPage={this.onFinishFirstPage} />

      case 1: return <SecondPage animation={this.state.pageAnimation} slides={this.state.slides}
                                 onBack={this.onBackToFirstPage} />

      case 2: return <AboutUs animation={this.state.pageAnimation} />

      default: return <FirstPage animation={this.state.pageAnimation} savedState={this.state.firstPageState}
                                 onNextPage={this.onFinishFirstPage} />
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

  onAboutUsClick(){
    this.setState({ currentPage: 2 })
  }

  onFaqClick() {

  }

  onContactClick() {

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

        <footer className="page-footer orange" style={{ marginTop: 120 }}>
          <div className="container">
            <div className="row">
              <div className="col s6">
                <h5 className="white-text">სლამი</h5>
                <ul>
                  <li className="link grey-text text-lighten-3" onClick={this.onAboutUsClick}>{about_us_label}</li>
                  <li className="link grey-text text-lighten-3" onClick={this.onFaqClick}>{faq_label}</li>
                  <li className="link grey-text text-lighten-3" onClick={this.onContactClick}>{contact_label}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
              {copyright_label}
              <a className="grey-text text-lighten-4 right" href="#!">{privacy_policy_label}</a>
            </div>
          </div>
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
    marginBottom: 20,
  },
}

export default App;
