import React, { Component } from "react"
//import GridSlide from "../GridSlide"
import Button from "../Button"
import { generateVideo } from "../../util"
import "./SecondPage.css"

const canvas_size = 240

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

  onGenerateClick() {
    console.log("onGenerateClick")
    const canvas = this.refs.canvas
    const videoPlayer = this.refs.videoPlayer
    const context = canvas.getContext("2d")

    generateVideo(this.props.slides, context, canvas, (output) => {
      const url = window.URL.createObjectURL(output)
      videoPlayer.src = url
    })
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

  componentDidMount() {
    const canvas = this.refs.canvas
    canvas.width = canvas_size
    canvas.height = canvas_size
  }

  render() {
    return(
      <div className={"row scene-element " + this.props.animation}>

        {/* Back Button */}
        <div style={{ marginBottom: 40 }} className="col s1">
          <Button onClick={this.onBackButtonClick} text={"უკან"} iconLeft={"arrow_back"} />
        </div>

        <div className="col s12">
          <div className="row">

            {/* Left Side */}
            <div className="col s6">

              {/* Slides Grid */}
              <div className="row">
                <div style={ styles.grid } className="col s12">
                  { this.renderSlides() }
                </div>
              </div>

              {/* Generate Button */}
              <div className="row">
                <div className="col s3">
                  <Button text={"დააგენერირე"} iconLeft={"settings"} iconRight={"settings"} 
                      onClick={() => this.onGenerateClick()}/>
                </div>
              </div>

              {/* Temporary Canvas and Video */}
              <canvas ref="canvas" style={styles.canvas} />
              <video ref="videoplayer" controls autoPlay loop style={styles.videoPlayer} 
                  width={canvas_size} height={canvas_size} />

            </div>

            {/* Editor (+ Right Side) */}
            <div style={styles.editorContainer} className="col s6">
              <div style={styles.editor}>
                <div style={styles.aspectRatioBox}>
                  <img src={this.state.chosenSlide.url} alt={this.state.chosenSlide.title} 
                      style={styles.editorImage} className="non-draggable"/>
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
  canvas: {
    margin: 30,
    boxShadow: "0px 3px 13px 3px rgba(0,0,0,0.2)"
  },
  videoPlayer: {
    margin: 30,
    boxShadow: "0px 3px 13px 3px rgba(0,0,0,0.2)"
  }
}