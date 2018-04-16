import React, { Component } from 'react'
import FirstPage from "../FirstPage"
import SecondPage from "../SecondPage"
import TempData from "./temp-data"
import AboutUs from "../AboutUs/AboutUs"
import { img, about_us_label, contact_label, copyright_label, devMode, faq_label, privacy_policy_label } from "../../config"
import "./App.css"
import FaqPage from "../InfoPage/Faq"
import ContactPage from "../InfoPage/Contact"

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

      case 3: return <FaqPage animation={this.state.pageAnimation} />

      case 4: return <ContactPage animation={this.state.pageAnimation} />

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
    this.setState({ currentPage: 3 })
  }

  onContactClick() {
    this.setState({ currentPage: 4 })
  }

  render() {
    return (
      <div className="blue-grey lighten-1">
        <header style={styles.logoContainer} >
          <a href="/">
            <img src={img.site_logo} style={styles.siteLogo}/>
          </a>
        </header>

        <div style={styles.pageStyle} className="page-container">
          {this.renderCurrentPage()}
        </div>

        <footer className="page-footer orange" style={{ marginTop: 120 }}>
          <div className="container">
            <div className="row">
              <div className="col s6">
                <a href={"/"}>
                <h5 className="white-text">სლამი</h5>
                </a>
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
  logoContainer: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center"
  },
  siteLogo: {
    marginLeft: -40,
    maxWidth: 300,
    maxHeight: 200
  },
  pageStyle: {
    minHeight: 600,
    marginBottom: 20,
  },
}

export default App;
