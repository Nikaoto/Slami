import React, { Component } from "react"
import Button from "../Button"
import Slide from "../Slide"
import SlideEditor from "../SlideEditor"
import { generateVideo } from "../../util"
import "./SecondPage.css"

const canvas_size = 1024

export default class SecondPage extends Component {
  constructor(props) {
    super(props)
    
    const editSlides = this.props.slides.map(sl => {
      sl.selected = false
      sl.textPosition = { x: 0, y:0 }
      return sl
    })

    this.state = {
      chosenSlideIndex: 0,
      editSlides: editSlides
    }

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
    generateVideo(this.state.editSlides, context, canvas, (output) => {
      const url = URL.createObjectURL(output)
      videoPlayer.src = url
    })
  }

  onSlideClick(slideKey) {
    const slides = this.state.editSlides
    const i = slides.findIndex(sl => sl.key === slideKey)
    slides.forEach(sl => sl.selected = false)
    slides[i].selected = true

    this.setState({
      chosenSlideIndex: i,
      editSlides: slides
    })
  }

  getChosenSlide = () => this.state.editSlides[this.state.chosenSlideIndex]

  renderSlides() {
    return this.state.editSlides.map(sl => 
      <Slide key={sl.key} slideObj={sl} onClick={() => this.onSlideClick(sl.key)}/>
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

              {/* Canvas and Video */}
              <canvas ref="canvas" style={styles.canvas} />
              <video ref="videoPlayer" controls autoPlay loop style={styles.videoPlayer} 
                  width={300} height={300} />

            </div>

            
            {/* Editor (+ Right Side) */}
            <div style={styles.editorContainer} className="col s6">
              <SlideEditor chosenSlide={this.getChosenSlide()} />
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
  editorContainer: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
  },
  canvas: {
    display: "none"
  },
  videoPlayer: {
    margin: 10,
    boxShadow: "0px 3px 13px 3px rgba(0,0,0,0.2)"
  }
}