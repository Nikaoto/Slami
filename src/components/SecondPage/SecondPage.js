import React, { Component } from "react"
//import GridSlide from "../GridSlide"

export default class SecondPage extends Component {
  constructor(props) {
    super(props)
    this.state = { chosenSlide: this.props.slides[0] }
    this.onBackButtonClick = this.onBackButtonClick.bind(this)
  }

  onBackButtonClick() {
    if (this.props.onBack) {
      this.props.onBack()
    }
  }

  renderSlides() {
    return this.props.slides.map(sl => 
      <div key={sl.key}>
        <div>{sl.text}</div>
        <img style={styles.slideImage}
        src={sl.url} 
        alt={sl.title} />
      </div>
    )
  }

  render() {
    return(
      <div className="row">

        {/* Back Button */}
        <div style={{ marginBottom: 40 }} className="col s1">
          <button onClick={this.onBackButtonClick} className="waves-effect waves-light btn">
            <i className="material-icons">arrow_back</i>
          </button>
        </div>

        <div className="col s12">
          <div className="row">

            {/* Slides Grid */}
            <div style={ styles.grid } className="col s6">
              { this.renderSlides() }
            </div>

            {/* Editor */}
            <div style={styles.editorContainer} className="col s6">
              <div style={styles.editor}>
                <div style={styles.aspectRatioBox}>
                  <img src={this.state.chosenSlide.url} alt={this.state.chosenSlide.title} 
                      style={styles.editorImage}/>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }
}

const styles = {
  grid: {
    display: "flex",
    backgroundColor: "white",
    padding: 20,
    flexFlow: "row wrap",
    justifyContent: "flex-start",
  },
  slideImage: {
    width: 120,
    height: 120,
    marginBottom: 15,
    marginRight: 15,
  },
  editorContainer: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
  },
  editor: {
    backgroundColor: "green",
    alignSelf: "stretch",
    flex: 1,
    minWidth: 240,
    minHeight: 240,
    maxWidth: 650,
    maxHeight: 650,
  },
  aspectRatioBox: {
    height: 0,
    overflow: "hidden",
    paddingTop: "100%",
    background: "black",
    position: "relative",
  },
  editorImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
}